import Vue from 'vue';

Vue.component('RichTextEditor', (resolve) => require(['components/common/richtext-editor'], resolve));
Vue.component('MarkdownEditor', (resolve) => require(['components/common/markdown-editor'], resolve));
Vue.component('CodeEditor', (resolve) => require(['components/common/code-editor'], resolve));
