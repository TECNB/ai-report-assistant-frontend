<template>
  <div class="Knowledge">
    <!-- 弹窗 -->
    <div v-if="props.ifShow" class="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
      <div class="bg-white rounded-lg shadow-lg p-6 w-96 relative z-50 overflow-visible">
        <div class="flex justify-end">
          <div @click="toggleVisibility" class="cursor-pointer">
            <el-icon>
              <Close />
            </el-icon>
          </div>
        </div>
        <!-- 模型信息 -->
        <div>
          <h2 class="text-xl font-bold mb-4">模型信息</h2>
          <hr class="my-4" />

          <!-- 模型名称 -->
          <div class="mb-2">
            <label class="font-semibold">模型名称</label>
            <textarea
                class="w-full border font-semibold border-gray-300 rounded p-2"
                rows="3"
                v-model="formData.name"
                :placeholder="placeholders.name"
            ></textarea>
          </div>

          <!-- 模型描述 -->
          <div class="mb-2">
            <label class="font-semibold">模型描述</label>
            <textarea
                class="w-full border font-semibold border-gray-300 rounded p-2"
                rows="3"
                v-model="formData.modelDescription"
                :placeholder="placeholders.modelDescription"
            ></textarea>
          </div>

          <!-- 提示词 -->
          <div class="mb-2">
            <label class="font-semibold">ChatBI提示词</label>
            <textarea
                class="w-full border font-semibold border-gray-300 rounded p-2"
                rows="5"
                v-model="formData.prompt"
                :placeholder="placeholders.prompt"
            ></textarea>
          </div>
        </div>

        <!-- 确定按钮和 Dropdown 菜单 -->
        <div class="mt-6 flex justify-between items-center">
          <!-- 自定义 Dropdown 菜单 -->
          <div class="relative">
            <button
                @click="toggleDropdown"
                class="flex justify-between items-center bg-white border border-gray-300 text-gray-500 px-4 py-2 rounded-lg shadow-md focus:outline-none"
            >
              <span class="mr-2">展示模型</span>
              <el-icon>
                <ElIconArrowDown />
              </el-icon>
            </button>
            <div
                v-if="dropdownVisible"
                class="absolute mt-2 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50"
            >
              <div
                  v-for="(model, key) in modelData"
                  :key="key"
                  @click="selectModel(key)"
                  class="cursor-pointer px-4 py-2 hover:bg-gray-100 rounded-lg"
              >
                {{ model.name }}
              </div>
            </div>
          </div>

          <!-- 创建/完成模型按钮 -->
          <div
              @click="toggleCreateModel"
              :class="[
              'px-4 py-2 rounded-lg cursor-pointer',
              isCreatingModel ? 'bg-green-500 text-white' : 'bg-gray-100 text-black',
              isFormIncomplete ? 'opacity-50 cursor-not-allowed' : ''
            ]"
              :style="isFormIncomplete ? { pointerEvents: 'none' } : {}"
          >
            {{ isCreatingModel ? '完成模型' : '创建模型' }}
          </div>

          <!-- 确定按钮 -->
          <button
              @click="confirm"
              class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            确定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import { Close, ArrowDown as ElIconArrowDown } from '@element-plus/icons-vue';
import { modelData, initialFormData,placeholders } from '../constant/knowledgeCategories.ts';

const props = defineProps(['ifShow']);
const emit = defineEmits();

// 表单数据
const formData = reactive({ ...initialFormData });

// 下拉菜单的可见性控制
const dropdownVisible = ref(false);

// 创建模型按钮状态
const isCreatingModel = ref(false);

// 判断表单是否未填满
const isFormIncomplete = computed(() => {
  return !formData.name || !formData.modelDescription || !formData.prompt;
});

// 切换弹窗显示
const toggleVisibility = () => {
  emit('updateIfShow', false);
};

// 切换下拉菜单的显示状态
const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};

// 选择模型
const selectModel = (command: keyof typeof modelData) => {
  const selectedModel = modelData[command];
  formData.name = selectedModel.name;
  formData.modelDescription = selectedModel.description;
  formData.prompt = selectedModel.mappings;
  dropdownVisible.value = false; // 选择后关闭下拉菜单
  console.log('已选择模型:', selectedModel); // 打印已选择的模型，用于调试
};

// 切换创建/完成模型状态
const toggleCreateModel = () => {
  if (!isCreatingModel.value) {
    // 如果是创建模型，则清空表单数据
    formData.name = '';
    formData.modelDescription = '';
    formData.prompt = '';
  } else {
    // 完成模型，将表单数据保存为新模型
    const newModelId = `model${Date.now()}`; // 简单生成唯一 ID
    modelData[newModelId] = {
      id: newModelId,
      name: formData.name,
      description: formData.modelDescription,
      mappings: formData.prompt,
    };
    console.log('新模型已创建:', modelData[newModelId]); // 打印新模型
  }
  isCreatingModel.value = !isCreatingModel.value;
};

// 确认按钮处理函数
const confirm = () => {
  console.log('表单数据：', formData); // 打印表单数据用于调试
  toggleVisibility();
};
</script>

<style scoped>
.Knowledge {
  position: relative;
  z-index: 100;
}

hr {
  border: 0;
  border-top: 1px solid #e2e2e2;
}

button {
  transition: background-color 0.3s ease;
}

button:hover {
  cursor: pointer;
}
</style>