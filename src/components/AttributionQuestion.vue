<template>
    <div class="AttributionQuestion">
        <!-- 具体回答数据 -->
        <div class="flex gap-3 items-start">
            <img src="../assets/images/icon.png" alt="AI Avatar"
                class="w-6 h-6 rounded-full border border-gray-300 object-cover" />
            <div class="w-[1000px] h-64 bg-gray-50 flex flex-col items-start rounded-xl p-5">
                <!-- 顶部栏 -->
                <div class="w-full flex justify-between items-center gap-5 mb-6 relative">
                    <p class="text-lg font-bold">{{ content.description }}</p>

                    <div class="flex justify-center items-center gap-2">
                        <div class="border-l flex justify-center items-center pl-2">
                            <el-icon color="#9ca3af" size="24" class="">
                                <FullScreen />
                            </el-icon>
                        </div>
                    </div>
                </div>


                <!-- 对比数据 -->
                <div class="flex justify-start items-center gap-5">
                    <div class="flex flex-col justify-center items-start gap-3">
                        <div class="flex justify-center items-end gap-1">
                            <p class="text-3xl font-bold">{{ content.year_on_year_comparison.value_previous_year }}</p>
                            <p class="text-lg text-gray-600 font-bold">吨</p>
                        </div>
                        
                        <p class="text-lg text-gray-400">{{ content.year_on_year_comparison.previous_year }}年12月</p>
                    </div>
                    <i class="fa-regular fa-arrow-right-long mb-10"></i>
                    <div class="flex flex-col justify-center items-start gap-3">
                        <div class="flex justify-center items-end gap-1">
                            <p class="text-3xl font-bold">{{ content.total_value }}</p>
                            <p class="text-lg text-gray-600 font-bold">吨</p>
                        </div>
                        <p class="text-lg text-gray-400">{{ content.year }}年12月</p>
                    </div>
                    <div class="text-red-500 bg-red-100 rounded-lg p-2 mb-10">
                        <p>+{{ content.year_on_year_comparison.year_on_year_change }}吨(+{{ content.year_on_year_comparison.percentage_change }})</p>
                    </div>
                </div>

                <!-- 具体原因数据 -->


                <!-- 底部栏 -->
                <div class="w-full flex justify-end items-center border-t mt-5">
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
</template>

<script setup lang="ts">
import { } from "vue"

const props = defineProps(['content']);
</script>

<style lang="scss" scoped></style>
