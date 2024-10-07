import { ECBasicOption } from 'echarts/types/dist/shared';

const funnelOptions = (funnelData: { name: string; value: number }[]): ECBasicOption => {
    return {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}%',
        },
        legend: {
            data: funnelData.map(item => item.name),
            bottom: '10%',
        },
        series: [
            {
                name: '绿化来源',
                type: 'funnel',
                left: '10%',
                top: 10,
                bottom: 50,
                width: '80%',
                min: 0,
                max: 40,
                minSize: '0%',
                maxSize: '100%',
                sort: 'descending',
                gap: 2,
                label: {
                    show: true,
                    position: 'inside',
                    formatter: '{b}: {c}%',
                },
                labelLine: {
                    length: 10,
                    lineStyle: {
                        width: 1,
                        type: 'solid',
                    },
                },
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 2,
                },
                emphasis: {
                    label: {
                        fontSize: 20,
                    },
                },
                data: funnelData,
            },
        ],
    };
};

export default funnelOptions;