import Vue from "vue";
import Vuex from "vuex";
import App from "./App";
import router from "./router/index";

import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";

Vue.use(PaperDashboard);
Vue.use(Vuex);

import io from "socket.io-client";
import { type } from "os";
let socket = io(window.location.host.includes("localhost") ? "http://localhost:8080/masters" : "/masters");

google.charts.load('current', {
	'packages': ['geochart'],
	'mapsApiKey': process.env.VUE_APP_GEOCHART_SECRET
});

let store = new Vuex.Store({
	state: {
		slaves: [],
		modules: [],
		lastSlaveUpdate: Date.now()
	},
	mutations: {
		UPDATE_SLAVES(state, slaves) {
			state.slaves = slaves;
			state.lastSlaveUpdate = Date.now();

			slaves.forEach((s) => {
				if (typeof s.platform === "object") {
					s.platform.toStringFull = function() {
						return `${this.toString()} on ${this.os.toString()}`;
					}
					s.platform.toString = function() {
						return `${this.name} ${this.version}`;
					}
					s.platform.os.toString = function() {
						return `${this.family} ${this.version?this.version:''} ${this.architecture===64?"x64":''}`;
					}
				}
			})
		},
		UPDATE_MODULES(state, slaves) {
			state.modules = slaves;
		}
	},
	actions: {
		fetchSlaves(context) {
			socket.emit("fetchSlaves");
			socket.once("fetchSlavesResponse", (slaves) => {
				context.commit("UPDATE_SLAVES", slaves)
			})
		},
		fetchModules(context) {
			socket.emit("fetchModules");
			socket.once("fetchModulesResponse", (slaves) => {
				context.commit("UPDATE_MODULES", slaves)
			})
		}
	},
	getters: {
		getSlavesByCountry: state => {
			let data = {};
			state.slaves.forEach((slave) => {
				if (!data[slave.country]) data[slave.country] = [];
				data[slave.country].push(slave);
			});

			return data;
		},
		getPlatforms: state => {
			let platforms = {};
			state.slaves.forEach((p) => {
				if (!platforms[p.platform]) platforms[p.platform] = 0;
				platforms[p.platform]++;
			});
			return platforms;
		},
		getOSes: state => {
			let OSes = {};
			state.slaves.forEach((p) => {
				if (!OSes[p.platform.os]) OSes[p.platform.os] = 0;
				OSes[p.platform.os]++;
			});
			return OSes;
		}
	},
	strict: true
});

/* eslint-disable no-new */
new Vue({
	router,
	store,
	data: {
		socket
	},
	mounted: function () {
		this.$store.dispatch("fetchSlaves");
		this.$store.dispatch("fetchModules");
	},
	render: h => h(App)
}).$mount("#app");

socket.on("slaveUpdate", () => {
	store.dispatch("fetchSlaves");
})

socket.on("moduleUpdate", () => {
	store.dispatch("fetchModules");
})

setInterval(() => {
	store.dispatch("fetchSlaves");
	store.dispatch("fetchModules");
}, 30000)