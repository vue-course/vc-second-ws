<template>
	<div>
		<div class="error" v-if="error">{{error}}</div>
		<div class="inline-task" v-else-if="showViewMode">
			<router-link :to="{name: 'task', params: {id: task.id}}">{{task.title}}</router-link>
		</div>
		<form v-else class="task-form" @submit.prevent="save">
			<input type="text" v-model="task.title">
			<select v-model="task.stage">
				<option v-for="stage in optionalStages" :value="stage.id">{{stage.name}}</option>
			</select>
			<button type="submit">Save</button>
		</form>
	</div>
</template>

<script>
	import {BoardService} from "../services/boards-service";

	export default {
		name: 'TaskEditor',
		props: {
			task: Object,
			stages: Array,
			viewMode: Boolean,
		},
		data() {
			return {
				initialTaskTitle: '',
				currentViewModeState: true,
				_optionalStages: [],
			};
		},
		mounted() {
			this.initialTaskTitle = this.task.title;
			if (!this.stages) {
				this.updateOptionalStages();
			}
		},
		computed: {
			showViewMode() {
				return this.viewMode && this.currentViewModeState;
			},
			optionalStages() {
				return this.stages || this._optionalStages;
			},
			error() {
				const stages = this.stages || this._optionalStages;
				if (!this.viewMode) {
					if (!stages || stages.length === 0) {
						return 'Please create stages before adding task.';
					}
				}
				return '';
			}
		},
		methods: {
			updateOptionalStages() {
				return BoardService
					.getStages()
					.then(stages => this._optionalStages = stages || []);
			},
			save() {
				if (this.viewMode) {
					this.currentViewModeState = true;
				}
				this.$emit('update', this.task);
			},
			editFromInlineMode() {
				this.currentViewModeState = false;
				if (!this.stages) {
					this.updateOptionalStages();
				}
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.inline-task {
		font-size: 16px;
	}

	.task-form {
		* {
			vertical-align: middle;
		}
		input {
			font-size: 16px;
			line-height: 26px;
			padding: 2px 10px;
			width: 200px;
		}
		select {
			font-size: 16px;
			height: 34px;
			padding: 2px 10px;
		}
		button {
			font-size: 16px;
			line-height: 26px;
			padding: 2px 5px;
		}
	}
</style>