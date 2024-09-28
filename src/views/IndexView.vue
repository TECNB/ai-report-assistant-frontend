<template>
    <div class="IndexView">
        <div class="w-64 h-full bg-bg-200 rounded-r-2xl">
            <Sidebar />
        </div>
        <div class="flex-1 h-full px-5 py-3" v-if="activeIndex===0||AiTalk === 1||AiTalk ===0">
            <Chat />
        </div>
        <div class="flex-1 h-full px-5 py-3" v-if="activeIndex===1&&AiTalk===2">
            <MainForm />
        </div>
        <div class="flex-1 h-full px-5 py-3" v-if="activeIndex===2&&AiTalk===3">
            <MainChart />
        </div>
        <div class="flex-1 h-full px-5 py-3" v-if="activeIndex===3&&AiTalk===4">
            <MainStatement />
        </div>
        <div class="flex-1 h-full px-5 py-3" v-if="activeIndex===4&&AiTalk===5">
            <MainPipeline />
        </div>
    </div>

</template>

<script setup lang="ts">

import { storeToRefs } from 'pinia';
// 引入SidebarStore
import  { useSidebarStore,useSideLeftStore } from "../stores/SidebarStore"
// watch(()=>AiTalk.value,(val)=>{
//   if( val !== 0){
//     console.log("AiTalk:",val)
//   }
// })
const sidebarStore = useSidebarStore()
const sideLeftStore = useSideLeftStore()
const {AiTalk} = storeToRefs(sideLeftStore);
const { activeIndex } = storeToRefs(sidebarStore);

</script>

<style lang="scss" scoped>
.IndexView {
    height: 100vh;
    display: flex;
}
</style>
