<template>
    <div class="Sidebar">
        <div class="flex flex-col justify-between px-3">
            <div class="flex justify-between items-center px-2 pt-2 mb-5">
                <div v-for="(item, index) in sidebarItemIcons" :key="index" class="flex-1 border-b pb-2 cursor-pointer"
                    :class="activeIndex === index ? 'border-black text-black' : 'text-text-300 hover:text-black'"
                    @click="sidebarStore.setActive(index)">
                    <i :class="item.iconClass"></i>
                </div>
            </div>
        </div>

        <SidebarChat v-if="activeIndex === 0"/>
        <SidebarForm v-if="activeIndex === 1"/>
        <SidebarChart v-if="activeIndex === 2"/>
        <SidebarStatement v-if="activeIndex === 3"/>

    
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useSidebarStore } from '../stores/SidebarStore.ts';

import { sidebarItemIcons } from '../constant/sidebarItemIcons.ts';


// 获取全局的 tabStore
const sidebarStore = useSidebarStore();
const { activeIndex } = storeToRefs(sidebarStore);


</script>

<style lang="scss" scoped>
.Sidebar {
    padding-top: 0.625rem;
    padding-bottom: 0.625rem;
}
</style>
