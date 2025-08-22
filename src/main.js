import { createApp } from 'vue'
import App from './App.vue'
import 'highlight.js/styles/stackoverflow-light.css'
import hljs from "highlight.js/lib/core";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import xml from "highlight.js/lib/languages/xml";
hljs.registerLanguage("xml", xml);

import './reset.css'
createApp(App).use(hljsVuePlugin).mount('#app')

// 用 div 包裹 globe 统计 script，固定在右下角，保持 60px 大小并有间距
const globeWrapper = document.createElement('div');
globeWrapper.id = 'clustrmaps-globe-wrapper';
globeWrapper.style.width = '60px';
globeWrapper.style.height = '60px';
globeWrapper.style.overflow = 'hidden';
globeWrapper.style.display = 'inline-block';
globeWrapper.style.position = 'fixed';
globeWrapper.style.right = '20px';
globeWrapper.style.bottom = '20px';
globeWrapper.style.zIndex = '9999';

const script = document.createElement('script');
script.type = 'text/javascript';
script.id = 'clstr_globe';
script.src = '//clustrmaps.com/globe.js?d=qH364LmVdYtKpz7RWj-qzY2tybwIxSZ5rKj4wUsxGwg';

globeWrapper.appendChild(script);
document.body.appendChild(globeWrapper);

// 尝试设置 globe 内部元素大小
script.onload = function() {
	setTimeout(() => {
		// 兼容 clustrmaps 可能生成的 iframe 或 canvas
		const iframe = globeWrapper.querySelector('iframe[src*="clustrmaps"]');
		if (iframe) {
			iframe.style.width = '60px';
			iframe.style.height = '60px';
		}
		const canvas = globeWrapper.querySelector('canvas[id*="clustrmaps"]');
		if (canvas) {
			canvas.style.width = '60px';
			canvas.style.height = '60px';
		}
	}, 1000);
};