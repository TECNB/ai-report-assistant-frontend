<template>
    <div class="AICode" v-if="props.ifShow">
        <div class="flex justify-between items-center border-b -mx-5 px-5 pb-2 ">
            <p class="text-2xl font-bold">AI取数过程（xzp加油）</p>
            <div class="Close" @click="toggleVisibility">
                <el-icon size="20" class="cursor-pointer">
                    <Close />
                </el-icon>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { } from "vue"
const props = defineProps({
    ifShow: Boolean
})
const emit = defineEmits();

const toggleVisibility = () => {
    emit('updateIfShow', false);
};

</script>

<style lang="scss" scoped>
.AICode {
    width: 70%;
    height: 80%;
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
