<template>
    <div class="Chart" v-if="props.ifShow">
        <div class="flex justify-between items-center bg-white border-b p-5 -mx-5 px-5 pb-2">
            <p class="text-2xl font-bold">创建数据源</p>
            <div class="Close" @click="toggleVisibility">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6 cursor-pointer">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
        </div>

        <!-- 外部灰色背景，左右两边几乎覆盖整个范围 -->
        <div class="flex p-2 rounded-lg h-5/6">
            <!-- 左侧白色区域 (导航侧边栏) -->
            <div class="w-1/4 bg-white rounded-lg p-5 shadow-md mr-2 h-full">
                <div class="relative mb-4">
                    <svg class="absolute left-2 top-3 text-gray-400 w-5 h-5" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <input type="text" placeholder="请搜索" class="border border-gray-300 p-2 pl-8 w-full rounded" />
                </div>

                <!-- 大类导航 -->
                <div class="mb-4">
                    <p class="font-bold text-gray-700 mb-2">数据源类型</p>
                    <div class="border border-gray-300 rounded">
                        <!-- 数据库大类 -->
                        <div @click="toggleDatabase" class="p-2 bg-gray-50 cursor-pointer flex items-center">
                            <i v-if="showDatabase" class="fas fa-chevron-up text-gray-600"></i>
                            <i v-else class="fas fa-chevron-down text-gray-600"></i>
                            <span class="font-bold text-gray-600">数据库</span>
                        </div>
                        <!-- 数据库子项 -->
                        <div v-if="showDatabase" class="pl-4">
                            <p @click="selectDatabase('MySQL')" class="p-2 cursor-pointer hover:bg-gray-200">
                                <i class="fas fa-database mr-2"></i>
                                <span class="font-bold text-gray-600">MySQL</span>
                            </p>
                            <p @click="selectDatabase('PostgreSQL')" class="p-2 cursor-pointer hover:bg-gray-200">
                                <i class="fas fa-database mr-2"></i>
                                <span class="font-bold text-gray-600">PostgreSQL</span>
                            </p>
                            <p @click="selectDatabase('SQL Server')" class="p-2 cursor-pointer hover:bg-gray-200">
                                <i class="fas fa-database mr-2"></i>
                                <span class="font-bold text-gray-600">SQL Server</span>
                            </p>
                        </div>
                    </div>
                </div>

                <!-- 本地文件大类 -->
                <div>
                    <div class="border border-gray-300 rounded">
                        <div class="p-2 bg-gray-100 cursor-pointer flex justify-between items-center">
                            <span>本地文件</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 右侧白色区域 (表单内容) -->
            <div class="w-3/4 bg-white rounded-lg p-1 shadow-md h-full">
                <!-- 右侧内容显示逻辑 -->
                <div v-if="selectedDatabase" class="w-1/2 bg-white rounded-lg p-10 shadow-md h-full">
                    <!-- 数据源类型 -->
                    <div class="mb-5 flex items-center">
                        <label class="block text-gray-700 font-bold mr-4 whitespace-nowrap w-1/4 text-right"
                            for="sourceType">
                            数据源类型
                        </label>
                        <el-select id="sourceType" v-model="selectedSource" placeholder="请选择数据源类型"
                            class="flex-grow w-48">
                            <el-option label="阿里云" value="aliyun"></el-option>
                            <el-option label="手动连接" value="manual"></el-option>
                        </el-select>
                    </div>

                    <!-- 连接方式 -->
                    <div class="mb-5 flex items-center">
                        <label class="block text-gray-700 font-bold mr-4 whitespace-nowrap w-1/5 text-right"
                            for="connectionMethod">
                            连接方式
                        </label>
                        <div class="flex-grow">
                            <el-radio-group v-model="connectionMethod">
                                <el-radio label="auto">自动连接</el-radio>
                                <el-radio label="manual">手动连接</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                    <!-- 显示名称 -->
                    <div class="mb-5 flex items-center">
                        <label class="block text-gray-700 font-bold mr-4 whitespace-nowrap w-1/4 text-right"
                            for="databaseName">
                            显示名称
                        </label>
                        <el-input id="databaseName" v-model="databaseName" placeholder="Demo数据源" class="flex-grow" />
                    </div>

                    <!-- 数据库地址 -->
                    <div class="mb-5 flex items-center">
                        <label class="block text-gray-700 font-bold mr-4 whitespace-nowrap w-1/4 text-right"
                            for="databaseUrl">
                            数据库地址
                        </label>
                        <el-input id="databaseUrl" v-model="databaseUrl" placeholder="rm-xxxxx.mysql.rds.aliyuncs.com"
                            class="flex-grow" />
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
                        <label class="block text-gray-700 font-bold mr-4 whitespace-nowrap w-1/4 text-right"
                            for="database">
                            数据库
                        </label>
                        <el-input id="database" v-model="database" placeholder="quickbi_online_demo"
                            class="flex-grow" />
                    </div>

                    <!-- 用户名 -->
                    <div class="mb-5 flex items-center">
                        <label class="block text-gray-700 font-bold mr-4 whitespace-nowrap w-1/4 text-right"
                            for="username">
                            用户名
                        </label>
                        <el-input id="username" v-model="username" placeholder="quickbi_train" class="flex-grow" />
                    </div>

                    <!-- 密码 -->
                    <div class="mb-5 flex items-center">
                        <label class="block text-gray-700 font-bold mr-4 whitespace-nowrap w-1/4 text-right"
                            for="password">
                            密码
                        </label>
                        <el-input id="password" v-model="password" show-password placeholder="请输入密码"
                            class="flex-grow" />
                    </div>

                    <!-- 数据库版本 -->
                    <div class="mb-5 flex items-center">
                        <label class="block text-gray-700 font-bold mr-4 whitespace-nowrap w-1/4 text-right"
                            for="dbVersion">
                            数据库版本
                        </label>
                        <el-select id="dbVersion" v-model="dbVersion" placeholder="请选择数据库版本" class="flex-grow">
                            <el-option label="5.7" value="5.7"></el-option>
                            <el-option label="8.0" value="8.0"></el-option>
                        </el-select>
                    </div>

                    <!-- 按钮组 -->
                    <div class="flex justify-end">
                        <el-button @click="cancel">取消</el-button>
                        <el-button type="primary" @click="testConnection">连接测试</el-button>
                        <el-button type="primary" @click="confirm">确定</el-button>
                    </div>
                    <!-- 其余表单内容 -->
                    <!-- 数据库地址、端口、用户名、密码等表单项依旧 -->
                </div>

                <!-- 提示用户选择数据库 -->
                <div v-else class="flex justify-center items-center h-full">
                    <p class="text-gray-500">请选择左侧的数据库类型以继续</p>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps(['ifShow']);
const emit = defineEmits();

const selectedSource = ref('');
const selectedDatabase = ref('');  // 用于追踪选择的数据库类型

// 控制数据库导航的展开与收起
const showDatabase = ref(false);
// 定义表单相关的响应式数据
const connectionMethod = ref('auto');  // 默认连接方式
const databaseName = ref('');  // 数据源显示名称
const databaseUrl = ref('');  // 数据库地址
const port = ref('3306');  // 默认端口号
const database = ref('');  // 数据库名称
const username = ref('');  // 用户名
const password = ref('');  // 密码
const dbVersion = ref('5.7');  // 默认数据库版本

// 取消操作，重置表单数据
const cancel = () => {
    selectedSource.value = '';
    connectionMethod.value = 'auto';
    databaseName.value = '';
    databaseUrl.value = '';
    port.value = '3306';
    database.value = '';
    username.value = '';
    password.value = '';
    dbVersion.value = '5.7';
};

// 测试连接
const testConnection = () => {
    if (databaseUrl.value && username.value && password.value) {
        alert('连接成功！');
    } else {
        alert('请填写完整信息以测试连接。');
    }
};

// 确认提交表单
const confirm = () => {
    if (databaseUrl.value && username.value && password.value) {
        alert('表单提交成功！');
        // 这里可以处理表单的实际提交逻辑，例如通过 axios 发送请求到你的后端
    } else {
        alert('请填写完整的表单信息。');
    }
};
const toggleDatabase = () => {
    showDatabase.value = !showDatabase.value;
};

// 切换可见性
const toggleVisibility = () => {
    emit('updateIfShow', false);
};

// 处理数据库选择，更新右侧内容
const selectDatabase = (db: string) => {
    selectedDatabase.value = db;  // 更新选中的数据库类型
    console.log('选择的数据库:', db);
};
</script>

<style scoped>
.Chart {
    width: 90%;
    height: 90%;
    position: absolute;
    z-index: 99999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #f0f0f3;
    border-radius: 20px;
    text-align: left;
    padding: 20px;
}
</style>
