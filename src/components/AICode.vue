<template>
  <div class="AICode" v-if="props.ifShow">
    <div class="flex justify-between items-center border-b border-gray-200 pb-2">
      <p class="text-3xl font-bold text-blue-600">AI取数过程</p>
      <div class="cursor-pointer" @click="toggleVisibility">
        <el-icon size="20">

        </el-icon>
      </div>
    </div>

    <!-- 添加描述性文字 -->
    <p class="text-lg font-semibold text-gray-600 my-4">
      2023年累计温室气体排放情况：
    </p>

    <!-- 使用 el-scrollbar 组件来显示带行号的高亮代码 -->
    <div class="code-container">
      <el-scrollbar height="100%" wrap-style="width:100%;" class="scrollbar-container">
        <pre class="code-block fixed-size rounded-l-2xl p-6 bg-gray-50">
          <code v-html="highlightedCode"></code>
        </pre>
      </el-scrollbar>
    </div>

    <!-- 分割线 -->
    <hr class="my-4 border-gray-300"/>
    <!-- "确定"按钮固定在右下角 -->
    <div class="btn-container">
      <button class="btn-confirm" @click="toggleVisibility">确定</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {getHighlighter} from 'shiki';
import chatExample from '../constant/chatExample.ts'; // 请替换为chatExample.ts的实际路径
import {ElScrollbar} from 'element-plus'; // 导入 Element Plus 的 el-scrollbar 组件

const props = defineProps({
  ifShow: Boolean,
});
const emit = defineEmits();
const highlightedCode = ref('');

const toggleVisibility = () => {
  emit('updateIfShow', false);
};

onMounted(async () => {
  const highlighter = await getHighlighter({
    themes: ['nord'], // 使用 Nord 主题
    langs: ['json'], // 使用 json 作为语言来高亮
  });

  const codeExample = JSON.stringify(chatExample, null, 2); // 格式化 JSON
  const highlightedHtml = highlighter.codeToHtml(codeExample, {lang: 'json', theme: 'nord'});

  const lines = highlightedHtml.split('\n').map(line => line.replace(/\\n/g, '<br/>'));
  const numberedHtml = lines
      .filter(line => line.trim() !== '')
      .map((line, index) => {
        return `<span class="line-number text-gray-400">${index + 1}</span> ${line
            .replace(/"(.*?)":/g, '<span class="text-purple-700 font-bold text-lg">"$1"</span>:')
            .replace(/:\s*"([^"]*)"/g, function (p1) {
              const highlightedString = p1.replace(/([0-9.]+)/g, '<span class="text-purple-600 font-semibold">$1</span>');
              return `: "<span class="text-green-600 font-semibold">${highlightedString}</span>"`;
            })
            .replace(/:\s*([0-9.]+)/g, ': <span class="text-green-600 font-semibold">$1</span>')
            .replace(/:\s*(true|false|null)/g, ': <span class="text-red-600 font-semibold">$1</span>')}`;
      })
      .join('\n');

  highlightedCode.value = `<pre>${numberedHtml}</pre>`;
});
</script>

<style scoped>
.AICode {
  width: 60%;
  height: 80%;
  position: fixed;
  z-index: 99999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 1rem;
  padding: 1.25rem;
  text-align: left;
  overflow: hidden;
}

.code-container {
  width: 90%;
  height: 72%;
  margin: 0 auto;
  overflow: hidden;
}

.scrollbar-container {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.fixed-size {
  width: 100%;
  min-height: 100%;
  overflow: hidden;
}

.code-block {
  padding-left: 2rem;
  white-space: pre-wrap;
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.line-number {
  display: inline-block;
  width: 2rem;
  text-align: right;
  margin-right: 0.5rem;
  color: #3b82f6;
  font-weight: bold;
  user-select: none;
}

.btn-container {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
}

.btn-confirm {
  background-color: #3b82f6;
  color: white;
  font-size: 1.125rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-confirm:hover {
  background-color: #2563eb;
}
</style>
