import { ref } from 'vue';

import { StatementItem } from '../interfaces/StatementItem';

import airLineOptions from '../utils/airLineOptions';
import waterBarOption from '../utils/waterBarOption';
import forestPieOption from '../utils/forestPieOption';
import airHorizontalBarOption from '../utils/airHorizontalBarOption';

import { airLineData } from '../constant/airLineData';
import { forestPieData } from '../constant/forestPieData';
import { waterBarData } from '../constant/waterBarData' ;
import { horizontalBarData } from '../constant/horizontalBarData';

export const statementItems = ref<StatementItem[]>([
    { top: 0, left: 50, height: 200, width: 600, label: '空气质量优良天数', type: 'numbers', numbers: ["2", "8", "0"] },
    { top: 0, left: 680, height: 200, width: 600, label: '本年度二氧化碳总排放量', type: 'numbers', numbers: ["1", "2", "0", "0", "0", "0"] },
    { top: 220, left: 50, height: 290, width: 1190, label: '年度空气质量统计', type: 'chart', chart: 'line', data: airLineData, chartOption: airLineOptions },
    { top: 550, left: 50, height: 290, width: 350, label: '年度碳排放来源分析', type: 'chart', chart: 'bar', data: waterBarData, chartOption: waterBarOption },
    { top: 550, left: 470, height: 290, width: 350, label: '年度森林覆盖率', type: 'chart', chart: 'pie', data: forestPieData, chartOption: forestPieOption },
    { top: 550, left: 890, height: 290, width: 350, label: '空气质量对比', type: 'chart', chart: 'horizontalBar', data: horizontalBarData, chartOption: airHorizontalBarOption }
]);


