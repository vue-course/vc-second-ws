<template>
	<div>
		<h2>Two Way Binding</h2>
		<input v-model="text" placeholder="write anything.."><br>
		<p v-if="text">Did you wrote "<span>{{text}}</span>"??</p>
		<p v-else>Try me!</p>
	</div>
</template>

<script>

	export default {
		name: 'TwoWayBinding',
		components: {},
		data() {
			return {text: ''};
		}
	}
</script>
<style scoped lang="scss">
	input {
		padding: 5px 10px;
		font-size: 18px;
	}
	span {
		color: red;
	}
</style>