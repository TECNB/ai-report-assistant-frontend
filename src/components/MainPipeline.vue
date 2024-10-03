<template>
    <div class="MainPipeline w-full px-5 py-3">
        <div class="w-[92%] flex justify-between items-center border-b -mx-5 px-7 pb-2 ">
            <p class="text-2xl font-bold">空气质量数据导入</p>

            <div class="flex justify-center items-center gap-5">
                <div class="w-60">
                    <el-slider v-model="sliderValue" :max="maxScroll" @input="inputSlider" :show-tooltip="false" class="el-slider-style"></el-slider>
                </div>
                <div class="h-6 border-l-2 border-gray-300">
                    
                </div>
                <div class="bg-gray-200 rounded-md cursor-pointer px-5 py-2">
                    <p class="text-black">取消</p>
                </div>
                <div class="bg-gray-200 rounded-md cursor-pointer px-5 py-2">
                    <p class="text-black">保存</p>
                </div>
                <div class="bg-gray-700 rounded-md cursor-pointer px-5 py-2">
                    <p class="text-white">保存并执行</p>
                </div>
            </div>
        </div>

        <el-scrollbar height="100%" class="w-[1300px]" ref="scrollbarRef" @scroll="handleScroll">
            <div class="flex justify-start items-start gap-10 p-5 w-[1780px]" ref="innerRef">
                <!-- 数据源 -->
                <div class="flex flex-col justify-start items-center gap-2">
                    <PipelineHeader title="数据源" :num="2"/>

                    <!-- 主要部分 -->
                    <div class="w-72 h-[800px] border-r-2 border-gray-500 border-dashed translate-x-7 p-5">
                        <div class="-translate-x-5">
                            <div
                                class="flex flex-col bg-white p-5 border-4 border-transparent cursor-pointer rounded-xl shadow-lg hover:border-gray-300">
                                <div class="text-left">
                                    <p class="font-bold">年度空气质量统计表</p>
                                </div>
                                <div class="">
                                    <p></p>
                                </div>
                                <div class="">

                                </div>
                                <!-- 过程连线 -->
                                <div class="w-11 absolute -right-11 top-6 border border-gray-400 border-b-[3px]">
                                </div>
                            </div>

                            <div
                                class="flex flex-col bg-white p-5 border-4 border-transparent cursor-pointer rounded-xl shadow-lg mt-5 hover:border-gray-300">
                                <div class="text-left">
                                    <p class="font-bold">碳排放来源表</p>
                                </div>
                                <div class="">
                                    <p></p>
                                </div>
                                <div class="">

                                </div>
                            </div>

                            <div
                                class="flex flex-col bg-gray-500/30  px-5 py-3 cursor-pointer rounded-xl shadow-lg mt-8 hover:bg-gray-500/50">
                                <div class="flex justify-center items-center gap-2" @click="showSetting(1)">
                                    <i class="fa-regular fa-plus"></i>
                                    <p class="font-bold opacity-100">数据源</p>
                                </div>
                            </div>

                            <!-- 右并行连线 -->
                            <div
                                class="h-[80px] w-4 absolute -right-4 bottom-28 border-gray-400 border-r-[3px] border-b-[3px] rounded-br-2xl -z-10">
                            </div>
                            <!-- 右并行连线右上角圆角 -->
                            <div
                                class="h-14 w-4 absolute -right-[29px] bottom-40 border-gray-400 border-l-[3px] border-t-[3px] rounded-tl-2xl -z-10">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 数据预处理 -->
                <div class="flex flex-col justify-start items-center gap-2">
                    <PipelineHeader title="数据预处理" :num="2"/>

                    <!-- 主要部分 -->
                    <div class="w-72 h-[800px] border-r-2 border-gray-500 border-dashed translate-x-7 p-5">
                        <!-- 准入设置按钮 -->
                        <PipelineAccessSettings />
                        

                        <div class="-translate-x-5 relative">
                            <div class="container  rounded-lg">
                                <div
                                    class="box relative flex flex-col bg-white p-3 border-4 border-transparent cursor-pointer rounded-xl shadow-lg hover:border-gray-300">
                                    <div class="text-left">
                                        <p class="font-bold">缺失值和异常值清洗</p>
                                    </div>
                                    <!-- 过程连线 -->
                                    <div class="w-10 absolute -left-11 top-5 border border-gray-400 border-b-[3px]">
                                    </div>
                                    <div class="w-10 absolute -right-11 top-5 border border-gray-400 border-b-[3px]">
                                    </div>

                                    <!-- 串行连线 -->
                                    <div class="h-5 absolute left-5 -bottom-6 border border-gray-400 border-l-[3px]">
                                    </div>
                                </div>
                                <div
                                    class="box relative flex flex-col bg-white p-3 border-4 border-transparent cursor-pointer rounded-xl shadow-lg mt-5 hover:border-gray-300">
                                    <div class="text-left">
                                        <p class="font-bold">标准化数据</p>
                                    </div>

                                    <!-- 添加符号 -->
                                    <div
                                        class="w-4 h-4 absolute left-28 -bottom-3 flex justify-center items-center rounded-xl bg-white shadow-[0_2px_6px_0_rgba(37,43,58,0.4)]">
                                        <i class="fa-regular fa-plus fa-2xs"></i>
                                    </div>
                                </div>
                            </div>


                            <div
                                class="flex flex-col bg-white p-2 border-4 border-transparent cursor-pointer rounded-xl shadow-md mt-5 hover:shadow-lg">
                                <div class="flex justify-center items-center gap-2" @click="showSetting(2)">
                                    <i class="fa-regular fa-plus"></i>
                                    <p class="font-bold opacity-100">并行任务</p>
                                </div>
                            </div>

                            <!-- 左并行连线 -->
                            <div
                                class="h-[150px] w-6 absolute -left-5 bottom-5 border-gray-400 border-l-[3px] border-b-[3px] border-dashed rounded-bl-2xl -z-10">
                            </div>
                            <!-- 右并行连线 -->
                            <div
                                class="h-[150px] w-6 absolute -right-5 bottom-5 border-gray-400 border-r-[3px] border-b-[3px] border-dashed rounded-br-2xl -z-10">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 图表生成 -->
                <div class="flex flex-col justify-start items-center gap-2">
                    <PipelineHeader title="图表生成" :num="3"/>

                    <!-- 主要部分 -->
                    <div class="w-72 h-[800px] relative border-r-2 border-gray-500 border-dashed translate-x-7 p-5">
                        <!-- 准入设置按钮 -->
                        <PipelineAccessSettings />

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
                                <div class="flex justify-center items-center gap-2" @click="showSetting(3)">
                                    <i class="fa-regular fa-plus"></i>
                                    <p class="font-bold opacity-100">并行任务</p>
                                </div>
                            </div>

                            <!-- 过程连线 -->
                            <div class="w-11 absolute -left-11 top-6 border border-gray-400 border-b-[3px]">
                            </div>
                            <div class="w-11 absolute -right-11 top-6 border border-gray-400 border-b-[3px]">
                            </div>

                            <!-- 右并行连线右上角圆角 -->
                            <div
                                class="h-14 w-4 absolute -right-[29px] top-7 border-gray-400 border-l-[3px] border-t-[3px] rounded-tl-2xl -z-10">
                            </div>
                            <!-- 右并行连线 -->
                            <div
                                class="h-[68px] w-4 absolute -right-4 top-10 border-gray-400 border-r-[3px] border-b-[3px] rounded-br-2xl -z-10">
                            </div>
                            <!-- 右并行连线 -->
                            <div
                                class="h-[85px] w-4 absolute -right-4 bottom-24 border-gray-400 border-r-[3px] border-b-[3px] rounded-br-2xl -z-10">
                            </div>
                            <!-- 右并行连线 -->
                            <div
                                class="h-[85px] w-4 absolute -right-4 bottom-6 border-gray-400 border-r-[3px] border-b-[3px] rounded-br-2xl -z-10 border-dashed">
                            </div>

                            <!-- 左并行连线右上角圆角 -->
                            <div
                                class="h-14 w-4 absolute -left-[29px] top-7 border-gray-400 border-r-[3px] border-t-[3px] rounded-tr-2xl -z-10">
                            </div>
                            <!-- 左并行连线 -->
                            <div
                                class="h-[68px] w-4 absolute -left-4 top-10 border-gray-400 border-l-[3px] border-b-[3px] rounded-bl-2xl -z-10">
                            </div>
                            <!-- 左并行连线 -->
                            <div
                                class="h-[85px] w-4 absolute -left-4 bottom-24 border-gray-400 border-l-[3px] border-b-[3px] rounded-bl-2xl -z-10">
                            </div>
                            <!-- 左并行连线 -->
                            <div
                                class="h-[85px] w-4 absolute -left-4 bottom-6 border-gray-400 border-l-[3px] border-b-[3px] rounded-bl-2xl -z-10 border-dashed">
                            </div>

                        </div>
                    </div>
                </div>

                <!-- 图表生成 -->
                <div class="flex flex-col justify-start items-center gap-2">
                    <PipelineHeader title="报表生成" :num="1"/>

                    <!-- 主要部分 -->
                    <div class="w-72 h-[800px] border-r-2 border-gray-500 border-dashed translate-x-7 p-5">
                        <!-- 准入设置按钮 -->
                        <PipelineAccessSettings />

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
                                <div class="flex justify-center items-center gap-2" @click="showSetting(4)">
                                    <i class="fa-regular fa-plus"></i>
                                    <p class="font-bold opacity-100">并行任务</p>
                                </div>
                            </div>

                            <!-- 过程连线 -->
                            <div class="w-11 absolute -left-11 top-6 border border-gray-400 border-b-[3px]">
                            </div>
                            <div class="w-11 absolute -right-11 top-6 border border-gray-400 border-b-[3px]">
                            </div>

                            <!-- 左并行连线 -->
                            <div
                                class="h-[75px] w-4 absolute -left-4 bottom-6 border-gray-400 border-l-[3px] border-b-[3px] rounded-bl-2xl -z-10 border-dashed">
                            </div>
                            <!-- 右并行连线 -->
                            <div
                                class="h-[75px] w-4 absolute -right-4 bottom-6 border-gray-400 border-r-[3px] border-b-[3px] rounded-br-2xl -z-10 border-dashed">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 新阶段 -->
                <div class="flex flex-col justify-start items-center gap-2">
                    <PipelineHeader title="新阶段" :num="0"/>
                    

                    <!-- 主要部分 -->
                    <div class="w-72 h-[800px] translate-x-7 p-5">
                        <!-- 准入设置按钮 -->
                        <PipelineAccessSettings />

                        <div class="-translate-x-5">
                            <div
                                class="relative flex flex-col bg-white p-3 border-4 border-transparent cursor-pointer rounded-xl shadow-lg hover:border-gray-300">
                                <div class="flex justify-center items-center gap-2" @click="showSetting(4)">
                                    <i class="fa-regular fa-plus"></i>
                                    <p class="font-bold opacity-100">新建阶段</p>
                                </div>
                            </div>

                            <!-- 过程连线 -->
                            <div class="w-11 absolute -left-11 top-6 border border-gray-400 border-b-[3px]">
                            </div>
                        </div>
                    </div>
                </div>



            </div>

        </el-scrollbar>

        <SettingDataSource :ifShow="settingVisible1" @updateIfShow="updateSettingVisible1" />
        <!-- 遮罩层 -->
        <MaskLayer :ifShow="settingVisible1" backgroundColor="rgba(0, 0, 0, 0.4)" />

        <SettingPreprocess :ifShow="settingVisible2" @updateIfShow="updateSettingVisible2" />
        <!-- 遮罩层 -->
        <MaskLayer :ifShow="settingVisible2" backgroundColor="rgba(0, 0, 0, 0.4)" />

        <SettingChart :ifShow="settingVisible3" @updateIfShow="updateSettingVisible3" />
        <!-- 遮罩层 -->
        <MaskLayer :ifShow="settingVisible3" backgroundColor="rgba(0, 0, 0, 0.4)" />

        <SettingStatement :ifShow="settingVisible4" @updateIfShow="updateSettingVisible4" />
        <!-- 遮罩层 -->
        <MaskLayer :ifShow="settingVisible4" backgroundColor="rgba(0, 0, 0, 0.4)" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElScrollbar } from 'element-plus';


const sliderValue = ref(0)
const maxScroll = ref(0)
const innerRef = ref<HTMLDivElement>()
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()



const settingVisible1 = ref(false);
const settingVisible2 = ref(false);
const settingVisible3 = ref(false);
const settingVisible4 = ref(false);


onMounted(() => {
    const innerWidth = innerRef.value?.scrollWidth || 0
    const containerWidth = scrollbarRef.value?.$el.clientWidth || 0
    maxScroll.value = innerWidth - containerWidth 
})

const inputSlider = (value: number) => {
    scrollbarRef.value?.setScrollLeft(value)
}

const handleScroll = ({ scrollLeft }: { scrollLeft: number }) => {
    sliderValue.value = scrollLeft
}


const showSetting = (index: number) => {
    console.log('showSetting' + index);

    switch (index) {
        case 1:
            settingVisible1.value = true;
            break;
        case 2:
            settingVisible2.value = true;
            break;
        case 3:
            settingVisible3.value = true;
            break;
        case 4:
            settingVisible4.value = true;
            break;
        default:
            break;
    }
}



const updateSettingVisible1 = (newValue: boolean) => {
    settingVisible1.value = newValue;
};
const updateSettingVisible2 = (newValue: boolean) => {
    settingVisible2.value = newValue;
};
const updateSettingVisible3 = (newValue: boolean) => {
    settingVisible3.value = newValue;
};
const updateSettingVisible4 = (newValue: boolean) => {
    settingVisible4.value = newValue;
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



.container {
    position: relative;
}

.container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    /* 保持与外层 div 一样的圆角 */
    background-color: gray;
    opacity: 0.15;
    /* 外层背景颜色 */
    z-index: -1;
    /* 确保不影响内部内容 */
    transform: translate(-10px, -10px);
    /* 移动伪元素的大小 */
    width: calc(100% + 20px);
    height: calc(100% + 20px);
    border-radius: 12px;
}

.box {
    position: relative;
    z-index: 1;
    /* 确保内容在伪元素之上 */
}
.el-slider-style{
    --el-slider-main-bg-color:#333;
}
</style>
