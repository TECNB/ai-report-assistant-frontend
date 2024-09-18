<template>
    <div class="UserData" v-if="props.ifShow">
        <div class="flex justify-between items-center border-b -mx-5 px-5 pb-2 ">
            <p class="text-2xl font-bold">我的数据源</p>
            <div class="Close" @click="toggleVisibility">
                <el-icon size="20" class="cursor-pointer">
                    <Close />
                </el-icon>
            </div>
        </div>
      <div class="flex p-2 rounded-lg h-[95%] mt-4 pb-4 ">

        <div class="w-1/4 bg-white rounded-lg p-5 shadow-md mr-4 h-full">
          <!-- 搜索框 -->
          <div class="relative mb-4">
            <svg class="absolute left-2 top-3 text-gray-400 w-5 h-5" fill="none" stroke="currentColor"
                 viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input type="text" placeholder="请搜索" class="border border-gray-300 p-2 pl-8 w-full rounded" />
          </div>

          <!-- SQL 类型列表 -->
          <div v-for="(dataSource, index) in dataSourceTypes" :key="index" class="mb-4">
            <!-- 数据源分类名称和下拉图标 -->
            <div class="flex justify-between items-center cursor-pointer" @click="toggleDropdown(index)">
              <p class="font-bold text-gray-700">{{ dataSource.category }}</p>
              <!-- 图标：根据展开状态切换图标方向 -->
              <i :class="expandedIndex === index ? 'fa-solid fa-caret-up' : 'fa-regular fa-caret-down'"></i>
            </div>

            <!-- 下拉内容，点击数据源时显示/隐藏 -->
            <transition name="fade">
              <div v-show="expandedIndex === index" class="border border-gray-300 rounded">
                <div class="p-2 bg-gray-50 cursor-pointer flex items-center"
                     v-for="(option, idx) in dataSource.options" :key="idx"
                     @click="selectDatabase(option.name)">
                  <i :class="option.icon + ' mr-2'"></i>
                  <span class="font-bold text-gray-600">{{ option.name }}</span>
                </div>
              </div>
            </transition>
          </div>

        </div>

        <div class="w-3/4 bg-white rounded-lg p-1 shadow-md h-full">

        </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import {dataSourceTypes} from "../constant/DataSourceData.ts";
const expandedIndex = ref<number | null>(null); // 控制当前展开的索引
const selectedDatabase = ref('');
const props = defineProps({
    ifShow: Boolean
});
const emit = defineEmits();
const selectDatabase = (db: string) => {
  selectedDatabase.value = db;

};

// 函数：切换下拉列表显示与隐藏
const toggleDropdown = (index: number) => {
  expandedIndex.value = expandedIndex.value === index ? null : index; // 切换展开/收回
};
const toggleVisibility = () => {
    emit('updateIfShow', false);
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.UserData {
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
</style>
