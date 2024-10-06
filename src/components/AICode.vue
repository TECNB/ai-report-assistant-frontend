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
        <pre class="code-block fixed-size rounded-l-2xl p-6 bg-write">
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
import chatWeather from "../constant/chatWeather.ts";
import {ElScrollbar} from 'element-plus';
const props = defineProps({
  ifShow: Boolean,
});
const emit = defineEmits();
const highlightedCode = ref('');

const toggleVisibility = () => {
  emit('updateIfShow', false);
};

onMounted(async () => {
  try {
    // 加载高亮器并确认是否支持 SQL
    const highlighter = await getHighlighter({
      themes: ['nord'], // 使用 Nord 主题
      langs: ['sql'],   // 确认 SQL 支持
    });
    // 使用高亮器进行基础高亮
    let highlightedHtml = highlighter.codeToHtml(chatWeather, { lang: 'sql', theme: 'nord' });

    // 处理行号的生成与显示
    const lines = highlightedHtml.split('\n');
    const numberedHtml = lines.map((line, index) => {
      return `<span class="line-number text-gray-400">${index + 1}</span> ${line}`;
    }).join('\n');

    // 将高亮和带行号的代码嵌入到页面
    highlightedCode.value = `<pre>${numberedHtml}</pre>`;

  } catch (error) {
    // 捕获错误并显示日志
    console.error('高亮失败:', error);
    highlightedCode.value = `<pre>代码高亮失败，请检查配置。</pre>`;
  }
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
/* 例如，您可以自定义行号的颜色 */
.line-number {
  color: #4B5563; /* 颜色改为更深的灰色 */
}

/* 例如，您可以自定义关键字的颜色 */
.text-blue-600 {
  color: #1E3A8A; /* 深蓝色 */
}

</style>
