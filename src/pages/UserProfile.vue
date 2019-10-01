<template>
		<div class="row">
			<div class="col-xl-4 col-lg-5 col-md-6">
				<table-card :data="tableData" :columns="tableColumns" subTitle="title" title="Hi">

				</table-card>
				<members-card>

				</members-card>
			</div>
			<div class="col-xl-8 col-lg-7 col-md-6">
				<edit-profile-form>

				</edit-profile-form>
			</div>
		</div>
</template>
<script>
import EditProfileForm from "./UserProfile/EditProfileForm.vue";
import TableCard from "./UserProfile/TableCard.vue";
import MembersCard from "./UserProfile/MembersCard.vue";

export default {
	components: {
		EditProfileForm,
		TableCard,
		MembersCard
	},
	data() {
		return {
			tableColumns: ["Id", "Name", "Salary", "Country", "City"],
			tableData: [
				{
					id: 1,
					name: "Dakota Rice",
					salary: "$36.738",
					country: "Niger",
					city: "Oud-Turnhout"
				},
				{
					id: 2,
					name: "Minerva Hooper",
					salary: "$23,789",
					country: "Curaçao",
					city: "Sinaai-Waas"
				},
				{
					id: 3,
					name: "Sage Rodriguez",
					salary: "$56,142",
					country: "Netherlands",
					city: "Baileux"
				},
				{
					id: 4,
					name: "Philip Chaney",
					salary: "$38,735",
					country: "Korea, South",
					city: "Overland Park"
				},
				{
					id: 5,
					name: "Doris Greene",
					salary: "$63,542",
					country: "Malawi",
					city: "Feldkirchen in Kärnten"
				}
			]
		}
	}
};
</script>
<style>
</style>
