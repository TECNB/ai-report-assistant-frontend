<template>
    <div class="SidebarChat">
        <div class="flex flex-col justify-between px-3">
            <div class="flex justify-between items-center gap-2">
                <div
                    class="flex flex-1 justify-between items-center gap-3 p-2 hover:bg-bg-300 cursor-pointer rounded-xl transition">
                    <img class="w-6 h-6 rounded-full object-cover aspect-square" src="../assets/images/icon.png" alt="">
                    <p class="text-sm font-bold">新对话</p>
                  <el-icon class="ml-auto" size="20" color="#676767" @click="addNewConversation">
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
        <!-- 新对话部分显示 -->
        <div v-if="chatStore.conversations.length > 0" class="pt-3">
          <p class="text-text-400 font-bold text-left mt-5 p-2">今天</p>

          <div class="pt-2 flex flex-col gap-3">
            <!-- 遍历对话列表 -->
            <div v-for="(conversation) in chatStore.conversations" :key="conversation.id">

              <!-- 如果加载完成，显示对话标题 -->
              <div
                   class="text-left whitespace-nowrap overflow-hidden text-text-100 text-sm p-2 hover:bg-bg-300 cursor-pointer rounded-xl transition"
                   @click="openConversation(conversation)">
                对话 {{ conversation.id }}
              </div>
            </div>
          </div>
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
import { ref} from "vue"

import { reportContent } from '../constant/reportContent';
import { useChatStore } from '../stores/chatStore';  // 引入 ChatStore

let chartVisible = ref(false);
let statementVisible = ref(false);
let dataSourceVisible = ref(false);
let userDataVisible = ref(false);
const chatStore = useChatStore();


// 增加新对话
const addNewConversation = () => {
  chatStore.startNewConversation();  // 使用 store 创建新对话
  console.log('test',chatStore.currentConversationId)
};

// 打开对话
const openConversation = (conversation: any) => {
  chatStore.switchConversation(conversation.id);  // 切换到点击的对话
  console.log(`打开对话: 对话 ${conversation.id}`);
};


const showChart = () => {
    chartVisible.value = !chartVisible.value;
}

const showStatement = () => {
    statementVisible.value = !statementVisible.value;
}
const showDataSource = () => {
    dataSourceVisible.value = !dataSourceVisible.value;
}
// const showUserData = () => {
//     userDataVisible.value = !userDataVisible.value;
// }
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
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px;
}
</style>
