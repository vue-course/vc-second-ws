<template>
	<form @submit.prevent="save">
		<input type="text" v-model="name">
		<button type="submit">Save</button>
	</form>
</template>

<script>

	export default {
		name: 'CreateBoardForm',
		data() {
			return {name: ''};
		},
		methods: {
			save() {
				return this.$boards
					.setBoard({name: this.name})
					.then((board) => this.$emit('update', board))
					.then(() => this.name = '');
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	form {
		* {
			vertical-align: middle;
		}
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