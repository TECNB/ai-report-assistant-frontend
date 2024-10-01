<template>
    <div class="SidebarForm px-3 p-2">
        <div class="flex justify-start items-center gap-3 ">
            <el-icon size="16">
                <Search />
            </el-icon>
            <p class="text-sm font-bold text-text-300">搜索</p>
        </div>
      <div class="flex justify-between items-center mt-3">
        <p class="text-left text-gray-500 font-bold">全部报表</p>

        <!-- 圆角黑色按钮 -->
        <div class="ml-3 cursor-pointer" v-if="sideLeftStore.AiTalk === 1" @click="showStatement">
          <div class="font-bold text-gray-600 px-1 py-1">完成</div>
        </div>
      </div>

        <div v-for="(form, index) in statementContent" :key="index" class="pt-2 flex flex-col gap-2">
            <p
                @click="toggleSelectForm(form.source)" :class="{'bg-selected': selectedForms[form.source]}"
                class="text-left whitespace-nowrap overflow-hidden text-text-100  p-2 hover:bg-bg-300 cursor-pointer rounded-xl transition">
                {{ form.source }}
            </p>
            <div class="border-l-2 ml-4 px-5">
                <div class="flex justify-start items-center gap-2  hover:bg-bg-300 cursor-pointer rounded-xl px-3" v-for="(item, idx) in form.items"
                    :key="idx"
                     @click="toggleSelectItem(item.text)"
                     :class="{'bg-selected': selectedItems[item.text]}"
                >
                    <i class="fa-regular fa-memo"></i>
                    <p
                        class="text-left whitespace-nowrap overflow-hidden text-text-100 text-sm p-3  transition">
                        {{ item.text }}
                    </p>
                </div>
            </div>
        </div>
    </div>
  <MaskLayer :ifShow="chartVisible" />
  <Chart :ifShow="chartVisible" @updateIfShow="updateChartVisible" />
  <MaskLayer backgroundColor="rgba(0, 0, 0, 0.3)" :ifShow="statementVisible" />
  <Statement :ifShow="statementVisible" @updateIfShow="updateStatementVisible" />
</template>

<script setup lang="ts">
import {ref, reactive, watch} from "vue"
import { statementContent } from '../constant/StatementContent';
import { useSideLeftStore ,useSideBaoBiaoStore} from '../stores/SidebarStore.ts';
let statementVisible = ref(false);
let chartVisible = ref(false);
const showStatement = () => {
  sideLeftStore.setAiTalk(0)
  statementVisible.value = !statementVisible.value;
  sideBaoBiaoStore.BaoBiao = 1;
}
const updateStatementVisible = (value: boolean) => {
  statementVisible.value = value;
}
const sideBaoBiaoStore = useSideBaoBiaoStore()
// 获取 AiTalk 变量
const sideLeftStore = useSideLeftStore(); // AiTalk 来自这里
const updateChartVisible = (value: boolean) => {
  chartVisible.value = value;
};
// 选择状态相关变量
const selectedForms = reactive<Record<string, boolean>>({});
const selectedItems = reactive<Record<string, boolean>>({});

// 切换选中表的所有项
const toggleSelectForm = (formSource: string) => {
  if (sideLeftStore.AiTalk === 1) {
    if (selectedForms[formSource]) {
      // 如果表已被选中，取消选择表下的所有 items
      selectedForms[formSource] = false;
      statementContent.find(form => form.source === formSource)?.items.forEach(item => {
        selectedItems[item.text] = false;
      });
    } else {
      // 如果表未被选中，选中表下的所有 items
      selectedForms[formSource] = true;
      statementContent.find(form => form.source === formSource)?.items.forEach(item => {
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
const resetSelection = () => {
  // 清空所有表和表单项的选中状态
  Object.keys(selectedForms).forEach((key) => {
    selectedForms[key] = false;
  });
  Object.keys(selectedItems).forEach((key) => {
    selectedItems[key] = false;
  });
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
</script>

<style lang="scss" scoped>
/* 设置选中时的背景颜色和间距 */
.bg-selected {
  @apply bg-gray-200; /* Tailwind 的灰色背景 */
  margin-bottom: 8px;
}

.form-title {
  @apply p-2 mb-2 rounded-xl; /* 添加内边距、间距和圆角 */
}

.form-item {
  @apply p-2 mb-2 rounded-xl; /* 添加内边距、间距和圆角 */
}

/* 增加 hover 效果 */
.form-item:hover {
  @apply bg-gray-100;
}

.form-item-text {
  @apply pl-3;
}
</style>
