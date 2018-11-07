<template>
	<div class="stage">
		<StageEditor :stage="stage" @update="updateStage" :view-mode="true"></StageEditor>
		<TaskEditor v-for="task in stage.tasks" :task="task" :view-mode="true" @update="updateTask"></TaskEditor>
	</div>
</template>

<script>

	import {BoardService} from '../services/boards-service';
	import TaskEditor from "./TaskEditor.vue";
	import StageEditor from "./StageEditor.vue";

	export default {
		name: 'Stage',
		components: {TaskEditor, StageEditor},
		props: {
			stage: Object
		},
		methods: {
			updateStage(stage) {
				BoardService
					.setStage(stage)
					.then(() => this.$emit('update-stage', this.stage));
			},
			updateTask(task) {
				BoardService
					.setTask(task)
					.then(() => this.$emit('update-task', task));
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.stage {
		border: 1px solid #ccc;
		padding: 10px;
	}
</style>