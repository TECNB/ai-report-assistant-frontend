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
                <div v-for="(item, index) in statementItems" :key="index" :data-id="index"
                    :style="{ top: `${item.top}px`, left: `${item.left}px`, width: item.type === 'chart' ? 'auto' : `${item.width}px`, height: `${item.height}px`, position: 'absolute' }"
                    class="shadow-[0_8px_24px_rgba(0,0,0,0.04)] border rounded-lg my-5 p-5 overflow-visible bg-white"
                    @mouseenter="showDesign(index)" @mouseleave="hiddenDesign">
                    <!-- 悬浮按钮 -->
                    <div v-if="hoveredItem === index" @mouseenter="showDesign(index)" @mouseleave="hiddenDesign"
                        @mousedown="onMouseDown($event, index, 'drag')"
                        class="absolute w-5 h-8 top-1 -left-6 bg-gray-100 flex justify-center items-center gap-1 rounded-md cursor-move">
                        <i class="fa-regular fa-ellipsis-vertical" style="color: #4b5563;"></i>
                        <i class="fa-regular fa-ellipsis-vertical" style="color: #4b5563;"></i>
                    </div>
                    <!-- 控制大小按钮 -->
                    <div v-if="hoveredItem === index"
                        class="absolute w-5 h-8 -bottom-3 -right-2 flex cursor-nwse-resize"
                        @mousedown="onMouseDown($event, index, 'resize')">
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
                    <div v-if="isInteracting && activeIndex === index"
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

import LineContainer from './charts/LineContainer.vue';
import PieContainer from './charts/PieContainer.vue';
import BarContainer from './charts/BarContainer.vue';
import HorizontalBarContainer from './charts/HorizontalBarContainer.vue';

import { statementItems } from '../constant/statementItems';

const props = defineProps(['ifShow']);
const emit = defineEmits();
let hideTimeout: ReturnType<typeof setTimeout> | null = null;


let isInteracting = ref(false); // 统一拖拽和调整大小的状态
let interactionType = ref<'drag' | 'resize' | null>(null); // 交互类型：拖拽或调整大小
let startX = ref(0);
let startY = ref(0);
let initialTop = ref(0);
let initialLeft = ref(0);
let initialWidth = ref(0);
let initialHeight = ref(0);
let activeIndex = ref<number | null>(null); // 当前操作的元素索引

const hoveredItem = ref<number | null>(null); // 用来存储当前悬浮的元素索引

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

const onMouseDown = (event: MouseEvent, index: number, handleType: 'drag' | 'resize') => {
    isInteracting.value = true;
    interactionType.value = handleType;
    startX.value = event.clientX;
    startY.value = event.clientY;
    activeIndex.value = index;

    // 禁用文本选择
    document.body.style.userSelect = 'none';

    if (handleType === 'drag') {
        // 拖拽时初始化位置
        initialTop.value = statementItems.value[index].top;
        initialLeft.value = statementItems.value[index].left;
    } else if (handleType === 'resize') {
        // 调整大小时初始化宽高
        initialWidth.value = statementItems.value[index].width;
        initialHeight.value = statementItems.value[index].height;
    }

    // 监听全局鼠标事件
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
};

const onMouseMove = (event: MouseEvent) => {
    if (!isInteracting.value || activeIndex.value === null) return;

    const deltaX = event.clientX - startX.value;
    const deltaY = event.clientY - startY.value;
    const index = activeIndex.value;

    if (interactionType.value === 'drag') {
        // 拖拽逻辑
        statementItems.value[index].top = initialTop.value + deltaY;
        statementItems.value[index].left = initialLeft.value + deltaX;

        // 调整遮挡的元素位置
        adjustPositionForCollisions(index, statementItems.value[index].top, statementItems.value[index].left);
    } else if (interactionType.value === 'resize') {
        // 调整大小逻辑
        statementItems.value[index].width = Math.max(100, initialWidth.value + deltaX); // 最小宽度100px
        statementItems.value[index].height = Math.max(100, initialHeight.value + deltaY); // 最小高度100px
    }
};

const onMouseUp = () => {
    isInteracting.value = false;
    interactionType.value = null;
    activeIndex.value = null;

    // 恢复文本选择
    document.body.style.userSelect = '';

    // 移除全局鼠标事件监听
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
};


const adjustPositionForCollisions = (draggingIndex: number, newTop: number, newLeft: number) => {
    const draggingItem = statementItems.value[draggingIndex];
    const padding = 10; // 下移的间距

    const adjustBelowItems = (index: number) => {
        const currentItem = statementItems.value[index];

        // 找到所有被当前项遮挡的元素
        statementItems.value.forEach((item, itemIndex) => {
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
