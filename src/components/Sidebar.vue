<template>
    <div class="Sidebar">
        <div class="flex flex-col justify-between px-3">
            <div class="flex justify-between items-center px-2 pt-2 mb-5">
                <div v-for="(item, index) in tabItemIcons" :key="index" class="flex-1 border-b pb-2 cursor-pointer"
                    :class="tabStore.activeIndex === index ? 'border-black text-black' : 'text-text-300 hover:text-black'"
                    @click="tabStore.setActive(index)">
                    <i :class="item.iconClass"></i>
                </div>
            </div>


            <div class="flex justify-between items-center gap-2">
                <div
                    class="flex flex-1 justify-between items-center gap-3 p-2 hover:bg-bg-300 cursor-pointer rounded-xl transition">
                    <img class="w-6 h-6 rounded-full object-cover aspect-square" src="../assets/images/icon.png" alt="">
                    <p class="text-sm font-bold">新对话</p>
                    <el-icon class="ml-auto" size="20" color="#676767">
                        <Edit />
                    </el-icon>
                </div>
                <el-icon class=" hover:bg-bg-300 cursor-pointer rounded-xl" size="20" color="#676767 transition"
                    @click="showDataSource">
                    <Operation />
                </el-icon>
            </div>

            <div class="flex justify-start items-center gap-3 p-2">
                <el-icon size="16">
                    <Search />
                </el-icon>
                <p class="text-sm font-bold text-text-300">搜索</p>
            </div>
        </div>

        <div class="px-3">
            <div v-for="(monthData, index) in reportContent" :key="index">
                <p class="text-text-400 font-bold text-left mt-5 p-2">{{ monthData.month }}</p>
                <div class="pt-2 flex flex-col gap-3" @click="showStatement">
                    <p v-for="(item, idx) in monthData.items" :key="idx"
                        class="text-left whitespace-nowrap overflow-hidden text-text-100 text-sm p-2 hover:bg-bg-300 cursor-pointer rounded-xl transition">
                        {{ item.icon }} {{ item.text }}
                    </p>
                </div>
            </div>

            <div class="fixed bottom-5 w-56 flex justify-start items-center gap-3  p-2 hover:bg-bg-300 cursor-pointer rounded-xl transition"
                @click="showChart">
                <img class="w-8 h-8 rounded-full object-cover aspect-square" src="../assets/images/avatar.png" alt="">
                <p class="text-sm font-bold">TEC</p>
            </div>
        </div>
        <MaskLayer :ifShow="chartVisible" />
        <Chart :ifShow="chartVisible" @updateIfShow="updateChartVisible" />

        <MaskLayer :ifShow="statementVisible" />
        <Statement :ifShow="statementVisible" @updateIfShow="updateStatementVisible" />

        <DataSource :ifShow="dataSourceVisible" @updateIfShow="updateDataSourceVisible" />
        <MaskLayer :ifShow="dataSourceVisible" />

        <UserData :ifShow="userDataVisible" @updateIfShow="updateUserDataVisible" />
        <MaskLayer :ifShow="userDataVisible" />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { storeToRefs } from 'pinia';

import { useTabStore } from '../stores/TabStore.ts';

import { reportContent } from '../constant/reportContent';
import { tabItemIcons } from '../constant/tabItemIcons';


// 获取全局的 tabStore
const tabStore = useTabStore();
const { activeIndex } = storeToRefs(tabStore);

let chartVisible = ref(false);
let statementVisible = ref(false);
let dataSourceVisible = ref(false);
let userDataVisible = ref(false);


const showChart = () => {
    chartVisible.value = !chartVisible.value;
}
const showStatement = () => {
    statementVisible.value = !statementVisible.value;
}
const showDataSource = () => {
    dataSourceVisible.value = !dataSourceVisible.value;
}
const showUserData = () => {
    userDataVisible.value = !userDataVisible.value;
}
const updateChartVisible = (value: boolean) => {
    chartVisible.value = value;
}
const updateStatementVisible = (value: boolean) => {
    statementVisible.value = value;
}
const updateDataSourceVisible = (value: boolean) => {
    dataSourceVisible.value = value;
}
const updateUserDataVisible = (value: boolean) => {
    userDataVisible.value = value;
}
</script>

<style lang="scss" scoped>
.Sidebar {
    padding-top: 0.625rem;
    padding-bottom: 0.625rem;
}
</style>
