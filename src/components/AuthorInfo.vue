<template>
  <div>
    <div class="title text-center mt-6 mb-6">
      <p class="text-base font-semibold text-rose-600 mb-4 tracking-wider uppercase">Under Review for IROS 2026</p>
      <h1 class="text-3xl md:text-4xl font-bold text-slate-800 px-4 leading-tight tracking-tight">
        {{ mainInfo.title }}
      </h1>
    </div>
    <!-- <ul class="author-box mt-8">
      <li v-for="item in mainInfo.authorList" :key="item">
        <a v-if="item.url.trim() !== ''" :href="item.url">{{ item.name }}</a>
        <span v-else>{{ item.name }}</span>
      </li>
    </ul> -->
    <!-- <div class="w-2/5 mx-auto px-4 my-4">
      <ul class="link-box grid grid-cols-1 sm:grid-cols-2 gap-8">
        <li v-for="item in mainInfo.linkList" :key="item.name">
          <a :href="item.url">
            <div><img :src="item.img" height="60px" /></div>
            <h4>
              <strong>{{ item.name }}</strong>
            </h4>
          </a>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script setup>
import mainInfo from "./../json/mainInfo.json";
</script>
<style>
.author-box {
  max-width: 680px;
  margin: 0 auto;
}
.author-box li {
  display: inline-block;
  margin: 0 10px 0 10px;
  font-size: 15px;
  line-height: 25px;
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
