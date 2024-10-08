import { ref } from 'vue';

import { StatementItem } from '../interfaces/StatementItem';

import airLineOptions from '../utils/airLineOptions';
import waterBarOption from '../utils/waterBarOption';
import forestPieOption from '../utils/forestPieOption';
import airHorizontalBarOption from '../utils/airHorizontalBarOption';

import funnelOptions from '../utils/funnelOptions';
import boardOptions from '../utils/boardOptions';
import radarOptions from '../utils/radarOptions';
import boxplotOptions from '../utils/boxplotOptions';
import scatterOption from '../utils/scatterOption';

import { airLineData } from '../constant/airLineData';
import { forestPieData } from '../constant/forestPieData';
import { waterBarData } from '../constant/waterBarData' ;
import { horizontalBarData } from '../constant/horizontalBarData';

import { funnelData } from '../constant/funnelData';
import { boardData } from '../constant/boardData';
import { radarData } from '../constant/radarData';
import { boxplotData } from '../constant/boxplotData';
import { scatterData } from '../constant/scatterData';

export const statementItems = ref<StatementItem[]>([
    { top: 0, left: 50, height: 200, width: 600, label: '空气质量优良天数', type: 'numbers', numbers: ["2", "8", "0","天"] },
    { top: 0, left: 680, height: 200, width: 600, label: '本年度二氧化碳总排放量', type: 'numbers', numbers: ["1", "1", "5", "亿吨",] },
    { top: 220, left: 50, height: 290, width: 1190, label: '年度空气质量统计', type: 'chart', chart: 'line', data: airLineData, chartOption: airLineOptions },
    { top: 550, left: 50, height: 290, width: 350, label: '年度碳排放来源分析', type: 'chart', chart: 'bar', data: waterBarData, chartOption: waterBarOption },
    { top: 550, left: 470, height: 290, width: 350, label: '年度森林覆盖率', type: 'chart', chart: 'pie', data: forestPieData, chartOption: forestPieOption },
    { top: 550, left: 890, height: 290, width: 350, label: '空气质量对比', type: 'chart', chart: 'horizontalBar', data: horizontalBarData, chartOption: airHorizontalBarOption }
]);

export const statementItems2 = ref<StatementItem[]>([
    { top: 0, left: 20, height: 200, width: 350, label: '本年度种草改良总量', type: 'numbers', numbers: ["4", "7", "9", "万公顷"] },
    { top: 0, left: 380, height: 290, width: 580, label: '年度绿化面积', type: 'numbers', numbers: ["8", "0", "0", "万公顷"] },
    { top: 0, left: 970, height: 200, width: 350, label: '本年度治理沙化面积', type: 'numbers', numbers: ["1", "9", "0", "万公顷"] },

    { top: 300, left: 380, height: 500, width: 538, label: '绿化面积对比', type: 'chart', chart: 'radar', data: radarData, chartOption: radarOptions },
    { top: 210, left: 20, height: 290, width: 308, label: '年度绿化来源分析', type: 'chart', chart: 'funnel', data: funnelData, chartOption: funnelOptions },
    { top: 510, left: 20, height: 290, width: 308, label: '年度碳排放来源分析', type: 'chart', chart: 'boxplot', data: boxplotData, chartOption: boxplotOptions },
    { top: 210, left: 970, height: 290, width: 308, label: '年度绿化统计', type: 'chart', chart: 'board', data: boardData, chartOption: boardOptions },

    { top: 510, left: 970, height: 290, width: 308, label: '碳排放量对比', type: 'chart', chart: 'scatter', data: scatterData, chartOption: scatterOption },
]);


