<template>
	<div class="task">
		<router-link to="/">Back</router-link>
		<TaskEditor v-if="!loading" :task="task" :stages="stages" @update="addTask"></TaskEditor>
	</div>
</template>
<script>
	import TaskEditor from '../components/TaskEditor.vue';

	export default {
		components: {
			TaskEditor,
		},
		data() {
			return {
				loading: true,
				task: {},
				stages: []
			};
		},
		mounted() {
			this.getData();
		},
		beforeRouteUpdate() {
			this.getData();
		},
		methods: {
			addTask(task) {
				return this.$boards
					.setTask(task)
					.then(() => this.$router.push({name: 'board', params: {id: this.task.board}}));
			},
			getData() {
				this.getTaskData()
					.then(() => this.$boards.getStages(this.task.board))
					.then(stages => this.stages = stages)
					.then(() => this.loading = false);
			},
			getTaskData() {
				if (this.$route.params.id === 'new') {
					this.task = {title: 'add new task', stage: this.stages[0].id, board: this.stages[0].board};
				} else {
					return this.$boards.getTask(this.$route.params.id).then(task => this.task = task);
				}
			}
		}
	};
</script>
<style lang="scss" scoped>
	.board {
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