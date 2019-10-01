import Vue from "vue";
import Vuex from "vuex";
import App from "./App";
import router from "./router/index";

import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";

Vue.use(PaperDashboard);
Vue.use(Vuex);

import io from "socket.io-client";
let socket = io("http://localhost:8080/masters");

google.charts.load('current', {
	'packages': ['geochart'],
	'mapsApiKey': process.env.VUE_APP_GEOCHART_SECRET
});

let store = new Vuex.Store({
	state: {
		slaves: [],
		lastSlaveUpdate: Date.now()
	},
	mutations: {
		UPDATE_SLAVES(state, slaves) {
			state.slaves = slaves;
			state.lastSlaveUpdate = Date.now();
		}
	},
	actions: {
		fetchSlaves(context) {
			socket.emit("fetchSlaves");
			socket.once("fetchSlavesResponse", (slaves) => {
				context.commit("UPDATE_SLAVES", slaves)
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
	},
	render: h => h(App)
}).$mount("#app");

socket.on("slaveUpdate", () => {
	store.dispatch("fetchSlaves");
})

setInterval(() => {
	store.dispatch("fetchSlaves");
}, 30000)