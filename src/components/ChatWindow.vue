<template>
    <el-scrollbar height="100%" wrap-style="width:100%;" class="flex justify-center -mx-5">
        <div id="chat-window" class="flex-1 px-24 py-10">
            <div v-for="(msg, index) in props.displayedMessages" :key="index" class="mb-4 flex items-start">

                <div v-if="msg.type === 'image'" class="w-full flex justify-end items-center rounded-lg ">
                    <img class="w-40 h-56 rounded-lg bg-gray-200 bg-opacity-50 p-2" :src="msg.content" />
                </div>
              <!-- PDF 展示框 -->
              <!-- PDF 文件预览框 -->
              <!-- PDF 文件预览框 -->
              <div v-if="msg.type === 'pdf'" class="w-full flex justify-end items-center rounded-lg">
                <!-- 判断是否已经点击并展开 -->
                <div v-if="isExpanded" class="relative w-full flex justify-end items-center">
                  <!-- 外部灰色透明框包裹 -->
                  <div class="relative w-[38rem] h-[38rem] bg-gray-300 bg-opacity-40 p-4 rounded-lg border border-gray-400">
                    <!-- 点击后展开的 PDF 展示框 -->
                    <iframe class="w-full h-full rounded-lg bg-white p-2" :src="msg.content" type="application/pdf">
                      您的浏览器不支持 PDF 文件显示，请下载查看。
                    </iframe>

                    <!-- 删除按钮，点击后恢复到初始状态 -->
                    <div @click="collapsePdf" class="absolute top-2 right-2 bg-white text-black border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors duration-300">
                      <i class="fa-solid fa-times text-xs"></i>
                    </div>
                  </div>
                </div>

                <!-- 初始状态：PDF 文件图标，点击展开 -->
                <div v-else @click="expandPdf" class="w-24 h-30 flex items-center justify-center rounded-lg bg-gray-200 bg-opacity-50 border cursor-pointer">
                  <!-- PDF 文件图标 -->
                  <div class="text-center">
                    <i class="fa-solid fa-file-pdf text-red-600 text-4xl"></i>
                    <p class="text-sm mt-1">2023中国生态环境状况公报-保留大气环境版.pdf</p>
                  </div>
                </div>
              </div>

                <div v-if="msg.type === 'user'" class="bg-gray-50 rounded-3xl px-5 py-2 ml-auto max-w-md">
                    <p class="">{{ msg.content }}</p>
                </div>
                <div v-if="msg.type === 'loading'" class="skeleton-loader w-full">
                    <div class="skeleton-line"></div>
                    <div class="skeleton-line"></div>
                    <div class="skeleton-line"></div>
                </div>
                <div v-if="msg.type === 'ai'" class="flex gap-3 items-start">
                    <img src="../assets/images/icon.png" alt="AI Avatar"
                        class="w-6 h-6 rounded-full border border-gray-300 object-cover" />
                    <div class="flex flex-col">
                        <!-- Static Title -->
                        <div class="flex items-center">
                            <p class="font-bold mb-0.5">生态环境报表助手</p>
                        </div>
                        <!-- Dynamic Content -->
                        <div class="flex items-start">
                            <p class="">{{ msg.content }}</p>
                        </div>
                        <!-- Action Icons -->
                        <div class="action-icons flex gap-3 mt-2 text-sm text-gray-500">
                            <i class="fas fa-pen"></i>
                            <!-- 复制文档图标 -->
                            <i class="fas fa-clipboard"></i>
                            <!-- 刷新图标 -->
                            <i class="fas fa-sync-alt"></i>
                            <!-- 添加图标 -->
                            <i class="fas fa-headphones"></i>
                            <!-- 编辑图标 -->
                            <i class="fas fa-circle-info"></i>
                            <!-- 消息图标 -->
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                </div>

                <div v-if="msg.type === 'imageQuestion'" class="">
                    <img src="../assets/images/icon.png" alt="AI Avatar"
                        class="w-6 h-6 rounded-full border border-gray-300 object-cover" />
                    <div class="flex flex-col">
                        <!-- Static Title -->
                        <div class="flex items-center">
                            <p class="font-bold mb-0.5">生态环境报表助手</p>
                        </div>
                        <!-- Dynamic Content -->
                        <div class="flex items-start">
                            <p class="">{{ msg.content }}</p>
                        </div>

                        <div class="flex items-start font-bold text-sm cursor-pointer" @click="showStatement">
                            <p class="text-gray-400 hover:text-black">点击查看报表</p>
                        </div>
                        <!-- Action Icons -->
                        <div class="action-icons flex gap-3 mt-2 text-sm text-gray-500">
                            <i class="fas fa-pen"></i>
                            <!-- 复制文档图标 -->
                            <i class="fas fa-clipboard"></i>
                            <!-- 刷新图标 -->
                            <i class="fas fa-sync-alt"></i>
                            <!-- 添加图标 -->
                            <i class="fas fa-headphones"></i>
                            <!-- 编辑图标 -->
                            <i class="fas fa-circle-info"></i>
                            <!-- 消息图标 -->
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                </div>

                <NumberQuestion v-if="msg.type === 'numberQuestion'" :content="chatExample" />
                <AttributionQuestion v-if="msg.type === 'attributionQuestion'" :content="chatExample2" />

                <MaskLayer backgroundColor="rgba(0, 0, 0, 0.3)" :ifShow="statementVisible" />
                <Statement :ifShow="statementVisible" @updateIfShow="updateStatementVisible" />

                <LineContainer v-if="msg.type === 'predictQuestion'" width="100%" :height="320" :data="airLineData"
                    :chartOption="airLineOptions" />

            </div>
        </div>
    </el-scrollbar>


</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue';
import chatExample from '../constant/chatExample'; // 导入聊天示例
import chatExample2 from '../constant/chatExample2'; // 导入聊天示例

import airLineOptions from '../utils/airLineOptions';
import LineContainer from './charts/LineContainer.vue';
import { airLineData } from '../constant/airLineData';

// 控制是否展开 PDF 展示框
const isExpanded = ref(false);

// 点击后展开 PDF 展示框
const expandPdf = () => {
  isExpanded.value = true; // 点击后切换为展示模式
};

// 点击删除按钮后折叠 PDF 展示框，回到默认图标状态
const collapsePdf = () => {
  isExpanded.value = false; // 恢复到 PDF 文件图标状态
};

const props = defineProps<{
    displayedMessages: { type: string; content: string }[];
}>();

let statementVisible = ref(false);

// 如果props.displayedMessages数组的最后一个元素的type是imageQuestion，就触发showStatement
onMounted(() => {
    if (props.displayedMessages[props.displayedMessages.length - 1].type === 'imageQuestion') {
        showStatement();
    }
});

const showStatement = () => {
    statementVisible.value = !statementVisible.value;
}
const updateStatementVisible = (value: boolean) => {
    statementVisible.value = value;
}

</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.skeleton-loader {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.skeleton-line {
    width: 100%;
    height: 20px;
    background-color: #e0e0e0;
    border-radius: 4px;
    animation: pulse 1.5s infinite ease-in-out;
}
</style>