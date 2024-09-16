<template>
    <div class="Chart" v-if="props.ifShow">
        <div class="flex justify-between items-center border-b -mx-5 px-5 pb-2 ">
            <p class="text-2xl font-bold">创建数据源</p>
            <div class="Close" @click="toggleVisibility">
                <el-icon size="20" class="cursor-pointer">
                    <Close />
                </el-icon>
            </div>
        </div>
        <!-- 侧边栏 -->
        <el-scrollbar height="86%" wrap-style="width:90%;" class="flex justify-center">
            <p>xzp加油</p>
        </el-scrollbar>
        <!-- 主要配置界面 -->
        <div class="">
            
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';


const props = defineProps(['ifShow']);
const emit = defineEmits();

const toggleVisibility = () => {
    emit('updateIfShow', false);
};
</script>

<style lang="scss" scoped>
.Chart {
    width: 94%;
    height: 94%;
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
