import { ref } from 'vue';

export function useAqiData() {
    // 抽出 AQI 数据
    const aqiData = ref([
        { month: 'Jan', aqi: 40 },
        { month: 'Feb', aqi: 45 },
        { month: 'Mar', aqi: 50 },
        { month: 'Apr', aqi: 55 },
        { month: 'May', aqi: 60 },
        { month: 'Jun', aqi: 65 },
        { month: 'Jul', aqi: 70 },
        { month: 'Aug', aqi: 75 },
        { month: 'Sep', aqi: 70 },
        { month: 'Oct', aqi: 65 },
        { month: 'Nov', aqi: 60 },
        { month: 'Dec', aqi: 55 }
    ]);

    return { aqiData };
}
export function useCodData() {
    const codData = ref([
        { month: 'Jan', cod: 15 },
        { month: 'Feb', cod: 18 },
        { month: 'Mar', cod: 17 },
        { month: 'Apr', cod: 20 },
        { month: 'May', cod: 28 },
        { month: 'Jun', cod: 20 },
        { month: 'Jul', cod: 15 },
        { month: 'Aug', cod: 20 },
        { month: 'Sep', cod: 22 },
        { month: 'Oct', cod: 28 },
        { month: 'Nov', cod: 30 },
        { month: 'Dec', cod: 25 }
    ]);
    return { codData };
}

// 抽取区域比例数据
export function useRegionData() {
    const regionData = ref([
        { region: '东部地区', percentage: 40 },
        { region: '西部地区', percentage: 30 },
        { region: '中部地区', percentage: 20 },
        { region: '北部地区', percentage: 10 }
    ]);
    return { regionData };
}
