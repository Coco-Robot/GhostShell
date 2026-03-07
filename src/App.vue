<template>
	<div class="container m-auto">
		<!-- //主要内容和图片路径已存在maininfo.json，可直接修改json文件 -->
		<AuthorInfo />
		<AbstractComp />

		<!-- Selected Real-World Demonstrations (Move from AbstractComp here) -->
		<div class="mt-20 mb-8 text-left break-all">
			<h3 class="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
				<span class="w-1.5 h-6 bg-indigo-500 rounded-full inline-block"></span>
				Selected Real-World Demonstrations
			</h3>
			<div class="mt-4 px-4 border-l-2 border-slate-200">
				<p class="text-base text-slate-600 leading-relaxed">{{ mainInfo.ExperimentText1 }}</p>
				<p class="mt-2 text-base text-slate-600 leading-relaxed">{{ mainInfo.ExperimentText2 }}</p>
			</div>
		</div>

		<!-- video相关commond和videourl，每个video都是单独json， 代码部分与public/code/video[index]的txt文件一一对应 -->
		<CodeBox :index="1" :json="json1" /> 
		<CodeBox :index="2" :json="json2" />
		<CodeBox :index="3" :json="json3" />
		<CodeBox :index="4" :json="json4" />

		<!-- Extra Bloopers / Testing Videos -->
		<div class="mt-20 mb-8 text-left break-all">
			<h3 class="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
				<span class="w-1.5 h-6 bg-rose-500 rounded-full inline-block"></span>
				Behind the Scenes: Informal Experiments & Outtakes
			</h3>
			<p class="mt-4 px-4 border-l-2 border-slate-200 text-base text-slate-600 leading-relaxed">
				Below are some unscripted informal experiments, bloopers, and prompt-engineering sequences recorded during our development process. For formal experimental designs and quantitative results, please refer to our paper.
			</p>
		</div>

		<ExtraVideoBox v-for="item in extraVideos" :key="item.id" :item="item" />

		<!-- mainInfo.json -->
		<!-- <CitationComp /> -->
	</div>
</template>

<script setup>
import AuthorInfo from './components/AuthorInfo.vue'
import AbstractComp from './components/AbstractComp.vue'
import CodeBox from './components/CodeBox.vue'
import ExtraVideoBox from './components/ExtraVideoBox.vue'
// import CitationComp from './components/CitationComp.vue'
import mainInfo from './json/mainInfo.json'
import json1 from './json/videoData1.json'
import json2 from './json/videoData2.json'
import json3 from './json/videoData3.json'
import json4 from './json/videoData4.json'
import extraVideos from './json/extraVideos.json'
</script>

<style scoped>
.container {
	width: 96%;
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #212529;
}
@media (min-width: 576px) {
	.container {
		max-width: 540px;
	}
}
@media (min-width: 768px) {
	.container {
		
		max-width: 720px;
	}
}
@media (min-width: 992px) {
	.container {
		max-width: 960px;
	}
}
</style>
