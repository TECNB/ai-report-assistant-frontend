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
                <div v-if="statementVisible" class="w-96 absolute top-11 shadow-lg rounded-xl border-[0.5px] bg-bg-100 p-5">
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
                <img class="w-6 h-6 rounded-full object-cover aspect-square"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAotJREFUeF7tmjFqlGEURb/fSQiJaQyIhdmAO0hrZxGyhhSWLknS2ihWdkLAJdgKlnaCkGASJuQX7KYJc5l7zRVO6vedvDmHN2kyXbw9mAc/NQYmgtS0+LsIQbp6EKSsB0EI0magbB/+hhCkzEDZOlwIQcoMlK3DhRCkzEDZOlwIQcoMlK3DhRCkzEDZOlwIQcoMlK3DhRCkzEDZOlwIQcoMlK3DhRCkzEDZOlwIQcoMlK3DhRCkzEDZOlwIQcoMlK3DhRCkzEDZOlwIQdYz8OjJizHtHKw3LE7Ny4tx9/Or+OrfjNdeyP7pjzEWOxkL8924PHuaYW9IJciGAt3PCeI2uiGvNsjeyecx7R/e//G29sa0/Xh15vZqzMvLe9/NN7/G7w9HG6rLPK8Nss7HXTx/OXZfvV8ZvfnyZiy/vVvneeUMQcqyEIQgPgN8ZflcWkgEsWj0QQjic2khEcSi0QchiM+lhUQQi0YfhCA+lxYSQSwafRCC+FxaSASxaPRBCOJzaSERxKLRByGIz6WFRBCLRh+EID6XFhJBLBp9EIL4XFpIBLFo9EEI4nNpIRHEotEHIYjPpYW0eHY0do8/rbCuz1+P2+8fLfyHgPzX/wb0EMLSv5MgacMinyCisPQ4QdKGRT5BRGHpcYKkDYt8gojC0uMESRsW+QQRhaXHCZI2LPIJIgpLjxMkbVjkE0QUlh4nSNqwyCeIKCw9TpC0YZFPEFFYepwgacMinyCisPQ4QdKGRT5BRGHpcYKkDYt8gojC0uMESRsW+QQRhaXHCZI2LPIJIgpLjxMkbVjkE0QUlh4nSNqwyCeIKCw9TpC0YZFPEFFYepwgacMinyCisPQ4QdKGRT5BRGHp8T9jsLz08j0CFAAAAABJRU5ErkJggg=="
                    alt="">
            </div>
        </div>

        <div class="flex flex-1 flex-col justify-center items-start max-w-6xl p-20">
            <div class="flex flex-col justify-center items-start gap-2">
                <img class="w-11 h-11 rounded-full object-cover aspect-square border-text-200 border-[0.5px]"
                    src="http://localhost:3000/static/favicon.png" alt="">
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
                    <p class="text-text-300 font-bold">输入消息</p>
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


let statementVisible = ref(false);
let statementName = ref('');

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
