<template>
	<div>
		<h2>Emit Event to Parent Component</h2>
		<p>I'm the parent component.<br>My this.x = "{{x}}"</p>
		<EmitEventToParent @my-event="changeX"/>
	</div>
</template>

<script>
	import EmitEventToParent from "./EmitEventToParent";

	export default {
		name: 'ParentExample',
		components: {EmitEventToParent},
		data() {
			return {x: 'current x text'}
		},
		methods: {
			changeX(x) {
				this.x = x;
			}
		}
	}
</script>