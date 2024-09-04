<template>
    <div class="Chat">
        <div class="flex justify-between items-center">
            <div class="flex justify-between items-center gap-5 cursor-pointer" @click="showStatement">
                <p class="font-bold text-lg text-text-200">生态环境报表</p>

                <el-icon v-if="!statementVisible">
                    <ArrowDownBold />
                </el-icon>
                <el-icon v-else>
                    <ArrowUpBold />
                </el-icon>

            </div>
            <transition name="fade">
                <div v-if="statementVisible"
                    class="w-96 absolute top-11 shadow-lg rounded-xl border-[0.5px] bg-bg-100 p-5">
                    <!-- 下面为藏品名称搜索框 -->
                    <el-input v-model="statementName" placeholder="搜索报表" class="">
                        <template #prefix>
                            <el-icon color="var(--text-100)" class="el-input__icon">
                                <search />
                            </el-icon>
                        </template>
                    </el-input>

                    <div class="w-full flex flex-col justify-center items-start gap-3 mt-5">
                        <div class="w-full flex justify-between items-center">
                            <p class="font-bold text-text-200">交通报表</p>
                            <el-icon>
                                <Check />
                            </el-icon>
                        </div>

                        <p class="font-bold text-text-200">能源报表</p>
                        <p class="font-bold text-text-200">医院数据报表</p>
                    </div>

                </div>
            </transition>

            <div class="">
                <img class="w-6 h-6 rounded-full object-cover aspect-square" src="../assets/images/avatar.png" alt="">
            </div>
        </div>

        <div class="flex flex-1 flex-col justify-center items-start max-w-6xl p-20">
            <div class="flex flex-col justify-center items-start gap-2">
                <img class="w-11 h-11 rounded-full object-cover aspect-square border-text-200 border-[0.5px]"
                    src="../assets/images/icon.png" alt="">
                <p class="text-3xl font-bold">您好,TEC</p>
                <p class="text-3xl font-bold text-text-400">有什么我能帮您的吗？</p>
            </div>
            <div class="flex justify-center items-center gap-2 mt-3">
                <el-icon color="#B4B4B4">
                    <Link />
                </el-icon>
                <p class="font-bold text-text-400">建议</p>
            </div>
            <div class="flex justify-center items-center gap-2 mt-1">
                <div v-for="(suggestion, index) in suggestions" :key="index"
                    class="w-64 h-36 bg-bg-200  rounded-3xl text-left flex flex-col gap-8 px-5 py-6 hover:bg-bg-300 cursor-pointer transition-bg duration-300">
                    <div class="flex flex-col justify-center items-start">
                        <p class="text-text-100 font-bold">{{ suggestion.title }}</p>
                        <p class="text-text-200 text-sm">{{ suggestion.description }}</p>
                    </div>

                    <div class="flex justify-between items-center">
                        <p class="text-text-200 text-sm ">提示词</p>
                        <el-icon color="#B4B4B4">
                            <Top />
                        </el-icon>
                    </div>
                </div>
            </div>

        </div>

        <div class="flex justify-between items-center gap-5 mb-5 mx-5">
            <div class="flex flex-1 justify-between items-center bg-bg-200 rounded-3xl p-3">
                <div class="flex items-center gap-5">
                    <el-icon size="18">
                        <Plus />
                    </el-icon>
                    <input v-model="message" @keyup.enter="handleEnter" type="text" placeholder="输入消息"
                        class="bg-transparent outline-none flex-1 placeholder:text-text-300 placeholder:font-bold text-black" />
                </div>
                <el-icon size="18">
                    <Microphone />
                </el-icon>
            </div>
            <el-icon size="18">
                <Headset />
            </el-icon>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { suggestions } from '../constant/suggestions'; // 导入建议列表
import { AIChat } from '../utils/AIChat'; // 导入AIChat


let statementVisible = ref(false);
let statementName = ref('');
// 定义输入框的内容
const message = ref('');
const systemContent = ref('生态环境');
const relatedData = ref('当前生态环境数据显示：空气质量指数（AQI）为45，空气质量等级为优；PM2.5浓度为15微克/立方米，PM10浓度为30微克/立方米，二氧化硫（SO2）浓度为8微克/立方米，二氧化氮（NO2）浓度为20微克/立方米，一氧化碳（CO）浓度为0.7毫克/立方米，臭氧（O3）浓度为100微克/立方米。​');


// 回车事件处理函数
const handleEnter = async () => {
    if (message.value.trim()) {
        console.log('输入的消息:', message.value);
        const userContent = message.value;
        message.value = '';


        AIChat(systemContent.value, userContent, relatedData.value).then(response => response.json()) // 解析为 JSON
            .then(data => {
                console.log(data.choices[0].message.content);
                // 这里的 `data` 就是你展示的 JSON 对象
            });
    }
};

const showStatement = () => {
    statementVisible.value = !statementVisible.value;
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.Chat {
    display: flex;
    flex-direction: column;
    justify-items: center;
    height: 100%;

    .el-input {
        height: 50px;

        border-radius: 12px;
        border: 0.5px solid var(--text-200);
        border: 0;
        background-color: var(--bg-200);

        font-size: 18px;
        font-weight: bold;


        :deep(.el-input__wrapper) {
            border-radius: 12px;
            background-color: var(--bg-200);

        }


        :deep(.is-focus) {
            box-shadow: 0 0 0 1px var(--accent-200)
        }
    }
}
</style>
