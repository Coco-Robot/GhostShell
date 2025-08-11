<template>
	<div class="mt-4">
		<div class="mt-4 text-left">
			<h1 class="text-2xl leading-20">Abstract</h1>
			<p class="abstract-text text-sm leading-6" v-html="mainInfo.abstract"></p>
			<p class="mt-4 text-center">
				<img :src="mainInfo.mainImg" width="100%">
			</p>
			<div class="mt-8 text-left break-all">
				<h3 class="text-2xl leading-20">Experiment Videos and Generated Code</h3>
				<p class="mt-2 text-sm leading-6">{{ mainInfo.ExperimentText1 }}</p>
				<p class="mt-2 text-sm leading-6">{{ mainInfo.ExperimentText2 }}</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import mainInfo from './../json/mainInfo.json'
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.abstract-text strong{
	font-weight: bolder;
}
</style>
