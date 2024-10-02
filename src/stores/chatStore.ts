// stores/chatStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useChatStore = defineStore('chatStore', () => {
    const displayedMessages = ref([]);

    const saveMessages = (messages:any) => {
        displayedMessages.value = messages;
    };

    return {
        displayedMessages,
        saveMessages,
    };
});
