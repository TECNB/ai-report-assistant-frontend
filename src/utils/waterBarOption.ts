const waterBarOption = (xAxisData: string[], seriesData: number[]) => {
    return {
        xAxis: {
            type: 'category',
            data: xAxisData,
            axisLabel: {
                rotate: 45,  // 旋转横轴标签，以适应月份显示
            },
        },
        yAxis: {
            type: 'value',
            position: 'left',
            name: 'COD (mg/L)',  // 添加 y 轴标签，假设指标是 COD
            nameTextStyle: {
                padding: [0, 0, 10, 0],  // 调整标签位置
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
                name: 'COD',
                type: 'bar',
                data: seriesData,
                color: ['#5DB1FF'],
                itemStyle: {
                    normal: {
                        barBorderRadius: [8, 8, 0, 0],  // 设置柱状图的圆角效果
                    },
                },
            },
        ],
    };
};

export default waterBarOption;