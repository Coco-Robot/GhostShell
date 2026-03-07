<template>
	<div ref="rootRef" class="mb-12 bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden transition-all duration-1000 transform" :class="isVisible ? 'opacity-100 translate-y-0 hover:shadow-md' : 'opacity-0 translate-y-12'">
		<!-- Header -->
		<div class="px-6 py-5 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
			<h5 class="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
				<span class="w-1.5 h-6 bg-rose-500 rounded-full inline-block"></span>
				{{ item.title }}
			</h5>
		</div>
		
		<div class="p-6 md:p-8">
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
				
				<!-- Left Column: Context / Instructions -->
				<div class="lg:col-span-5 flex flex-col">
					<p class="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Instructions</p>
					
					<div class="flex-1 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 p-4">
						<div class="custom-scrollbar h-full max-h-[360px] overflow-y-auto pr-2 flex flex-col gap-4">
							<div v-for="(inst, idx) in item.instructions" :key="idx" 
								class="relative bg-white p-4 rounded-xl shadow-sm border border-slate-200/60 text-sm text-slate-700 leading-relaxed text-justify">
								<span class="font-bold text-indigo-600 block mb-1">Instruction {{ idx + 1 }}:</span> 
								{{ inst }}
							</div>
						</div>
					</div>
				</div>

				<!-- Right Column: Video -->
				<div class="lg:col-span-7 flex flex-col justify-center gap-4">
					
					<!-- Model Tabs (Only show if there are multiple models) -->
					<div v-if="videoList.length > 1" class="flex flex-wrap gap-3 mb-2">
						<button 
							v-for="(vid, idx) in videoList" :key="idx"
							@click="switchModel(idx)"
							:class="[
								'px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 border flex items-center gap-2',
								activeVideoIndex === idx 
									? 'bg-rose-50 border-rose-200 text-rose-700 shadow-sm transform scale-[1.02]' 
									: 'bg-white border-slate-200/80 text-slate-500 hover:bg-slate-50 hover:text-slate-700 hover:border-slate-300'
							]"
						>
							<div class="w-1.5 h-1.5 rounded-full" :class="activeVideoIndex === idx ? 'bg-rose-500' : 'bg-slate-300'"></div>
							{{ vid.model }}
						</button>
					</div>

					<div class="relative w-full rounded-2xl overflow-hidden shadow-lg bg-[#0f111a] border border-slate-200 group flex items-center justify-center relative">
						<!-- Subtle background pattern for video container -->
						<div class="absolute inset-0 z-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
						
						<!-- Video locked to a consistent 16:9 box, letterboxing applied automatically by object-contain -->
						<div class="relative z-10 w-full aspect-video">
							<video v-if="isVisible" ref="videoPlayer" class="absolute inset-0 w-full h-full object-contain transform group-hover:scale-[1.01] transition-transform duration-700" preload="metadata" playsinline controls>
								<source :src="currentVideoUrl" type="video/mp4">
							</video>
						</div>
					</div>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, defineProps, computed, nextTick } from 'vue'

const props = defineProps({
	item: Object
})

const rootRef = ref(null)
const isVisible = ref(false)
const videoPlayer = ref(null)

// Normalize video source(s)
const videoList = computed(() => {
	if (props.item.videos && Array.isArray(props.item.videos)) {
		return props.item.videos;
	}
	return [{ model: 'Default', url: props.item.videoName }];
})

const activeVideoIndex = ref(0)
const currentVideoUrl = computed(() => videoList.value[activeVideoIndex.value]?.url)

const switchModel = async (index) => {
	if (activeVideoIndex.value === index) return;
	activeVideoIndex.value = index;
	await nextTick();
	if (videoPlayer.value) {
		videoPlayer.value.load();
		videoPlayer.value.play().catch(e => console.log('Auto-play prevented:', e));
	}
}

onMounted(() => {
	const observer = new IntersectionObserver((entries) => {
		if (entries[0].isIntersecting) {
			isVisible.value = true;
			observer.disconnect();
		}
	}, { rootMargin: '200px' })
	
	if (rootRef.value) {
		observer.observe(rootRef.value)
	}
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
	width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
	background: transparent; 
}
.custom-scrollbar::-webkit-scrollbar-thumb {
	background: #cbd5e1; 
	border-radius: 8px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
	background: #94a3b8; 
}
</style>