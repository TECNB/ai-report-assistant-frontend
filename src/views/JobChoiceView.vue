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
                    <el-input v-model="searchQuery" placeholder="搜索" class="">
                        <template #prefix>
                            <el-icon color="var(--text-100)" class="el-input__icon">
                                <search />
                            </el-icon>
                        </template>
                    </el-input>
                </div>

                <!-- 动态渲染多个职业大类 -->
                <JobCategory v-for="(category, index) in filteredJobCategories" :key="index" :title="category.title"
                    :jobs="category.jobs" :iconClass="category.iconClass" :iconColor="category.iconColor"
                    @update:selectedJobs="updateSelectedJobs" />
            </div>
        </main>

        <footer class="fixed bottom-0 left-0 right-0 bg-white shadow p-4 z-10">
            <div class="max-w-xl mx-auto text-center">
                <button :disabled="selectedJobs.length === 0" :class="{
                    'bg-gray-900 text-white': selectedJobs.length > 0,
                    'bg-gray-100 text-gray-400 cursor-not-allowed': selectedJobs.length === 0
                }" class="w-full px-8 py-4 rounded-lg font-bold transition-colors duration-300">
                    {{ selectedJobs.length > 0 ? '下一步' : '确定选择' }}
                </button>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import JobCategory from '../components/JobCategory.vue';

import { jobCategories } from '../constant/jobCategories';



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

<style lang="scss" scoped>
/* 添加需要的主页面样式 */
.el-input {
    height: 50px;

    border-radius: 12px;
    border: 0.5px solid var(--text-200);

    background-color: var(--bg-200);

    font-size: 18px;
    font-weight: bold;

    :deep(.el-input__wrapper) {
        border-radius: 12px;
        background-color: var(--bg-200);

    }


    :deep(.is-focus) {
        box-shadow: 0 0 0 1px var(--text-200)
    }
}
</style>
