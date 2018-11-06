<template>
	<div class="board-stages">
		<h2>Board Stages</h2>
		<StageEditor :stage="newStage" @update="stagesUpdated"></StageEditor>
		<div class="stages-list">
			<Stage v-for="stage in stages" :stage="stage"></Stage>
		</div>
	</div>
</template>

<script>
	import {BoardService} from '../services/boards-service';
	import Stage from "./Stage.vue";
	import StageEditor from "./StageEditor";

	export default {
		name: 'BoardStages',
		components: {StageEditor, Stage},
		props: {
			stages: Array
		},
		data() {
			return {
				newStage: {name: 'New Stage'}
			};
		},
		methods: {
			stagesUpdated(newStage) {
				this.newStage = {name: 'New Stage'};

				BoardService.setStage(newStage).then(stage => {
					this.stages.push(stage);
				});
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