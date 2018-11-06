<template>
	<div>
		<h3 class="inline-stage" v-if="showViewMode" @dblclick="currentViewModeState = false">{{stage.name}}</h3>
		<form v-else class="stage-form" @submit.prevent="save">
			<input type="text" v-model="stage.name">
			<button type="submit">Save</button>
		</form>
	</div>
</template>

<script>
	export default {
		name: 'StageEditor',
		props: {
			stage: Object,
			viewMode: Boolean,
		},
		data() {
			return {currentViewModeState: true};
		},
		computed: {
			showViewMode() {
				return this.viewMode && this.currentViewModeState;
			}
		},
		methods: {
			save() {
				if (this.viewMode) {
					this.currentViewModeState = true;
				}
				this.$emit('update', this.stage);
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.inline-stage {
		font-size: 20px;
	}

	.stage-form {
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