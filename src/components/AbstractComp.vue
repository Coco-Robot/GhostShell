<template>
  <div class="mt-6">
    <div class="text-left">
      
      <div ref="videoRef" class="my-8 relative w-full rounded-2xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border border-gray-100/50 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-1000 transform bg-black/5 min-h-[200px] md:min-h-[400px]"
           :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'">
        <video 
          v-if="isVisible"
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
      <div class="flex flex-col gap-6 p-8 md:p-12 lg:p-14 bg-[#fdfdfc] rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-200/80 mt-10">
        <!-- Abstract Section -->
        <div class="space-y-4">
          <h2 class="text-2xl font-bold text-slate-800 border-b-2 border-slate-200 pb-2 inline-block">Abstract</h2>
          <p class="abstract-text text-base md:text-lg leading-relaxed text-slate-700 text-justify" v-html="mainInfo.abstract"></p>
        </div>
        
        <div class="w-full h-px bg-slate-200/60 my-2"></div>

        <!-- Architecture Section -->
        <div class="space-y-4">
          <h2 class="text-2xl font-bold text-slate-800 border-b-2 border-slate-200 pb-2 inline-block">Methodology</h2>
          <div class="w-full relative mt-4">
            <img :src="mainInfo.mainImg" class="w-full h-auto object-contain drop-shadow" alt="Framework Architecture" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import mainInfo from "./../json/mainInfo.json";

const videoRef = ref(null);
const isVisible = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      isVisible.value = true;
      observer.disconnect();
    }
  }, { rootMargin: '200px' });
  
  if (videoRef.value) {
    observer.observe(videoRef.value);
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.abstract-text {
  text-align: justify;
}
.abstract-text strong {
  font-weight: bold;
}
</style>
