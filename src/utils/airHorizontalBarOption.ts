const airHorizontalBarOption = (yAxisData: string[], seriesData: number[]) => {
    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },  // 提示框显示为阴影效果
        },
        xAxis: {
            type: 'value',
            name: 'AQI',
            nameTextStyle: {
                padding: [0, 0, 0, 0],  // 调整 x 轴名称位置
            },
            position: 'top',  // x 轴放在图表顶部
        },
        yAxis: {
            type: 'category',
            data: yAxisData,  // 使用地区名称作为 y 轴
            axisLabel: {
                rotate: 0,  // 不旋转标签
            },
        },
        grid: {
            left: '10%',
            right: '10%',
            bottom: '10%',
            containLabel: true,
        },
        series: [
            {
                name: 'AQI',
                type: 'bar',
                data: seriesData,
                color: ['#5DB1FF'],
                itemStyle: {
                    barBorderRadius: [0, 8, 8, 0],  // 圆角应用到左侧的柱状条
                },
                emphasis: {
                    itemStyle: {
                        color: '#3398DB',  // 高亮时的颜色
                    },
                },
            },
        ],
    };
};

export default airHorizontalBarOption;