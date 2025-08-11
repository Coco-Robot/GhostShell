<template>
	<div class="container m-auto">
		<!-- //主要内容和图片路径已存在maininfo.json，可直接修改json文件 -->
		<AuthorInfo />
		<AbstractComp />


		<!-- video相关commond和videourl，每个video都是单独json， 代码部分与public/code/video[index]的txt文件一一对应 -->
		<CodeBox :index="1" :json="json1" /> 
		<CodeBox :index="2" :json="json2" />
		<CodeBox :index="3" :json="json3" />
		<CodeBox :index="4" :json="json4" />


		<!-- mainInfo.json -->
		<CitationComp />
	</div>
</template>

<script setup>
import AuthorInfo from './components/AuthorInfo.vue'
import AbstractComp from './components/AbstractComp.vue'
import CodeBox from './components/CodeBox.vue'
import CitationComp from './components/CitationComp.vue'
import json1 from './json/videoData1.json'
import json2 from './json/videoData2.json'
import json3 from './json/videoData3.json'
import json4 from './json/videoData4.json'
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
