USE world;

-- 1. 멕시코(Mexico)보다 인구가 많은 나라이름과 인구수를 조회하시고 인구수 순으로 내림차순하세요.
SELECT name, population
FROM country
WHERE population > (
  SELECT population
  FROM country
  WHERE name = 'mexico')
ORDER BY population DESC;

-- 2. 국가별 몇개의 도시가 있는지 조회하고 도시수 순으로 10위까지 내림차순하세요.
SELECT country.name, COUNT(city.countrycode) as count
FROM city, country
WHERE country.code = city.countrycode
GROUP BY city.countrycode
ORDER BY count DESC
LIMIT 10;

-- 3. 언어별 사용인구를 출력하고 언어 사용인구 순으로 10위까지 내림차순하세요.
SELECT language, SUM(count) AS count
FROM (
  SELECT countrylanguage.language, CEILING(country.population * (countrylanguage.percentage * 0.01)) AS count
  FROM countrylanguage, country
  WHERE countrylanguage.countrycode = country.code
) as count
GROUP BY language
ORDER BY count DESC
LIMIT 10;