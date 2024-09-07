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
        <el-scrollbar height="87%" wrap-style="width:90%;" class="flex justify-center">
            <div class="w-full flex flex-col justify-center items-center self-center">
                <div
                    class="w-full h-10 flex justify-between items-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg my-5 p-5">
                    <el-checkbox v-model="checked1" size="large" />
                    <p class="font-bold text-center">生态环境监测报告 - 年度空气质量统计</p>
                    <div class="">
                        
                    </div>
                </div>


                <div
                    class="w-full  flex justify-between items-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg p-5">
                    <div ref="airLineContainer" style="width: 600px; height: 220px;"></div>
                </div>
                <div
                    class="w-full h-10 flex justify-between items-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg my-5 p-5">
                    <el-checkbox v-model="checked2" size="large" />
                    <p class="font-bold text-center">生态环境评估报告 - 年度水质监测概览</p>
                    <div class="">
                        
                    </div>
                </div>
                <div
                    class="w-full  flex justify-between items-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg p-5">
                    <div ref="waterBarContainer" style="width: 600px; height: 220px;"></div>
                </div>


                <div
                    class="w-full h-10 flex justify-between items-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg my-5 p-5">
                    <el-checkbox v-model="checked3" size="large" />
                    <p class="font-bold text-center">生态环境变化分析 - 森林覆盖率年度报告</p>
                    <div class="">
                        
                    </div>
                </div>
                <div
                    class="w-full  flex justify-between items-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg p-5">
                    <div ref="forestPieContainer" style="width: 600px; height: 220px;"></div>
                </div>
            </div>
        </el-scrollbar>
        <div class="w-full flex justify-between items-center absolute bottom-3 border-t pt-3 -mx-5 px-5">
            <div class="flex flex-1 justify-start items-center gap-3">
                <el-checkbox v-model="checkedAll" label="全选" size="large" />
                <p class="text-text-300 text-sm">勾选的图表将被写入报表</p>
            </div>
            <div class="">
                <div class="bg-text-100 rounded-xl cursor-pointer py-3 px-8" @click="addChart">
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
    // 使用时间段作为横轴的数据
    const xAxisData = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'];

    // 使用示例数据
    const seriesData = [25, 60, 50, 20, 35, 40, 25];

    let options = airLineOptions(xAxisData, seriesData)
    // 使用 ECharts 实例的 setOption 方法渲染图表
    airLine?.setOption(options);
};

const renderWaterBar = () => {
    // 使用一至日作为横轴的数据
    const xAxisData = ['一', '二', '三', '四', '五', '六', '日'];

    // 使用示例数据
    const seriesData = [25, 60, 50, 20, 35, 40, 25];

    let options = waterBarOption(xAxisData, seriesData)
    // 使用 ECharts 实例的 setOption 方法渲染图表
    waterBar?.setOption(options);
};
const renderForestPie = () => {
    // 使用示例数据
    const seriesData = [
        { value: 1048, name: '男' },
        { value: 735, name: '女' },
        { value: 580, name: '未知' }
    ];

    let options = forestPieOption(seriesData);

    // 使用 setOption 方法设置图表配置
    forestPie?.setOption(options);
}

</script>

<style lang="scss" scoped>
.Chart {
    width: 90%;
    height: 90%;
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
