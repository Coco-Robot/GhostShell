<template>
	<div>
		<div class="title text-center mt-10">
			<p class="my-2 leading-12" style="font-weight: bolder; font-size: 2.6rem;">{{ mainInfo.title }}</p>
		</div>
		<ul class="author-box mt-8">
			<li v-for="item in mainInfo.authorList" :key="item">
				<a v-if="item.url.trim()!== ''" :href="item.url">{{ item.name }}</a>
				<span v-else>{{ item.name }}</span>
			</li>
		</ul>
		<div class="w-2/5 mx-auto px-4 my-4">
			<!--todo 此处数量变动需要再改样式 -->
			<ul class="link-box grid grid-cols-1 sm:grid-cols-2 gap-8">
				<li v-for="item in mainInfo.linkList" :key="item.name">
					<a :href="item.url">
						<div><img :src="item.img" height="60px"></div>
						<h4><strong>{{ item.name }}</strong></h4>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
import mainInfo from './../json/mainInfo.json'
</script>
<style>
.author-box li {
	display: inline-block;
	margin: 0 12px 6px;
}

.container a {
	color: #1772d0;
	text-decoration: none;
}

.link-box li div {
	width: 45px;
	height: 60px;
	display: table-cell;
	vertical-align: middle;
	text-align: center;
}
</style>
