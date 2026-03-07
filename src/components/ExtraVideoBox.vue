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
								<span class="font-bold text-indigo-600 block mb-1">Human Instruction {{ idx + 1 }}:</span> 
								{{ inst }}
							</div>
						</div>
					</div>
				</div>

				<!-- Right Column: Video -->
				<div class="lg:col-span-7 flex flex-col justify-center">
					<div class="relative w-full rounded-2xl overflow-hidden shadow-inner bg-black">
						<video v-if="isVisible" class="w-full h-auto block" preload="metadata" playsinline controls>
							<source :src="item.videoName" type="video/mp4">
						</video>
					</div>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue'

defineProps({
	item: Object
})

const rootRef = ref(null)
const isVisible = ref(false)

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