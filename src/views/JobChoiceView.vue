<template>
  <div class="relative min-h-screen bg-gray-100">
    <header class="fixed top-0 left-0 right-0 bg-white shadow p-4 z-10 flex justify-between items-center">
      <img src="../assets/images/icon.png" alt="Logo" class="h-8 w-auto">
    </header>

    <main class="pt-20 pb-24 px-4">
      <div class="bg-gray-100 p-6 rounded-lg shadow-md max-w-xl mx-auto">
        <h1 class="text-2xl font-semibold mb-4">开始选择你的职业身份</h1>
        <p class="text-gray-500 mb-6">这些将帮助推荐相关的职业活动和网络组。</p>

        <div class="relative mb-6">
          <input
              type="text"
              placeholder="搜索职业"
              v-model="searchQuery"
              class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- 动态渲染多个职业大类 -->
        <JobCategory
            v-for="(category, index) in filteredJobCategories"
            :key="index"
            :title="category.title"
            :jobs="category.jobs"
            :iconClass="category.iconClass"
            :iconColor="category.iconColor"
            @update:selectedJobs="updateSelectedJobs"
        />
      </div>
    </main>

    <footer class="fixed bottom-0 left-0 right-0 bg-white shadow p-4 z-10">
      <div class="max-w-xl mx-auto text-center">
        <button
            :disabled="selectedJobs.length === 0"
            :class="{
            'bg-emerald-700 text-white': selectedJobs.length > 0,
            'bg-gray-100 text-gray-400 cursor-not-allowed': selectedJobs.length === 0
          }"
            class="w-full px-8 py-4 rounded-lg font-bold transition-colors duration-300"
        >
          {{ selectedJobs.length > 0 ? '下一步' : '确定选择' }}
        </button>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import JobCategory from '../components/JobCategory.vue';
import { ref, computed } from 'vue';

const jobCategories = ref([
  {
    title: '信息技术 (IT)',
    jobs: ['软件开发', '前端开发工程师', '全栈开发工程师'],
    iconClass: 'fa-laptop',
    iconColor: 'text-blue-500'
  },
  {
    title: '市场营销',
    jobs: ['市场策划', '内容营销', '品牌经理'],
    iconClass: 'fas fa-chart-line',
    iconColor: 'text-green-500'
  },
  {
    title: '设计',
    jobs: ['UI/UX 设计师', '平面设计师', '插画师'],
    iconClass: 'fas fa-pencil-ruler',
    iconColor: 'text-purple-500'
  },
  {
    title: '人力资源',
    jobs: ['招聘专员', '培训经理', '员工关系顾问'],
    iconClass: 'fas fa-users',
    iconColor: 'text-yellow-500'
  },
  {
    title: '金融服务',
    jobs: ['金融分析师', '投资经理', '会计师'],
    iconClass: 'fas fa-chart-bar',
    iconColor: 'text-indigo-500'
  },
  {
    title: '教育与培训',
    jobs: ['教师', '教育顾问', '培训师'],
    iconClass: 'fas fa-chalkboard-teacher',
    iconColor: 'text-red-500'
  },
  {
    title: '法律服务',
    jobs: ['律师', '法律顾问', '法务专员'],
    iconClass: 'fas fa-gavel',
    iconColor: 'text-gray-700'
  },
  {
    title: '健康与保健',
    jobs: ['护士', '理疗师', '营养师'],
    iconClass: 'fas fa-heartbeat',
    iconColor: 'text-pink-500'
  },
  {
    title: '工程与建筑',
    jobs: ['土木工程师', '机械工程师', '建筑师'],
    iconClass: 'fas fa-hard-hat',
    iconColor: 'text-orange-500'
  },
  {
    title: '公共关系',
    jobs: ['公关专员', '品牌公关', '媒体关系经理'],
    iconClass: 'fas fa-bullhorn',
    iconColor: 'text-teal-500'
  },
  {
    title: '客户服务',
    jobs: ['客户服务代表', '客户支持经理', '售后服务专员'],
    iconClass: 'fas fa-headset',
    iconColor: 'text-blue-700'
  },
  {
    title: '销售与业务发展',
    jobs: ['销售代表', '业务拓展经理', '渠道经理'],
    iconClass: 'fas fa-handshake',
    iconColor: 'text-green-700'
  }
]);

const searchQuery = ref('');  // 搜索输入的绑定

// 计算属性，根据搜索查询过滤职业列表
const filteredJobCategories = computed(() => {
  if (!searchQuery.value) {
    return jobCategories.value;
  }

  // 过滤 jobCategories 中包含搜索查询的职业
  return jobCategories.value
      .map(category => {
        const filteredJobs = category.jobs.filter(job =>
            job.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
        return {
          ...category,
          jobs: filteredJobs
        };
      })
      .filter(category => category.jobs.length > 0);  // 过滤掉没有匹配职业的小类
});

const selectedJobs = ref<string[]>([]);

const updateSelectedJobs = (newSelectedJobs: string[]) => {
  selectedJobs.value = newSelectedJobs;
};
</script>

<style scoped>
/* 添加需要的主页面样式 */
</style>
