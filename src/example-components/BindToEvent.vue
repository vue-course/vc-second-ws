<template>
	<div>
		<h2>Bind to Event</h2>
		<p>Clicks Counter: <span>{{counter}}</span></p>
		<button @click="counter++">Click here</button>
	</div>
</template>

<script>
	export default {
		name: 'BindToEvent',
		data() {
			return {counter: 0};
		}
	}
</script>
<style scoped>
	span {
		color: red;
	}
</style>