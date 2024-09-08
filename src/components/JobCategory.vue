<template>
  <div class="mb-4">
    <div @click="toggleDropdown" :class="{
      'bg-gray-200 border-0 hover:border-text-300': isOpen,
      'bg-white   hover:border-text-300': !isOpen
    }"
      class="flex justify-between w-full p-4 border rounded-lg text-left items-center cursor-pointer transition-colors duration-300">
      <div class="flex items-center">
        <i :class="['fas', iconClass, iconColor, 'w-6', 'h-6', 'mr-3']"></i>
        <span class="font-bold text-w">{{ props.title }}</span>
      </div>
      <i class="fas fa-chevron-down w-5 h-5"></i>
    </div>

    <transition name="slide-fade">
      <div v-if="isOpen" class="pl-4 pt-2">
        <div class="flex flex-wrap gap-2">
          <div v-for="(job, index) in jobs" :key="index" @click="toggleJobSelection(job)" :class="{
            'bg-gray-500 text-white': selectedJobs.includes(job),
            'bg-white text-gray-700 hover:bg-gray-300': !selectedJobs.includes(job)
          }"
            class="px-4 py-2 rounded-lg flex justify-between items-center shadow-sm border border-gray-300 cursor-pointer transition-colors duration-300">
            <span>{{ job }}</span>
            <i v-if="selectedJobs.includes(job)" class="fas fa-times w-5 h-5 text-white ml-2"></i>
            <i v-else class="fas fa-plus w-5 h-5 text-gray-500 ml-2"></i>
          </div>
        </div>
      </div>
    </transition>

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
/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-fade-enter-active {
  transition: all 0.5s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
