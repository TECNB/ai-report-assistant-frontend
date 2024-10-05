<template>
    <div class="flex flex-col items-center justify-center h-screen bg-white relative">
        <img class="absolute top-5 left-5 w-16 h-16 rounded-full border-2 border-white" src="../assets/images/icon.png"
            alt="Logo" />
        <h1 class="mb-5 text-2xl font-bold">登录到 AI-REPORT-ASSISTANT</h1>
        <form @submit.prevent="handleLogin" class="w-80">
            <div class="mb-4">
                <label for="email" class="block mb-1 text-lg font-bold text-left">电子邮箱</label>
                <input id="email" v-model="email" required
                    class="w-full p-2 border border-gray-300 rounded-2xl bg-blue-100" />
            </div>
            <div class="mb-4">
                <label for="password" class="block mb-1 text-lg font-bold text-left">密码</label>
                <input type="password" id="password" v-model="password" required
                    class="w-full p-2 border border-gray-300 rounded-2xl bg-blue-100" />
            </div>
            <button type="submit" class="w-full p-2 bg-black text-white rounded-2xl hover:bg-gray-800">登录</button>
        </form>
        <p class="mt-4">
            没有账号？<a href="#" class="font-bold text-black hover:underline">注册</a>
        </p>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from 'vue-router';
// import { ElMessage } from 'element-plus'

import { login } from '../api/user'

const router = useRouter();

const email = ref("");
const password = ref("");

const handleLogin = async () => {
    try {
        const params = {
            email: email.value,
            password: password.value // 这里假设密码需要在前端直接传递明文，后端负责哈希处理
        };

        const response = await login(params);
        if (response) {
            // 假设登录成功后，重定向到首页或其他页面
            router.push({ name: 'IndexView' });
        }
    } catch (error) {
        // 捕获错误并显示错误信息
        ElMessage.error("登录失败，请检查您的邮箱和密码");
        console.error(error);
    }
};
</script>

<style scoped>
/* 这里可以添加其他自定义样式 */
</style>
