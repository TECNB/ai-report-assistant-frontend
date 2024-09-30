<template>
    <div class="Chart">
        <div class="flex justify-between items-center border-b -mx-5 px-5 pb-2 ">
            <p class="text-2xl font-bold">2023中国生态环境状况公报的图表</p>
            <!-- <div class="Close">
                <el-icon size="20" class="cursor-pointer">
                    <Close />
                </el-icon>
            </div> -->
        </div>
        <el-scrollbar height="95%" wrap-style="width:90%;" class="flex justify-start ml-5">
            <div class="w-full flex flex-col justify-center items-center self-center">
                <div
                    class="w-full h-10 flex justify-center items-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg my-5 p-5">
                    <p class="font-bold text-center">生态环境监测报告 - 年度空气质量统计</p>
                </div>

                <div
                    class="w-full  flex justify-between items-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg p-5">
                    <LineContainer width="100%" :height="220" :data="airLineData" :chartOption="airLineOptions" />
                </div>
                <div
                    class="w-full h-10 flex justify-center items-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg my-5 p-5">
                    <p class="font-bold text-center">生态环境评估报告 - 年度碳排放来源分析</p>
                </div>
                <div
                    class="w-full  flex justify-between items-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg p-5">
                    <BarContainer width="100%" :height="220" :data="waterBarData" :chartOption="waterBarOption"/>
                </div>


                <div
                    class="w-full h-10 flex justify-center items-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg my-5 p-5">
                    <p class="font-bold text-center">生态环境变化分析 - 森林覆盖率年度报告</p>
                </div>
                <div
                    class="w-full  flex justify-between items-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg p-5">
                    <PieContainer width="100%" :height="220" :data="forestPieData" :chartOption="forestPieOption"/>
                    
                </div>

                <div
                    class="w-full h-10 flex justify-center items-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg my-5 p-5">
                    <p class="font-bold text-center">生态环境变化分析 - 空气质量对比</p>
                </div>
                <div
                    class="w-full  flex justify-between items-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg p-5">
                    <HorizontalBar width="100%" :height="220" :data="horizontalBarData" :chartOption="airHorizontalBarOption"/>
                </div>
            </div>
        </el-scrollbar>

    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

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



let checked1 = ref(true);
let checked2 = ref(true);
let checked3 = ref(true);
let checkedAll = ref(true);
let isUpdating = false; // 用于避免循环更新


// 监听 checkedAll 的变化
watch(checkedAll, (newVal) => {
    checked1.value = newVal;
    checked2.value = newVal;
    checked3.value = newVal;
});

// 监听单选项的变化
watch([checked1, checked2, checked3], ([newChecked1, newChecked2, newChecked3]) => {
    // 如果所有单选项都未被选中，则将全选设为 false
    if (!newChecked1 && !newChecked2 && !newChecked3) {
        isUpdating = false;
        checkedAll.value = false;
    } else if (newChecked1 && newChecked2 && newChecked3) {
        isUpdating = false;
        checkedAll.value = true;
    }
    if (!isUpdating) return; // 如果是内部更新，跳过

});

</script>

<style lang="scss" scoped>
.Chart {
    display: flex;
    flex-direction: column;
    justify-content: space-start;
    width: 110%;
    height: 100%;
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
