<template>
    <div class="IndexView">
        <div class="w-64 h-full bg-bg-200 rounded-r-2xl">
            <Sidebar />
        </div>
        <div class="flex-1 h-full px-5 py-3" v-if="activeIndex===0">
            <Chat />
        </div>
        <div class="flex-1 h-full px-5 py-3" v-if="activeIndex===1">
            <MainForm />
        </div>
        <div class="flex-1 h-full px-5 py-3" v-if="activeIndex===2">
            <Chat />
        </div>
        <div class="flex-1 h-full px-5 py-3" v-if="activeIndex===3">
            <Chat />
        </div>
    </div>

</template>

<script setup lang="ts">
import { } from "vue"
import { storeToRefs } from 'pinia';
// 引入SidebarStore
import  { useSidebarStore } from "../stores/SidebarStore"

const sidebarStore = useSidebarStore()

const { activeIndex } = storeToRefs(sidebarStore);

</script>

<style lang="scss" scoped>
.IndexView {
    height: 100vh;
    display: flex;
}
</style>
