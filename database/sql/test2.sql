USE world;

-- 1. 전체 몇개의 대륙이 있는지 출력하세요.
SELECT COUNT(DISTINCT continent) AS count
FROM country;

-- 2. 국가 코드별 도시의 갯수를 출력하세요. (상위 5개를 출력)
SELECT countrycode, COUNT(countrycode) AS count
FROM city
GROUP BY countrycode
ORDER BY count DESC
LIMIT 5;

-- 3. 대륙별 몇개의 나라가 있는지 대륙별 나라의 갯수로 내림차순하여 출력하세요.
SELECT continent, COUNT(continent) AS count
FROM country
GROUP BY continent
ORDER BY count DESC;

-- 4. 대륙별 인구가 1000만명 이상인 나라의 수와 GNP의 표준편차를 출력하세요. (GNP 표준편차로 내림차순)
SELECT continent, COUNT(population) AS count , ROUND(STDDEV(gnp), 2) AS std_gnp
FROM country
WHERE population >= 1000000
GROUP BY continent
ORDER BY std_gnp DESC;

-- 5. City 테이블에서 국가코드(CountryCode) 별로 총인구가 몇명인지 조회하고 총인구 순으로 내림차순하세요. (총인구가 5천만 이상인 도시만 출력)
SELECT countrycode, SUM(population) AS population
FROM city
GROUP BY countrycode
HAVING population >= 50000000
ORDER BY population DESC;

-- 6. 언어별 사용하는 국가수를 조회하고 많이 사용하는 언어를 6위에서 10위까지 조회하세요.
SELECT language, COUNT(language) AS count
FROM countrylanguage
GROUP BY language
ORDER BY count DESC, language DESC
LIMIT 5, 5;

-- 7. 언어별 15곳 이상의 국가에서 사용되는 언어를 조회하고, 언어별 국가수에 따라 내림차순하세요.
SELECT language, COUNT(language) AS count
FROM countrylanguage
GROUP BY language
HAVING count >= 15
ORDER BY count DESC;

-- 8. 대륙별 전체 표면적크기를 구하고 표면적 크기 순으로 내림차순하세요.
SELECT continent, CEILING(SUM(surfacearea)) AS surfacearea
FROM country
GROUP BY continent
ORDER BY surfacearea DESC;