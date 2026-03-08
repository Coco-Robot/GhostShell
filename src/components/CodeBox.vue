<template>
	<div ref="rootRef" class="mb-12 bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden transition-all duration-1000 transform" :class="isVisible ? 'opacity-100 translate-y-0 hover:shadow-md' : 'opacity-0 translate-y-12'">
		<!-- Header -->
		<div class="px-3 py-3 md:px-6 md:py-5 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
			<h5 class="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
				<span class="w-1.5 h-6 bg-indigo-500 rounded-full inline-block"></span>
				{{ json.name }}
			</h5>
		</div>
		
		<div class="p-3 md:p-6 lg:p-8">
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-stretch lg:h-[640px]">
				
				<!-- Left Column: Command Selection -->
				<div class="lg:col-span-5 flex flex-col h-full min-h-0">
					<p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2 shrink-0">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path></svg>
						Choose a command
					</p>
					
					<div class="flex-1 rounded-2xl overflow-hidden bg-slate-50/80 border border-slate-100 p-2 shadow-inner flex flex-col min-h-0">
						<div class="custom-scrollbar overflow-y-auto p-2 flex flex-col gap-3 h-full">
							<button 
								v-for="option in json.options" :key="option.key"
								@click="handleSelectChange(option.key)" 
								:title="option.name"
								:class="[
									'text-left w-full px-5 py-3.5 rounded-xl text-sm transition-all duration-300 border relative overflow-visible shadow-sm shrink-0',
									activeIndex === option.key 
										? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-md font-semibold z-10 scale-[1.02]' 
										: 'bg-white border-slate-200/60 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transform scale-100'
								]"
							>
								<!-- active indicator glow -->
								<div v-if="activeIndex === option.key" class="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-500 rounded-l-xl"></div>
								<span class="block pr-2 leading-relaxed">{{ option.name }}</span>
							</button>
						</div>
					</div>
				</div>

				<!-- Right Column: Video (Top) & Code Display (Bottom) -->
				<div class="lg:col-span-7 flex flex-col gap-6 h-full min-h-0">
					
					<!-- Video Player -->
					<div class="relative w-full rounded-2xl overflow-hidden shadow-lg bg-[#0f111a] border border-slate-200 group flex items-center justify-center shrink-0 max-h-[340px]">
						<div class="absolute inset-0 z-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
						<div class="relative z-10 w-full flex items-center justify-center h-full">
							<video v-if="isVisible" ref="videoPlayer" class="w-full h-full max-h-[340px] block object-contain transform group-hover:scale-[1.01] transition-transform duration-700 mx-auto" preload="metadata" playsinline controls>
								<source :src="json.videoName" type="video/mp4">
							</video>
						</div>
					</div>

					<!-- Code Display -->
					<div class="flex-1 rounded-2xl overflow-hidden bg-[#0f111a] shadow-inner flex flex-col border border-slate-700/50 relative min-h-0">

						<!-- Subtle gradient on background -->
						<div class="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

						<!-- Mac-like Header for Code Block -->
						<div class="flex items-center justify-between px-5 py-3.5 bg-[#1a1d27] border-b border-white/5 relative z-10 shrink-0">
							<div class="flex space-x-2">
								<div class="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
								<div class="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>
								<div class="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></div>
							</div>
							<div class="text-[11px] text-slate-400 font-mono font-medium tracking-wider uppercase opacity-80">XML Function Token</div>
						</div>

						<!-- Code Content -->
						<div class="flex-1 p-5 overflow-y-auto custom-scrollbar-dark text-[13px] text-slate-300 text-left relative z-10 min-h-0">
							<highlightjs class="code-container font-mono" language="xml" :code="code"></highlightjs>
						</div>
					</div>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, defineProps, onMounted, nextTick } from 'vue'

const rootRef = ref(null)
const isVisible = ref(false)
const videoPlayer = ref(null)
const activeIndex = ref(1)
const code = ref('')
const props = defineProps({
	json: Object,
	index: Number
})

onMounted(() => {
	getCode()

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

const getCode = () => {
	loadTxtFile(`./code/video${props.index}/${activeIndex.value}.txt`, function (data) {
		code.value = data
	});
}
const handleSelectChange = async (val) => {
	const timePoint = props.json.options[val - 1].time
	activeIndex.value = val
	await nextTick()
	if (videoPlayer.value) {
		videoPlayer.value.currentTime = timePoint
		videoPlayer.value.play()
	}
	getCode()
}
const loadTxtFile = (url, callback) => {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			callback(xhr.responseText);
		}
	};
	xhr.send();
}
</script>

<style>
/* Custom Scrollbar for Light Theme */
.custom-scrollbar::-webkit-scrollbar {
	width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
	background: #f1f5f9; 
	border-radius: 8px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
	background: #cbd5e1; 
	border-radius: 8px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
	background: #94a3b8; 
}

/* Custom Scrollbar for Dark Theme (Code Block) */
.custom-scrollbar-dark::-webkit-scrollbar {
	width: 6px;
}
.custom-scrollbar-dark::-webkit-scrollbar-track {
	background: #1e1e2e; 
}
.custom-scrollbar-dark::-webkit-scrollbar-thumb {
	background: #313244; 
	border-radius: 8px;
}
.custom-scrollbar-dark::-webkit-scrollbar-thumb:hover {
	background: #45475a; 
}

pre code.hljs {
	line-height: 1.6;
	font-size: 13px;
	background: transparent !important;
	padding: 0 !important;
}
.code-container {
	width: 100%;
    white-space: pre-wrap;
    word-wrap: break-word;
	text-align: left;
}
</style>
