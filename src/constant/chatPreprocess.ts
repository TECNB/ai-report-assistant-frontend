// chatPreprocess.ts

const chatPreprocess = `
-- 1. 缺失值处理：将环境数据中的缺失值替换为默认值，如空气质量指数 AQI 的缺失值替换为 0
UPDATE environment_data
SET air_quality_index = COALESCE(air_quality_index, 0);

-- 2. 删除重复记录：根据站点 ID 和日期去重，保留记录 ID 最小的
DELETE FROM environment_data
WHERE id NOT IN (
    SELECT MIN(id)
    FROM environment_data
    GROUP BY station_id, date
);

-- 3. 数据标准化：将 PM2.5 的测量值归一化到 0 到 1 之间
UPDATE environment_data
SET pm25 = (pm25 - (SELECT MIN(pm25) FROM environment_data)) /
           ((SELECT MAX(pm25) FROM environment_data) - (SELECT MIN(pm25) FROM environment_data));

-- 4. 处理异常值：删除 PM2.5 值大于 500 的异常数据
DELETE FROM environment_data
WHERE pm25 > 500;

-- 5. 格式化数据：将站点名称统一为大写
UPDATE environment_data
SET station_name = UPPER(station_name);

-- 6. 数据类型转换：将监测日期字符串转换为 DATE 类型
UPDATE environment_data
SET date = STR_TO_DATE(date, '%Y-%m-%d');

-- 7. 删除无效记录：删除所有监测值（PM2.5、PM10、AQI 等）都为空的记录
DELETE FROM environment_data
WHERE pm25 IS NULL AND pm10 IS NULL AND air_quality_index IS NULL;
`;

export default chatPreprocess;
