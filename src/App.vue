<template>
	<div id="app">
		<div class="inline">
			<img src="./assets/logo.png">
			<div>Add new task:&nbsp; </div>
			<TaskEditor :task="newTask" :stages="stages" @update="addTask"></TaskEditor>
		</div>
		<BoardStages :stages="stages" @update-stage="stageUpdated" @update-task="taskUpdated"></BoardStages>
	</div>
</template>
<script>
	import {BoardService} from './services/boards-service';
	import TaskEditor from './components/TaskEditor.vue';
	import BoardStages from './components/BoardStages.vue';

	export default {
		components: {
			TaskEditor,
			BoardStages
		},
		data() {
			return {
				newTask: {title: ''},
				stages: []
			};
		},
		mounted() {
			this.getStages();
		},
		methods: {
			addTask(task) {
				if(!this.stages.length) {
					return alert('Please add stages first');
				}
				BoardService
					.setTask(task)
					.then(() => this.newTask = {})
					.then(() => this.getStages());
			},
			stageUpdated() {
				this.getStages();
			},
			taskUpdated() {
				this.getStages();
			},
			getStages() {
				BoardService
					.getStages()
					.then(stages => this.stages = stages)
					.then(() => this.stages.length && (this.newTask = {title: '', stage: this.stages[0].id}))
			}
		}
	};
</script>
<style lang="scss" scoped>
	#app {
		.inline {
			img {
				width: 64px;
				vertical-align: middle;
				padding-right: 20px;
			}
			* {
				display: inline-block;
				max-width: 50%;
			}
		}
		font-family: Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
	}
</style>