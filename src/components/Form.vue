<template>
    <div class="Form" v-if="props.ifShow">
        <div class="flex justify-between items-center border-b -mx-5 px-5 pb-2 ">
            <p class="text-2xl font-bold">生成的表格</p>
          <div class="flex items-center">
          <el-select
              v-model="selectedDownload"
              placeholder="下载"
              size="mini"
              @change="handleDownload"
              class="w-full"
              clearable :teleported="false"
          >
            <template #prefix>  <!-- 在下拉框前面添加“下载”字 -->
              <span class="mr-2">下载</span>
            </template>
            <el-option label="导出 PDF" value="pdf"></el-option>
            <el-option label="导出 图片" value="image"></el-option>
            <el-option label="导出 SQL" value="sql"></el-option>
            <el-option label="导出 Excel" value="excel"></el-option>
          </el-select>
            <div class="Close ml-4" @click="toggleVisibility">
                <el-icon size="20" class="cursor-pointer">
                    <Close />
                </el-icon>
            </div>
          </div>
        </div>

      <div class="loading-container" v-if="loading">
        <i class="fa-duotone fa-solid fa-loader rotating fa-xl text-black"></i>
                <p class="text-lg font-bold mt-3">加载中，请稍候...</p>
      </div>


        <el-scrollbar height="86%" wrap-style="width:90%;" class="flex justify-center" v-else>
            <div class="w-full flex flex-col justify-center items-center self-center">
                <div
                    class="w-full h-10 flex justify-between items-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg my-5 p-5">
                    <el-checkbox v-model="checked1" size="large" />
                    <p class="font-bold text-center">生态环境监测报告 - 年度空气质量统计</p>
                    <div class="">
                        <div class="flex justify-center items-center gap-2 bg-[#54a358] bg-opacity-[0.12] rounded-lg p-1"
                            v-if="ifAdd">
                            <el-icon color="#54a358">
                                <CircleCheck />
                            </el-icon>
                            <p class="text-green-700 text-sm">已添加</p>
                        </div>
                    </div>
                </div>

              <div class="w-full flex flex-col justify-center items-center self-center">
                <!-- 年度空气质量统计表格 -->
                <div class="w-full flex flex-col justify-between items-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] border rounded-lg p-5">
                  <el-table :data="formattedAqiData" style="width: 100%" border class="border-collapse border border-gray-300">
                    <!-- 年份列 -->
                    <el-table-column prop="label" label="Year" width="120" />

                    <!-- 动态生成月份列 -->
                    <el-table-column v-for="(month, index) in months" :key="index" :prop="month" :label="month" width="120" />
                  </el-table>
                </div>
              </div>


              <div
                    class="w-full h-10 flex justify-between items-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg my-5 p-5">
                    <el-checkbox v-model="checked2" size="large" />
                    <p class="font-bold text-center">生态环境评估报告 - 碳排放来源分析</p>
                    <div class="">
                        <div class="flex justify-center items-center gap-2 bg-[#54a358] bg-opacity-[0.12] rounded-lg p-1"
                            v-if="ifAdd">
                            <el-icon color="#54a358">
                                <CircleCheck />
                            </el-icon>
                            <p class="text-green-700 text-sm">已添加</p>
                        </div>
                    </div>
                </div>
              <div class="w-full flex flex-col justify-center items-center self-center">
                <!-- 年度COD统计表格 -->
                <div class="w-full flex flex-col justify-between items-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] border rounded-lg p-5">
                  <el-table :data="formattedCodData" style="width: 100%" border class="border-collapse border border-gray-300">
                    <!-- 年份列 -->
                    <el-table-column prop="label" label="Year" width="120" />

                    <!-- 动态生成月份列 -->
                    <el-table-column v-for="(month, index) in months" :key="index" :prop="month" :label="month" width="120" />
                  </el-table>
                </div>
              </div>


                <div
                    class="w-full h-10 flex justify-between items-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] border  rounded-lg my-5 p-5">
                    <el-checkbox v-model="checked3" size="large" />
                    <p class="font-bold text-center">生态环境变化分析 - 森林覆盖率年度报告</p>
                    <div class="">
                        <div class="flex justify-center items-center gap-2 bg-[#54a358] bg-opacity-[0.12] rounded-lg p-1"
                            v-if="ifAdd">
                            <el-icon color="#54a358">
                                <CircleCheck />
                            </el-icon>
                            <p class="text-green-700 text-sm">已添加</p>
                        </div>
                    </div>
                </div>

                <div
                    class="w-full flex justify-between items-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] border rounded-lg p-5">
                    <el-table :data="formattedRegionData" style="width: 100%" border
                        class="border-collapse border border-gray-300">

                        <el-table-column prop="label" label="Year" width="140" />
                        <el-table-column v-for="(region, index) in regions" :key="index" :prop="region" :label="region"
                            width="320" />
                    </el-table>
                </div>

            </div>
        </el-scrollbar>
        <div class="w-full flex justify-between items-center absolute bottom-3 border-t pt-3 -mx-5 px-5">
            <div class="flex flex-1 justify-start items-center gap-3">
                <el-checkbox v-model="checkedAll" label="全选" size="large" />
                <p class="text-text-300 text-sm">勾选的图表将被写入报表</p>
            </div>
            <div class="">
                <div class="bg-text-100 rounded-xl cursor-pointer py-3 px-8" @click="addChart" v-if="!ifAdd">
                    <p class="text-white font-bold">立即使用</p>
                </div>
                <div class="bg-text-400 rounded-xl cursor-not-allowed py-3 px-8" v-else>
                    <p class="text-white font-bold">立即使用</p>
                </div>
            </div>

            <div class="flex flex-1 justify-end items-center">
                <div
                    class="flex justify-between items-center gap-3 cursor-pointer rounded-xl hover:bg-gray-200 transition p-2">
                    <el-icon color="#999999">
                        <Delete />
                    </el-icon>
                    <p class="text-text-300">全部删除</p>
                </div>
                <div class="">

                </div>
            </div>

        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue';
import { useAqiData, useCodData, useRegionData } from '../constant/formData.ts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
const props = defineProps(['ifShow']);
const emit = defineEmits();
const { aqiData } = useAqiData();
const { codData } = useCodData()
const { regionData } = useRegionData();
let checked1 = ref(true);
let checked2 = ref(true);
let checked3 = ref(true);
let checkedAll = ref(true);
let isUpdating = false; // 用于避免循环更新
let loading = ref(true);  // 用于控制加载状态
import * as XLSX from 'xlsx';

const exportExcel = () => {
  // 创建 AQI 数据工作表
  const wsAqi = XLSX.utils.json_to_sheet(formattedAqiData.value);
  // 创建 COD 数据工作表
  const wsCod = XLSX.utils.json_to_sheet(formattedCodData.value);
  // 创建 Region 数据工作表
  const wsRegion = XLSX.utils.json_to_sheet(formattedRegionData.value);

  // 新建工作簿
  const wb = XLSX.utils.book_new();

  // 将工作表添加到工作簿中
  XLSX.utils.book_append_sheet(wb, wsAqi, 'AQI Data');
  XLSX.utils.book_append_sheet(wb, wsCod, 'COD Data');
  XLSX.utils.book_append_sheet(wb, wsRegion, 'Region Data');

  // 生成文件并下载
  XLSX.writeFile(wb, '2023年度碳排放与环境质量数据结构导入.xlsx');
};


const exportSQL = async () => {
  const sqlPath = 'src/assets/sql/2023年度碳排放与环境质量数据结构导入.sql'; // SQL文件路径
  try {
    const response = await fetch(sqlPath);
    if (!response.ok) {
      throw new Error(`下载SQL时出错: ${response.statusText}`);
    }
    const blob = await response.blob();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = '2023年度碳排放与环境质量报表.sql';
    document.body.appendChild(link); // 有些浏览器需要将链接添加到DOM中
    link.click();
    document.body.removeChild(link); // 下载后移除链接
    URL.revokeObjectURL(link.href); // 释放URL对象
  } catch (error) {
    console.error('导出SQL时出错:', error);
  }
};


const handleDownload = async (command: string) => {
  if (command === 'pdf') {
    console.log('下载PDF');
    await downloadPDF();
  } else if (command === 'image') {
    console.log('下载图片');
    await downloadImage();
  } else if (command === 'sql') {
    console.log('导出SQL');
    exportSQL();
  } else if (command === 'excel') {
    console.log('导出Excel');
    exportExcel();
  }
};

// 下载PDF的函数
const downloadPDF = async () => {
  const element = document.querySelector('.Form') as HTMLElement; // 选择需要下载的元素
  if (element) {
    const canvas = await html2canvas(element); // 将元素转为canvas
    const imgData = canvas.toDataURL('image/png'); // 获取图片数据
    const pdf = new jsPDF();

    // 将图片添加到PDF中
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width * 0.75, canvas.height * 0.75); // 根据需要调整大小
    pdf.save('report.pdf'); // 下载PDF
  }
};

// 下载图片的函数
const downloadImage = async () => {
  const element = document.querySelector('.Form') as HTMLElement; // 选择需要下载的元素
  if (element) {
    const canvas = await html2canvas(element); // 将元素转为canvas
    const imgData = canvas.toDataURL('image/png'); // 获取图片数据
    const link = document.createElement('a'); // 创建一个链接
    link.href = imgData; // 设置链接的href为图片数据
    link.download = 'report.png'; // 设置下载的文件名
    link.click(); // 模拟点击下载
  }
};
// 模拟加载过程
watch(() => props.ifShow, async (newValue) => {
  if (newValue) {
    loading.value = true;
    // 等待 2 秒模拟加载
    setTimeout(() => {
      loading.value = false;
    }, 2000);
  }
});

let ifAdd = ref(false);

const toggleVisibility = () => {
    emit('updateIfShow', false);
};
// 将数据转换为行列互换的形式
const formattedAqiData = computed(() => {
  // 获取所有不同的年份
  const years = [...new Set(aqiData.value.map(item => item.year))];

  // 按年份分组，并对每个年份的数据进行月份匹配
  return years.map(year => {
    const yearData = aqiData.value.filter(item => item.year === year);
    const aqiValues = yearData.map(item => item.aqi);

    // 返回该年数据，包含 label、月份和对应的 AQI 数据
    return {
      label: `${year} AQI`, // 每年的标签
      ...Object.fromEntries(months.map((month, index) => [month, aqiValues[index] || 'N/A'])) // N/A 处理可能的空数据
    };
  });
});

// 月份列表
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// 将数据转换为行列互换的形式
const formattedCodData = computed(() => {

  const years = [...new Set(codData.value.map(item => item.year))];

    return years.map(year => {
      const yearData = codData.value.filter(item => item.year === year)
      const codValues = yearData.map(item => item.cod);

      return {
        label: `${year} COD`,
        ...Object.fromEntries(months.map((month,index) => [month,codValues[index] || 'N/A' ]))
      }
    })
});


const regions = ['东部地区', '西部地区', '北部地区', '南部地区'];

const formattedRegionData = computed((()=>{
  const years = [...new Set((regionData.value.map(item =>item.year)))];
  return years.map(year =>{
    const yearData = regionData.value.filter(item => item.year === year)
    const percentageValues = yearData.map(item => item.percentage);
    return {
      label:`${year} %`,
      ...Object.fromEntries(regions.map((region,index) => [region,percentageValues[index] || 'N/A']))
    }

  })

}))
// const formattedRegionData = computed(() => {
//     const codValues = regionData.value.map(item => item.percentage);
//     return [
//         { label: '%', ...Object.fromEntries(regions.map((region, index) => [region, codValues[index]])) }
//     ];
// });
// 监听 ifShow 的变化，只有在为 true 时才初始化图表
watch(() => props.ifShow, async (newValue) => {
    if (newValue) {
        // 等待 DOM 挂载完成
        await nextTick();
    }
});

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

const addChart = () => {
    console.log('add chart');
    ifAdd.value = true;
    checked1.value = false;
    checked2.value = false;
    checked3.value = false;
    checkedAll.value = false;
};
</script>

<style lang="scss" scoped>
.Form {
    width: 94%;
    height: 94%;
    position: fixed;
    z-index: 99999;
    // 居中对齐
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    border-radius: 20px;
    text-align: left;
    padding: 20px;
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
.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.loading-spinner {
  animation: spin 1s linear infinite;
}
.rotating {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
