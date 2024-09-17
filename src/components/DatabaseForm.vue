<template>
  <div class="w-1/2 bg-white rounded-lg p-10 shadow-md h-full">
    <h2 class="text-xl font-bold mb-4">{{ databaseType }} 数据源配置</h2>

    <!-- 数据源类型 -->
    <div class="mb-5 flex items-center">
      <label class="block text-gray-700 font-bold mr-4 whitespace-nowrap w-1/4 text-right" for="sourceType">
        数据源类型
      </label>
      <el-select id="sourceType" v-model="selectedSource" placeholder="请选择数据源类型" class="flex-grow w-48">
        <el-option label="阿里云" value="aliyun"></el-option>
        <el-option label="手动连接" value="manual"></el-option>
      </el-select>
    </div>

    <!-- 连接方式 -->
    <div class="mb-5 flex items-center">
      <label class="block text-gray-700 font-bold mr-4 whitespace-nowrap w-1/4 text-right" for="connectionMethod">
        连接方式
      </label>
      <el-radio-group v-model="connectionMethod" class="flex-grow">
        <el-radio label="auto">自动连接</el-radio>
        <el-radio label="manual">手动连接</el-radio>
      </el-radio-group>
    </div>

    <!-- 其他表单项 -->
    <!-- 显示名称、数据库地址、端口、数据库、用户名、密码、数据库版本等可以保留原有内容 -->
    <!-- 这里只展示部分，详细表单项依次填写 -->
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue"
const props = defineProps({
  databaseType: {
    type: String,
    default: 'MySQL',
  },
});

const selectedSource = ref('');
const connectionMethod = ref('auto');  // 默认连接方式
</script>
