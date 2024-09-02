<template>
    <div class="Sidebar">
        <div class="flex flex-col justify-between  px-3">
            <div class="flex justify-between items-center gap-2">
                <div
                    class="flex flex-1 justify-between items-center gap-3 p-2 hover:bg-bg-300 cursor-pointer rounded-xl transition">
                    <img class="w-6 h-6 rounded-full object-cover aspect-square"
                        src="http://localhost:3000/static/favicon.png" alt="">
                    <p class="text-sm font-bold">新对话</p>
                    <el-icon class="ml-auto" size="20" color="#676767">
                        <Edit />
                    </el-icon>
                </div>
                <el-icon class=" hover:bg-bg-300 cursor-pointer rounded-xl" size="20" color="#676767 transition">
                    <Operation />
                </el-icon>
            </div>

            <div
                class="flex justify-start items-center gap-3  p-2 hover:bg-bg-300 cursor-pointer rounded-xl transition">
                <el-icon size="24">
                    <Postcard />
                </el-icon>
                <p class="text-sm font-bold">工作空间</p>
            </div>
            <div class="flex justify-start items-center gap-3 p-2">
                <el-icon size="24">
                    <Search />
                </el-icon>
                <p class="text-sm font-bold text-text-300">搜索</p>
            </div>
        </div>

        <div class="px-3">
            <div v-for="(monthData, index) in reportContent" :key="index">
                <p class="text-text-400 font-bold text-left mt-5 p-2">{{ monthData.month }}</p>
                <div class="pt-2 flex flex-col gap-3">
                    <p v-for="(item, idx) in monthData.items" :key="idx"
                        class="text-left whitespace-nowrap overflow-hidden text-text-100 text-sm p-2 hover:bg-bg-300 cursor-pointer rounded-xl transition">
                        {{ item.icon }} {{ item.text }}
                    </p>
                </div>
            </div>

            <div
                class="fixed bottom-5 w-64 flex justify-start items-center gap-3  p-2 hover:bg-bg-300 cursor-pointer rounded-xl transition">
                <img class="w-8 h-8 rounded-full object-cover aspect-square"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAotJREFUeF7tmjFqlGEURb/fSQiJaQyIhdmAO0hrZxGyhhSWLknS2ihWdkLAJdgKlnaCkGASJuQX7KYJc5l7zRVO6vedvDmHN2kyXbw9mAc/NQYmgtS0+LsIQbp6EKSsB0EI0magbB/+hhCkzEDZOlwIQcoMlK3DhRCkzEDZOlwIQcoMlK3DhRCkzEDZOlwIQcoMlK3DhRCkzEDZOlwIQcoMlK3DhRCkzEDZOlwIQcoMlK3DhRCkzEDZOlwIQcoMlK3DhRCkzEDZOlwIQdYz8OjJizHtHKw3LE7Ny4tx9/Or+OrfjNdeyP7pjzEWOxkL8924PHuaYW9IJciGAt3PCeI2uiGvNsjeyecx7R/e//G29sa0/Xh15vZqzMvLe9/NN7/G7w9HG6rLPK8Nss7HXTx/OXZfvV8ZvfnyZiy/vVvneeUMQcqyEIQgPgN8ZflcWkgEsWj0QQjic2khEcSi0QchiM+lhUQQi0YfhCA+lxYSQSwafRCC+FxaSASxaPRBCOJzaSERxKLRByGIz6WFRBCLRh+EID6XFhJBLBp9EIL4XFpIBLFo9EEI4nNpIRHEotEHIYjPpYW0eHY0do8/rbCuz1+P2+8fLfyHgPzX/wb0EMLSv5MgacMinyCisPQ4QdKGRT5BRGHpcYKkDYt8gojC0uMESRsW+QQRhaXHCZI2LPIJIgpLjxMkbVjkE0QUlh4nSNqwyCeIKCw9TpC0YZFPEFFYepwgacMinyCisPQ4QdKGRT5BRGHpcYKkDYt8gojC0uMESRsW+QQRhaXHCZI2LPIJIgpLjxMkbVjkE0QUlh4nSNqwyCeIKCw9TpC0YZFPEFFYepwgacMinyCisPQ4QdKGRT5BRGHp8T9jsLz08j0CFAAAAABJRU5ErkJggg=="
                    alt="">
                <p class="text-sm font-bold">TEC</p>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { } from "vue"
import { reportContent } from '../constant/reportContent';
</script>

<style lang="scss" scoped>
.Sidebar {
    padding-top: 0.625rem;
    padding-bottom: 0.625rem;
}
</style>
