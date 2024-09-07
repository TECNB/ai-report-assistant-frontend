<template>
  <div class="mb-4">
    <button
        @click="toggleDropdown"
        :class="{
        'bg-emerald-50 border-emerald-300': isOpen,
        'bg-white border-gray-300': !isOpen
      }"
        class="flex justify-between w-full p-4 border rounded-lg text-left items-center transition-colors duration-300"
    >
      <div class="flex items-center">
        <i :class="['fas', iconClass, iconColor, 'w-6', 'h-6', 'mr-3']"></i>
        <span class="font-bold">{{ title }}</span>
      </div>
      <i class="fas fa-chevron-down w-5 h-5"></i>
    </button>

    <div v-if="isOpen" class="pl-4 pt-2">
      <div class="flex flex-wrap gap-2">
        <div
            v-for="(job, index) in jobs"
            :key="index"
            @click="toggleJobSelection(job)"
            :class="{
            'bg-emerald-700 text-white': selectedJobs.includes(job),
            'bg-white text-gray-700': !selectedJobs.includes(job)
          }"
            class="px-4 py-2 rounded-lg flex justify-between items-center shadow-sm border border-gray-300 inline-flex hover:bg-gray-100 cursor-pointer transition-colors duration-300"
        >
          <span>{{ job }}</span>
          <i v-if="selectedJobs.includes(job)" class="fas fa-times w-5 h-5 text-white ml-2"></i>
          <i v-else class="fas fa-plus w-5 h-5 text-gray-500 ml-2"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  title: String,
  jobs: Array as () => string[],
  iconClass: String,
  iconColor: String
});

const emit = defineEmits(['update:selectedJobs']);
const selectedJobs = ref<string[]>([]);
const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const toggleJobSelection = (job: string) => {
  if (selectedJobs.value.includes(job)) {
    selectedJobs.value = selectedJobs.value.filter((j) => j !== job);
  } else {
    selectedJobs.value.push(job);
  }
  emit('update:selectedJobs', selectedJobs.value);
};
</script>

<style scoped>
/* 根据需要添加样式 */
</style>
