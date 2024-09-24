<template>
  <div class="RegisterView flex flex-col items-center justify-center h-screen bg-white relative">
    <img src="../assets/images/icon.png" alt="Logo" class="absolute top-5 left-5 w-24 h-24 rounded-full" />
    <h1 class="mb-5 text-3xl font-bold">注册</h1>
    <p class="mb-5 text-center text-gray-400 font-bold text-sm leading-5">
      (i) Open WebUI 不会与外部建立任何连接，<br />
      您的数据会安全地存储在本地托管的服务器上。
    </p>
    <form @submit.prevent="handleRegister" class="w-80">
      <div class="mb-4">
        <label for="name" class="block mb-1 text-lg font-bold text-left">名称</label>
        <input type="text" id="name" v-model="name" required
               class="w-full p-2 border border-gray-300 rounded-2xl bg-white" placeholder="输入您的名称" />
      </div>
      <hr class="mb-4 border-gray-300" />
      <div class="mb-4">
        <label for="email" class="block mb-1 text-lg font-bold text-left">电子邮箱</label>
        <input type="email" id="email" v-model="email" required
               class="w-full p-2 border border-blue-200 rounded-2xl bg-blue-50" placeholder="输入您的邮箱" />
      </div>
      <div class="mb-4">
        <label for="password" class="block mb-1 text-lg font-bold text-left">密码</label>
        <input type="password" id="password" v-model="password" required
               class="w-full p-2 border border-blue-200 rounded-2xl bg-blue-50" />
      </div>
      <button type="submit" class="w-full p-2 bg-black text-white font-bold rounded-2xl hover:bg-gray-800">创建账号</button>
    </form>
    <p class="mt-4 text-center text-sm">
      已经拥有账号了？<a href="#" class="font-bold text-black hover:underline">登录</a>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { userInfoStore } from '../stores/UserInfoStore'; // 引入 store
import { signup } from '../api/user'; // 引入注册 API
import { User } from '../interfaces/User'; // 引入 User 接口

// 定义表单字段
const name = ref('');
const email = ref('');
const password = ref('');

// 获取 userInfoStore 实例
const userStore = userInfoStore();

const handleRegister = async () => {
  try {
    // 调用注册 API，发送用户名、邮箱和密码
    const response = await signup({
      username: name.value,
      email: email.value,
      password: password.value,
    });

    // 注册成功后将用户信息存储到 store
    const user: User = {
      objectId: '', // 可根据需要设置为默认值或后端生成的值
      username: response.username,
      email: response.email,
      sessionToken: '', // 后端没有返回 sessionToken，因此可以为空
      createdAt: '', // 可根据需要填充
      updatedAt: '', // 可根据需要填充
    };

    // 设置用户信息
    userStore.setUser(user);

    // 打印用户信息到控制台
    console.log('注册成功:', user);
  } catch (error) {
    console.error('注册失败:', error);
  }
};
</script>

<style lang="scss" scoped>
.RegisterView {
  // 添加自定义样式
}
</style>
