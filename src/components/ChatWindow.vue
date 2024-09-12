<template>
    <el-scrollbar height="100%" wrap-style="width:100%;" class="flex justify-center -mx-5">
        <div id="chat-window" class="flex-1 px-24 py-10">
            <div v-for="(msg, index) in props.displayedMessages" :key="index" class="mb-4 flex items-start">
                <div v-if="msg.type === 'user'" class="bg-gray-50 rounded-3xl px-5 py-2 ml-auto max-w-md">
                    <p class="">{{ msg.content }}</p>
                </div>
                <div v-if="msg.type === 'loading'" class="skeleton-loader w-full">
                    <div class="skeleton-line"></div>
                    <div class="skeleton-line"></div>
                    <div class="skeleton-line"></div>
                </div>
                <div v-if="msg.type === 'ai'" class="flex gap-3 items-start">
                    <img src="../assets/images/icon.png" alt="AI Avatar"
                        class="w-6 h-6 rounded-full border border-gray-300 object-cover" />
                    <div class="flex flex-col">
                        <!-- Static Title -->
                        <div class="flex items-center">
                            <p class="font-bold mb-0.5">生态环境报表助手</p>
                        </div>
                        <!-- Dynamic Content -->
                        <div class="flex items-start">
                            <p class="">{{ msg.content }}</p>
                        </div>
                        <!-- Action Icons -->
                        <div class="action-icons flex gap-3 mt-2 text-sm text-gray-500">
                            <i class="fas fa-pen"></i>
                            <!-- 复制文档图标 -->
                            <i class="fas fa-clipboard"></i>
                            <!-- 刷新图标 -->
                            <i class="fas fa-sync-alt"></i>
                            <!-- 添加图标 -->
                            <i class="fas fa-headphones"></i>
                            <!-- 编辑图标 -->
                            <i class="fas fa-circle-info"></i>
                            <!-- 消息图标 -->
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                </div>

                <!-- 具体回答数据 -->
                <div v-if="msg.type === 'chart'" class="flex gap-3 items-start">
                    <img src="../assets/images/icon.png" alt="AI Avatar"
                        class="w-6 h-6 rounded-full border border-gray-300 object-cover" />
                    <div class="w-[1000px] h-64 bg-gray-50 flex flex-col items-start rounded-xl p-5">
                        <!-- 顶部栏 -->
                        <div class="w-full flex justify-between items-center gap-5 mb-6 relative">
                            <p class="text-lg font-bold">{{ chatExample.description }}</p>

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
                                    <div v-for="(option, index) in chartOptions" :key="index" class="cursor-pointer">
                                        <i :class="`fa-regular ${option.icon} fa-xl`" style="color: #71c4ef;"></i>
                                        <p class="text-gray-600 mt-1">{{ option.label }}</p>
                                    </div>
                                </div>
                            </transition>


                        </div>

                        <!-- 主要数据 -->
                        <p>排放值（累计）</p>
                        <div class="flex justify-center items-end gap-3 mt-3">
                            <p class="text-3xl font-bold">{{ chatExample.total_value }}</p>
                            <p>{{ chatExample.unit }}</p>
                        </div>

                        <div class="flex justify-center items-end gap-3 mt-3">
                            <p class="text-gray-400">年同比</p>
                            <p class="text-green-500">+{{ chatExample.year_on_year_comparison.year_on_year_change
                                }}%</p>
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
        </div>
    </el-scrollbar>


    <AICode :ifShow="aiCodeVisible" @updateIfShow="updateAICodeVisible" />
    <!-- 遮罩层 -->
    <MaskLayer :ifShow="aiCodeVisible" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import chatExample from '../constant/chatExample'; // 导入聊天示例
import { chartOptions } from '../constant/chartOptions';

const props = defineProps({
    displayedMessages: Array,
});

let ifChangeTable = ref(false);

let aiCodeVisible = ref(false);
let chartDropDownVisible = ref(false);

const changeTable = () => {
    ifChangeTable.value = !ifChangeTable.value;
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
.skeleton-loader {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.skeleton-line {
    width: 100%;
    height: 20px;
    background-color: #e0e0e0;
    border-radius: 4px;
    animation: pulse 1.5s infinite ease-in-out;
}
</style>