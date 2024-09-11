<template>
    <div class="DataSidebar rounded-l-xl" v-if="props.ifShow">
        <p>xzp加油</p>
    </div>
</template>

<script setup lang="ts">
import { } from "vue"

const props = defineProps(['ifShow']);
const emit = defineEmits()

const toggleVisibility = () => {
    emit('updateIfShow', false);
};


</script>

<style lang="scss" scoped>
.DataSidebar{
    width: 40vw;
    height: 100vh;
    background-color: white;

    
    position: fixed;
    top: 0;
    right: 0;

    z-index: 9999;
}
</style>
