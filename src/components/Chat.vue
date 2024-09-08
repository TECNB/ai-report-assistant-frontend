<template>
    <div class="Chat">
        <div class="flex justify-between items-center">
            <div class="flex justify-between items-center gap-5 cursor-pointer" @click="showStatement">
                <p class="font-bold text-lg text-text-200">生态环境报表</p>

                <el-icon v-if="!statementVisible">
                    <ArrowDownBold />
                </el-icon>
                <el-icon v-else>
                    <ArrowUpBold />
                </el-icon>

            </div>
            <transition name="fade">
                <div v-if="statementVisible"
                    class="w-96 absolute top-11 shadow-lg rounded-xl border-[0.5px] bg-bg-100 p-5">
                    <!-- 下面为藏品名称搜索框 -->
                    <el-input v-model="statementName" placeholder="搜索报表" class="">
                        <template #prefix>
                            <el-icon color="var(--text-100)" class="el-input__icon">
                                <search />
                            </el-icon>
                        </template>
                    </el-input>

                    <div class="w-full flex flex-col justify-center items-start gap-3 mt-5">
                        <div class="w-full flex justify-between items-center">
                            <p class="font-bold text-text-200">交通报表</p>
                            <el-icon>
                                <Check />
                            </el-icon>
                        </div>

                        <p class="font-bold text-text-200">能源报表</p>
                        <p class="font-bold text-text-200">医院数据报表</p>
                    </div>

                </div>
            </transition>

            <div class="" @click="showKnowledge">
                <img class="w-6 h-6 rounded-full object-cover aspect-square" src="../assets/images/avatar.png" alt="">
            </div>
        </div>

        <div v-if="showSuggestions" class="flex flex-1 flex-col justify-center items-start max-w-6xl p-20 mt-10">
            <!-- mt-10 增加了距离 -->
            <div class="flex flex-col justify-center items-start gap-2">
                <img class="w-11 h-11 rounded-full border border-gray-300 object-cover aspect-square"
                    src="../assets/images/icon.png" alt="">
                <p class="text-3xl font-bold">您好,TEC</p>
                <p class="text-3xl font-bold text-text-400">有什么我能帮您的吗？</p>
            </div>
            <div class="flex justify-center items-center gap-2 mt-3">
                <el-icon color="#B4B4B4">
                    <Link />
                </el-icon>
                <p class="font-bold text-text-400">建议</p>
            </div>
            <div class="flex justify-center items-center gap-2 mt-1">
                <div v-for="(suggestion, index) in suggestions" :key="index"
                    class="w-64 h-36 bg-bg-200 rounded-3xl text-left flex flex-col gap-8 px-5 py-6 hover:bg-bg-300 cursor-pointer transition-bg duration-300">
                    <div class="flex flex-col justify-center items-start">
                        <p class="text-text-100 font-bold">{{ suggestion.title }}</p>
                        <p class="text-text-200 text-sm">{{ suggestion.description }}</p>
                    </div>

                    <div class="flex justify-between items-center">
                        <p class="text-text-200 text-sm ">提示词</p>
                        <el-icon color="#B4B4B4">
                            <Top />
                        </el-icon>
                    </div>
                </div>
            </div>
        </div>
        <div v-else id="chat-window" class="flex-1 overflow-auto p-20">
            <div v-for="(msg, index) in displayedMessages" :key="index" class="mb-4 flex items-start">
                <div v-if="msg.type === 'user'" class="bg-gray-100 rounded-lg p-3 ml-auto max-w-md">
                    <p class="text-lg font-bold text-gray-600">{{ msg.content }}</p>
                </div>
                <div v-if="msg.type === 'loading'" class="skeleton-loader w-full">
                    <div class="skeleton-line"></div>
                    <div class="skeleton-line"></div>
                    <div class="skeleton-line"></div>
                </div>
                <div v-if="msg.type === 'ai'" class="flex gap-3 items-start">
                    <img src="../assets/images/icon.png" alt="AI Avatar"
                        class="w-6 h-6 rounded-full border border-gray-300 object-cover" />
                    <div class="flex flex-col">
                        <!-- Static Title -->
                        <div class="flex items-center">
                            <p class="text-lg font-bold text-gray-700 mr-3">gpt-3.5-turbo</p>
                        </div>
                        <!-- Dynamic Content -->
                        <div class="flex items-start">
                            <p class="text-lg font-bold text-gray-600">{{ msg.content }}</p>
                        </div>
                        <!-- Action Icons -->
                        <div class="action-icons flex gap-3 mt-2 text-sm text-gray-500">
                            <i class="fas fa-pen"></i>
                            <!-- 复制文档图标 -->
                            <i class="fas fa-clipboard"></i>
                            <!-- 刷新图标 -->
                            <i class="fas fa-sync-alt"></i>
                            <!-- 添加图标 -->
                            <i class="fas fa-headphones"></i>
                            <!-- 编辑图标 -->
                            <i class="fas fa-circle-info"></i>
                            <!-- 消息图标 -->
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <div class="flex justify-between items-center gap-5 mb-5 mx-5">
            <div class="flex flex-1 justify-between items-center bg-bg-200 rounded-3xl p-3">
                <div class="flex items-center gap-5">
                    <el-icon size="18">
                        <Plus />
                    </el-icon>
                    <input v-model="message" @keyup.enter="handleEnter" type="text" placeholder="输入消息"
                        class="bg-transparent outline-none flex-1 placeholder:text-text-300 placeholder:font-bold text-black" />
                </div>
                <el-icon size="18">
                    <Microphone />
                </el-icon>
            </div>
            <el-icon size="18">
                <Headset />
            </el-icon>
        </div>

        <Knowledge :ifShow="knowledgeVisible" @updateIfShow="updateKnowledgeVisible"/>
        <!-- 遮罩层 -->
        <MaskLayer :ifShow="knowledgeVisible" />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { suggestions } from '../constant/suggestions'; // 导入建议列表
import { AIChat } from '../utils/AIChat'; // 导入AIChat

let statementVisible = ref(false);
let knowledgeVisible = ref(false);
let statementName = ref('');
const message = ref('');
const systemContent = ref('生态环境');
const relatedData = ref('当前生态环境数据显示：空气质量指数（AQI）为45，空气质量等级为优；PM2.5浓度为15微克/立方米，PM10浓度为30微克/立方米，二氧化硫（SO2）浓度为8微克/立方米，二氧化氮（NO2）浓度为20微克/立方米，一氧化碳（CO）浓度为0.7毫克/立方米，臭氧（O3）浓度为100微克/立方米。​');
const showSuggestions = ref(true); // 控制建议列表显示
const displayedMessages = ref<{ type: string; content: string }[]>([]); // 展示的消息列表

// 打字机效果函数
const typeEffect = (text: string, speed: number) => {
    let index = 0;
    const interval = setInterval(() => {
        if (index < text.length) {
            displayedMessages.value[displayedMessages.value.length - 1].content += text[index++];
        } else {
            clearInterval(interval);
        }
    }, speed); // 控制字符出现速度
};

// 回车事件处理函数
const handleEnter = async () => {
    if (message.value.trim()) {
        const userContent = message.value;
        displayedMessages.value.push({ type: 'user', content: userContent });
        message.value = '';

        showSuggestions.value = false; // 隐藏建议列表

        // Add a loading placeholder
        displayedMessages.value.push({ type: 'loading', content: '' });

        try {
            const response = await AIChat(systemContent.value, userContent, relatedData.value);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const reader = response.body?.getReader();
            if (!reader) throw new Error('Failed to get reader from response body');

            const textDecoder = new TextDecoder();
            let completeMessage = ''; // 用于累积AI的回复内容

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunkText = textDecoder.decode(value);
                const results = chunkText.split('\n\n').filter(Boolean).map((item) => item.replace(/^data: /, ''));

                for (let i = 0; i < results.length; i++) {
                    const chunk = results[i];
                    if (chunk.indexOf('DONE') === -1) {
                        try {
                            const chunkData = JSON.parse(chunk);
                            const content = chunkData.choices[0]?.delta?.content;
                            if (content) {
                                completeMessage += content;
                                // Update the last AI message's content
                                if (displayedMessages.value[displayedMessages.value.length - 1].type === 'loading') {
                                    displayedMessages.value[displayedMessages.value.length - 1].content = completeMessage;
                                } else {
                                    displayedMessages.value.push({ type: 'ai', content: completeMessage });
                                }
                            }
                        } catch (e) {
                            console.error('JSON解析出错:', e, chunk);
                        }
                    }
                }
            }

            // 移除加载占位符
            displayedMessages.value.pop();

            // 添加最终的AI消息并应用打字效果
            displayedMessages.value.push({ type: 'ai', content: '' });
            typeEffect(completeMessage, 50);

        } catch (error) {
            console.error('请求失败:', error);
            displayedMessages.value.pop(); // 移除加载占位符
            displayedMessages.value.push({ type: 'ai', content: '发生错误，请稍后再试。' });
        }
    }
};

const showStatement = () => {
    statementVisible.value = !statementVisible.value;
};
const showKnowledge = () => {
    knowledgeVisible.value = !knowledgeVisible.value;
};
const updateKnowledgeVisible = (newValue: boolean) => {
    knowledgeVisible.value = newValue;
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.action-icons .el-icon {
    font-weight: bold;
    /* 尝试加粗 */
    font-size: 1.2em;
    /* 放大字体 */
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
    /* 添加阴影使图标看起来更粗 */
}

#chat-window {
    max-height: calc(100vh - 200px);
    overflow-y: auto;
    padding-bottom: 100px;
    /* 确保聊天记录不会被输入框覆盖 */
}

.typing-effect {
    white-space: pre-wrap;
    overflow-wrap: break-word;
    border-right: 0.1em solid;
    animation: typing 3.5s steps(30, end), blink-caret 0.75s step-end infinite;
}

@keyframes typing {
    from {
        width: 0;
    }

    to {
        width: 100%;
    }
}

@keyframes blink-caret {

    from,
    to {
        border-color: transparent;
    }

    50% {
        border-color: black;
    }
}

.skeleton-loader {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.skeleton-line {
    width: 100%;
    height: 20px;
    background-color: #e0e0e0;
    border-radius: 4px;
    animation: pulse 1.5s infinite ease-in-out;
}

.Chat {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    .el-input {
        height: 50px;

        border-radius: 12px;
        border: 0.5px solid var(--text-200);
        border: 0;
        background-color: var(--bg-200);

        font-size: 18px;
        font-weight: bold;


        :deep(.el-input__wrapper) {
            border-radius: 12px;
            background-color: var(--bg-200);

        }


        :deep(.is-focus) {
            box-shadow: 0 0 0 1px var(--accent-200)
        }
    }
}
</style>