<template>
    <div class="Chart" v-if="props.ifShow">
        <div class="flex justify-between items-center">
            <p class="text-2xl font-bold">生成的图表</p>
            <div class="Close" @click="toggleVisibility">
                <el-icon size="20" class="cursor-pointer">
                    <Close />
                </el-icon>
            </div>
        </div>
        <p>生态环境监测报告 - 年度空气质量统计</p>
        <div ref="airLineContainer" style="width: 600px; height: 400px;"></div>
        <p>生态环境评估报告 - 年度水质监测概览</p>
        <div ref="waterBarContainer" style="width: 600px; height: 400px;"></div>
        <p>生态环境变化分析 - 森林覆盖率年度报告</p>
        <div ref="forestPieContainer" style="width: 600px; height: 400px;"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
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
watch(() => props.ifShow, (newValue) => {
    if (newValue) {
        initAirLineChart();
        initWaterBarChart();
        initForestPieChart();
        console.log('init chart');
    }
});


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

    let options = airLineOptions(xAxisData,seriesData)
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
const renderForestPie = () =>{
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
    width: 70%;
    height: 700px;

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

.Chart {
    width: 70%;
    height: 700px;
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
</style>
