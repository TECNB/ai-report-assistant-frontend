<template>
    <div class="MainPipeline px-5 py-3">
        <div class="flex justify-between items-center border-b -mx-5 px-7 pb-2 ">
            <p class="text-2xl font-bold">空气质量数据导入</p>

        </div>

        <el-scrollbar height="100%" wrap-style="padding:20px" class="flex justify-start">
            <div class="flex justify-center items-start gap-10">
                <!-- 数据源 -->
                <div class="flex flex-col justify-start items-center gap-2">
                    <!-- 头部 -->
                    <div class="flex justify-center items-center relative cursor-pointer">
                        <!-- Arrow tail -->
                        <div class="absolute top-0 -left-3 w-3 h-16 bg-gray-200 opacity-80"></div>

                        <!-- Main body -->
                        <div class="w-72 h-16 flex justify-between items-center bg-gray-200 opacity-80 p-3">
                            <div class="flex flex-col justify-center items-start">
                                <p class="font-bold">数据源</p>
                                <p>2个数据源</p>
                            </div>
                            <div class="flex justify-center items-center gap-4">
                                <i class="fa-light fa-pen"></i>
                                <i class="fa-light fa-copy"></i>
                                <i class="fa-light fa-trash"></i>
                            </div>
                        </div>

                        <!-- Arrow head -->
                        <div class="absolute top-0 -right-5 w-5 h-16 bg-gray-200 opacity-80"
                            style="clip-path: polygon(0 0%, 100% 50%, 0 100%);"></div>
                    </div>

                    <!-- 主要部分 -->
                    <div class="w-72 h-[800px] border-r-2 border-gray-500 border-dashed translate-x-7 p-5">
                        <div class="-translate-x-5">
                            <div
                                class="flex flex-col bg-white p-5 border-4 border-transparent cursor-pointer rounded-xl shadow-lg hover:border-gray-300">
                                <div class="text-left">
                                    <p class="font-bold">空气质量表</p>
                                </div>
                                <div class="">
                                    <p></p>
                                </div>
                                <div class="">

                                </div>
                            </div>

                            <div
                                class="flex flex-col bg-white p-5 border-4 border-transparent cursor-pointer rounded-xl shadow-lg mt-5 hover:border-gray-300">
                                <div class="text-left">
                                    <p class="font-bold">河流污染表</p>
                                </div>
                                <div class="">
                                    <p></p>
                                </div>
                                <div class="">

                                </div>
                            </div>

                            <div
                                class="flex flex-col bg-gray-500/30  px-5 py-3 cursor-pointer rounded-xl shadow-lg mt-8 hover:bg-gray-500/50">
                                <div class="flex justify-center items-center gap-2" @click="showSetting">
                                    <i class="fa-regular fa-plus"></i>
                                    <p class="font-bold opacity-100">数据源</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 数据预处理 -->
                <div class="flex flex-col justify-start items-center gap-2">
                    <!-- 头部 -->
                    <div class="flex justify-center items-center relative cursor-pointer">
                        <!-- Arrow tail -->
                        <div class="absolute top-0 -left-3 w-3 h-16 bg-gray-200 opacity-80"></div>

                        <!-- Main body -->
                        <div class="w-72 h-16 flex justify-between items-center bg-gray-200 opacity-80 p-3">
                            <div class="flex flex-col justify-center items-start">
                                <p class="font-bold">数据预处理</p>
                                <p>2个任务</p>
                            </div>
                            <div class="flex justify-center items-center gap-4">
                                <i class="fa-light fa-pen"></i>
                                <i class="fa-light fa-copy"></i>
                                <i class="fa-light fa-trash"></i>
                            </div>
                        </div>

                        <!-- Arrow head -->
                        <div class="absolute top-0 -right-5 w-5 h-16 bg-gray-200 opacity-80"
                            style="clip-path: polygon(0 0%, 100% 50%, 0 100%);"></div>
                    </div>

                    <!-- 主要部分 -->
                    <div class="w-72 h-[800px] border-r-2 border-gray-500 border-dashed translate-x-7 p-5">
                        <el-popover :visible="accessSettingsVisible" placement="bottom" :width="400">
                            <div class="flex justify-between items-center border-b -mx-5 px-5 pb-2 ">
                                <p class="text-lg text-black font-bold">准入设置</p>
                                <div class="Close" @click="accessSettingsVisible = false">
                                    <el-icon size="20" class="cursor-pointer">
                                        <Close />
                                    </el-icon>
                                </div>
                            </div>

                            <div class="flex justify-start items-center gap-3 mt-5">
                                <p>设置帮助</p>
                                <el-popover :visible="accessSettingsHelpVisible" placement="right" :width="650">
                                    <p>自动：流水线执行时自动进入该阶段继续运行。</p>
                                    <p>手动：流水线执行时需手动确认后才能进入该阶段继续运行。</p>
                                    <p>时间窗：流水线阶段任务在执行窗口内时可以运行，若未在执行窗口内则无法运行该阶段任务。</p>
                                    <template #reference>
                                        <i class="fa-light fa-circle-question" @click="accessSettingsHelpVisible = !accessSettingsHelpVisible"></i>
                                    </template>
                                </el-popover>
                                
                            </div>
                            <div class="mt-5">
                                <el-checkbox v-model="accessSettings1" label="自动" class="el-checkbox-class" />
                                <el-checkbox v-model="accessSettings2" label="手动" class="el-checkbox-class" />
                                <el-checkbox v-model="accessSettings3" label="时间窗" class="el-checkbox-class" />
                            </div>


                            <div class="flex justify-center items-center gap-5 mt-10">
                                <div class="bg-black cursor-pointer rounded-lg px-10 py-2"
                                    @click="accessSettingsVisible = false">
                                    <p class=" text-white">确定</p>
                                </div>

                                <div class="bg-white cursor-pointer rounded-lg border px-10 py-2"
                                    @click="accessSettingsVisible = false">
                                    <p class=" text-black">取消</p>
                                </div>
                            </div>
                            <template #reference>
                                <div class="w-7 h-7 absolute -left-14 top-8 bg-black rounded-full z-50 flex justify-center items-center"
                                    @click="showAccessSettings">
                                    <i class="fa-light fa-up-to-bracket fa-rotate-90 " style="color: white;"></i>
                                </div>
                            </template>
                        </el-popover>

                        <div class="-translate-x-5">
                            <div
                                class="relative flex flex-col bg-white p-3 border-4 border-transparent cursor-pointer rounded-xl shadow-lg hover:border-gray-300">
                                <div class="text-left">
                                    <p class="font-bold">缺失值和异常值清洗</p>
                                </div>
                                <div class="w-10 absolute -left-11 top-5 border border-b-4">
                                </div>
                                <div
                                    class="w-4 h-4 absolute left-28 -bottom-3 flex justify-center items-center rounded-xl bg-white shadow-[0_2px_6px_0_rgba(37,43,58,0.4)]">
                                    <i class="fa-regular fa-plus fa-2xs"></i>
                                </div>
                                <div class="w-10 absolute -right-11 top-5 border border-b-4">
                                </div>
                            </div>


                            <div
                                class="relative flex flex-col bg-white p-3 border-4 border-transparent cursor-pointer rounded-xl shadow-lg mt-5 hover:border-gray-300">
                                <div class="text-left">
                                    <p class="font-bold">标准化数据</p>
                                </div>
                                <div
                                    class="w-4 h-4 absolute left-28 -bottom-3 flex justify-center items-center rounded-xl bg-white shadow-[0_2px_6px_0_rgba(37,43,58,0.4)]">
                                    <i class="fa-regular fa-plus fa-2xs"></i>
                                </div>
                            </div>

                            <div
                                class="flex flex-col bg-white p-2 border-4 border-transparent cursor-pointer rounded-xl shadow-md mt-5 hover:shadow-lg">
                                <div class="flex justify-center items-center gap-2" @click="showSetting">
                                    <i class="fa-regular fa-plus"></i>
                                    <p class="font-bold opacity-100">并行任务</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 图表生成 -->
                <div class="flex flex-col justify-start items-center gap-2">
                    <!-- 头部 -->
                    <div class="flex justify-center items-center relative cursor-pointer">
                        <!-- Arrow tail -->
                        <div class="absolute top-0 -left-3 w-3 h-16 bg-gray-200 opacity-80"></div>

                        <!-- Main body -->
                        <div class="w-72 h-16 flex justify-between items-center bg-gray-200 opacity-80 p-3">
                            <div class="flex flex-col justify-center items-start">
                                <p class="font-bold">图表生成</p>
                                <p>3个任务</p>
                            </div>
                            <div class="flex justify-center items-center gap-4">
                                <i class="fa-light fa-pen"></i>
                                <i class="fa-light fa-copy"></i>
                                <i class="fa-light fa-trash"></i>
                            </div>
                        </div>

                        <!-- Arrow head -->
                        <div class="absolute top-0 -right-5 w-5 h-16 bg-gray-200 opacity-80"
                            style="clip-path: polygon(0 0%, 100% 50%, 0 100%);"></div>
                    </div>

                    <!-- 主要部分 -->
                    <div class="w-72 h-[800px] relative border-r-2 border-gray-500 border-dashed translate-x-7 p-5">
                        <div class="-translate-x-5">
                            <div
                                class="relative flex flex-col bg-white p-3 border-4 border-transparent cursor-pointer rounded-xl shadow-lg hover:border-gray-300">
                                <div class="text-left">
                                    <p class="font-bold">获取时间轴</p>
                                </div>
                                <div
                                    class="w-4 h-4 absolute left-28 -bottom-3 flex justify-center items-center rounded-xl bg-white shadow-[0_2px_6px_0_rgba(37,43,58,0.4)]">
                                    <i class="fa-regular fa-plus fa-2xs"></i>
                                </div>
                            </div>
                            <div
                                class="relative flex flex-col bg-white p-3 border-4 border-transparent cursor-pointer rounded-xl shadow-lg mt-5 hover:border-gray-300">
                                <div class="text-left">
                                    <p class="font-bold">取数</p>
                                </div>
                                <div
                                    class="w-4 h-4 absolute left-28 -bottom-3 flex justify-center items-center rounded-xl bg-white shadow-[0_2px_6px_0_rgba(37,43,58,0.4)]">
                                    <i class="fa-regular fa-plus fa-2xs"></i>
                                </div>
                            </div>
                            <div
                                class="relative flex flex-col bg-white p-3 border-4 border-transparent cursor-pointer rounded-xl shadow-lg mt-5 hover:border-gray-300">
                                <div class="text-left">
                                    <p class="font-bold">图表选择</p>
                                </div>
                                <div
                                    class="w-4 h-4 absolute left-28 -bottom-3 flex justify-center items-center rounded-xl bg-white shadow-[0_2px_6px_0_rgba(37,43,58,0.4)]">
                                    <i class="fa-regular fa-plus fa-2xs"></i>
                                </div>
                            </div>

                            <div
                                class="flex flex-col bg-white p-2 border-4 border-transparent cursor-pointer rounded-xl shadow-md mt-5 hover:shadow-lg">
                                <div class="flex justify-center items-center gap-2" @click="showSetting">
                                    <i class="fa-regular fa-plus"></i>
                                    <p class="font-bold opacity-100">并行任务</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 图表生成 -->
                <div class="flex flex-col justify-start items-center gap-2">
                    <!-- 头部 -->
                    <div class="flex justify-center items-center relative cursor-pointer">
                        <!-- Arrow tail -->
                        <div class="absolute top-0 -left-3 w-3 h-16 bg-gray-200 opacity-80"></div>

                        <!-- Main body -->
                        <div class="w-72 h-16 flex justify-between items-center bg-gray-200 opacity-80 p-3">
                            <div class="flex flex-col justify-center items-start">
                                <p class="font-bold">报表生成</p>
                                <p>1个任务</p>
                            </div>
                            <div class="flex justify-center items-center gap-4">
                                <i class="fa-light fa-pen"></i>
                                <i class="fa-light fa-copy"></i>
                                <i class="fa-light fa-trash"></i>
                            </div>
                        </div>

                        <!-- Arrow head -->
                        <div class="absolute top-0 -right-5 w-5 h-16 bg-gray-200 opacity-80"
                            style="clip-path: polygon(0 0%, 100% 50%, 0 100%);"></div>
                    </div>

                    <!-- 主要部分 -->
                    <div class="w-72 h-[800px] border-r-2 border-gray-500 border-dashed translate-x-7 p-5">
                        <div class="-translate-x-5">
                            <div
                                class="relative flex flex-col bg-white p-3 border-4 border-transparent cursor-pointer rounded-xl shadow-lg hover:border-gray-300">
                                <div class="text-left">
                                    <p class="font-bold">输出文件类型选择</p>
                                </div>
                                <div
                                    class="w-4 h-4 absolute left-28 -bottom-3 flex justify-center items-center rounded-xl bg-white shadow-[0_2px_6px_0_rgba(37,43,58,0.4)]">
                                    <i class="fa-regular fa-plus fa-2xs"></i>
                                </div>
                            </div>

                            <div
                                class="flex flex-col bg-white p-2 border-4 border-transparent cursor-pointer rounded-xl shadow-md mt-5 hover:shadow-lg">
                                <div class="flex justify-center items-center gap-2" @click="showSetting">
                                    <i class="fa-regular fa-plus"></i>
                                    <p class="font-bold opacity-100">并行任务</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>

        </el-scrollbar>

        <Setting :ifShow="settingVisible" @updateIfShow="updateSettingVisible" />
        <!-- 遮罩层 -->
        <MaskLayer :ifShow="settingVisible" backgroundColor="rgba(0, 0, 0, 0.4)" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const settingVisible = ref(false);
const accessSettingsVisible = ref(false);
const accessSettingsHelpVisible = ref(false);

const accessSettings1 = ref(false);
const accessSettings2 = ref(false);
const accessSettings3 = ref(false);


const showSetting = () => {
    console.log('showSetting');
    settingVisible.value = true;
}
const showAccessSettings = () => {
    console.log('showAccessSettings');
    accessSettingsVisible.value = true;
}


const updateSettingVisible = (newValue: boolean) => {
    settingVisible.value = newValue;
};



</script>

<style lang="scss" scoped>
.MainPipeline {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    background-color: #F6F6F8;
    background-image: radial-gradient(circle at 10px 10px, #D3D3D3 1.5px, transparent 1px);
    background-size: 30px 30px;
}

.line {
    z-index: 1000;
    position: absolute;
    top: 0px;
    right: -18px;
    clip-path: url(#arrow-head);
    width: 20px;
    height: 66px;
    background-image: linear-gradient(90deg, #2a3c85, #2a3c85);
}

:deep(.el-checkbox__inner) {
    border-radius: 50%;
    zoom: 100%;
}

:deep(.el-checkbox__inner) {
    width: 19px;
    height: 19px;
    border-radius: 22.5px;
}

:deep(.el-checkbox__inner::after) {
    border: 1px solid #fff;
    border-left: 0;
    border-top: 0;
    left: 7px;
    top: 4px;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner::after) {
    transform: rotate(50deg) scaleY(1.5);
}

:deep(.el-checkbox__inner:hover) {
    border-color: var(--text-100);
}

.el-checkbox-class {
    --el-checkbox-checked-bg-color: #000;
    --el-checkbox-checked-input-border-color: #000;
    --el-checkbox-checked-text-color: #000
}
</style>
