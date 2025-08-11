import { createApp } from 'vue'
import App from './App.vue'
import 'highlight.js/styles/stackoverflow-light.css'
import hljs from "highlight.js/lib/core";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import xml from "highlight.js/lib/languages/xml";
hljs.registerLanguage("xml", xml);

import './reset.css'
createApp(App).use(hljsVuePlugin).mount('#app')
