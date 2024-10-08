import { ECBasicOption } from 'echarts/types/dist/shared';

const boardOptions = (currentValue: number): ECBasicOption => {
    return {
        tooltip: {
            formatter: '{a} <br/>{b} : {c}%',
        },
        series: [
            {
                name: '绿化进度',
                type: 'gauge',
                detail: {
                    formatter: '{value}%',
                    fontSize: 20,
                },
                data: [
                    {
                        value: currentValue,

                    },
                ],
                axisLine: {
                    lineStyle: {
                        width: 10,
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
                    length: 12,
                    lineStyle: {
                        width: 2,
                    },
                },
                axisLabel: {
                    fontSize: 10,
                },
            },
        ],
    };
};

export default boardOptions;