<template>
	<card>
		<template slot="header">
			<h4 v-if="$slots.title || title" class="card-title">
				<slot name="title">{{title}}</slot>
			</h4>
			<p class="card-category">
				<slot name="subTitle">{{subTitle}}</slot>
			</p>
		</template>
		<div>
			<div :id="chartId" style="height:500px"></div>
			<!-- <div class="footer">
				<div class="chart-legend">
					<slot name="legend"></slot>
				</div>
				<hr>
				<div class="stats">
					<slot name="footer"></slot>
				</div>
				<div class="pull-right"></div>
			</div>-->
		</div>
	</card>
</template>
<script>
import Card from "./Card.vue";
export default {
	name: "geo-chart-card",
	components: {
		Card
	},
	props: {
		footerText: {
			type: String,
			default: ""
		},
		title: {
			type: String,
			default: ""
		},
		subTitle: {
			type: String,
			default: ""
		},
		chartOptions: {
			type: Object,
			default: () => {
				return {};
			}
		},
		chartData: {
			type: Array,
			default: () => {
				return [["Country", "ExampleVal"], ["US", 1000], ["GB", 500]];
			}
		}
	},
	data() {
		return {
			chartId: Math.floor(Math.random() * 1000),
			chart: null
		};
	},
	watch: {
		chartData: function() {
			this.drawChart();
		},
		chartOptions: function() {
			this.drawChart();
		}
	},
	methods: {
		initChart() {
			if (google.visualization && google.visualization.GeoChart) {
				this.chart = new google.visualization.GeoChart(
					document.getElementById(this.chartId)
				);
				this.drawChart();
			} else {
				google.charts.setOnLoadCallback(this.initChart);
			}
		},
		drawChart() {
			if (this.chart) {
				this.chart.draw(
					google.visualization.arrayToDataTable(this.chartData),
					this.chartOptions
				);
			} else {
				//setTimeout(this.drawChart.bind(this), 500);
				//this.initChart();
			}
		}
	},
	mounted: function() {
		this.initChart();

		window.addEventListener("resize", this.drawChart);
	},
	beforeDestroy: function() {
		window.removeEventListener("resize", this.drawChart);
	}
};
</script>
<style>
</style>
