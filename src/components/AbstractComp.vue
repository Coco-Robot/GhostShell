<template>
  <div class="mt-6">
    <div class="text-left">
      
      <div class="my-8 relative w-full rounded-2xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border border-gray-100/50 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-shadow duration-500 bg-black/5">
        <video 
          class="w-full h-auto block" 
          autoplay 
          loop 
          muted 
          playsinline 
          controls>
          <source :src="mainInfo.mainVideo" type="video/mp4" />
        </video>
      </div>

      <!-- Abstract & Framework combined block -->
      <div class="flex flex-col gap-4 p-6 md:p-8 lg:p-10 mb-12 bg-gradient-to-br from-slate-50 to-white rounded-3xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <p class="abstract-text text-base md:text-lg leading-relaxed text-slate-700 text-justify" v-html="mainInfo.abstract"></p>
        <div class="w-full relative mt-2 rounded-xl overflow-hidden bg-white/50 p-2">
          <img :src="mainInfo.mainImg" class="w-full h-auto object-contain rounded-lg drop-shadow-sm" alt="Framework Architecture" />
        </div>
      </div>

      <div class="mt-16 mb-8 text-left break-all">
        <h3 class="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
          <span class="w-1.5 h-6 bg-indigo-500 rounded-full inline-block"></span>
          Selected Real-World Demonstrations
        </h3>
        <div class="mt-4 px-4 border-l-2 border-slate-200">
          <p class="text-base text-slate-600 leading-relaxed">{{ mainInfo.ExperimentText1 }}</p>
          <p class="mt-2 text-base text-slate-600 leading-relaxed">{{ mainInfo.ExperimentText2 }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import mainInfo from "./../json/mainInfo.json";
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.abstract-text {
  text-align: justify;
}
.abstract-text strong {
  font-weight: bolder;
}
</style>
