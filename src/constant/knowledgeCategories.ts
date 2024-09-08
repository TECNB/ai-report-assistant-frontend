// dataRepository.ts

export const connectionOptions = [
    { id: 'direct', label: '直连' },
    { id: 'extract', label: '抽取' }
];

export const scopeOptions = {
    report: '报告',
    dashboard: '大屏',
    retrieval: '取数',
    'data-pro': '大屏Pro',
    table: '数据表格',
    'chat-bi': 'ChatBI'
};

export const placeholders = {
    modelDescription: '输入模型描述',
    prompt: '市场部=市场营销部\n技术部=”岗位“包含“工程师"'
};
