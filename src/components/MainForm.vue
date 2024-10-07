<template>
  <div class="Form ">
    <div class="flex justify-between items-center border-b -mx-5 px-5 pb-2 ">
      <p class="text-2xl font-bold">空气质量表</p>
      <!-- <div class="Close">
                <el-icon size="20" class="cursor-pointer">
                    <Close />
                </el-icon>
            </div> -->
      <div class="flex items-center rounded-xl">
        <el-select v-model="sortOrder" placeholder="默认排序" clearable
          class="text-lg font-bold  w-48 min-w-[12rem] custom-select">
          <!-- 固定的 "排序" 前缀 -->
          <template #prefix>
            <span class="font-bold text-gray-400">排序：</span>
          </template>

          <!-- 可选项 -->
          <el-option label="日期倒序" value="desc" class="font-bold "></el-option>
          <el-option label="日期正序" value="asc" class="font-bold text-gray-300"></el-option>
        </el-select>
      </div>

    </div>

    <el-scrollbar height="95%" wrap-style="padding:20px" class="flex justify-center bg-gray-50 mt-3 rounded-lg ">
      <div class="flex items-center space-x-4 mb-5 bg-gray-50 rounded-2xl">
        <!-- 搜索框 -->
        <div class="flex-1 rounded-2xl">
          <el-input v-model="searchQuery" placeholder="请输入文字进行搜索" class="w-full text-lg font-sans">
            <template #prefix>
              <i class="fa-regular fa-magnifying-glass text-gray-500"></i>
            </template>
          </el-input>
        </div>

        <!-- 筛选器 -->
        <div>
          <el-select id="select" v-model="selectedYear" placeholder="" clearable class="w-full text-lg font-sans">
            <template #prefix>
              <i class="fa-regular fa-sort"></i>
              <p>筛选</p>
            </template>
            <el-option v-for="year in allYears" :key="year" :label="year" :value="year" />
          </el-select>
        </div>
      </div>

      <el-table :data="sortedAqiData" style="width: 100%" border class="border-collapse border border-gray-300">
        <el-table-column prop="label" label="Type" width="140" />
        <el-table-column v-for="(month, index) in months" :key="index" :prop="month" :label="month" width="120" />
      </el-table>
    </el-scrollbar>

  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useAqiData } from '../constant/formData.ts';
let searchQuery = ref(''); // 搜索框输入的内容
let selectedYear = ref(null); // 筛选的年份
const { aqiData } = useAqiData();
let checked1 = ref(true);
let checked2 = ref(true);
let checked3 = ref(true);
let checkedAll = ref(true);
let isUpdating = false; // 用于避免循环更新


let sortOrder = ref(''); // 排序选择框的值

const sortedAqiData = computed(() => {
  let data = [...formattedAqiData.value];
  if (sortOrder.value === 'asc') {
    return data.sort((a, b) => a.label.localeCompare(b.label));
  } else if (sortOrder.value === 'desc') {
    return data.sort((a, b) => b.label.localeCompare(a.label));
  }
  return data; // 默认排序
});

const allYears = computed(() => {
  return [...new Set(aqiData.value.map(item => item.year))].sort((a, b) => b - a);
});
const formattedAqiData = computed(() => {
  // 获取现有年份
  // const years = [...new Set(aqiData.value.map(item => item.year))];

  // 自动生成 2024 到 2028 的数据
  const futureYears = [2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007];

  futureYears.forEach(year => {
    months.forEach((month, index) => {
      // 使用递增的假数据，递增基础为上一年的最后一个数据 + 随机数
      const lastData = aqiData.value.find(item => item.year === 2023 && item.month === 'Dec');
      const baseAqi = lastData ? lastData.aqi : 60; // 如果找不到数据，默认从 60 开始
      const randomIncrement = Math.floor(Math.random() * 5) + 1; // 随机增加 1-5 的数值
      const aqi = baseAqi + (index + 1) * randomIncrement;

      // 插入假数据
      aqiData.value.push({
        year,
        month,
        aqi
      });
    });
  });

  // 重新获取所有年份
  const allYears = [...new Set(aqiData.value.map(item => item.year))];

  // 为每个年份生成对应的 AQI 列表
  return allYears.sort((a, b) => b - a)
    .map(year => {
      const aqiValues = months.map(month => {
        const data = aqiData.value.find(item => item.year === year && item.month === month);
        return data ? data.aqi : null;  // 如果找不到该月的数据，则返回 null
      });

      return {
        label: `${year} AQI`,
        ...Object.fromEntries(months.map((month, index) => [month, aqiValues[index]]))
      };
    });
});

// 月份列表
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];



// 监听 checkedAll 的变化
watch(checkedAll, (newVal) => {
  checked1.value = newVal;
  checked2.value = newVal;
  checked3.value = newVal;
});

// 监听单选项的变化
watch([checked1, checked2, checked3], ([newChecked1, newChecked2, newChecked3]) => {
  // 如果所有单选项都未被选中，则将全选设为 false
  if (!newChecked1 && !newChecked2 && !newChecked3) {
    isUpdating = false;
    checkedAll.value = false;
  } else if (newChecked1 && newChecked2 && newChecked3) {
    isUpdating = false;
    checkedAll.value = true;
  }
  if (!isUpdating) return; // 如果是内部更新，跳过

});
</script>

<style lang="scss" scoped>
.Form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 70%;
  height: 100%;
}

.custom-select .el-input__inner {
  @apply border-none bg-gray-100 rounded-xl px-4 py-2;
  /* 去掉边框, 添加背景色, 圆角, 内边距 */
}

/* 覆盖 focused 状态下的样式，防止获取焦点时的默认边框和阴影 */
.custom-select .el-input__inner:focus {
  @apply outline-none ring-0 border-none;
  /* 移除聚焦时的 outline 和阴影 */
}

/* 覆盖 el-select 下拉框的样式 */
.custom-select .el-select-dropdown {
  @apply rounded-xl bg-white border-none shadow-lg;
  /* 去掉边框，增加圆角和阴影 */
}

/* 设置每个 el-option 的样式 */
.custom-select .el-option {
  @apply rounded-lg px-4 py-2;
  /* 每个选项的圆角和内边距 */
}

/* 设置选中项的背景颜色 */
.custom-select .el-option.is-selected {
  @apply bg-gray-200;
  /* 选中项的填充色 */
}

:deep(.el-checkbox__inner) {
  zoom: 150%;
}

:deep(.el-checkbox.el-checkbox--large .el-checkbox__label) {
  font-size: 16px;
  color: #000;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: #000;
  border-color: #000;
}

:deep(.el-checkbox__inner:hover) {
  border-color: #000;
}

.el-select-dropdown {
  border-radius: 12px;
  /* Tailwind 类处理不了 el-select-dropdown，因此使用自定义样式 */
}

.el-input {
  height: 50px;

  border-radius: 12px;
  border: 0.5px solid var(--text-200);
  border: 0;
  background-color: white;

  font-size: 18px;
  font-weight: bold;


  :deep(.el-input__wrapper) {
    border-radius: 12px;
    background-color: white;

  }


  :deep(.is-focus) {
    box-shadow: 0 0 0 1px gray;
  }
}

// 下面为el-select部分
@mixin select_radius {
  border-radius: 12px;
}


// 控制el-select的长度以及圆角
:deep(.el-select__wrapper) {
  height: 50px;
  @include select_radius;
}

// 控制el-select中文字的样式
:deep(.el-select__placeholder) {
  color: var(--text-200);
  font-size: 18px;
  font-weight: bold;
}

// 控制点击后的边框颜色
:deep(.el-select__wrapper.is-focused) {
  box-shadow: 0 0 0 1px gray;
}

// 下面为下拉框部分
// 下面用于控制整体的下拉框圆角
:deep(.el-select__popper.el-popper) {
  @include select_radius;
}


//下拉框的文本未选中的样式
// .el-select-dropdown__item {

// }
//下拉框的文本颜色选中之后的样式
.el-select-dropdown__item.is-selected {
  color: gray;
}
</style>
