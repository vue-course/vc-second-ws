<template>
	<div>
		<h2>For Loop</h2>
		<ul>
			<li v-for="item in items" :key="item.id">{{item.name}}</li>
		</ul>
	</div>
</template>

<script>

	export default {
		name: 'ForLoop',
		components: {},
		data() {
			return {
				items: [
					{id: Math.random(), name: 'David'},
					{id: Math.random(), name: 'Sefi'},
					{id: Math.random(), name: 'Hagai'},
					{id: Math.random(), name: 'Shavit'},
					{id: Math.random(), name: 'Liron'},
					{id: Math.random(), name: 'Gadi'},
				]
			};
		}
	}
</script>
<style scoped lang="scss">
 li {
	 text-align: left;
 }
</style>