// dataRepository.ts


export const placeholders = {
    name:'生态环境报表知识库',
    modelDescription: '存储与生态环境相关的数据和报表，用于生成环境分析报告',
    prompt: '水质监测=水体污染监测，空气质量=空气污染指数"'
};
// modelsData.ts
export const modelData: { [key: string]: { id: string; name: string; description: string; mappings: string } } = {
    ecology: {
        id: '67890',
        name: '生态环境报表知识库',
        description: '存储与生态环境相关的数据和报表，用于生成环境分析报告',
        mappings: '水质监测=水体污染监测，空气质量=空气污染指数',
    },
    vegetation: {
        id: '12345',
        name: '植被覆盖报表知识库',
        description: '存储与植被覆盖相关的数据和报表，用于生成植被分析报告',
        mappings: '森林覆盖=森林面积，草原覆盖=草原面积',
    },
};

// 表单数据
export const initialFormData = {
    connectionType: 'direct',
    selectedScopes: ['report', 'dashboard', 'chat-bi'],
    modelDescription: '',
    prompt: '',
    name: '',
};

