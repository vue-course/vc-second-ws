<template>
	<div class="boards">
		<div>
			<h3>Add Board:</h3>
			<CreateBoardForm @update="getBoards"></CreateBoardForm>
		</div>

		<div class="boards-list">
			<router-link v-for="board in boards" :to="{name: 'board', params: {id: board.id}}"
			             class="board-item">
				{{board.name}}
			</router-link>
		</div>
	</div>
</template>
<script>
	import {BoardService} from '../services/boards-service';
	import CreateBoardForm from "../components/CreateBoardForm";

	export default {
		components: {CreateBoardForm},
		data() {
			return {
				boards: []
			};
		},
		mounted() {
			this.getBoards();
		},
		methods: {
			getBoards() {
				BoardService.getBoards().then(boards => this.boards = boards);
			}
		}
	};
</script>
<style lang="scss" scoped>
	.boards {
		.boards-list {
			margin-top: 20px;
		}
		.board-item {
			display: inline-block;
			box-sizing: border-box;
			width: 31%;
			padding: 10px;
			text-align: center;
			border: 1px dashed #ccc;
			font-size: 22px;
		}
	}
</style>