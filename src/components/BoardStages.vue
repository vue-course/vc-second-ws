<template>
	<div class="board-stages">
		<h2>Board Stages</h2>
		<StageEditor :stage="newStage" @update="stagesUpdated"></StageEditor>
		<div class="stages-list">
			<Stage v-for="stage in stages"
			       :key="stage.id"
			       :stage="stage"
			       @update-stage="existingStagesUpdated"
			       @update-task="existingTaskUpdated"
			></Stage>
		</div>
	</div>
</template>

<script>
	import Stage from "./Stage.vue";
	import StageEditor from "./StageEditor";

	export default {
		name: 'BoardStages',
		components: {StageEditor, Stage},
		props: {
			stages: Array,
			board: String,
		},
		data() {
			return {
				newStage: {name: 'New Stage'}
			};
		},
		methods: {
			stagesUpdated(newStage) {
				newStage.board = this.board;
				this.newStage = {name: 'New Stage', board: this.board};

				this.$boards.setStage(newStage).then(stage => {
					this.stages.push(stage);
					this.$emit('update-stage', stage);
				});
			},
			existingStagesUpdated(updatedStage) {
				this.$emit('update-stage', updatedStage);
			},
			existingTaskUpdated(updatedTask) {
				this.$emit('update-task', updatedTask);
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.board-stages {
		background-color: #e2eac9;

		h2 {
			font-weight: normal;
			text-align: center;
		}

		.stages-list {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
</style>