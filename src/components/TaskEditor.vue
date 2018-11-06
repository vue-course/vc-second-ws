<template>
	<div>
		<div class="inline-task" v-if="showViewMode" @dblclick="currentViewModeState = false">{{task.title}}</div>
		<form v-else class="task-form" @submit.prevent="save">
			<input type="text" v-model="task.title">
			<button type="submit">Save</button>
		</form>
	</div>
</template>

<script>
	export default {
		name: 'TaskEditor',
		props: {
			task: Object,
			viewMode: Boolean,
		},
		data() {
			return {currentViewModeState: true};
		},
		computed: {
			showViewMode() {
				return this.viewMode && this.currentViewModeState;
			}
		},
		methods: {
			save() {
				if (this.viewMode) {
					this.currentViewModeState = true;
				}
				this.$emit('update', this.task);
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
		input {
			font-size: 16px;
			line-height: 26px;
			padding: 2px 10px;
			width: 200px;
		}
		button {
			font-size: 16px;
			line-height: 26px;
			padding: 2px 5px;
		}
	}
</style>