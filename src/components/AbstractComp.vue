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
      <div class="flex flex-col gap-4 p-6 md:p-8 lg:p-10 bg-gradient-to-br from-slate-50 to-white rounded-3xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <p class="abstract-text text-base md:text-lg leading-relaxed text-slate-700 text-justify" v-html="mainInfo.abstract"></p>
        <div class="w-full relative mt-2 rounded-xl overflow-hidden bg-white/50 p-2">
          <img :src="mainInfo.mainImg" class="w-full h-auto object-contain rounded-lg drop-shadow-sm" alt="Framework Architecture" />
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
  font-weight: bolder;
}
</style>
