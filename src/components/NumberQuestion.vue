<template>
    <div class="NumberQuestion">
        <!-- 具体回答数据 -->
        <div class="flex gap-3 items-start">
            <img src="../assets/images/icon.png" alt="AI Avatar"
                class="w-6 h-6 rounded-full border border-gray-300 object-cover" />
            <div :class="`w-[1000px] ${heightClass} bg-gray-50 flex flex-col items-start rounded-xl p-5`">
                <!-- 顶部栏 -->
                <div class="w-full flex justify-between items-center gap-5 mb-6 relative">
                    <p class="text-lg font-bold">{{ props.content.description }}</p>

                    <div class="flex justify-center items-center gap-2">
                        <i class="fa-solid fa-table fa-xl cursor-pointer" style="color: #9ca3af;"
                            @click="changeTable"></i>
                        <div class="flex justify-center items-center gap-1 hover:bg-gray-200 cursor-pointer rounded-lg p-2"
                            @click="showChartDropDown">
                            <i class="fa-solid fa-table-list fa-xl" style="color: #9ca3af;"></i>
                            <el-icon v-if="!chartDropDownVisible" color="#9ca3af" size="20">
                                <ArrowDownBold />
                            </el-icon>
                            <el-icon v-else color="#9ca3af" size="20">
                                <ArrowUpBold />
                            </el-icon>
                        </div>

                        <div class="border-l flex justify-center items-center pl-2">
                            <el-icon color="#9ca3af" size="24" class="">
                                <FullScreen />
                            </el-icon>
                        </div>
                    </div>

                    <transition name="fade">
                        <div class="absolute top-10 right-10 grid grid-rows-3 grid-flow-col gap-4 bg-white rounded-xl z-10 p-5 shadow-lg"
                            v-if="chartDropDownVisible">
                            <div v-for="(option, index) in chartOptions" :key="index" class="cursor-pointer"
                                @click="changeChart">
                                <i :class="`fa-regular ${option.icon} fa-xl`" style="color: #71c4ef;"></i>
                                <p class="text-gray-600 mt-1">{{ option.label }}</p>
                            </div>
                        </div>
                    </transition>
                </div>


                <!-- 主要数据 -->
                <div class="text-left h-full flex flex-col justify-center" v-if="chatType == 'chat'">
                    <p>排放值（累计）</p>
                    <div class="flex justify-center items-end gap-3 mt-3">
                        <p class="text-3xl font-bold">{{ props.content.total_value }}</p>
                        <p>{{ props.content.unit }}</p>
                    </div>

                    <div class="flex justify-start items-center gap-3 mt-3">
                        <p class="text-gray-400">年同比</p>
                        <p class="text-green-500">+{{ props.content.year_on_year_comparison.year_on_year_change
                            }}%</p>
                    </div>
                </div>

                <!-- 切换表格数据 -->
                <div class="w-full h-[65%]" v-if="chatType == 'table'">
                    <el-table :data="gasEmissionsTableData" style="width: 100%;height: 100%;" stripe class="tableBox">
                        <el-table-column prop="date" width="500" label="日期"></el-table-column>
                        <el-table-column prop="greenhouseGasEmissions" label="排放量(吨)"></el-table-column>
                    </el-table>
                </div>

                <div class="w-full h-[65%]" v-if="chatType == 'lineChart'">
                    <LineContainer width="100%" :height="200" :data="airLineData" :chartOption="airLineOptions" />
                </div>



                <!-- 底部栏 -->
                <div class="w-full flex justify-between items-center border-t mt-5">
                    <div class="text-gray-500 hover:text-gray-900 cursor-pointer mt-3" @click="showAICode">
                        <p>查看AI取数过程</p>
                    </div>
                    <div class="flex justify-center items-center gap-5 mt-3">
                        <div class="flex justify-center items-center gap-2 cursor-pointer">
                            <el-icon color="#9ca3af">
                                <Share />
                            </el-icon>
                            <p class="text-gray-400">分享</p>
                        </div>
                        <div class="flex justify-center items-center gap-2 cursor-pointer">
                            <el-icon color="#9ca3af">
                                <DataAnalysis />
                            </el-icon>
                            <p class="text-gray-400">添加到报表</p>
                        </div>
                        <div class="flex justify-center items-center gap-2 cursor-pointer">
                            <el-icon color="#9ca3af">
                                <Download />
                            </el-icon>
                            <p class="text-gray-400">导出</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <AICode :ifShow="aiCodeVisible" @updateIfShow="updateAICodeVisible" />
    <!-- 遮罩层 -->
    <MaskLayer :ifShow="aiCodeVisible" />

</template>

<script setup lang="ts">
import { ref } from "vue"
import { chartOptions } from '../constant/chartOptions';
import { gasEmissionsTableData } from '../constant/gasEmissionsTableData';

import airLineOptions from '../utils/airLineOptions';
import LineContainer from './charts/LineContainer.vue';
import { airLineData } from '../constant/airLineData';

const props = defineProps(['content']);

const emit = defineEmits();

console.log(props.content)

// 定义一个变量，用于动态控制类名
const heightClass = ref('h-64');

// 定义状态
let chatType = ref("chat");
let ifChangeTable = ref(false);

let aiCodeVisible = ref(false);
let chartDropDownVisible = ref(false);

const changeTable = () => {
    ifChangeTable.value = !ifChangeTable.value;
    heightClass.value = ifChangeTable.value ? 'h-64' : 'h-96';
    chatType.value = ifChangeTable.value ? 'chat' : 'table';
};
const changeChart = () => {
    chartDropDownVisible.value = false;
    heightClass.value = 'h-96';
    chatType.value = 'lineChart';
};

const showChartDropDown = () => {
    chartDropDownVisible.value = !chartDropDownVisible.value;
};
const showAICode = () => {
    aiCodeVisible.value = !aiCodeVisible.value;
};


const updateAICodeVisible = (newValue: boolean) => {
    aiCodeVisible.value = newValue;
};
</script>

<style lang="scss" scoped>
.NumberQuestion {
    width: 100%;
    height: 100%;
    margin-bottom: 1.25rem;
}
</style>
