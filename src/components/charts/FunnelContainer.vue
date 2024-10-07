<template>
    <div class="funnelContainer w-full">
        <div ref="funnelContainer"
            :style="{ width: typeof width === 'string' ? width : `${width}px`, height: `${height}px` }"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick, ref } from 'vue';
import * as echarts from 'echarts';
import { ECBasicOption } from 'echarts/types/dist/shared';

// 接收 funnelOptions 函数和数据作为 prop
const props = defineProps<{
    width: number | string;
    height: number;
    data: {
        name: string;
        value: number;
    }[];
    chartOption: (funnelData: { name: string; value: number }[]) => ECBasicOption;
}>();

const funnelContainer = ref<HTMLElement | null>(null);
let funnelChart: echarts.ECharts | null = null;

onMounted(async () => {
    await nextTick();
    initFunnelChart();
});

// 初始化图表方法
const initFunnelChart = () => {
    if (funnelContainer.value) {
        funnelChart = echarts.init(funnelContainer.value);
        renderFunnelChart();
    }
};

// 渲染图表
const renderFunnelChart = () => {
    // 使用从父组件传入的 funnelOptions 函数生成图表选项
    const options = props.chartOption(props.data);

    // 使用 ECharts 实例的 setOption 方法渲染图表
    funnelChart?.setOption(options);
};
</script>

<style lang="scss" scoped>
.funnelContainer {
    // 可根据需要添加样式
}
</style>