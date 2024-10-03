<template>
    <div class="PipelineMainTask">
        <div class="container  rounded-lg">
            <div
                class="box relative flex flex-col bg-white p-3 border-4 border-transparent cursor-pointer rounded-xl shadow-lg hover:border-gray-300">
                <div class="text-left">
                    <p class="font-bold">缺失值和异常值清洗</p>
                </div>


                <!-- 串行连线 -->
                <div class="h-5 absolute left-5 -bottom-6 border border-gray-400 border-l-[3px]">
                </div>
            </div>
            <div
                class="box relative flex flex-col bg-white p-3 border-4 border-transparent cursor-pointer rounded-xl shadow-lg mt-5 hover:border-gray-300">
                <div class="text-left">
                    <p class="font-bold">标准化数据</p>
                </div>

                <!-- 添加符号 -->
                <div
                    class="w-4 h-4 absolute left-28 -bottom-3 flex justify-center items-center rounded-xl bg-white shadow-[0_2px_6px_0_rgba(37,43,58,0.4)]">
                    <i class="fa-regular fa-plus fa-2xs"></i>
                </div>
            </div>
        </div>


        <div
            class="flex flex-col bg-white p-2 border-4 border-transparent cursor-pointer rounded-xl shadow-md mt-5 hover:shadow-lg">
            <div class="flex justify-center items-center gap-2" @click="showSetting(2)">
                <i class="fa-regular fa-plus"></i>
                <p class="font-bold opacity-100">并行任务</p>
            </div>
        </div>

        <!-- 过程连线 -->
        <div class="w-11 absolute -left-11 top-6 border border-gray-400 border-b-[3px]">
        </div>
        <div class="w-11 absolute -right-11 top-6 border border-gray-400 border-b-[3px]">
        </div>
        <!-- 左并行连线 -->
        <div
            class="h-[150px] w-6 absolute -left-5 bottom-5 border-gray-400 border-l-[3px] border-b-[3px] border-dashed rounded-bl-2xl -z-10">
        </div>
        <!-- 右并行连线 -->
        <div
            class="h-[150px] w-6 absolute -right-5 bottom-5 border-gray-400 border-r-[3px] border-b-[3px] border-dashed rounded-br-2xl -z-10">
        </div>
    </div>
</template>

<script setup lang="ts">
import { } from "vue"

const props = defineProps(['tasks']);
const emit = defineEmits(['showSetting']);
const showSetting = (index: number) => {
    console.log(index)
    emit('showSetting', index)
}
</script>

<style lang="scss" scoped>
.container {
    position: relative;
}

.container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    /* 保持与外层 div 一样的圆角 */
    background-color: gray;
    opacity: 0.15;
    /* 外层背景颜色 */
    z-index: -1;
    /* 确保不影响内部内容 */
    transform: translate(-10px, -10px);
    /* 移动伪元素的大小 */
    width: calc(100% + 20px);
    height: calc(100% + 20px);
    border-radius: 12px;
}

.box {
    position: relative;
    z-index: 1;
    /* 确保内容在伪元素之上 */
}
</style>
