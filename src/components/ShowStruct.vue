<template>
  <img src="../assets/images/icon.png" alt="AI Avatar"
       class="w-6 h-6 rounded-full border border-gray-300 mr-3 object-cover" />
  <div class="flex flex-col items-center p-5 bg-gray-50 rounded-lg shadow-lg">

    <!-- 标题 -->
    <p class="text-lg font-bold mb-4">多个结构化数据可于下方查看</p>

    <!-- 点击按钮 -->
    <el-button type="primary" @click="showForm" round>
      点击查看结构化数据内容
    </el-button>

    <!-- 图表显示区 -->
    <div v-if="chartVisible" class="mt-5 w-full h-64">

    </div>
  </div>
  <MaskLayer :ifShow="chartVisible" />
  <Chart :ifShow="chartVisible" @updateIfShow="updateChartVisible" />
  <Form :ifShow="formVisible" @updateIfShow="updateFormVisible" />
  <!-- 遮罩层 -->
  <MaskLayer :ifShow="formVisible" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

let formVisible = ref(false);
const updateFormVisible = (newValue: boolean) => {
  formVisible.value = newValue;
};
const showForm = () => {
  formVisible.value = !formVisible.value;
};
// 定义图表是否可见的状态
const chartVisible = ref(false);

const updateChartVisible = (value: boolean) => {
  chartVisible.value = value;
};



</script>

<style scoped>
.flex {
  display: flex;
}
.rounded-lg {
  border-radius: 0.5rem;
}
.shadow-lg {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
