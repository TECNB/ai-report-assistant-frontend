<template>
  <div class="SidebarForm px-3 py-2">
    <div class="flex justify-start items-center gap-3">
      <!-- 搜索图标 -->
      <el-icon size="16">
        <Search />
      </el-icon>

      <!-- 搜索文字 -->
      <p class="text-sm font-bold text-text-300">搜索</p>

      <!-- 加号图标，保持在右边 -->
      <el-icon class="ml-auto hover:bg-bg-300 cursor-pointer rounded-xl" size="20" color="#676767 transition" @click="showDataSource">
        <Plus />
      </el-icon>
    </div>

    <!-- 标题 -->
    <div class="flex justify-between items-center mt-3">
      <p class="text-left text-gray-500 font-bold">全部表格</p>

      <!-- 圆角黑色按钮 -->
      <div class="ml-3 cursor-pointer" v-if="sideLeftStore.AiTalk === 1" @click="showChart">
        <div class="font-bold text-gray-600 px-1 py-1">完成</div>
      </div>

    </div>

    <!-- 表格内容 -->
    <div v-for="(form, index) in formContant" :key="index" class="pt-2 flex flex-col gap-2">
      <!-- 表单标题，点击选中该表的所有 items -->
      <p @click="toggleSelectForm(form.source)" :class="{'bg-selected': selectedForms[form.source]}"
         class="text-left whitespace-nowrap overflow-hidden text-text-100 p-3 hover:bg-bg-300 cursor-pointer rounded-xl transition">
        {{ form.source }}
      </p>

      <!-- 表单项 -->
      <div class="border-l-2 ml-4 space-y-2 pl-5">
        <div v-for="(item, idx) in form.items" :key="idx" @click="toggleSelectItem(item.text)"
             :class="{'bg-selected': selectedItems[item.text]}"
             class="flex justify-start items-center hover:bg-bg-300 cursor-pointer rounded-xl px-4 py-2">
          <i class="fa-regular fa-table"></i>
          <p class="text-left whitespace-nowrap overflow-hidden text-text-100 text-sm pl-3 transition">
            {{ item.text }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <DataSource :ifShow="dataSourceVisible" @updateIfShow="updateDataSourceVisible" />
  <MaskLayer :ifShow="dataSourceVisible" />
  <MaskLayer :ifShow="chartVisible" />
  <Chart :ifShow="chartVisible" @updateIfShow="updateChartVisible" />
</template>


<script setup lang="ts">
import {ref, reactive,watch} from "vue";
import { formContant } from '../constant/formContant';
import { useSideLeftStore,useSideTuBiaoStore } from '../stores/SidebarStore.ts';

let chartVisible = ref(false);
const SideTuBiaoStore = useSideTuBiaoStore();
const showChart = () => {
  sideLeftStore.setAiTalk(0)
  chartVisible.value = !chartVisible.value;
  SideTuBiaoStore.TuBiao = 1;
};
watch(() => chartVisible.value, (newVal) => {
  if (newVal === true) {
    // 清空所有表和表单项的选中状态
    Object.keys(selectedForms).forEach((key) => {
      selectedForms[key] = false;
    });
    Object.keys(selectedItems).forEach((key) => {
      selectedItems[key] = false;
    });
  }
});
const updateChartVisible = (value: boolean) => {
  chartVisible.value = value;
};
// 重置选中状态的函数
const resetSelection = () => {
  // 清空所有表和表单项的选中状态
  Object.keys(selectedForms).forEach((key) => {
    selectedForms[key] = false;
  });
  Object.keys(selectedItems).forEach((key) => {
    selectedItems[key] = false;
  });
};

// 控制是否显示数据源
let dataSourceVisible = ref(false);
const showDataSource = () => {
  dataSourceVisible.value = !dataSourceVisible.value;
};

const updateDataSourceVisible = (value: boolean) => {
  dataSourceVisible.value = value;
};

// 获取 AiTalk 变量
const sideLeftStore = useSideLeftStore(); // AiTalk 来自这里

// 选择状态相关变量
const selectedForms = reactive<Record<string, boolean>>({});
const selectedItems = reactive<Record<string, boolean>>({});

// 切换选中表的所有项
const toggleSelectForm = (formSource: string) => {
  if (sideLeftStore.AiTalk === 1) {
    if (selectedForms[formSource]) {
      // 如果表已被选中，取消选择表下的所有 items
      selectedForms[formSource] = false;
      formContant.find(form => form.source === formSource)?.items.forEach(item => {
        selectedItems[item.text] = false;
      });
    } else {
      // 如果表未被选中，选中表下的所有 items
      selectedForms[formSource] = true;
      formContant.find(form => form.source === formSource)?.items.forEach(item => {
        selectedItems[item.text] = true;
      });
    }
  } else {
    resetSelection(); // AiTalk 不为 1 时重置选中状态
  }
};

const toggleSelectItem = (itemText: string) => {
  if (sideLeftStore.AiTalk === 1) {
    selectedItems[itemText] = !selectedItems[itemText];
  } else {
    resetSelection(); // AiTalk 不为 1 时重置选中状态
  }
};


</script>

<style lang="scss" scoped>
/* 设置选中时的背景颜色和间距 */
.bg-selected {
  @apply bg-gray-200; /* Tailwind 的灰色背景 */
}

.form-title {
  @apply p-3 mb-2 rounded-xl; /* 添加内边距、间距和圆角 */
}

.form-item {
  @apply p-3 mb-2 rounded-xl; /* 添加内边距、间距和圆角 */
}

/* 增加 hover 效果 */
.form-item:hover {
  @apply bg-gray-100;
}

.form-item-text {
  @apply pl-3;
}
</style>


<!--<template>-->
<!--    <div class="SidebarForm px-3 p-2">-->
<!--      <div class="flex justify-start items-center gap-3">-->
<!--        &lt;!&ndash; 搜索图标 &ndash;&gt;-->
<!--        <el-icon size="16">-->
<!--          <Search />-->
<!--        </el-icon>-->

<!--        &lt;!&ndash; 搜索文字 &ndash;&gt;-->
<!--        <p class="text-sm font-bold text-text-300">搜索</p>-->

<!--        &lt;!&ndash; 加号图标，保持在右边 &ndash;&gt;-->
<!--        <el-icon class="ml-auto hover:bg-bg-300 cursor-pointer rounded-xl" size="20" color="#676767 transition" @click="showDataSource">-->
<!--          <Plus />-->
<!--        </el-icon>-->
<!--      </div>-->
<!--        <p class="text-left text-gray-500 font-bold mt-3">全部表格</p>-->

<!--        <div v-for="(form, index) in formContant" :key="index" class="pt-2 flex flex-col gap-2">-->
<!--            <p-->
<!--                class="text-left whitespace-nowrap overflow-hidden text-text-100  p-2 hover:bg-bg-300 cursor-pointer rounded-xl transition">-->
<!--                {{ form.source }}-->
<!--            </p>-->
<!--            <div class="border-l-2 ml-4 px-5">-->
<!--                <div class="flex justify-start items-center gap-2  hover:bg-bg-300 cursor-pointer rounded-xl px-3" v-for="(item, idx) in form.items"-->
<!--                    :key="idx">-->
<!--                    <i class="fa-regular fa-table"></i>-->
<!--                    <p-->
<!--                        class="text-left whitespace-nowrap overflow-hidden text-text-100 text-sm p-2  transition">-->
<!--                        {{ item.text }}-->
<!--                    </p>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
<!--  <DataSource :ifShow="dataSourceVisible" @updateIfShow="updateDataSourceVisible" />-->
<!--  <MaskLayer :ifShow="dataSourceVisible" />-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import {ref} from "vue"-->
<!--import { formContant } from '../constant/formContant';-->
<!--import { useSideLeftStore} from '../stores/SidebarStore.ts';-->
<!--let dataSourceVisible = ref(false);-->
<!--const sideLeftStore = useSideLeftStore();-->
<!--const showDataSource = () => {-->
<!--  dataSourceVisible.value = !dataSourceVisible.value;-->
<!--}-->
<!--const updateDataSourceVisible = (value: boolean) => {-->
<!--  dataSourceVisible.value = value;-->
<!--}-->
<!--</script>-->

<!--<style lang="scss" scoped></style>-->
