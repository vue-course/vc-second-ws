<template>
	<div>
		<h1>Vue abilities examples</h1>
		<div class="examples">
			<TwoWayBinding/>
			<ForLoop />
			<BindToComponent some-prop="this is a text inside HTML" />
			<BindToComponent :some-prop="x" /><!-- if you try to bind "a" prop, you will get a type warning.. -->
			<BindToEvent />
			<ParentExample />
		</div>
	</div>
</template>

<script>

	import TwoWayBinding from "./TwoWayBinding";
	import ForLoop from "./ForLoop";
	import BindToComponent from "./BindToComponent";
	import ParentExample from "./ParentExample";
	import BindToEvent from "./BindToEvent";

	export default {
		name: 'ExampleComponents',
		components: {BindToEvent, ParentExample, BindToComponent, ForLoop, TwoWayBinding},
		data() {
			return {
				x: 'some text',
				y: 'another text',
				a: 5 // some number
			};
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

	h1 {
		text-align: center;
	}
	.examples {
		border: 1px solid #ccc;
		padding: 10px;
		font-family: arial, sans-serif;

		> * {
			vertical-align: top;
			display: inline-block;
			box-sizing: border-box;
			width: 49%;
			height: 300px;
			margin: 0.5%;
			padding: 5px;
			text-align: center;
			border: 1px dashed #ccc;
			font-size: 18px;
			overflow: hidden;
		}

		h2 {
			color: #fe885f;
			padding: 5px;
			font-size: 20px;
		}
	}
</style>