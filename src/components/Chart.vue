<template>
    <div class="Chart" v-if="props.ifShow">
        <div class="flex justify-between items-center">
            <p class="text-2xl font-bold">生成的图表</p>
            <div class="Close" @click="toggleVisibility">
                <el-icon size="20">
                    <Close />
                </el-icon>
            </div>
        </div>


    </div>
</template>

<script setup lang="ts">
import { } from 'vue';

const props = defineProps(['ifShow']);
const emit = defineEmits();

const toggleVisibility = () => {
    emit('updateIfShow', false);
};

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
</style>
