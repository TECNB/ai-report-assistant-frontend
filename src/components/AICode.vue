<template>
    <div class="AICode" v-if="props.ifShow">
        <div class="flex justify-between items-center border-b -mx-5 px-5 pb-2">
            <p class="text-3xl font-bold text-blue-600">AI取数过程</p>
            <div class="Close" @click="toggleVisibility">
                <el-icon size="20" class="cursor-pointer">
                    <Close />
                </el-icon>
            </div>
        </div>
        <!-- 使用 el-scrollbar 组件来显示带行号的高亮代码 -->
        <div class="code-container">
            <el-scrollbar height="100%" wrap-style="width:100%;" class="scrollbar-container">
                <pre class="code-block fixed-size rounded-lg p-6 bg-gray-800">
          <code v-html="highlightedCode"></code>
        </pre>
            </el-scrollbar>
        </div>
        <!-- "确定"按钮固定在右下角 -->
        <div class="btn-container">
            <button class="btn-confirm" @click="toggleVisibility">确定</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getHighlighter } from 'shiki';
import chatExample from '../constant/chatExample.ts'; // 请替换为chatExample.ts的实际路径
import { ElScrollbar } from 'element-plus'; // 导入 Element Plus 的 el-scrollbar 组件

const props = defineProps({
    ifShow: Boolean,
});
const emit = defineEmits();
const highlightedCode = ref('');

const toggleVisibility = () => {
    emit('updateIfShow', false);
};

onMounted(async () => {
    // 初始化 Shiki 高亮器
    const highlighter = await getHighlighter({
        themes: ['nord'], // 使用 Nord 主题
        langs: ['json'], // 使用 json 作为语言来高亮
    });

    // 将 chatExample 对象转换为格式化的 JSON 字符串
    const codeExample = JSON.stringify(chatExample, null, 2); // 格式化 JSON

    // 使用 Shiki 的 codeToHtml 方法高亮 JSON 字符串并添加行号
    const highlightedHtml = highlighter.codeToHtml(codeExample, { lang: 'json', theme: 'nord' });

    // 处理 \n 符号并分割每行，添加行号和自定义颜色
    const lines = highlightedHtml.split('\n').map(line => line.replace(/\\n/g, '<br/>')); // 将 \n 转换为 <br/>
    const numberedHtml = lines
        .map((line, index) => {
            // 为每行添加行号
            return `<span class="line-number text-gray-400">${index + 1}</span> ${line
                .replace(/"(.*?)":/g, '<span class="text-purple-700 font-bold text-lg">"$1"</span>:') // 为JSON属性名称添加颜色
                .replace(/:\s*"([^"]*)"/g, function (match, p1) {
                    // 为JSON中的字符串值添加颜色，同时匹配和高亮字符串中的数字
                    const highlightedString = p1.replace(/([0-9.]+)/g, '<span class="text-purple-600 font-semibold">$1</span>');
                    return `: "<span class="text-green-600 font-semibold">${highlightedString}</span>"`;
                })
                .replace(/:\s*([0-9.]+)/g, ': <span class="text-green-600 font-semibold">$1</span>') // 为数字值添加颜色
                .replace(/:\s*(true|false|null)/g, ': <span class="text-red-600 font-semibold">$1</span>')}`; // 为布尔值和null添加颜色
        })
        .join('\n');

    // 更新带有行号的代码
    highlightedCode.value = `<pre>${numberedHtml}</pre>`;
});
</script>

<style scoped>
.AICode {
    @apply w-3/5 h-4/5 absolute z-[99999] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl text-left p-5 overflow-hidden;
}

.code-container {
    width: 90%;
    height: 85%;
    margin: 0 auto;
    overflow: hidden;
    /* 防止代码框超出 */
}

.scrollbar-container {
    width: 100%;
    height: 100%;
    overflow: auto;
    /* 启用水平和垂直滚动 */
}

.fixed-size {
    width: 100%;
    /* 固定代码块的宽度 */
    min-height: 100%;
    /* 确保最小高度不小于容器 */
    overflow: hidden;
    /* 防止代码内容超出代码块 */
}

.code-block {
    @apply pl-8 whitespace-pre-wrap text-xl leading-relaxed;
}

.line-number {
    @apply inline-block w-8 text-right mr-2 text-blue-500 font-bold select-none;
}

.btn-container {
    @apply fixed bottom-4 right-4;
}

.btn-confirm {
    @apply bg-blue-500 text-white text-lg font-bold py-2 px-4 rounded hover:bg-blue-600 cursor-pointer transition duration-300;
}
</style>
