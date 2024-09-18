<template>
  <div class="Chart" v-if="ifShow">
    <!-- 合并后的标题和步骤条 -->
    <div class="flex justify-between items-center bg-gray-100 p-5 mb-5">
      <!-- 标题 -->
      <div class="flex items-center">
        <p class="text-2xl font-bold mr-5">创建数据源</p>
        <!-- 步骤条 -->
        <div class="flex items-center space-x-5">
          <div class="flex items-center" :class="{ 'text-green-500': currentStep >= 1, 'text-gray-500': currentStep < 1 }">
            <div class="w-8 h-8 flex items-center justify-center rounded-full"
                 :class="{ 'bg-green-500 text-white': currentStep >= 1, 'bg-gray-300': currentStep < 1 }">1</div>
            <p class="ml-2 text-sm">选择数据源</p>
          </div>
          <div class="flex items-center" :class="{ 'text-green-500': currentStep >= 2, 'text-gray-500': currentStep < 2 }">
            <div class="w-8 h-8 flex items-center justify-center rounded-full"
                 :class="{ 'bg-green-500 text-white': currentStep >= 2, 'bg-gray-300': currentStep < 2 }">2</div>
            <p class="ml-2 text-sm">配置连接</p>
          </div>
          <div class="flex items-center" :class="{ 'text-green-500': currentStep >= 3, 'text-gray-500': currentStep < 3 }">
            <div class="w-8 h-8 flex items-center justify-center rounded-full"
                 :class="{ 'bg-green-500 text-white': currentStep >= 3, 'bg-gray-300': currentStep < 3 }">3</div>
            <p class="ml-2 text-sm">完成</p>
          </div>
        </div>
      </div>
      <!-- 关闭按钮 -->
      <div class="Close cursor-pointer" @click="toggleVisibility">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </div>

    <!-- 主体内容 -->
    <div class="flex p-2 rounded-lg h-5/6">
      <!-- 左侧导航 -->
      <div class="w-1/4 bg-white rounded-lg p-5 shadow-md mr-2 h-full">
        <!-- 搜索框 -->
        <div class="relative mb-4">
          <svg class="absolute left-2 top-3 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
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
          <div v-show="expandedIndex === index" class="border border-gray-300 rounded">
            <div
                class="p-2 bg-gray-50 cursor-pointer flex items-center"
                v-for="(option, idx) in dataSource.options"
                :key="idx"
                @click="selectDatabase(option.name)"
            >
              <i :class="option.icon + ' mr-2'"></i>
              <span class="font-bold text-gray-600">{{ option.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧内容 -->
      <DatabaseForm :selectedDatabase="selectedDatabase" @cancel="cancelForm" @confirm="submitForm" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { dataSourceTypes } from '../constant/DataSourceData.ts';
import DatabaseForm from './DatabaseForm.vue'; // 引入子组件

const props = defineProps(['ifShow']);
const emit = defineEmits();
const selectedDatabase = ref('');
const currentStep = ref(1); // 当前步骤

const expandedIndex = ref<number | null>(null); // 控制当前展开的索引

// 函数
const selectDatabase = (db: string) => {
  selectedDatabase.value = db;
  currentStep.value = 2; // 进入下一步，配置连接
};

// 函数：切换下拉列表显示与隐藏
const toggleDropdown = (index: number) => {
  expandedIndex.value = expandedIndex.value === index ? null : index; // 切换展开/收回
};

const toggleVisibility = () => {
  emit('updateIfShow', false);
};

const cancelForm = () => {
  // 重置或执行表单取消操作
};

const submitForm = () => {
  currentStep.value = 3; // 最终步骤完成
};
</script>

<style scoped>
.Chart {
  width: 90%;
  height: 90%;
  position: absolute;
  z-index: 99999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #f0f0f3;
  border-radius: 20px;
  text-align: left;
  padding: 20px;
}
</style>
