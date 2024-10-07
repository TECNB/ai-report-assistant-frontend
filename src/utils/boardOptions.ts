import { ECBasicOption } from 'echarts/types/dist/shared';

const boardOptions = (currentValue: number): ECBasicOption => {
    return {
        title: {
            text: '年度绿化统计',
            left: 'center',
        },
        tooltip: {
            formatter: '{a} <br/>{b} : {c}%',
        },
        series: [
            {
                name: '绿化进度',
                type: 'gauge',
                detail: {
                    formatter: '{value}%',
                    fontSize: 18,
                },
                data: [
                    {
                        value: currentValue,
                        name: '当前绿化率',
                    },
                ],
                axisLine: {
                    lineStyle: {
                        width: 15,
                        color: [
                            [0.2, '#FF6E76'],
                            [0.4, '#FDDD60'],
                            [0.6, '#58D9F9'],
                            [0.8, '#7CFFB2'],
                            [1, '#4CAF50'],
                        ],
                    },
                },
                pointer: {
                    width: 5,
                },
                splitLine: {
                    length: 20,
                    lineStyle: {
                        width: 2,
                    },
                },
                axisLabel: {
                    fontSize: 12,
                },
            },
        ],
    };
};

export default boardOptions;