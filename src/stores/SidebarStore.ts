// src/stores/tabStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSidebarStore = defineStore('tabStore', () => {

    // 当前激活的 index
    const activeIndex = ref(0);

    // 设置激活的 tab
    const setActive = (index: number) => {
        activeIndex.value = index;
    };

    return {
        activeIndex,
        setActive
    };
});