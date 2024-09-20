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
        <el-scrollbar height="95%" wrap-style="width:100%;" class="flex justify-center">
            <div class="w-full flex flex-col justify-center items-center self-center relative overflow-visible">
                <!-- 动态渲染可拖动的元素 -->
                <div v-for="(item, index) in items" :key="index" :data-id="index"
                    :style="{ top: `${item.top}px`, left: `${item.left}px`, width: item.type === 'chart' ? 'auto' : `${item.width}px`, height: `${item.height}px`, position: 'absolute' }"
                    class="shadow-[0_8px_24px_rgba(0,0,0,0.04)] border rounded-lg my-5 p-5 overflow-visible bg-white"
                    @mousedown="" @mouseenter="showDesign(index)" @mouseleave="hiddenDesign">
                    <!-- 悬浮按钮 -->
                    <div v-if="hoveredItem === index" @mouseenter="showDesign(index)" @mouseleave="hiddenDesign"
                        @mousedown="onMouseDown($event, index)"
                        class="absolute w-5 h-8 top-1 -left-6 bg-gray-100 flex justify-center items-center gap-1 rounded-md cursor-move">
                        <i class="fa-regular fa-ellipsis-vertical" style="color: #4b5563;"></i>
                        <i class="fa-regular fa-ellipsis-vertical" style="color: #4b5563;"></i>
                    </div>
                    <!-- 控制大小按钮 -->
                    <div v-if="hoveredItem === index"
                        class="absolute w-5 h-8 -bottom-3 -right-2 flex cursor-nwse-resize"
                        @mousedown="onResizeMouseDown($event, index)">
                        <i class="fa-solid fa-corner fa-rotate-90" style="color: #4b5563;"></i>
                    </div>

                    <!-- 根据不同的类型渲染不同内容 -->
                    <p class="text-sm font-bold">{{ item.label }}</p>

                    <!-- 数字数据类型 -->
                    <div v-if="item.type === 'numbers'" class="h-36 flex justify-center items-center gap-2">
                        <p v-for="n in item.numbers" :key="n"
                            class="px-2 py-5 text-4xl font-bold bg-gray-100 rounded-lg">{{ n }}</p>
                    </div>

                    <!-- 图表类型 -->
                    <div v-else-if="item.type === 'chart'" class="w-full h-full">
                        <!-- 根据图表类型，渲染对应的组件 -->
                        <LineContainer v-if="item.chart === 'line'" :width="item.width" :height="item.height - 50"
                            :data="item.data" :chartOption="item.chartOption" />
                        <BarContainer v-if="item.chart === 'bar'" :width="item.width" :height="item.height - 50"
                            :data="item.data" :chartOption="item.chartOption" />
                        <PieContainer v-if="item.chart === 'pie'" :width="item.width" :height="item.height - 50"
                            :data="item.data" :chartOption="item.chartOption" />
                        <HorizontalBarContainer v-if="item.chart === 'horizontalBar'" :width="item.width"
                            :height="item.height - 50" :data="item.data" :chartOption="item.chartOption" />
                    </div>

                    <!-- 移动位置提示 -->
                    <div v-if="isDragging && currentDraggingIndex === index"
                        class="absolute top-0 left-0 w-full h-full bg-gray-200 rounded-lg opacity-50 pointer-events-none">
                        <!-- 显示提示的矩形背景，拖拽时会显示 -->
                    </div>
                </div>
            </div>
        </el-scrollbar>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import airLineOptions from '../utils/airLineOptions';
import waterBarOption from '../utils/waterBarOption';
import forestPieOption from '../utils/forestPieOption';
import airHorizontalBarOption from '../utils/airHorizontalBarOption';

import LineContainer from './charts/LineContainer.vue';
import PieContainer from './charts/PieContainer.vue';
import BarContainer from './charts/BarContainer.vue';
import HorizontalBarContainer from './charts/HorizontalBarContainer.vue';

import { airLineData } from '../constant/airLineData';
import { forestPieData } from '../constant/forestPieData';
import { waterBarData } from '../constant/waterBarData';
import { horizontalBarData } from '../constant/horizontalBarData';

const props = defineProps(['ifShow']);
const emit = defineEmits();
let hideTimeout: ReturnType<typeof setTimeout> | null = null;


let isDragging = ref(false); // 是否正在拖拽
const currentDraggingIndex = ref<number | null>(null); // 当前拖拽元素的索引

let startX = ref(0); // 鼠标初始X位置
let startY = ref(0); // 鼠标初始Y位置
let initialTop = ref(0); // 父元素初始的top位置
let initialLeft = ref(0); // 父元素初始的left位置

let isResizing = ref(false); // 是否正在调整大小
let resizeStartX = ref(0); // 调整大小时鼠标初始X位置
let resizeStartY = ref(0); // 调整大小时鼠标初始Y位置
let initialWidth = ref(0); // 元素初始宽度
let initialHeight = ref(0); // 元素初始高度
let resizingIndex = ref<number | null>(null); // 当前调整大小的元素索引


const hoveredItem = ref<number | null>(null); // 用来存储当前悬浮的元素索引

interface Item {
    top: number;
    left: number;
    height: number;
    width: number;
    label: string;
    type: 'numbers' | 'chart'; // 定义类型为数字或图表
    numbers?: number[]; // 如果是数字类型，包含数字数组
    chart?: 'line' | 'bar' | 'pie' | 'horizontalBar'; // 图表类型
    data?: any; // 图表的数据
    chartOption?: any; // 图表的配置选项
}

const items = ref<Item[]>([
    { top: 0, left: 50, height: 200, width: 600, label: '空气质量优良天数', type: 'numbers', numbers: [2, 8, 0] },
    { top: 0, left: 680, height: 200, width: 600, label: '本年度二氧化碳总排放量', type: 'numbers', numbers: [1, 2, 0, 0, 0, 0] },
    { top: 220, left: 50, height: 290, width: 1190, label: '年度空气质量统计', type: 'chart', chart: 'line', data: airLineData, chartOption: airLineOptions },
    { top: 550, left: 50, height: 290, width: 350, label: '年度水质监测概览', type: 'chart', chart: 'bar', data: waterBarData, chartOption: waterBarOption },
    { top: 550, left: 470, height: 290, width: 350, label: '年度森林覆盖率', type: 'chart', chart: 'pie', data: forestPieData, chartOption: forestPieOption },
    { top: 550, left: 890, height: 290, width: 350, label: '空气质量对比', type: 'chart', chart: 'horizontalBar', data: horizontalBarData, chartOption: airHorizontalBarOption }
]);


const toggleVisibility = () => {
    emit('updateIfShow', false);
};

const showDesign = (index: number) => {
    if (hideTimeout) clearTimeout(hideTimeout); // 清除隐藏的延迟
    hoveredItem.value = index; // 设置当前悬浮的元素索引
    
};

const hiddenDesign = () => {
    hideTimeout = setTimeout(() => {
        hoveredItem.value = null; // 重置悬浮的元素索引
        
    }, 200); // 延迟隐藏
};

const onMouseDown = (event: MouseEvent, index: number) => {
    isDragging.value = true;
    startX.value = event.clientX;
    startY.value = event.clientY;
    initialTop.value = items.value[index].top;
    initialLeft.value = items.value[index].left;

    currentDraggingIndex.value = index; // 设置当前拖拽的元素索引

    // 添加全局鼠标移动和释放监听
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
};

const onMouseMove = (event: MouseEvent) => {
    if (!isDragging.value || hoveredItem.value === null) return;

    // 禁用文本选择
    document.body.style.userSelect = 'none';

    const index = hoveredItem.value;
    const deltaX = event.clientX - startX.value;
    const deltaY = event.clientY - startY.value;

    const newTop = initialTop.value + deltaY;
    const newLeft = initialLeft.value + deltaX;

    // 更新当前拖拽元素的位置
    items.value[index].top = newTop;
    items.value[index].left = newLeft;

    // 调整遮挡的元素位置
    adjustPositionForCollisions(index, newTop, newLeft);
};

const onMouseUp = () => {
    isDragging.value = false;

    // 恢复文本选择
    document.body.style.userSelect = '';
    currentDraggingIndex.value = null;

    // 移除全局鼠标事件监听
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
};

const onResizeMouseDown = (event: MouseEvent, index: number) => {
    isResizing.value = true;
    resizeStartX.value = event.clientX;
    resizeStartY.value = event.clientY;
    resizingIndex.value = index;

    // 获取初始宽度和高度
    const item = items.value[index];
    initialWidth.value = item.width;
    initialHeight.value = item.height;

    // 禁用文本选择
    document.body.style.userSelect = 'none';

    // 添加全局鼠标移动和释放监听
    document.addEventListener('mousemove', onResizeMouseMove);
    document.addEventListener('mouseup', onResizeMouseUp);
};
const onResizeMouseMove = (event: MouseEvent) => {
    if (!isResizing.value || resizingIndex.value === null) return;

    const index = resizingIndex.value;
    const deltaX = event.clientX - resizeStartX.value;
    const deltaY = event.clientY - resizeStartY.value;

    // 更新元素的宽度和高度
    items.value[index].width = Math.max(100, initialWidth.value + deltaX); // 最小宽度100px
    items.value[index].height = Math.max(100, initialHeight.value + deltaY); // 最小高度100px
};
const onResizeMouseUp = () => {
    isResizing.value = false;

    // 恢复文本选择
    document.body.style.userSelect = '';

    // 移除全局鼠标事件监听
    document.removeEventListener('mousemove', onResizeMouseMove);
    document.removeEventListener('mouseup', onResizeMouseUp);
};


const adjustPositionForCollisions = (draggingIndex: number, newTop: number, newLeft: number) => {
    const draggingItem = items.value[draggingIndex];
    const padding = 10; // 下移的间距

    const adjustBelowItems = (index: number) => {
        const currentItem = items.value[index];

        // 找到所有被当前项遮挡的元素
        items.value.forEach((item, itemIndex) => {
            if (itemIndex !== index) {
                const isOverlapping = (item.top < currentItem.top + currentItem.height &&
                    item.top + item.height > currentItem.top &&
                    item.left < currentItem.left + currentItem.width &&
                    item.left + item.width > currentItem.left);

                if (isOverlapping && item.top >= currentItem.top) {
                    // 调整被遮挡元素位置
                    item.top = currentItem.top + currentItem.height + padding;

                    // 递归调整该元素下方的其他元素
                    adjustBelowItems(itemIndex);
                }
            }
        });
    };

    // 更新拖拽元素的新位置
    draggingItem.top = newTop;
    draggingItem.left = newLeft;

    // 调整被拖拽元素遮挡的所有元素
    adjustBelowItems(draggingIndex);
};
</script>

<style lang="scss" scoped>
.Statement {
    width: 94%;
    height: 94%;
    position: fixed;
    z-index: 99999;
    // 居中对齐
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    border-radius: 20px;
    text-align: left;
    padding: 20px;
    overflow-x: visible !important;
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
