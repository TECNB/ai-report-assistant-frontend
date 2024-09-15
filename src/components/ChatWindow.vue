<template>
    <el-scrollbar height="100%" wrap-style="width:100%;" class="flex justify-center -mx-5">
        <div id="chat-window" class="flex-1 px-24 py-10">
            <div v-for="(msg, index) in props.displayedMessages" :key="index" class="mb-4 flex items-start">

                <div v-if="msg.type === 'image'" class="w-full flex justify-end items-center rounded-lg ">
                    <img class="w-40 h-56 rounded-lg bg-gray-200 bg-opacity-50 p-2" :src="msg.content" />
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

                <NumberQuestion v-if="msg.type === 'numberQuestion'" :content="chatExample" />
                <AttributionQuestion v-if="msg.type === 'attributionQuestion'" :content="chatExample2" />

            </div>
        </div>
    </el-scrollbar>


</template>

<script setup lang="ts">
import { } from 'vue';
import chatExample from '../constant/chatExample'; // 导入聊天示例
import chatExample2 from '../constant/chatExample2'; // 导入聊天示例


const props = defineProps<{
    displayedMessages: { type: string; content: string }[];
}>();


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