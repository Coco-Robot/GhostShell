<template>
	<div ref="rootRef" class="mb-12 bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden transition-all duration-1000 transform" :class="isVisible ? 'opacity-100 translate-y-0 hover:shadow-md' : 'opacity-0 translate-y-12'">
		<!-- Header -->
		<div class="px-6 py-5 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
			<h5 class="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
				<span class="w-1.5 h-6 bg-indigo-500 rounded-full inline-block"></span>
				{{ json.name }}
			</h5>
		</div>
		
		<div class="p-6 md:p-8">
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
				
				<!-- Left Column: Video & Select -->
				<div class="lg:col-span-7 flex flex-col gap-6">
					
					<!-- Video Player -->
					<div class="relative w-full rounded-2xl overflow-hidden shadow-inner bg-black">
						<video v-if="isVisible" ref="videoPlayer" class="w-full h-auto block" preload="metadata" playsinline controls>
							<source :src="json.videoName" type="video/mp4">
						</video>
					</div>
					
					<!-- Command Selection -->
					<div class="flex flex-col">
						<p class="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Choose a command</p>
						<div class="custom-scrollbar flex-1 max-h-[160px] overflow-y-auto pr-2 flex flex-col gap-2">
							<button 
								v-for="option in json.options" :key="option.key"
								@click="handleSelectChange(option.key)" 
								:title="option.name"
								:class="[
									'text-left w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 border',
									activeIndex === option.key 
										? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm font-medium' 
										: 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
								]"
							>
								{{ option.name }}
							</button>
						</div>
					</div>
				</div>

				<!-- Right Column: Code Display -->
				<div class="lg:col-span-5 flex flex-col">
					<div class="flex-1 rounded-2xl overflow-hidden bg-[#1e1e2e] shadow-inner flex flex-col border border-slate-800">
						<!-- Mac-like Header for Code Block -->
						<div class="flex items-center px-4 py-3 bg-[#181825] border-b border-white/10">
							<div class="flex space-x-2">
								<div class="w-3 h-3 rounded-full bg-red-500/80"></div>
								<div class="w-3 h-3 rounded-full bg-yellow-500/80"></div>
								<div class="w-3 h-3 rounded-full bg-green-500/80"></div>
							</div>
							<div class="ml-4 text-xs text-slate-400 font-mono">XML Function Token</div>
						</div>
						
						<!-- Code Content -->
						<div class="p-4 overflow-y-auto max-h-[400px] custom-scrollbar-dark text-sm text-slate-300 text-left">
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
