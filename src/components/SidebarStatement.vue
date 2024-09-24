<template>
    <div class="SidebarForm px-3 p-2">
        <div class="flex justify-start items-center gap-3 ">
            <el-icon size="16">
                <Search />
            </el-icon>
            <p class="text-sm font-bold text-text-300">搜索</p>
        </div>
        <p class="text-left text-gray-500 font-bold mt-3">全部报表</p>

        <div v-for="(form, index) in statementContent" :key="index" class="pt-2 flex flex-col gap-2">
            <p
                class="text-left whitespace-nowrap overflow-hidden text-text-100  p-2 hover:bg-bg-300 cursor-pointer rounded-xl transition">
                {{ form.source }}
            </p>
            <div class="border-l-2 ml-4 px-5">
                <div class="flex justify-start items-center gap-2  hover:bg-bg-300 cursor-pointer rounded-xl px-3" v-for="(item, idx) in form.items"
                    :key="idx">
                    <i class="fa-regular fa-memo"></i>
                    <p
                        class="text-left whitespace-nowrap overflow-hidden text-text-100 text-sm p-2  transition">
                        {{ item.text }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { } from "vue"
import { statementContent } from '../constant/StatementContent';
</script>

<style lang="scss" scoped></style>
