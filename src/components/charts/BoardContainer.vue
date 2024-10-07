<template>
    <div class="BoardContainer w-full">
        <div ref="boardContainer"
            :style="{ width: typeof width === 'string' ? width : `${width}px`, height: `${height}px` }"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick, ref } from "vue"
import * as echarts from 'echarts';
import { ECBasicOption } from 'echarts/types/dist/shared';

// 接收 boardOptions 函数和数据作为 prop
const props = defineProps<{
    width: number | string;
    height: number;
    data: {
        currentValue: number;
    };
    chartOption: (currentValue: number) => ECBasicOption
}>();

const boardContainer = ref<HTMLElement | null>(null);
let board: echarts.ECharts | null = null;

onMounted(async () => {
    await nextTick();
    initBoardChart();
});

// 初始化图表方法
const initBoardChart = () => {
    if (boardContainer.value) {
        board = echarts.init(boardContainer.value);
        renderBoardChart();
    }
};

// 渲染图表
const renderBoardChart = () => {
    // 使用从父组件传入的 boardOptions 函数生成图表选项
    const options = props.chartOption(props.data.currentValue);

    // 使用 ECharts 实例的 setOption 方法渲染图表
    board?.setOption(options);
};
</script>

<style lang="scss" scoped>
.BoardContainer {
    // 可以根据需要添加或调整样式
}
</style>