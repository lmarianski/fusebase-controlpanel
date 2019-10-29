<template>
		<div class="row">
			<div class="col-xl-4 col-lg-5 col-md-6">
				<table-card :data="moduleData" :columns="tableColumns" subTitle="title" title="Hi">
					<template #footer>
						<p-button @click.native="submitModules()" block>Submit</p-button>
					</template>
				</table-card>
				<!-- <members-card>

				</members-card> -->
			</div>
			<div class="col-xl-4 col-lg-5 col-md-6">
				<members-card v-for="(m) in moduleData" :key="m.name">

				</members-card>
			</div>
		</div>
</template>
<script>
import EditProfileForm from "./UserProfile/EditProfileForm.vue";
import { TableCard } from "@/components";
import MembersCard from "./UserProfile/MembersCard.vue";

export default {
	components: {
		EditProfileForm,
		TableCard,
		MembersCard
	},
	computed: {
		modules() {
			return this.$store.state.modules;
		},
		moduleNames() {
			return this.modules.modules.map(m => m.name);
		},
		moduleData() {
			return (this.modules.modules || []).map((m) => {
				const module = {...m};

				if (m.isAutoRun)
					module["auto run"] = `<input id="${m.name}" type="checkbox" ${this.modules.settings.onConnectModules.includes(m.name)?'checked':''}>`
				return module;
			})
		}
	},
	methods: {
		submitModules() {
			let onConnectModules = Array.from(document.getElementsByTagName("input"))
				.filter(el => el.type=="checkbox" 
					&& el.checked
					&& this.moduleNames.includes(el.id))
				.map(el => el.id);

			this.$root.socket.emit("updateModuleSettings", {onConnectModules})
		}
	},
	data() {
		return {
			tableColumns: ["Name", "Platform", "Auto Run"]
		}
	}
};
</script>
<style scoped>
</style>
