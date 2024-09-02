<template>
    <div class="IndexView">
        <div class="w-64 h-full bg-bg-200 rounded-r-2xl">
            <Sidebar />
        </div>
        <div class="flex-1 h-full px-5 py-3">
            <Chat />
        </div>
    </div>

</template>

<script setup lang="ts">
import { } from "vue"
</script>

<style lang="scss" scoped>
.IndexView {
    height: 100vh;
    display: flex;
}
</style>
