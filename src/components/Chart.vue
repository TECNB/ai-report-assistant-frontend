<template>
    <div class="Chart" v-if="props.ifShow">
        <div class="flex justify-between items-center border-b -mx-5 px-5 pb-2 ">
            <p class="text-2xl font-bold">生成的图表</p>
            <div class="Close" @click="toggleVisibility">
                <el-icon size="20" class="cursor-pointer">
                    <Close />
                </el-icon>
            </div>
        </div>
        <el-scrollbar height="86%" wrap-style="width:90%;" class="flex justify-center">
            <div class="w-full flex flex-col justify-center items-center self-center">
                <div
                    class="w-full h-10 flex justify-between items-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg my-5 p-5">
                    <el-checkbox v-model="checked1" size="large" />
                    <p class="font-bold text-center">生态环境监测报告 - 年度空气质量统计</p>
                    <div class="">
                        <div class="flex justify-center items-center gap-2 bg-[#54a358] bg-opacity-[0.12] rounded-lg p-1"
                            v-if="ifAdd">
                            <el-icon color="#54a358">
                                <CircleCheck />
                            </el-icon>
                            <p class="text-green-700 text-sm">已添加</p>
                        </div>
                    </div>
                </div>

                <div
                    class="w-full  flex justify-between items-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg p-5">
                    <LineContainer width="1200px" :height="220" :data="airLineData" :chartOption="airLineOptions" />
                </div>
                <div
                    class="w-full h-10 flex justify-between items-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg my-5 p-5">
                    <el-checkbox v-model="checked2" size="large" />
                    <p class="font-bold text-center">生态环境评估报告 - 年度碳排放来源分析</p>
                    <div class="">
                        <div class="flex justify-center items-center gap-2 bg-[#54a358] bg-opacity-[0.12] rounded-lg p-1"
                            v-if="ifAdd">
                            <el-icon color="#54a358">
                                <CircleCheck />
                            </el-icon>
                            <p class="text-green-700 text-sm">已添加</p>
                        </div>
                    </div>
                </div>
                <div
                    class="w-full  flex justify-between items-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg p-5">
                    <BarContainer width="1200px" :height="220" :data="waterBarData" :chartOption="waterBarOption"/>
                </div>


                <div
                    class="w-full h-10 flex justify-between items-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg my-5 p-5">
                    <el-checkbox v-model="checked3" size="large" />
                    <p class="font-bold text-center">生态环境变化分析 - 森林覆盖率变化图</p>
                    <div class="">
                        <div class="flex justify-center items-center gap-2 bg-[#54a358] bg-opacity-[0.12] rounded-lg p-1"
                            v-if="ifAdd">
                            <el-icon color="#54a358">
                                <CircleCheck />
                            </el-icon>
                            <p class="text-green-700 text-sm">已添加</p>
                        </div>
                    </div>
                </div>
                <div
                    class="w-full  flex justify-between items-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg p-5">
                    <PieContainer width="1200px" :height="220" :data="forestPieData" :chartOption="forestPieOption"/>
                    
                </div>

                <div
                    class="w-full h-10 flex justify-between items-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg my-5 p-5">
                    <el-checkbox v-model="checked4" size="large" />
                    <p class="font-bold text-center">生态环境变化分析 - 空气质量对比</p>
                    <div class="">
                        <div class="flex justify-center items-center gap-2 bg-[#54a358] bg-opacity-[0.12] rounded-lg p-1"
                            v-if="ifAdd">
                            <el-icon color="#54a358">
                                <CircleCheck />
                            </el-icon>
                            <p class="text-green-700 text-sm">已添加</p>
                        </div>
                    </div>
                </div>
                <div
                    class="w-full  flex justify-between items-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg p-5">
                    <HorizontalBar width="1200px" :height="220" :data="horizontalBarData" :chartOption="airHorizontalBarOption"/>
                    
                </div>
            </div>
        </el-scrollbar>
        <div class="w-full flex justify-between items-center absolute bottom-3 border-t pt-3 -mx-5 px-5">
            <div class="flex flex-1 justify-start items-center gap-3">
                <el-checkbox v-model="checkedAll" label="全选" size="large" />
                <p class="text-text-300 text-sm">勾选的图表将被写入报表</p>
            </div>
            <div class="">
                <div class="bg-text-100 rounded-xl cursor-pointer py-3 px-8" @click="addChart" v-if="!ifAdd">
                    <p class="text-white font-bold">立即使用</p>
                </div>
                <div class="bg-text-400 rounded-xl cursor-not-allowed py-3 px-8" v-else>
                    <p class="text-white font-bold">立即使用</p>
                </div>
            </div>

            <div class="flex flex-1 justify-end items-center">
                <div
                    class="flex justify-between items-center gap-3 cursor-pointer rounded-xl hover:bg-gray-200 transition p-2">
                    <el-icon color="#999999">
                        <Delete />
                    </el-icon>
                    <p class="text-text-300">全部删除</p>
                </div>
                <div class="">

                </div>
            </div>

        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';

import airLineOptions from '../utils/airLineOptions';
import waterBarOption from '../utils/waterBarOption';
import forestPieOption from '../utils/forestPieOption';
import airHorizontalBarOption from '../utils/airHorizontalBarOption';

import LineContainer from './charts/LineContainer.vue';
import PieContainer from './charts/PieContainer.vue';
import BarContainer from './charts/BarContainer.vue';
import HorizontalBar from './charts/HorizontalBarContainer.vue';

import { airLineData } from '../constant/airLineData';
import { forestPieData } from '../constant/forestPieData';
import { waterBarData } from '../constant/waterBarData';
import { horizontalBarData } from '../constant/horizontalBarData';


const props = defineProps(['ifShow']);
const emit = defineEmits();

let checked1 = ref(true);
let checked2 = ref(true);
let checked3 = ref(true);
let checked4 = ref(true);
let checkedAll = ref(true);
let isUpdating = false; // 用于避免循环更新

let ifAdd = ref(false);

const toggleVisibility = () => {
    emit('updateIfShow', false);
};


// 监听 ifShow 的变化，只有在为 true 时才初始化图表
watch(() => props.ifShow, async (newValue) => {
    if (newValue) {
        // 等待 DOM 挂载完成
        await nextTick();
    }
});

// 监听 checkedAll 的变化
watch(checkedAll, (newVal) => {
    checked1.value = newVal;
    checked2.value = newVal;
    checked3.value = newVal;
    checked4.value = newVal;
});

// 监听单选项的变化
watch([checked1, checked2, checked3,checked4], ([newChecked1, newChecked2, newChecked3,newChecked4]) => {
    // 如果所有单选项都未被选中，则将全选设为 false
    if (!newChecked1 && !newChecked2 && !newChecked3 && !newChecked4) {
        isUpdating = false;
        checkedAll.value = false;
    } else if (newChecked1 && newChecked2 && newChecked3 &&newChecked4) {
        isUpdating = false;
        checkedAll.value = true;
    }
    if (!isUpdating) return; // 如果是内部更新，跳过

});

const addChart = () => {
    console.log('add chart');
    ifAdd.value = true;
    checked1.value = false;
    checked2.value = false;
    checked3.value = false;
    checkedAll.value = false;
};
</script>

<style lang="scss" scoped>
.Chart {
    width: 94%;
    height: 94%;
    position: absolute;
    z-index: 99999;
    // 居中对齐
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    border-radius: 20px;
    text-align: left;
    padding: 20px;
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
