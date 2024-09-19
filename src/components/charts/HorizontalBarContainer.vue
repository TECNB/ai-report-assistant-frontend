<template>
    <div class="horizontalBarContainer w-full">
        <div ref="horizontalBarContainer" :style="{ width: typeof width === 'string' ? width : `${width}px`, height: `${height}px` }"></div>
    </div>

</template>

<script setup lang="ts">
import { onMounted, nextTick, ref } from "vue"
import * as echarts from 'echarts';
import { ECBasicOption } from 'echarts/types/dist/shared';

// 接收 airLineOptions 函数和数据作为 prop
const props = defineProps<{
    width: number|string;
    height: number;
    data: {
        yAxisData: string[];
        seriesData: number[];
    };
    chartOption: (xAxisData: string[], seriesData: number[]) => ECBasicOption
}>();

const horizontalBarContainer = ref<HTMLElement | null>(null);
let horizontalBar: echarts.ECharts | null = null;

onMounted(async () => {
    await nextTick();
    initAirHorizontalBarChart();
});

// 初始化图表方法
const initAirHorizontalBarChart = () => {
    if (horizontalBarContainer.value) {
        horizontalBar = echarts.init(horizontalBarContainer.value);
        renderAirHorizontalBar();
    }
};

// 渲染图表
const renderAirHorizontalBar = () => {
    let options = props.chartOption(props.data.yAxisData, props.data.seriesData);

    // 使用 setOption 方法设置图表配置
    horizontalBar?.setOption(options);
};
</script>

<style lang="scss" scoped></style>
