import { ref } from 'vue';

export function useAqiData() {
    // 抽出 AQI 数据
    const aqiData = ref([
        { year: 2019, month: 'Jan', aqi: 40 },
        { year: 2019, month: 'Feb', aqi: 45 },
        { year: 2019, month: 'Mar', aqi: 50 },
        { year: 2019, month: 'Apr', aqi: 55 },
        { year: 2019, month: 'May', aqi: 60 },
        { year: 2019, month: 'Jun', aqi: 65 },
        { year: 2019, month: 'Jul', aqi: 70 },
        { year: 2019, month: 'Aug', aqi: 75 },
        { year: 2019, month: 'Sep', aqi: 70 },
        { year: 2019, month: 'Oct', aqi: 65 },
        { year: 2019, month: 'Nov', aqi: 60 },
        { year: 2019, month: 'Dec', aqi: 55 },

        { year: 2020, month: 'Jan', aqi: 40 },
        { year: 2020, month: 'Feb', aqi: 45 },
        { year: 2020, month: 'Mar', aqi: 50 },
        { year: 2020, month: 'Apr', aqi: 55 },
        { year: 2020, month: 'May', aqi: 60 },
        { year: 2020, month: 'Jun', aqi: 65 },
        { year: 2020, month: 'Jul', aqi: 70 },
        { year: 2020, month: 'Aug', aqi: 75 },
        { year: 2020, month: 'Sep', aqi: 70 },
        { year: 2020, month: 'Oct', aqi: 65 },
        { year: 2020, month: 'Nov', aqi: 60 },
        { year: 2020, month: 'Dec', aqi: 55 },

        { year: 2021, month: 'Jan', aqi: 40 },
        { year: 2021, month: 'Feb', aqi: 45 },
        { year: 2021, month: 'Mar', aqi: 50 },
        { year: 2021, month: 'Apr', aqi: 55 },
        { year: 2021, month: 'May', aqi: 60 },
        { year: 2021, month: 'Jun', aqi: 65 },
        { year: 2021, month: 'Jul', aqi: 70 },
        { year: 2021, month: 'Aug', aqi: 75 },
        { year: 2021, month: 'Sep', aqi: 70 },
        { year: 2021, month: 'Oct', aqi: 65 },
        { year: 2021, month: 'Nov', aqi: 60 },
        { year: 2021, month: 'Dec', aqi: 55 },
    
        { year: 2022, month: 'Jan', aqi: 42 },
        { year: 2022, month: 'Feb', aqi: 47 },
        { year: 2022, month: 'Mar', aqi: 52 },
        { year: 2022, month: 'Apr', aqi: 57 },
        { year: 2022, month: 'May', aqi: 62 },
        { year: 2022, month: 'Jun', aqi: 67 },
        { year: 2022, month: 'Jul', aqi: 72 },
        { year: 2022, month: 'Aug', aqi: 77 },
        { year: 2022, month: 'Sep', aqi: 72 },
        { year: 2022, month: 'Oct', aqi: 67 },
        { year: 2022, month: 'Nov', aqi: 62 },
        { year: 2022, month: 'Dec', aqi: 57 },
    
        { year: 2023, month: 'Jan', aqi: 44 },
        { year: 2023, month: 'Feb', aqi: 49 },
        { year: 2023, month: 'Mar', aqi: 54 },
        { year: 2023, month: 'Apr', aqi: 59 },
        { year: 2023, month: 'May', aqi: 64 },
        { year: 2023, month: 'Jun', aqi: 69 },
        { year: 2023, month: 'Jul', aqi: 74 },
        { year: 2023, month: 'Aug', aqi: 79 },
        { year: 2023, month: 'Sep', aqi: 74 },
        { year: 2023, month: 'Oct', aqi: 69 },
        { year: 2023, month: 'Nov', aqi: 64 },
        { year: 2023, month: 'Dec', aqi: 59 }
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
