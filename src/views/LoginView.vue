<template>
    <div class="flex flex-col items-center justify-center h-screen bg-white relative">
        <img class="absolute top-5 left-5 w-16 h-16 rounded-full border-2 border-white" src="../assets/images/icon.png"
            alt="Logo" />
        <h1 class="mb-5 text-2xl font-bold">登录到 Open WebUI</h1>
        <form @submit.prevent="handleLogin" class="w-80">
            <div class="mb-4">
                <label for="email" class="block mb-1 text-lg font-bold text-left">电子邮箱</label>
                <input type="email" id="email" v-model="email" required
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

const email = ref("");
const password = ref("");

const handleLogin = () => {
    // 登录逻辑
    console.log("登录中...", email.value, password.value);
};
</script>

<style scoped>
/* 这里可以添加其他自定义样式 */
</style>
