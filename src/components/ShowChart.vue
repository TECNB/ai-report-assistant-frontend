<template>
  <img src="../assets/images/icon.png" alt="AI Avatar"
       class="w-6 h-6 rounded-full border border-gray-300 mr-3 object-cover" />
  <div class="flex flex-col items-center p-5 bg-gray-50 rounded-lg shadow-lg">

    <!-- 标题 -->
    <p class="text-lg font-bold mb-4">多个相关图表可于下方查看</p>

    <!-- 点击按钮 -->
    <el-button type="primary" @click="showChart" round>
      点击查看图表内容
    </el-button>

    <!-- 图表显示区 -->
    <div v-if="chartVisible" class="mt-5 w-full h-64">
      <el-card shadow="hover" class="w-full h-full">
        <LineContainer :data="chartData" :chartOption="chartOptions" />
      </el-card>
    </div>
  </div>
  <MaskLayer backgroundColor="rgba(0, 0, 0, 0.3)" :ifShow="chartVisible" />
  <Chart :ifShow="chartVisible" @updateIfShow="updateChartVisible" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LineContainer from './charts/LineContainer.vue'; // 假设你有一个封装好的图表组件

// 定义图表是否可见的状态
const chartVisible = ref(false);

const showChart = () => {
  chartVisible.value = !chartVisible.value;
};
const updateChartVisible = (value: boolean) => {
  chartVisible.value = value;
};
// 模拟的图表数据
const chartData = [
  { date: '2024-01-01', value: 120 },
  { date: '2024-02-01', value: 200 },
  { date: '2024-03-01', value: 150 }
];

// 图表选项
const chartOptions = {
  title: {
    text: '图表展示',
    left: 'center'
  },
  xAxis: {
    type: 'category',
    data: chartData.map(item => item.date)
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: chartData.map(item => item.value),
      type: 'line'
    }
  ]
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
