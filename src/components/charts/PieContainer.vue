<template>
    <div class="forestPieContainer w-full">
        <div ref="forestPieContainer" :style="{ width: props.width, height: props.height }"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { ECBasicOption } from 'echarts/types/dist/shared';

const props = defineProps<{
    width: string;
    height: string;
    data: {
        seriesData: { value: number; name: string }[]
    };
    chartOption: (seriesData: { value: number; name: string }[]) => ECBasicOption
}>();

const forestPieContainer = ref<HTMLElement | null>(null);
let forestPie: echarts.ECharts | null = null;

onMounted(async () => {
    await nextTick();
    initForestPieChart();
});

const initForestPieChart = () => {
    if (forestPieContainer.value) {
        forestPie = echarts.init(forestPieContainer.value);
        renderForestPie();
    }
};

const renderForestPie = () => {

    let options = props.chartOption(props.data.seriesData);

    // 使用 setOption 方法设置图表配置
    forestPie?.setOption(options);
}
</script>

<style lang="scss" scoped></style>
