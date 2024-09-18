<template>
    <div class="Statement" v-if="props.ifShow">
        <div class="flex justify-between items-center border-b -mx-5 px-5 pb-2 ">
            <p class="text-2xl font-bold">生成的报表</p>
            <div class="Close" @click="toggleVisibility">
                <el-icon size="20" class="cursor-pointer">
                    <Close />
                </el-icon>
            </div>
        </div>
        <el-scrollbar height="95%" wrap-style="width:100%;" class="flex justify-center">
            <div class="w-full flex flex-col justify-center items-center self-center relative overflow-visible">
                <div class="w-[600px] shadow-[0_8px_24px_rgba(0,0,0,0.04)] border rounded-lg my-5 p-5 overflow-visible transform translate-x-0 absolute top-0 left-12 z-0"
                    @mouseover="showDesign" @mouseleave="hiddenDesign">
                    <!-- 悬浮按钮 -->
                    <div class="absolute w-5 h-8 top-1 -left-6 bg-gray-100 flex justify-center items-center gap-1 rounded-md cursor-pointer">
                        <i class="fa-regular fa-ellipsis-vertical" style="color: #4b5563;"></i>
                        <i class="fa-regular fa-ellipsis-vertical" style="color: #4b5563;"></i>
                    </div>

                    <p class="text-sm font-bold">空气质量优良天数</p>
                    <div class="h-36 flex justify-center items-center gap-2">
                        <p class="px-2 py-5 text-4xl font-bold bg-gray-100 rounded-lg">2</p>
                        <p class="px-2 py-5 text-4xl font-bold bg-gray-100 rounded-lg">8</p>
                        <p class="px-2 py-5 text-4xl font-bold bg-gray-100 rounded-lg">0</p>
                    </div>
                </div>

                <div class="w-[600px] shadow-[0_8px_24px_rgba(0,0,0,0.04)] border rounded-lg my-5 p-5 overflow-visible transform translate-x-[680px] absolute top-0 left-0 z-0">
                    <p class="text-sm font-bold">本年度二氧化碳总排放量</p>
                    <div class="h-36 flex justify-center items-center gap-2">
                        <p class="px-2 py-5 text-4xl font-bold bg-gray-100 rounded-lg">1</p>
                        <p class="px-2 py-5 text-4xl font-bold bg-gray-100 rounded-lg">2</p>
                        <p class="px-2 py-5 text-4xl font-bold bg-gray-100 rounded-lg">0</p>
                        <p class="px-2 py-5 text-4xl font-bold bg-gray-100 rounded-lg">0</p>
                        <p class="px-2 py-5 text-4xl font-bold bg-gray-100 rounded-lg">0</p>
                        <p class="px-2 py-5 text-4xl font-bold bg-gray-100 rounded-lg">0</p>
                    </div>
                </div>



                <div
                    class="w-[1230px] absolute transform translate-x-0 translate-y-[270px]  flex flex-col justify-between items-start shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg p-5 mt-[240px]">
                    <p class="font-bold text-sm text-center">生态环境监测报告 - 年度空气质量统计</p>
                    <LineContainer width="1200px" height="220px" :data="airLineData" :chartOption="airLineOptions" />
                </div>


                <div class="w-[1230px] flex justify-center items-center gap-3 mt-5 absolute transform translate-x-0 translate-y-[690px]">
                    <div class="flex flex-1 flex-col justify-center items-center">
                        <div
                            class="w-full  flex flex-col justify-between items-start shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg p-5">
                            <p class="font-bold text-sm text-center">生态环境评估报告 - 年度水质监测概览</p>
                            <BarContainer width="100%" height="220px" :data="waterBarData"
                                :chartOption="waterBarOption" />
                        </div>
                    </div>
                    <div class="flex flex-1 flex-col justify-center items-center">
                        <div
                            class="w-full  flex flex-col justify-between items-start shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg p-5">
                            <p class="font-bold text-sm text-center">生态环境变化分析 - 年度森林覆盖率</p>

                            <PieContainer width="100%" height="220px" :data="forestPieData"
                                :chartOption="forestPieOption" />
                        </div>
                    </div>
                    <div class="flex flex-1 flex-col justify-center items-center">
                        <div
                            class="w-full  flex flex-col justify-between items-start shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg p-5">
                            <p class="font-bold text-sm text-center">生态环境评估报告 - 各地区年度空气质量对比</p>

                            <HorizontalBarContainer width="100%" height="220px" :data="horizontalBarData"
                                :chartOption="airHorizontalBarOption" />
                        </div>
                    </div>
                </div>

            </div>
        </el-scrollbar>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import * as echarts from 'echarts';

import airLineOptions from '../utils/airLineOptions';
import waterBarOption from '../utils/waterBarOption';
import forestPieOption from '../utils/forestPieOption';
import airHorizontalBarOption from '../utils/airHorizontalBarOption';

import LineContainer from './charts/LineContainer.vue';
import PieContainer from './charts/PieContainer.vue';
import BarContainer from './charts/BarContainer.vue';
import HorizontalBarContainer from './charts/HorizontalBarContainer.vue';

import { airLineData } from '../constant/airLineData';
import { forestPieData } from '../constant/forestPieData';
import { waterBarData } from '../constant/waterBarData';
import { horizontalBarData } from '../constant/horizontalBarData';

const props = defineProps(['ifShow']);
const emit = defineEmits();

let designVisible = ref(false);

const toggleVisibility = () => {
    emit('updateIfShow', false);
};

const showDesign = () => {
    designVisible.value = true;
};
const hiddenDesign = () => {
    designVisible.value = false;
    console.log('hidden');
};
</script>

<style lang="scss" scoped>
.Statement {
    width: 94%;
    height: 94%;
    position: fixed;
    z-index: 99999;
    // 居中对齐
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    border-radius: 20px;
    text-align: left;
    padding: 20px;
    overflow-x: visible !important;
}

:deep(.el-checkbox__inner) {
    zoom: 150%;
}

:deep(.el-checkbox.el-checkbox--large .el-checkbox__label) {
    font-size: 16px;
    color: #000;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
    background-color: #000;
    border-color: #000;
}

:deep(.el-checkbox__inner:hover) {
    border-color: #000;
}
</style>
