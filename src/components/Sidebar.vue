<template>
  <div class="Sidebar">
    <div class="flex flex-col justify-between px-3">
      <div class="flex justify-between items-center px-2 pt-2 mb-5">
        <div v-for="(item, index) in sidebarItemIcons" :key="index" class="flex-1 border-b pb-2 cursor-pointer"
             :class="activeIndex === index ? 'border-black text-black' : 'text-text-300 hover:text-black'"
             @click="handleClick(index)">
          <i :class="item.iconClass"></i>
        </div>
      </div>
    </div>

    <!-- 根据 activeIndex 的值渲染不同的 Sidebar 组件 -->
    <SidebarChat v-if="activeIndex === 0"/>
    <SidebarForm v-if="activeIndex === 1"/>
    <SidebarChart v-if="activeIndex === 2"/>
    <SidebarStatement v-if="activeIndex === 3"/>
    <SidebarPipelinet v-if="activeIndex === 4"/>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSidebarStore, useSideLeftStore } from '../stores/SidebarStore.ts';
import { sidebarItemIcons } from '../constant/sidebarItemIcons.ts';

// 获取 stores
const sidebarStore = useSidebarStore();
const sideLeftStore = useSideLeftStore();
const { activeIndex } = storeToRefs(sidebarStore);
const { AiTalk } = storeToRefs(sideLeftStore);

// 点击时修改 activeIndex 和 AiTalk 的值
const handleClick = (index: number) => {
  // 设置 activeIndex
  sidebarStore.setActive(index);

  // 修改 AiTalk 的值，这里可以自定义变化逻辑
  AiTalk.value = index + 1; // 例如：将 AiTalk 设置为 index + 1
};
</script>

<style lang="scss" scoped>
.Sidebar {
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
}
</style>

<!--<template>-->
<!--    <div class="Sidebar">-->
<!--        <div class="flex flex-col justify-between px-3">-->
<!--            <div class="flex justify-between items-center px-2 pt-2 mb-5">-->
<!--                <div v-for="(item, index) in sidebarItemIcons" :key="index" class="flex-1 border-b pb-2 cursor-pointer"-->
<!--                    :class="activeIndex === index ? 'border-black text-black' : 'text-text-300 hover:text-black'"-->
<!--                    @click="sidebarStore.setActive(index)">-->
<!--                    <i :class="item.iconClass"></i>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->

<!--        <SidebarChat v-if="activeIndex === 0"/>-->
<!--        <SidebarForm v-if="activeIndex === 1"/>-->
<!--        <SidebarChart v-if="activeIndex === 2"/>-->
<!--        <SidebarStatement v-if="activeIndex === 3"/>-->

<!--    -->
<!--    </div>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { storeToRefs } from 'pinia';-->
<!--import { watch,onMounted } from "vue";-->
<!--import { useSidebarStore,useSideLeftStore } from '../stores/SidebarStore.ts';-->

<!--import { sidebarItemIcons } from '../constant/sidebarItemIcons.ts';-->
<!--onMounted(() => {-->
<!--  // 使用 watch 监听 activeIndex 的变化-->
<!--  watch(() => activeIndex.value, (newIndex) => {-->
<!--    // 在 activeIndex 变化时，修改 AiTalk 的值-->

<!--    AiTalk.value = newIndex + 1;-->
<!--  });-->
<!--});-->
<!--const sideLeftStore = useSideLeftStore();-->
<!--const {AiTalk} = storeToRefs(sideLeftStore);-->
<!--// 获取全局的 tabStore-->
<!--const sidebarStore = useSidebarStore();-->
<!--const { activeIndex } = storeToRefs(sidebarStore);-->


<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--.Sidebar {-->
<!--    padding-top: 0.625rem;-->
<!--    padding-bottom: 0.625rem;-->
<!--}-->
<!--</style>-->
