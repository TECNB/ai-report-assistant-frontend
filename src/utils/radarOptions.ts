import { ECBasicOption } from 'echarts/types/dist/shared';

const radarOptions = (indicatorData: { name: string; max: number }[], seriesData: number[]): ECBasicOption => {
    return {
        tooltip: {
            trigger: 'item',
        },
        radar: {
            // 指标配置
            indicator: indicatorData,
            shape: 'polygon',  // 雷达图形状
            splitNumber: 5,  // 网格分成的层数
            axisName: {
                color: '#333',  // 轴线名称颜色
                fontSize: 12,
            },
            splitLine: {
                lineStyle: {
                    color: '#ddd',  // 网格线颜色
                },
            },
            splitArea: {
                show: false,  // 隐藏雷达图的背景填充
            },
        },
        series: [
            {
                name: '绿化率',
                type: 'radar',
                data: [
                    {
                        value: seriesData,
                        name: '年度绿化率',
                    },
                ],
                areaStyle: {
                    color: 'rgba(93, 177, 255, 0.5)',  // 填充颜色，透明度调整适合展示绿化率
                },
                lineStyle: {
                    color: '#5DB1FF',  // 线条颜色
                },
            },
        ],
    };
};

export default radarOptions;