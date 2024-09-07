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
                        <div class="flex justify-center items-center gap-2 bg-[#54a358] bg-opacity-[0.12] rounded-lg p-1" v-if="ifAdd">
                            <el-icon color="#54a358">
                                <CircleCheck />
                            </el-icon>
                            <p class="text-green-700 text-sm">已添加</p>
                        </div>
                    </div>
                </div>


                <div
                    class="w-full  flex justify-between items-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg p-5">
                    <div ref="airLineContainer" style="width: 1200px; height: 220px;"></div>
                </div>
                <div
                    class="w-full h-10 flex justify-between items-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg my-5 p-5">
                    <el-checkbox v-model="checked2" size="large" />
                    <p class="font-bold text-center">生态环境评估报告 - 年度水质监测概览</p>
                    <div class="">
                        <div class="flex justify-center items-center gap-2 bg-[#54a358] bg-opacity-[0.12] rounded-lg p-1" v-if="ifAdd">
                            <el-icon color="#54a358">
                                <CircleCheck />
                            </el-icon>
                            <p class="text-green-700 text-sm">已添加</p>
                        </div>
                    </div>
                </div>
                <div
                    class="w-full  flex justify-between items-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg p-5">
                    <div ref="waterBarContainer" style="width: 1200px; height: 220px;"></div>
                </div>


                <div
                    class="w-full h-10 flex justify-between items-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg my-5 p-5">
                    <el-checkbox v-model="checked3" size="large" />
                    <p class="font-bold text-center">生态环境变化分析 - 森林覆盖率年度报告</p>
                    <div class="">
                        <div class="flex justify-center items-center gap-2 bg-[#54a358] bg-opacity-[0.12] rounded-lg p-1" v-if="ifAdd">
                            <el-icon color="#54a358">
                                <CircleCheck />
                            </el-icon>
                            <p class="text-green-700 text-sm">已添加</p>
                        </div>
                    </div>
                </div>
                <div
                    class="w-full  flex justify-between items-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg p-5">
                    <div ref="forestPieContainer" style="width: 1200px; height: 220px;"></div>
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
                <div class="flex justify-between items-center gap-3 cursor-pointer">
                    <el-icon>
                        <Delete />
                    </el-icon>
                    <p>全部删除</p>
                </div>
                <div class="">

                </div>
            </div>

        </div>

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
