<template>
    <div class="scatterContainer w-full">
        <div ref="scatterContainer"
            :style="{ width: typeof width === 'string' ? width : `${width}px`, height: `${height}px` }"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick, ref } from "vue";
import * as echarts from 'echarts';
import { ECBasicOption } from 'echarts/types/dist/shared';

// 接收 scatterOption 函数和数据作为 prop
const props = defineProps<{
    width: number | string;
    height: number;
    data: {
        xAxisData: string[];
        seriesData: number[][];
    };
    chartOption: (xAxisData: string[], seriesData: number[][]) => ECBasicOption
}>();

const scatterContainer = ref<HTMLElement | null>(null);
let scatter: echarts.ECharts | null = null;

onMounted(async () => {
    await nextTick();
    initScatterChart();
});

// 初始化图表方法
const initScatterChart = () => {
    if (scatterContainer.value) {
        scatter = echarts.init(scatterContainer.value);
        renderScatterChart();
    }
};

// 渲染图表
const renderScatterChart = () => {
    // 使用从父组件传入的 scatterOption 函数生成图表选项
    const options = props.chartOption(props.data.xAxisData, props.data.seriesData);

    // 使用 ECharts 实例的 setOption 方法渲染图表
    scatter?.setOption(options);
};
</script>

<style lang="scss" scoped></style>