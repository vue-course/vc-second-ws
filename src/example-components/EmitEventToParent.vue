<template>
	<div class="child-component">
		<p>I'm the child component</p>
		My this.text = <input type="text" v-model="text">
		<button @click="emitEvent">Send this.text to parent!</button>
	</div>
</template>

<script>
	export default {
		name: 'EmitEventToParent',
		data() {
			return {text: 'text'};
		},
		methods: {
			emitEvent() {
				this.$emit('my-event', this.text);
			}
		}
	}
</script>
<style lang="scss" scoped>
	.child-component {
		margin: 20px;
		border: 1px solid #ccc;
		padding: 5px;
	}
</style>