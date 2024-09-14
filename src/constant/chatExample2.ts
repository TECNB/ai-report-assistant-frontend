const chatExample2 = {
    "prompt": "为您归因2023年温室气体排放的原因。",
    "year": 2023,
    "description": "2023年累计温室气体排放",
    "total_value": 45000.5,
    "unit": "吨",
    "year_on_year_comparison": {
        "previous_year": 2022,
        "value_previous_year": 43000.2,
        "year_on_year_change": 2000.3, // 增加的排放量
        "percentage_change": 4.65 // 百分比增长
    },
    "causes": [
        {
            "cause": "交通运输",
            "contribution": 1200.5, // 单位：吨
            "sub_factors": [
                { "sub_factor": "汽车排放", "contribution": 800.3 },
                { "sub_factor": "飞机排放", "contribution": 300.2 },
                { "sub_factor": "货运排放", "contribution": 100.0 }
            ]
        },
        {
            "cause": "工业生产",
            "contribution": 900.7, // 单位：吨
            "sub_factors": [
                { "sub_factor": "钢铁制造", "contribution": 500.5 },
                { "sub_factor": "化工厂", "contribution": 250.2 },
                { "sub_factor": "水泥生产", "contribution": 150.0 }
            ]
        },
        {
            "cause": "能源消耗",
            "contribution": 800.3, // 单位：吨
            "sub_factors": [
                { "sub_factor": "煤炭发电", "contribution": 600.1 },
                { "sub_factor": "天然气发电", "contribution": 150.2 },
                { "sub_factor": "油气开采", "contribution": 50.0 }
            ]
        }
    ]
};

export default chatExample2;