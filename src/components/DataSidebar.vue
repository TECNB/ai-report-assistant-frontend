<template>
    <div>
        <!-- 遮罩层 -->
        <div class="overlay fixed inset-0 bg-black opacity-50" v-if="props.ifShow" @click="toggleVisibility"></div>

        <!-- 弹窗界面 -->
        <div class="DataSidebar bg-white text-black fixed inset-y-0 right-0 w-2/5 z-50 p-6 overflow-y-auto"
            v-if="props.ifShow">

            <!-- 顶部区域 -->
            <!-- 顶部区域：可用数据/销售数据分析 + 删除图标 -->
            <div class="header-top flex justify-between items-center">
                <div class="flex space-x-2 items-center">
                    <span class="text-sm text-gray-500">可用数据</span>
                    <span class="text-lg font-bold text-gray-800">/ 生态环境数据分析</span>
                </div>
              <div @click="toggleVisibility" class="cursor-pointer text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>

            <!-- 分割线 -->
            <hr class="my-4 border-gray-300" />

            <!-- 销售数据分析标题 + 负责人信息 -->
            <div class="header-main">
                <h1 class="text-xl font-bold text-black text-left">生态环境数据分析</h1>
                <div class="flex items-center mt-2">
                    <p class="text-sm text-gray-500">数据负责人：</p>
                    <img src="/src/assets/images/icon.png" alt="头像"
                        class="w-6 h-6 rounded-full border-2 border-black" />
                    <p class="text-sm text-black font-bold mx-4">TEC</p> <!-- 使用 mx-4 来调整 TEC 的左右距离 -->
                    <p class="text-sm text-gray-500 mx-3">上次学习时间: 23/09/17 14:27:11</p> <!-- 使用 ml-auto 将这个元素推到右侧 -->
                  <div class="bg-gray-800 text-white font-bold py-1 px-5 rounded ml-auto cursor-pointer">
                    提问
                  </div>
                    <!-- 添加 ml-4 来调整按钮与前面元素的距离 -->
                </div>
            </div>

            <!-- 快捷提问 -->
            <div class="quick-question mt-6">
                <div class="flex items-center">
                    <h3 class="text-lg font-semibold text-left">快捷提问</h3>
                    <svg class="w-5 h-5 text-gray-500 mx-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V5h2v6z" />
                    </svg> <!-- 问号图标 -->

                    <div class="flex items-center space-x-2 ml-auto">
                      <div @click="yourClickFunction" class="flex items-center text-gray-800 cursor-pointer">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 3a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H6a1 1 0 110-2h4V4a1 1 0 011-1z" />
                        </svg> <!-- 更新图标 -->
                        <span class="ml-auto">换一换</span>
                      </div>
                    </div>
                </div>

                <!-- 快捷提问列表 -->
                <div class="question-list flex flex-wrap gap-4 mt-4">
                  <div v-for="(item, index) in quickQuestionsData" :key="index"
                       class="question-btn bg-gray-100 text-black py-2 px-4 rounded flex items-center space-x-2 cursor-pointer">
                    <span>{{ item.question }}</span>
                    <span v-if="item.isCommon"
                          class="ml-2 px-2 py-0.5 border border-green-500 text-green-500 rounded-full text-xs">
        常见
    </span>
                  </div>
                </div>
            </div>

            <!-- 分割线 -->
            <!-- 分割线 -->
            <hr class="my-4 border-gray-300" />
            <!-- 字段预览/数据预览 选择 -->
            <div class="tab-selection mt-8 flex items-center">
              <div class="relative inline-block">
                <!-- 字段预览 -->
                <div @click="activeTab = 'fieldPreview'" class="font-semibold text-left pb-2 mr-5 cursor-pointer">
                  字段预览
                </div>

                <!-- 蓝色横杠 -->
                <div v-if="activeTab === 'fieldPreview'"
                     class="absolute left-1/4 right-2/4 bottom-0 h-1 bg-blue-500"></div> <!-- 缩小横杠长度 -->
              </div>

              <div class="relative inline-block">
                <!-- 数据预览 -->
                <div @click="activeTab = 'dataPreview'" class="font-semibold text-left pb-2 cursor-pointer">
                  数据预览
                </div>

                <!-- 蓝色横杠 -->
                <div v-if="activeTab === 'dataPreview'"
                     class="absolute left-1/4 right-1/4 bottom-0 h-1 bg-blue-500"></div> <!-- 缩小横杠长度 -->
              </div>



                <!-- 缩小后的搜索字段框 -->
                <div class="ml-auto">
                  <div class="relative">
                    <input type="text" placeholder="搜索字段"
                           class="search-input w-32 p-0.5 bg-white border border-gray-300 text-black rounded-full pl-10 shadow-sm focus:outline-none" />
                    <svg xmlns="http://www.w3.org/2000/svg"
                         class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M11 4a7 7 0 100 14 7 7 0 000-14zm0 0l6 6" /> <!-- 替换为搜索图标 -->
                    </svg>
                  </div>
                </div>
            </div>

            <!-- 字段预览内容 -->
            <div v-if="activeTab === 'fieldPreview'" class="field-preview mt-4">
                <!-- 字段名称和字段说明小标题 -->
                <div class="flex">
                    <span class="w-1/2 text-left text-gray-500 text-xs font-bold">字段名称</span>
                    <span class="w-1/2 text-left text-gray-500 text-xs font-bold">字段说明</span>
                </div>

                <!-- 数据行 -->
                <div v-for="(field, index) in fieldPreviewData" :key="index"
                    class="field-row flex py-2 border-gray-300">
                    <span class="field-name w-1/2 text-left text-gray-500 font-bold">{{ field.fieldName }}</span>
                    <span class="field-description w-1/2 text-left text-gray-600">{{ field.fieldDescription }}</span>
                </div>
            </div>

            <!-- 数据预览内容 -->
            <div v-if="activeTab === 'dataPreview'" class="data-preview mt-4">
                <el-table :data="environmentData" class="w-full border border-gray-300">
                    <!-- 表头 -->
                    <el-table-column prop="monitoringID" label="监测ID" width="180"
                        class="text-left font-bold text-gray-700 bg-gray-100">
                    </el-table-column>
                    <el-table-column prop="monitoringDate" label="监测日期" width="180"
                        class="text-left font-bold text-gray-700 bg-gray-100">
                    </el-table-column>
                    <el-table-column prop="method" label="监测方法" width="180"
                        class="text-left font-bold text-gray-700 bg-gray-100">
                    </el-table-column>
                    <el-table-column prop="region" label="区域" width="180"
                        class="text-left font-bold text-gray-700 bg-gray-100">
                    </el-table-column>
                    <el-table-column prop="province" label="省份" width="180"
                        class="text-left font-bold text-gray-700 bg-gray-100">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { environmentData } from "../constant/environmentData.ts"; // 导入环境数据
import { fieldPreviewData } from "../constant/fieldPreviewData.ts"; // 导入字段预览数据
import { quickQuestionsData } from "../constant/quickQuestionsData.ts"; // 导入快捷提问数据

const props = defineProps(['ifShow']);
const emit = defineEmits();

const toggleVisibility = () => {
    emit('updateIfShow', false);
};

// State for tab selection
const activeTab = ref('fieldPreview');  // Default to field preview
</script>

<style scoped>
.DataSidebar {
    width: 40vw;
}

.overlay {
    z-index: 999;
}

.DataSidebar {
    z-index: 1000;
}
</style>
