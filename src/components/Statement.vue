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
        <el-scrollbar height="95%" wrap-style="width:90%;" class="flex justify-center">
            <div class="w-full flex flex-col justify-center items-center self-center">
                <div class="flex justify-center items-center w-full gap-3">
                    <div class="w-full shadow-[0_8px_24px_rgba(0,0,0,0.04)] border rounded-lg my-5 p-5">
                        <p class="text-sm font-bold">空气质量优良天数</p>
                        <div class="h-36 flex justify-center items-center gap-2">
                            <p class="px-2 py-5 text-4xl font-bold bg-gray-100 rounded-lg">2</p>
                            <p class="px-2 py-5 text-4xl font-bold bg-gray-100 rounded-lg">8</p>
                            <p class="px-2 py-5 text-4xl font-bold bg-gray-100 rounded-lg">0</p>
                        </div>
                    </div>
                    <div class="w-full shadow-[0_8px_24px_rgba(0,0,0,0.04)] border rounded-lg my-5 p-5">
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

                </div>


                <div
                    class="w-full  flex flex-col justify-between items-start shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg p-5">
                    <p class="font-bold text-sm text-center">生态环境监测报告 - 年度空气质量统计</p>
                    <div ref="airLineContainer" style="width: 1200px; height: 220px;"></div>
                </div>


                <div class="w-full flex justify-center items-center gap-3 mt-5">
                    <div class="flex flex-1 flex-col justify-center items-center">
                        <div
                            class="w-full  flex flex-col justify-between items-start shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg p-5">
                            <p class="font-bold text-sm text-center">生态环境评估报告 - 年度水质监测概览</p>
                            <div ref="waterBarContainer" style="width: 100%; height: 220px;"></div>
                        </div>
                    </div>
                    <div class="flex flex-1 flex-col justify-center items-center">
                        <div
                            class="w-full  flex flex-col justify-between items-start shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg p-5">
                            <p class="font-bold text-sm text-center">生态环境变化分析 - 年度森林覆盖率</p>
                            <div ref="forestPieContainer" style="width: 100%; height: 220px;"></div>
                        </div>
                    </div>
                </div>

            </div>
        </el-scrollbar>

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue';
import * as echarts from 'echarts';

import airLineOptions from '../utils/airLineOptions';
import waterBarOption from '../utils/waterBarOption';
import forestPieOption from '../utils/forestPieOption';

const airLineContainer = ref<HTMLElement | null>(null);
let airLine: echarts.ECharts | null = null;
const waterBarContainer = ref<HTMLElement | null>(null);
let waterBar: echarts.ECharts | null = null;
const forestPieContainer = ref<HTMLElement | null>(null);
let forestPie: echarts.ECharts | null = null;

const props = defineProps(['ifShow']);
const emit = defineEmits();

let checked1 = ref(true);
let checked2 = ref(true);
let checked3 = ref(true);
let checkedAll = ref(true);
let isUpdating = false; // 用于避免循环更新

let ifAdd = ref(false);

const toggleVisibility = () => {
    emit('updateIfShow', false);
};

onMounted(() => {
    if (props.ifShow) {
        initAirLineChart();
        initWaterBarChart();
        initForestPieChart();
    }
});

// 监听 ifShow 的变化，只有在为 true 时才初始化图表
watch(() => props.ifShow, async (newValue) => {
    if (newValue) {
        // 等待 DOM 挂载完成
        await nextTick();
        initAirLineChart();
        initWaterBarChart();
        initForestPieChart();
    }
});

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

const addChart = () => {
    console.log('add chart');
    ifAdd.value = true;
    checked1.value = false;
    checked2.value = false;
    checked3.value = false;
    checkedAll.value = false;
};


// 初始化图表方法
const initAirLineChart = () => {
    if (airLineContainer.value) {
        airLine = echarts.init(airLineContainer.value);
        renderAirLine();
    }
};
const initWaterBarChart = () => {
    if (waterBarContainer.value) {
        waterBar = echarts.init(waterBarContainer.value);
        renderWaterBar();
    }
};
const initForestPieChart = () => {
    if (forestPieContainer.value) {
        forestPie = echarts.init(forestPieContainer.value);
        renderForestPie();
    }
};


const renderAirLine = () => {
    // 使用月份作为横轴的数据
    const xAxisData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // 使用示例数据 (假设是各月份的 AQI 数据)
    const seriesData = [45, 50, 55, 60, 65, 70, 75, 80, 70, 65, 55, 50];

    let options = airLineOptions(xAxisData, seriesData);
    // 使用 ECharts 实例的 setOption 方法渲染图表
    airLine?.setOption(options);
};

const renderWaterBar = () => {
    // 使用月份作为横轴的数据
    const xAxisData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // 使用示例数据 (假设是每月水质监测指标，如化学需氧量 COD)
    const seriesData = [15, 20, 18, 25, 30, 22, 17, 19, 24, 29, 31, 23];

    let options = waterBarOption(xAxisData, seriesData);
    // 使用 ECharts 实例的 setOption 方法渲染图表
    waterBar?.setOption(options);
};
const renderForestPie = () => {
    // 使用示例数据，假设为不同地区的森林覆盖率（单位为百分比）
    const seriesData = [
        { value: 45, name: '东部地区' },
        { value: 30, name: '西部地区' },
        { value: 15, name: '中部地区' },
        { value: 10, name: '北部地区' }
    ];

    let options = forestPieOption(seriesData);

    // 使用 setOption 方法设置图表配置
    forestPie?.setOption(options);
}

</script>

<style lang="scss" scoped>
.Statement {
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
