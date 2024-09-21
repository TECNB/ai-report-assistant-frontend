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
        <el-scrollbar height="95%" wrap-style="width:100%;" class="flex justify-center" @scroll="onScroll">
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
                        <component :is="getChartComponent(item.chart)" :width="item.width" :height="item.height - 50"
                            :data="item.data" :chartOption="item.chartOption" />
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
import { ref,watch } from 'vue';
import { debounce } from 'lodash';

import { StatementItem } from '../interfaces/StatementItem';

import LineContainer from './charts/LineContainer.vue';
import PieContainer from './charts/PieContainer.vue';
import BarContainer from './charts/BarContainer.vue';
import HorizontalBarContainer from './charts/HorizontalBarContainer.vue';

import { statementItems } from '../constant/statementItems';

const props = defineProps(['ifShow']);
const emit = defineEmits();
let hideTimeout: ReturnType<typeof setTimeout> | null = null;


let isInteracting = ref(false); // 统一拖拽和调整大小的状态
// 定义变量是否滚动
let isScrolling = ref(false);
let interactionType = ref<'drag' | 'resize' | null>(null); // 交互类型：拖拽或调整大小
let startX = ref(0);
// 滚动结束后的初始Y位置
let startY = ref(0);

// 滚动时的初始位置
let scrollY = ref(0);
let initialStartY = ref(0);
// 定义第一次event.clientY
let initialEventY = 0;

// 定义拖动的Y轴距离
let dragY = 0;

// 定义一个变量用于保存第一个 scrollTop
let previousScrollTop: number | null = null;


let initialTop = ref(0);
let initialLeft = ref(0);
let initialWidth = ref(0);
let initialHeight = ref(0);
let activeIndex = ref<number | null>(null); // 当前操作的元素索引

const hoveredItem = ref<number | null>(null); // 用来存储当前悬浮的元素索引

const toggleVisibility = () => {
    emit('updateIfShow', false);
};
let initialPositions: number[] = [];

// 定义变量最初始的位置
let initialPositionsY: number[] = [];
initialPositionsY = statementItems.value.map(item => item.top);

const onMouseDown = (event: MouseEvent, index: number, handleType: 'drag' | 'resize') => {
    isInteracting.value = true;
    interactionType.value = handleType;
    startX.value = event.clientX;
    startY.value = event.clientY;

    initialStartY.value = event.clientY;
    // console.log('onMouseDown.startY', startY.value)
    activeIndex.value = index;


    // 禁用文本选择
    document.body.style.userSelect = 'none';

    // 保存初始位置
    initialPositions = statementItems.value.map(item => item.top);

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



    let deltaX = event.clientX - startX.value;
    // 鼠标在Y轴上的移动距离 = 当前鼠标位置 - 初始鼠标位置
    // let deltaY = event.clientY - startY.value;
    let deltaY = event.clientY + (startY.value - initialStartY.value) - startY.value;
    // 更新初始位置
    dragY = deltaY;  // 计算拖动的Y轴距离

    // if (isScrolling.value) {
    //     // 如果正在滚动，不执行拖拽或调整大小
    //     deltaY = event.clientY + (startY.value - initialStartY.value) - startY.value;
    //     // 更新初始位置
    //     dragY = deltaY;  // 计算拖动的Y轴距离
    // }

    // console.log('onMouseMove.event.clientY', event.clientY)
    // console.log('onMouseMove.startY.value', startY.value)
    const index = activeIndex.value;

    // console.log('onMouseMove.initialTop.value', initialTop.value)

    if (interactionType.value === 'drag') {
        // 拖拽逻辑
        statementItems.value[index].top = initialTop.value + deltaY;
        statementItems.value[index].left = initialLeft.value + deltaX;

        // 调整遮挡的元素位置
        checkCollision()
    } else if (interactionType.value === 'resize') {
        // 调整大小逻辑
        statementItems.value[index].width = Math.max(100, initialWidth.value + deltaX); // 最小宽度100px
        statementItems.value[index].height = Math.max(100, initialHeight.value + deltaY); // 最小高度100px
    }
};

const onMouseUp = () => {
    isInteracting.value = false;
    interactionType.value = null;
    previousScrollTop = null; // 重置滚动记录
    isScrolling.value = false; // 重置滚动状态
    dragY = 0;  // 重置拖动的Y轴距离


    // 恢复文本选择
    document.body.style.userSelect = '';

    // 更新startX和startY，位置为当前数组内的元素位置
    if (activeIndex.value !== null) {
        startX.value = statementItems.value[activeIndex.value].left;
        startY.value = statementItems.value[activeIndex.value].top;
        // console.log('startX', startX.value, 'startY', startY.value)
    }

    activeIndex.value = null;


    // 移除全局鼠标事件监听
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
};

const movedItems = new Set<number>();  // 记录已下移的元素索引

// 观察initialPositions[1]为215时，打印错误
watch(() => initialPositions[1], (newValue) => {
    if (newValue === 215) {
        console.error('哈哈哈哈哈initialPositions[1]', newValue)
    }
});


// 检查遮挡逻辑
const checkCollision = () => {
    if (activeIndex.value === null) return;

    const draggedItem = statementItems.value[activeIndex.value];
    const spacing = 15;

    statementItems.value.forEach((item, index) => {
        if (index !== activeIndex.value) {
            const isColliding = checkOverlap(draggedItem, item);
            const requiredSpace = item.height + spacing;  // 元素恢复需要的空间

            if (index == 1 && activeIndex.value !== null) {
                console.log(index, '移动前initialPositions[index]', initialPositions[index])
                console.log(index, 'statementItems', statementItems.value[activeIndex.value].top)
            }

            if (isColliding) {
                const draggedMidY = draggedItem.top + draggedItem.height / 2;
                const itemMidY = item.top + item.height / 2;

                if (draggedMidY < itemMidY && !movedItems.has(index)) {
                    // 遮挡到上半部分，另一个元素下移
                    moveDownItems(index, draggedItem.height + spacing);
                } else if (draggedMidY > itemMidY && !movedItems.has(index + 1)) {
                    // 遮挡到下半部分，其他元素下移
                    moveDownItems(index + 1, draggedItem.height + spacing);
                }
            } else {
                // 检查是否有足够空间让元素归位
                const spaceAvailable = draggedItem.top >= requiredSpace;
                if (index == 1) {
                    console.log(index, 'spaceAvailable', spaceAvailable)
                    console.log(index, 'movedItems.has(index)', movedItems.has(index))

                }


                if (movedItems.has(index) && spaceAvailable) {
                    if (index == 1) {
                        console.log(index, 'restoreItemPosition')

                    }

                    restoreItemPosition(index);  // 归位
                    movedItems.delete(index);    // 清除下移记录
                }
            }
        }
    });
};



// 归位函数，恢复元素的原始位置
const restoreItemPosition = (index: number) => {
    if (index == 1) {
        console.log(index, '移动后initialPositions[index]', initialPositions[index])
    }
    statementItems.value[index].top = initialPositionsY[index];  // 恢复到初始位置
};



// 检查两个元素是否遮挡
const checkOverlap = (item1: StatementItem, item2: StatementItem) => {
    const item1Bottom = item1.top + item1.height;
    const item1Right = item1.left + item1.width;
    const item2Bottom = item2.top + item2.height;
    const item2Right = item2.left + item2.width;

    return (
        item1.top < item2Bottom &&
        item1Bottom > item2.top &&
        item1.left < item2Right &&
        item1Right > item2.left
    );
};

// 下移某个元素及其下面的元素
const moveDownItems = (startIndex: number, distance: number) => {
    for (let i = startIndex; i < statementItems.value.length; i++) {
        if (!movedItems.has(i)) { // 如果元素还没被移动过，才执行下移
            statementItems.value[i].top += distance;
            movedItems.add(i);  // 标记为已下移
        }
    }
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
const getChartComponent = (chartType: string) => {
    const chartComponents: { [key: string]: any } = {
        line: LineContainer,
        bar: BarContainer,
        pie: PieContainer,
        horizontalBar: HorizontalBarContainer,
    };
    return chartComponents[chartType] || null;
};



// 滚动时更新按钮位置的函数
const onScroll = (scroll: { scrollLeft: number, scrollTop: number }) => {
    if (activeIndex.value !== null && isInteracting.value) {
        isScrolling.value = true;
        // console.log('scroll.startY.value', startY.value);
        // 定义变量记录初始startY
        // console.log('onScroll.initialStartY.value', initialStartY.value);



        // 如果 previousScrollTop 为 null，记录第一次的 scrollTop
        if (previousScrollTop === null) {
            previousScrollTop = scroll.scrollTop;
        }

        // 计算当前滚动与第一次滚动的差值
        const scrollDiff = scroll.scrollTop - previousScrollTop;

        // 更新拖拽元素的位置 = 初始位置 + 滚动过程中的拖拽值 + 滚动的差值
        statementItems.value[activeIndex.value].top = initialPositions[activeIndex.value] + dragY + scrollDiff;

        // console.log('scroll.initialPositions', initialPositions[activeIndex.value]);

        // console.log('scroll.scrollTop', scroll.scrollTop);
        // console.log('scrollDiff', scrollDiff);
        // console.log('statementItems.value[activeIndex.value].top', statementItems.value[activeIndex.value].top);

        initialTop.value = statementItems.value[activeIndex.value].top;

        // 实时更新 startX.value，根据 X 轴滚动差值进行调整
        startY.value = initialStartY.value + scrollDiff + dragY;

        // console.log('onScroll.startY.value', startY.value);
    }
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
