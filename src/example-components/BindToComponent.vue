<template>
	<div>
		<h2>Bind to Component</h2>
		<p>Bound Value: {{someProp || 'None'}}</p>
	</div>
</template>

<script>
	export default {
		name: 'BindToComponent',
		components: {},
		props: {
			someProp: String,
		}
	}
</script>