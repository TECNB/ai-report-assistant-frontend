import { ECBasicOption } from 'echarts/types/dist/shared';

// 生成 Boxplot 图表选项的函数
const boxplotOptions = (xAxisData: string[], seriesData: number[][]): ECBasicOption => {
    return {
        tooltip: {
            trigger: 'item',
            formatter: function (param: any) {
                return [
                    `Category: ${param.name}`,
                    `Upper: ${param.data[5]}`,
                    `Q3: ${param.data[4]}`,
                    `Median: ${param.data[3]}`,
                    `Q1: ${param.data[2]}`,
                    `Lower: ${param.data[1]}`
                ].join('<br/>');
            }
        },
        grid: {
            top: '5%',
            left: '0%',
            right: '0%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: xAxisData,
            boundaryGap: true,
            nameGap: 30,
            splitArea: {
                show: false
            },
            axisLabel: {
                rotate: 0,  // 根据类别显示调整
            },
        },
        yAxis: {
            type: 'value',
            name: '碳排放量 (吨)',
            splitArea: {
                show: true
            }
        },
        series: [
            {
                name: '碳排放分布',
                type: 'boxplot',
                data: seriesData,
                itemStyle: {
                    color: '#5DB1FF'  // 颜色与碳排放主题一致
                },
            }
        ]
    };
};

export default boxplotOptions;