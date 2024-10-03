<template>
    <div class="PipelineHeader">
        <!-- 头部 -->
        <div v-if="props.title!=='新阶段'" class="flex justify-center items-center relative cursor-pointer">
            <!-- Arrow tail -->
            <div class="absolute top-0 -left-3 w-3 h-16 bg-gray-200 opacity-80"></div>

            <!-- Main body -->
            <div class="w-72 h-16 flex justify-between items-center bg-gray-200 opacity-80 p-3">
                <div class="flex flex-col justify-center items-start">
                    <p class="font-bold">{{ props.title }}</p>
                    <p>{{ props.count }}个数据源</p>
                </div>
                <div class="flex justify-center items-center gap-4">
                    <i class="fa-light fa-pen"></i>
                    <i class="fa-light fa-copy"></i>
                    <i class="fa-light fa-trash"></i>
                </div>
            </div>

            <!-- Arrow head -->
            <div class="absolute top-0 -right-5 w-5 h-16 bg-gray-200 opacity-80"
                style="clip-path: polygon(0 0%, 100% 50%, 0 100%);"></div>
            <!-- 添加符号 -->
            <div v-if="props.title !== '数据源'"
                class="w-4 h-4 absolute -left-7 bottom-6 flex justify-center items-center rounded-xl bg-white shadow-[0_2px_6px_0_rgba(37,43,58,0.4)]">
                <i class="fa-regular fa-plus fa-2xs"></i>
            </div>
        </div>
        <!-- 头部 -->
        <div v-else class="flex justify-center items-center relative cursor-pointer">
            <!-- Arrow tail -->
            <div class="absolute top-0 -left-3 w-3 h-16 bg-gray-200/60 opacity-80"></div>

            <!-- Main body -->
            <div class="w-72 h-16 flex justify-between items-center bg-gray-200/60 opacity-80 p-3">
                <div class="flex flex-col justify-center items-start">
                    <p class="font-bold text-black/60">{{ props.title }}</p>
                    <p class="text-black/60">{{ props.count }}个数据源</p>
                </div>
            </div>

            <!-- Arrow head -->
            <div class="absolute top-0 -right-5 w-5 h-16 bg-gray-200/60 opacity-80"
                style="clip-path: polygon(0 0%, 100% 50%, 0 100%);"></div>
            <!-- 添加符号 -->
            <div
                class="w-4 h-4 absolute -left-7 bottom-6 flex justify-center items-center rounded-xl bg-white shadow-[0_2px_6px_0_rgba(37,43,58,0.4)]">
                <i class="fa-regular fa-plus fa-2xs"></i>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { } from "vue"
const props = defineProps(['title', 'count'])
const emit = defineEmits()


</script>

<style lang="scss" scoped></style>
