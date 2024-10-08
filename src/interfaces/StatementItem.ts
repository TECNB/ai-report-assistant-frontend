export interface StatementItem {
    top: number;
    left: number;
    height: number;
    width: number;
    label: string;
    type: 'numbers' | 'chart'; // 定义类型为数字或图表
    numbers?: number[]; // 如果是数字类型，包含数字数组
    chart?: 'line' | 'bar' | 'pie' | 'horizontalBar' | 'funnel' | 'board' | 'radar'; // 图表类型
    data?: any; // 图表的数据
    chartOption?: any; // 图表的配置选项
}