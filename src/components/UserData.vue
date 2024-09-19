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
            <p class="font-bold text-gray-700">
              <i class="fa-solid fa-database mr-2"></i>{{ dataSource.category }}
            </p>
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

      <div class="w-3/4 bg-white rounded-lg shadow-md p-4">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="环境数据" name="first">
            <div class="my-4">
              <!-- 自定义表格样式，使用 Tailwind CSS 添加四方边框 -->
              <el-table :data="environmentData" :row-class-name="tableRowClassName" class="mb-6 w-full border border-gray-300">
                <!-- 监测日期 -->
                <!-- 监测日期 -->
                <el-table-column prop="date" label="监测日期" width="200">
                  <template v-slot:header>
                    <span>监测日期</span>
                    <i class="fas fa-calendar-alt ml-2"></i> <!-- 日历图标 -->
                  </template>
                  <template v-slot="scope">
                    <span class="font-bold text-lg">{{ scope.row.date }}</span>
                  </template>
                </el-table-column>

                <!-- 监测地点 -->
                <el-table-column prop="location" label="监测地点" width="150">
                  <template v-slot:header>
                    <span>监测地点</span>
                    <i class="fas fa-map-marker-alt ml-2"></i> <!-- 地图标记图标 -->
                  </template>
                  <template v-slot="scope">
                    <span class="font-bold text-lg">{{ scope.row.location }}</span>
                  </template>
                </el-table-column>

                <!-- 空气质量指数 -->
                <el-table-column prop="airQuality" label="空气质量指数" width="150">
                  <template v-slot:header>
                    <span>空气质量指数</span>
                    <i class="fas fa-wind ml-2"></i> <!-- 风的图标 -->
                  </template>
                  <template v-slot="scope">
                    <span class="font-bold text-lg">{{ scope.row.airQuality }}</span>
                  </template>
                </el-table-column>

                <!-- 水质情况 -->
                <el-table-column prop="waterQuality" label="水质情况" width="150">
                  <template v-slot:header>
                    <span>水质情况</span>
                    <i class="fas fa-water ml-2"></i> <!-- 水滴图标 -->
                  </template>
                  <template v-slot="scope">
                    <span class="font-bold text-lg">{{ scope.row.waterQuality }}</span>
                  </template>
                </el-table-column>

                <!-- 土壤污染等级 -->
                <el-table-column prop="soilPollution" label="土壤污染等级" width="150">
                  <template v-slot:header>
                    <span>土壤污染等级</span>
                    <i class="fas fa-seedling ml-2"></i> <!-- 苗木图标 -->
                  </template>
                  <template v-slot="scope">
                    <span class="font-bold text-lg">{{ scope.row.soilPollution }}</span>
                  </template>
                </el-table-column>

                <!-- 森林覆盖率 -->
                <el-table-column prop="forestCoverage" label="森林覆盖率" width="150">
                  <template v-slot:header>
                    <span>森林覆盖率</span>
                    <i class="fas fa-tree ml-2"></i> <!-- 树木图标 -->
                  </template>
                  <template v-slot="scope">
                    <span class="font-bold text-lg">{{ scope.row.forestCoverage }}</span>
                  </template>
                </el-table-column>

                <!-- 操作列 -->
                <el-table-column fixed="right" label="操作" width="200">
                  <template v-slot="scope">
                    <div @click="handleClick(scope.row)" class="font-bold text-black cursor-pointer inline-block mr-3">
                      <i class="fas fa-edit"></i>
                    </div>
                    <div class="font-bold text-black cursor-pointer inline-block mr-3">
                      <i class="fas fa-trash-alt"></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>

          <el-tab-pane label="字段" name="second">
            <div class="my-4">
              <el-table :data="tableData" style="width: 100%" class="mb-6 font-bold justify-between">
                <!-- 名称 -->
                <el-table-column prop="name" label="名称" />
                <!-- 备注 -->
                <el-table-column prop="note" label="备注" />
                <!-- 操作列 -->
                <el-table-column fixed="right" label="操作" >
                  <template v-slot="scope">
                    <div @click="handleClick(scope.row)" style="font-weight: bold; color: black; cursor: pointer; display: inline-block; margin-right: 10px;">
                      <i class="fa-solid fa-star"></i>
                    </div>
                    <div style="font-weight: bold; color: black; cursor: pointer; display: inline-block; margin-right: 10px;">
                      <i class="fa-regular fa-plus"></i>
                    </div>
                    <div style="font-weight: bold; color: black; cursor: pointer; display: inline-block;">
                      <i class="fa-light fa-circle-question"></i>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>

        </el-tabs>
      </div>

    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { tableData, dataSourceTypes,environmentData } from '../constant/DataSourceData.ts';  // 导入数据
import type { TabsPaneContext } from 'element-plus'

const expandedIndex = ref<number | null>(null); // 控制当前展开的索引
const selectedDatabase = ref('');
const props = defineProps({
  ifShow: Boolean
});
const emit = defineEmits();

const activeName = ref('first')


const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const selectDatabase = (db: string) => {
  selectedDatabase.value = db;
};

// 函数：切换下拉列表显示与隐藏
const toggleDropdown = (index: number) => {
  expandedIndex.value = expandedIndex.value === index ? null : index; // 切换展开/收回
};

// 表格行背景色实现灰白相间
const tableRowClassName = ({ rowIndex }: { rowIndex: number }) => {
  return rowIndex % 2 === 0 ? 'table-row-white' : 'table-row-gray';
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 20px;
  text-align: left;
  padding: 20px;
}
.el-table__header-wrapper th,
.el-table__body-wrapper td {
  @apply border border-gray-300; /* Tailwind 的边框类 */
}

.el-table__header-wrapper th {
  @apply bg-gray-100 font-bold text-left; /* 表头背景色、字体加粗、左对齐 */
}
.table-row-white {
  background-color: #ffffff;
}
.table-row-gray {
  background-color: #f5f5f5;
}
</style>
