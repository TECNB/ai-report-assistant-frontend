<template>
    <div class="Form">
        <div class="flex justify-between items-center border-b -mx-5 px-5 pb-2 ">
            <p class="text-2xl font-bold">空气质量表</p>
            <!-- <div class="Close">
                <el-icon size="20" class="cursor-pointer">
                    <Close />
                </el-icon>
            </div> -->
        </div>
        
        <el-scrollbar height="95%" wrap-style="padding:20px" class="flex justify-center">
            <el-table :data="formattedAqiData" style="width: 100%" border
                        class="border-collapse border border-gray-300">
                        <el-table-column prop="label" label="Type" width="140" />
                        <el-table-column v-for="(month, index) in months" :key="index" :prop="month" :label="month"
                            width="120" />
                    </el-table>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useAqiData } from '../constant/formData.ts';

const { aqiData } = useAqiData();
let checked1 = ref(true);
let checked2 = ref(true);
let checked3 = ref(true);
let checkedAll = ref(true);
let isUpdating = false; // 用于避免循环更新


const formattedAqiData = computed(() => {
    // 获取现有年份
    const years = [...new Set(aqiData.value.map(item => item.year))];

    // 自动生成 2024 到 2028 的数据
    const futureYears = [2018, 2017, 2016, 2015, 2014,2013,2012,2011,2010,2009,2008,2007];
    
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
    return allYears.map(year => {
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
</style>
