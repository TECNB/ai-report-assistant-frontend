

const chatWeather =     `  -- 统计2023年温室气体排放量，按气体类型和区域汇总，并计算总排放量
SELECT 
    -- 如果气体类型为空（ROLLUP 产生的总计行），显示 'All Gases'
    COALESCE(gas_type, 'All Gases') AS gas_type, 
    
    -- 如果区域为空，显示 'All Regions'
    COALESCE(region, 'All Regions') AS region, 
    
    -- 计算排放量的总和
    SUM(emission_amount) AS total_emission 
FROM 
    -- 表名为 'greenhouse_gas_emissions'，存储温室气体排放数据
    greenhouse_gas_emissions 
WHERE 
    -- 限制查询仅针对2023年的数据
    YEAR(emission_date) = 2023
GROUP BY 
    -- 按气体类型和区域进行分组
    gas_type, region 
    
    -- ROLLUP 用于在分组的基础上计算汇总值，即每种气体、每个区域以及全局的总排放量
    WITH ROLLUP
ORDER BY 
    -- 对查询结果按气体类型和区域排序，以便于阅读
    gas_type, region;`

export default chatWeather;