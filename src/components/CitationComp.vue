<template>
	<div class="mt-4">
		<div class="mt-8 text-left">
			<h3 class="text-2xl leading-20 mb-2">Citation</h3>
			<a :href="mainInfo.paperUrl">[arxiv version]</a> 
			<div class="w-full p-2">
				<div class="leading-6 w-full text-sm" v-html="mainInfo.citationContent">
					
					
				</div>
			</div>
		</div>
		<div class="mt-8 text-left">
			<h3 class="text-2xl leading-20">Acknowledgements</h3>
			<div class="my-2 leading-6">
				{{ mainInfo.acknowledgementsContent }}
			</div>
		</div>
	</div>
</template>

<script setup>
import mainInfo from './../json/mainInfo.json'
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
