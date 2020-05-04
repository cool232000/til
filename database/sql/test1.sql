-- PART 1

-- 1. country 테이블에서 중복을 제거한 Continent를 조회하세요.
USE world;
SELECT DISTINCT continent
FROM country;

-- 2. Sakila 데이터 베이스에서 국가가 인도 고객의 수를 출력하세요.
USE sakila;
SELECT country, count(country) as count
FROM customer_list
WHERE country = 'india';

-- 3. 한국 도시중에 인구가 100만이 넘는 도시를 조회하여 인구순으로 내림차순하세요.
USE world;
SELECT name, population
FROM city
WHERE countrycode = 'kor' AND population >= 1000000
ORDER BY population DESC;

-- 4. city 테이블에서 population이 800만 ~ 1000만 사이인 도시 데이터를 인구수순으로 내림차순하세요.
USE world;
SELECT name, countrycode, population
FROM city
WHERE population BETWEEN 8000000 AND 10000000
ORDER BY population DESC;

-- 5. country 테이블에서 1940 ~ 1950년도 사이에 독립한 국가들을 조회하고 독립한 년도 순으로 오름차순하세요.
USE world;
SELECT code, concat(name, "(", indepyear, ")") as NameIndep, continent, population
FROM country
WHERE indepyear BETWEEN 1940 AND 1950
ORDER BY indepyear;

-- 6. contrylanguage 테이블에서 스페인어, 한국어, 영어를 95% 이상 사용하는 국가 코드를 Percentage로 내림차순하여 아래와 같이 조회하세요.
USE world;
SELECT countrycode, language, percentage
FROM countrylanguage
WHERE percentage >= 95 AND language IN ('spanish', 'korean', 'english')
ORDER BY percentage DESC;

-- 7. country 테이블에서 Code가 A로 시작하고 GovernmentForm에 Republic이 포함되는 데이터를 아래와 같이 조회하세요.
USE world;
SELECT code, name, continent, governmentform, population
FROM country
WHERE code LIKE 'A%' AND governmentform LIKE "%Republic%";

-- 8. Sakila actor 테이블에서 first_name이 DAN 인 배우의 수를 출력하세요.
USE sakila;
SELECT first_name, count(first_name) as count
FROM actor
WHERE first_name = 'DAN';

-- 9. Sakila film_text 테이블에서 title이 ICE가 들어가고 description에 Drama가 들어간 데이터를 출력하세요.
USE sakila;
SELECT *
FROM film_text
WHERE title LIKE '%ICE%' AND description LIKE '%Drama%';

-- 10. Sakila 데이터 베이스의 file_list 뷰에서 price가 1 ~ 4, length가 180 이상, category는 Sci-Fi과 Animation이 아닌 데이터를 출력하세요.
USE sakila;

-- create file_list view
CREATE VIEW file_list as
SELECT film.title, film.description, category.name as category, film.length, film.rental_rate as price
FROM film, film_category, category
WHERE film.film_id = film_category.film_id AND film_category.category_id = category.category_id;

-- return data
SELECT *
FROM file_list
WHERE price BETWEEN 1 AND 4 AND length >= 180 AND category NOT IN ('Sci-Fi', 'Animation');

