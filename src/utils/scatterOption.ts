import { ECBasicOption } from 'echarts/types/dist/shared';

const scatterOption = (xAxisData: string[], seriesData: number[][]): ECBasicOption => {
    return {
        xAxis: {
            type: 'category',
            data: xAxisData,
            name: '类别',  // X轴名称，可以根据具体数据修改
            axisLabel: {
                rotate: 45,  // 适当旋转以适应类别显示
            },
        },
        yAxis: {
            type: 'value',
            name: '碳排放量 (吨)',  // Y轴名称，适合用于展示碳排放数据
            nameTextStyle: {
                padding: [0, 0, 10, 0],
            },
        },
        grid: {
            left: '5%',
            right: '5%',
            bottom: '10%',
            containLabel: true,
        },
        series: [
            {
                name: '碳排放量对比',
                type: 'scatter',
                data: seriesData,
                symbolSize: function (data:any) {
                    return Math.sqrt(data[1]) / 5;  // 根据数据动态调整点的大小
                },
                color: '#5DB1FF',  // 颜色设为适合碳排放主题的蓝色
                itemStyle: {
                    emphasis: {
                        borderColor: '#333',
                        borderWidth: 1,
                    },
                },
            },
        ],
        tooltip: {
            trigger: 'item',
            formatter: function (params:any) {
                return `${params.name}<br/>碳排放量: ${params.value[1]} 吨`;
            },
        },
    };
};

export default scatterOption;