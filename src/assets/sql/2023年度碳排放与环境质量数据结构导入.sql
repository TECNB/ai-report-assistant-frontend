-- 创建 AQI 数据表
CREATE TABLE aqi_data (
    id SERIAL PRIMARY KEY,   -- 主键，自增ID
    year INT NOT NULL,       -- 年份
    month VARCHAR(3) NOT NULL, -- 月份，存储英文月份缩写
    aqi INT NOT NULL         -- AQI (空气质量指数)
);

-- 创建 COD 数据表
CREATE TABLE cod_data (
    id SERIAL PRIMARY KEY,   -- 主键，自增ID
    year INT NOT NULL,       -- 年份
    month VARCHAR(3) NOT NULL, -- 月份，存储英文月份缩写
    cod INT NOT NULL         -- COD (化学需氧量)
);

-- 创建区域比例数据表
CREATE TABLE region_data (
    id SERIAL PRIMARY KEY,   -- 主键，自增ID
    year INT NOT NULL,       -- 年份
    region VARCHAR(20) NOT NULL, -- 区域名，例如 '东部地区'、'西部地区' 等
    percentage DECIMAL(5,2) NOT NULL -- 比例，存储百分比，例如 40.00 表示 40%
);