const chatExample = {
	"prompt": "好的，以下是根据温室气体排放数据分析为您输出的结果。",
	"year": 2023,
	"total_value": 45000.5,
	"unit": "ton",
	"year_on_year_comparison": {
		"previous_year": 2022,
		"value_previous_year": 43000.2,
		"year_on_year_change": 4.65
	},
	"insights": {
		"keywords": [
			"预测2024年的排放量",
			"生成2023年的月度排放图表",
			"分析温室气体排放增长的原因",
			"比较过去五年的排放趋势",
			"制定减少温室气体排放的计划",
			"排放量达到碳中和目标的时间预测",
			"为您生成预测排放变化的可视化报告",
			"评估当前环保政策的效果"
		],
		"suggestions": "排放量比去年增长了4.65%。您可以考虑生成图表来可视化排放趋势，或预测明年的排放变化，进而制定有效的碳减排计划。"
	},
	"details": {
		"granularity": "monthly",
		"data_values": {
			"January": 3700.2,
			"February": 3200.5,
			"March": 4000.3,
			"April": 4100.7,
			"May": 4600.1,
			"June": 4200.4,
			"July": 4800.6,
			"August": 4500.2,
			"September": 4400.8,
			"October": 4700.3,
			"November": 4300.9,
			"December": 4500.5
		}
	},
	"code": {
		"language": "Python",
		"logic": "AI 数据取数及分析",
		"example": "def get_data_by_year(year):\n    previous_year = year - 1\n    current_year_data = fetch_data_by_year(year)\n    previous_year_data = fetch_data_by_year(previous_year)\n    year_on_year_change = ((current_year_data - previous_year_data) / previous_year_data) * 100\n    return {\n        'year': year,\n        'total_value': current_year_data,\n        'previous_year': previous_year,\n        'value_previous_year': previous_year_data,\n        'year_on_year_change': round(year_on_year_change, 2)\n    }\n\ndata = get_data_by_year(2023)"
	}
}

export default chatExample;