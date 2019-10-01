<template>
	<div>
		<!--Stats cards-->
		<div class="row">
			<div class="col-md-6 col-xl-3" v-for="stats in statsCards" :key="stats.title">
				<stats-card>
					<div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
						<i :class="stats.icon"></i>
					</div>
					<div class="numbers" slot="content">
						<p>{{stats.title}}</p>
						{{stats.value}}
					</div>
					<div class="stats" slot="footer">
						<i :class="stats.footerIcon"></i>
						{{stats.footerText}}
					</div>
				</stats-card>
			</div>
		</div>

		<!--Charts-->
		<div class="row">
			<div class="col-12">
				<geo-chart-card
					title="Slaves by country"
					sub-title
					:chart-data="slavesChart.data"
					:chart-options="slavesChart.options"
				>
					<span slot="footer">
						<i class="ti-reload"></i> Updated 3 minutes ago
					</span>
					<div slot="legend">
						<i class="fa fa-circle text-info"></i> Open
						<i class="fa fa-circle text-danger"></i> Click
						<i class="fa fa-circle text-warning"></i> Click Second Time
					</div>
				</geo-chart-card>
			</div>

			<div class="col-md-6 col-12">
				<chart-card
					title="Email Statistics"
					sub-title="Last campaign performance"
					:chart-data="preferencesChart.data"
					chart-type="Pie"
				>
					<span slot="footer">
						<i class="ti-timer"></i> Campaign set 2 days ago
					</span>
					<div slot="legend">
						<i class="fa fa-circle text-info"></i> Open
						<i class="fa fa-circle text-danger"></i> Bounce
						<i class="fa fa-circle text-warning"></i> Unsubscribe
					</div>
				</chart-card>
			</div>

			<div class="col-md-6 col-12">
				<chart-card
					title="2015 Sales"
					sub-title="All products including Taxes"
					:chart-data="activityChart.data"
					:chart-options="activityChart.options"
				>
					<span slot="footer">
						<i class="ti-check"></i> Data information certified
					</span>
					<div slot="legend">
						<i class="fa fa-circle text-info"></i> Tesla Model S
						<i class="fa fa-circle text-warning"></i> BMW 5 Series
					</div>
				</chart-card>
			</div>
		</div>
	</div>
</template>
<script>
import { StatsCard, ChartCard, GeoChartCard } from "@/components/index";
import Chartist from "chartist";
export default {
	components: {
		StatsCard,
		ChartCard,
		GeoChartCard
	},
	/**
	 * Chart data used to render stats, charts. Should be replaced with server data
	 */
	computed: {
		statsCards() {
			let d = new Date(this.$store.state.lastSlaveUpdate);
			return [
				{
					type: "warning",
					icon: "ti-desktop",
					title: "Slaves:",
					value: this.$store.state.slaves.length,
					footerText: `Last updated at ${d.getHours()}:${
						d.getMinutes() < 10
							? "0" + d.getMinutes()
							: d.getMinutes()
					}`,
					footerIcon: "ti-reload"
				},
				{
					type: "success",
					icon: "ti-wallet",
					title: "Revenue",
					value: "$",
					footerText: "Last day",
					footerIcon: "ti-calendar"
				},
				{
					type: "danger",
					icon: "ti-pulse",
					title: "Errors",
					value: "23",
					footerText: "In the last hour",
					footerIcon: "ti-timer"
				},
				{
					type: "info",
					icon: "ti-twitter-alt",
					title: "Followers",
					value: "+45",
					footerText: "Updated now",
					footerIcon: "ti-reload"
				}
			];
		},
		slavesChart() {
			let slavesByCountry = this.$store.getters.getSlavesByCountry;
			let arr = Object.keys(slavesByCountry).map(key => [
				key,
				slavesByCountry[key].length
			]);

			return {
				data: [["Country", "# of Slaves"]].concat(arr),
				options: {
					colorAxis: { colors: ["yellow", "indigo"] }
				}
			};
		},
		preferencesChart() {

			let labels = Object.keys(this.$store.getters.getPlatforms);
			let series = Object.values(this.$store.getters.getPlatforms);

			let total = series.reduce((a, b) => a+b);
			let percentages = series.map((el) => Math.round((el/total)*100));

			console.log(percentages)

			return {
				data: {
					labels: percentages.map((p) => p+'%'),
					series: series
				},
				options: {}
			};
		}
	},
	data() {
		return {
			activityChart: {
				data: {
					labels: [
						"Jan",
						"Feb",
						"Mar",
						"Apr",
						"Mai",
						"Jun",
						"Jul",
						"Aug",
						"Sep",
						"Oct",
						"Nov",
						"Dec"
					],
					series: [
						[
							542,
							543,
							520,
							680,
							653,
							753,
							326,
							434,
							568,
							610,
							756,
							895
						],
						[
							230,
							293,
							380,
							480,
							503,
							553,
							600,
							664,
							698,
							710,
							736,
							795
						]
					]
				},
				options: {
					seriesBarDistance: 10,
					axisX: {
						showGrid: false
					},
					height: "245px"
				}
			}
		};
	}
};
</script>
<style>
</style>
