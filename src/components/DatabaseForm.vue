<template>
  <div class="w-3/4 bg-white rounded-lg p-1 shadow-md h-full">
    <div v-if="selectedDatabase" class="w-full h-full bg-white rounded-lg p-5 shadow-md">
      <h2 class="text-xl font-bold mb-5">{{ selectedDatabase }} 数据源</h2>

      <!-- 数据源类型 -->
      <div class="mb-5 flex items-center">
        <label class="block text-gray-700 font-bold mr-4 whitespace-nowrap w-1/4 text-right !important">数据源类型</label>
        <el-select v-model="selectedSource" placeholder="请选择数据源类型" style="width: 200px;">
          <el-option label="阿里云" value="aliyun"></el-option>
          <el-option label="手动连接" value="manual"></el-option>
        </el-select>
      </div>


      <!-- 省略表单字段... -->
      <!-- 显示名称 -->
      <div class="mb-5 flex items-center">
        <label class="block text-gray-700 font-bold mr-4 whitespace-nowrap w-1/4 text-right" for="databaseName">
          显示名称
        </label>
        <el-input id="databaseName" v-model="databaseName" placeholder="Demo数据源" class="flex-grow" />
      </div>

      <!-- 数据库地址 -->
      <div class="mb-5 flex items-center">
        <label class="block text-gray-700 font-bold mr-4 whitespace-nowrap w-1/4 text-right" for="databaseUrl">
          数据库地址
        </label>
        <el-input id="databaseUrl" v-model="databaseUrl" placeholder="rm-xxxxx.mysql.rds.aliyuncs.com" class="flex-grow" />
      </div>

      <!-- 端口 -->
      <div class="mb-5 flex items-center">
        <label class="block text-gray-700 font-bold mr-4 whitespace-nowrap w-1/4 text-right" for="port">
          端口
        </label>
        <el-input id="port" v-model="port" placeholder="3306" class="flex-grow" />
      </div>

      <!-- 数据库 -->
      <div class="mb-5 flex items-center">
        <label class="block text-gray-700 font-bold mr-4 whitespace-nowrap w-1/4 text-right" for="database">
          数据库
        </label>
        <el-input id="database" v-model="database" placeholder="quickbi_online_demo" class="flex-grow" />
      </div>

      <!-- 用户名 -->
      <div class="mb-5 flex items-center">
        <label class="block text-gray-700 font-bold mr-4 whitespace-nowrap w-1/4 text-right" for="username">
          用户名
        </label>
        <el-input id="username" v-model="username" placeholder="quickbi_train" class="flex-grow" />
      </div>

      <!-- 密码 -->
      <div class="mb-5 flex items-center">
        <label class="block text-gray-700 font-bold mr-4 whitespace-nowrap w-1/4 text-right" for="password">
          密码
        </label>
        <el-input id="password" v-model="password" show-password placeholder="请输入密码" class="flex-grow" />
      </div>

      <!-- 数据库版本 -->
      <div class="mb-5 flex items-center">
        <label class="block text-gray-700 font-bold mr-4 whitespace-nowrap w-1/4 text-right" for="dbVersion">
          数据库版本
        </label>
        <el-select id="dbVersion" v-model="dbVersion" placeholder="请选择数据库版本" class="flex-grow">
          <el-option label="5.7" value="5.7"></el-option>
          <el-option label="8.0" value="8.0"></el-option>
        </el-select>
      </div>

      <!-- 操作按钮 -->
      <div class="flex justify-end">
        <el-button @click="$emit('cancel')">取消</el-button>
        <el-button class="border border-blue-500 text-blue-500 hover:bg-blue-100" @click="testConnection">连接测试</el-button>
        <el-button type="primary" @click="$emit('confirm')">确定</el-button>
      </div>
    </div>

    <div v-else class="flex justify-center items-center h-full">
      <p class="text-gray-500">请选择左侧的数据库类型以继续</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
const props = defineProps({
  selectedDatabase: String,  // 接收父组件传递的选中数据库类型
});

// 选中的数据源类型
const selectedSource = ref('aliyun');

// 表单字段
const databaseName = ref('');
const databaseUrl = ref('');
const port = ref('');
const database = ref('');
const username = ref('');
const password = ref('');
const dbVersion = ref('');
// 使用 Element Plus 的通知来显示连接测试结果
const testConnection = () => {
  // 使用 ElMessage 显示消息
  ElMessage({
    message: '数据源连通性正常',
    type: 'success',
    iconClass: 'fas fa-check-circle', // 使用 FontAwesome 图标
    duration: 3000, // 消息3秒后消失
    showClose: true,

  });
};

</script>

<style scoped>

</style>
