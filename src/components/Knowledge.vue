<template>
    <div class="Knowledge">
        <!-- 弹窗 -->
        <div v-if="props.ifShow" class="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
            <div class="bg-white rounded-lg shadow-lg p-6 w-96 relative z-50">
                <div class="flex justify-end">
                    <button @click="toggleVisibility">
                        <el-icon>
                            <Close />
                        </el-icon>
                    </button>
                </div>
                <!-- 模型信息 -->
                <div>
                    <h2 class="text-xl font-bold mb-4">模型信息</h2>

                    <!-- 横线分隔 -->
                    <hr class="my-4" />

                    <!-- 连接方式 -->
                    <div class="flex items-center space-x-2 mb-2">
                        <label class="font-semibold">连接方式</label>
                        <div v-for="option in connectionOptions" :key="option.id">
                            <input type="radio" :id="option.id" name="connection" :value="option.id"
                                v-model="formData.connectionType" />
                            <label :for="option.id" class="font-semibold text-gray-700">{{ option.label }}</label>
                        </div>
                    </div>

                    <!-- 应用范围 -->
                    <div class="mb-2">
                        <label class="font-semibold">应用范围</label>
                        <div class="flex flex-wrap gap-2 mt-2">
                            <div v-for="(label, id) in scopeOptions" :key="id">
                                <input type="checkbox" :id="String(id)" v-model="formData.selectedScopes" :value="id" />
                                <label :for="String(id)" class="font-semibold text-gray-700">{{ label }}</label>
                            </div>
                        </div>
                    </div>

                    <!-- 模型描述 -->
                    <div class="mb-2">
                        <label class="font-semibold">模型描述</label>
                        <textarea class="w-full border font-semibold border-gray-300 rounded p-2" rows="3"
                            v-model="formData.modelDescription" :placeholder="placeholders.modelDescription"></textarea>
                    </div>

                    <!-- 提示词 -->
                    <div class="mb-2">
                        <label class="font-semibold">ChatBI提示词</label>
                        <textarea class="w-full border font-semibold border-gray-300 rounded p-2" rows="5"
                            v-model="formData.prompt" :placeholder="placeholders.prompt"></textarea>
                    </div>
                </div>

                <!-- 确定按钮 -->
                <div class="mt-6 flex justify-end">
                    <button @click="confirm" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        确定
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { Close } from '@element-plus/icons-vue';
// 从数据存储库中导入静态文本和选项数据
import { connectionOptions, scopeOptions, placeholders } from '../constant/knowledgeCategories.ts';

const props = defineProps(['ifShow']);
const emit = defineEmits();

// 封装的表单数据
const formData = reactive({
    connectionType: 'direct',
    selectedScopes: ['report', 'dashboard', 'chat-bi'],
    modelDescription: '',
    prompt: ''
});

const toggleVisibility = () => {
    emit('updateIfShow', false);
};

// 确认按钮处理函数
const confirm = () => {
    console.log('表单数据：', formData); // 打印表单数据用于调试
    toggleVisibility();
};
</script>

<style scoped>
/* 修改后的样式 */
.Knowledge {
    position: relative;
    z-index: 100;
}

hr {
    border: 0;
    border-top: 1px solid #e2e2e2;
}
</style>
