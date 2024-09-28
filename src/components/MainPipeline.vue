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
                                <p>1个数据源</p>
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
                        <div class="-translate-x-7">
                            <div class="flex flex-col bg-white p-5 cursor-pointer rounded-xl shadow-lg"
                                @click="showSetting">
                                <div class="text-left">
                                    <p class="font-bold">空气质量表</p>
                                </div>
                                <div class="">
                                    <p></p>
                                </div>
                                <div class="">

                                </div>
                            </div>

                            <div class="flex flex-col bg-white p-5 cursor-pointer rounded-xl shadow-lg mt-5">
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
                                class="flex flex-col bg-gray-500/30  px-5 py-3 cursor-pointer rounded-xl shadow-lg mt-8">
                                <div class="flex justify-center items-center gap-2">
                                    <i class="fa-regular fa-plus"></i>
                                    <p class="font-bold opacity-100">数据源</p>
                                </div>
                                <div class="">
                                    <p></p>
                                </div>
                                <div class="">

                                </div>
                            </div>


                        </div>


                    </div>
                </div>

                <div class="h-[300px]">
                    <!-- 数据预处理 -->
                    <div class="flex justify-center items-center relative cursor-pointer">
                        <!-- Arrow tail -->
                        <div class="absolute top-0 -left-3 w-3 h-16 bg-gray-200"
                            style="clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 50% 50%);"></div>

                        <!-- Main body -->
                        <div class="w-72 h-16 flex justify-between items-center bg-gray-200  p-3">
                            <div class="flex flex-col justify-center items-start">
                                <p class="font-bold">数据预处理</p>
                                <p>1个数据源</p>
                            </div>
                            <div class="flex justify-center items-center gap-4">
                                <i class="fa-light fa-pen"></i>
                                <i class="fa-light fa-copy"></i>
                                <i class="fa-light fa-trash"></i>
                            </div>

                        </div>

                        <!-- Arrow head -->
                        <div class="absolute top-0 -right-5 w-5 h-16 bg-gray-200"
                            style="clip-path: polygon(0 0%, 100% 50%, 0 100%);"></div>
                    </div>
                </div>



            </div>

        </el-scrollbar>

        <Setting :ifShow="settingVisible" @updateIfShow="updateSettingVisible" />
        <!-- 遮罩层 -->
        <MaskLayer :ifShow="settingVisible" backgroundColor="rgba(0, 0, 0, 0.4)"/>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const settingVisible = ref(false);


const showSetting = () => {
    console.log('showSetting');
    settingVisible.value = true;
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
</style>
