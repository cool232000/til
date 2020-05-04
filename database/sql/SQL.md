# DB

데이터베이스(DB)는 여러 사람이 공유하여 사용할 목적으로 체계화해 통합, 관리하는 데이터의 집합이다.

이 데이터를 관리하는 시스템을 DBMS라고 하는데, 이 DBMS는 관계형 모델을 기반으로 하는 RDBMS(Relational DataBase Management System)와 일관성 모델을 이용하는 NoSQL(non relational)로 나뉜다.

두 시스템의 두드러지는 차이로는, read와 create의 속도이다.

RDBMS의 경우 관계형 데이터베이스이기 때문에 select(read)가 빠르지만 모든 데이터들이 연동되어 업데이트 되기 때문에 create(insert)가 느리다.

반대로 NoSQL은 일관성 모델을 이용하기 때문에 데이터들끼리 관계를 갖고 있지 않아서 select(read)는 RDBMS보다 느리지만 데이터들이 독립적으로 존재하기 때문에 create(insert)가 빠르다.

RDBMS 기반의 대표적인 데이터베이스는 오라클, MySQL이 있고, NoSQL 기반의 대표적인 데이터베이스는 MongoDB이다.

RDBMS(relational database management system)는 관계형 모델을 기반으로 하는 데이터베이스 관리 시스템이다. 



## SQL

SQL은 관계형 데이터베이스 관리 시스템(RDBMS)의 데이터를 관리하기 위해 설계된 특수 목적의 프로그래밍 언어이다. RDBMS에서 자료의 검색과 관리, 데이터베이스 스키마 생성과 수정, 데이터베이스 객체 접근 조정 관리를 위해 고안되었다. 인터프리터 언어이며 대소문자를 구별하지 않는다.

SQL 기반의 MySQL은 오픈 소스이며 표준 SQL을 사용하고 다중 사용자와 다중 스레드를 지원한다. 안정성이 높은 대신 금액이 비싼 오라클에 비해 접근성이 좋다.



## SQL문

SQL문은 크게 세 가지로 나뉜다.

1. DML (Data Manipulation Language)

   데이터 조작어로 데이터를 검색, 삽입, 수정, 삭제 등에 사용한다.

   SELECT, INSERT, UPDATE, DELETE

2. DDL (Data Definition Language)

   데이터 정의어로 데이터베이스, 테이블, 뷰, 인덱스 등의 데이터베이스 개체를 생성, 삭제 변경할 때 사용한다.

   CREATE, DROP, ALTER, TRUNCATE

3. DCL (Data Control Language)

   데이터 제시어로 사용자의 권한을 부여하거나 빼앗을 때 사용한다.

   GRUNT, REVORKE, DENY



SQL문의 기본 포맷은 아래와 같다.

```mysql
SELECT <column_name_1>, <column_name_2>, ...
FROM <table_name>
```



## SQL문 예제

### DML

1. 비교 연산

   인구수가 1억명보다 크거나 같은 나라 구하기

   ```mysql
   SELECT code, name, continent, population
   FROM country
   WHERE population >= 100000000;
   ```

2. 논리 연산

   인구수가 8천만명보다 많거나 같고 1억명보다 적거나 같은 나라 구하기

   ```mysql
   SELECT code, name, population
   FROM country
   WHERE population >= 80000000 && population <= 100000000;
   ```

   이것은 AND 연산자로 구현할 수도 있다.

   ```mysql
   SELECT code, name, population
   FROM country
   WHERE population BETWEEN 80000000 AND 100000000;
   ```

3. OR 연산자

   Asia와 Africa를 제외한 나라 구하기

   ```mysql
   SELECT code, name, continent, population
   FROM country
   WHERE continent NOT IN ("Asia", "Africa");
   ```

   Asia와 Africa에 속한 나라만 구하고 싶다면 IN만 사용하면 된다.

   ```mysql
   SELECT code, name, continent, population
   FROM country
   WHERE continent IN ("Asia", "Africa");
   ```

4. LIKE: 특정 문자열이 포함된 국가 찾기

   ```mysql
   SELECT code, name, GovernmentForm
   FROM country
   WHERE GovernmentForm LIKE "%Republic%";
   ```
   
5. ORDER BY: 조건에 따라 정렬하기

   오름차순(ASC)은 기본이므로 생략 가능하지만 내림차순(DESC)으로 정렬하고 싶은 경우 명시해야 한다.

   ```mysql
   SELECT *
   FROM country
   ORDER BY population ASC;
   ```

   city 테이블을 국가코드 기준 알파벳 순으로 정렬하기 && 같은 국가 코드를 가졌을 경우 인구수 순으로 내림차순 정렬하기

   ```mysql
   SELECT *
   FROM city
   ORDER BY countrycode ASC, population DESC;
   ```

6. LIMIT: 데이터 조회 제한하기

   인구수가 상위 5위에 속하는 국가 출력하기

   ```mysql
   SELECT code, name, population
   FROM country
   ORDER BY population DESC
   LIMIT 5;
   ```

   6위부터 15위까지 출력하려면 LIMIT 조건에 스킵하고 싶은 위치와 이후 보여줄 데이터의 갯수를 명시하면 된다.

   ```mysql
   SELECT code, name, population
   FROM country
   ORDER BY population DESC
   LIMIT 5, 10;
   ```

7. GROUP BY: 특정 컬럼을 그룹화해서 유니크한 값만 남긴 후 그 값에 연결된 데이터에 대한 처리 (합계/평균/최대최소값 등)

   국가별 도시의 갯수 출력하기

   ```mysql
   SELECT countrycode, COUNT(countrycode) as count
   FROM city
   GROUP BY countrycode
   ORDER BY count DESC;
   ```

8. DISTINCT(): 중복을 제거하는 함수

   전 세계 언어 갯수를 출력하기

   ```mysql
   SELECT COUNT(DISTINCT(Language)) as language_count
   FROM countrylanguage;
   ```

9. HAVING: 전체 결과가 나온 후에 어떤 처리를 할 때 사용한다.

   WHERE은 최초에 데이터를 가져올 때 사용할 수 있고 가져온 결과 데이터에 대한 처리를 할 수가 없는데, 가져온 결과 데이터에 대해 어떤 조건을 주고 처리를 하고 싶다면 HAVING절을 사용한다.

   대륙별 전체 인구수, 전체 GNP를 검색하고 그 자료를 바탕으로 인구별 GNP를 산출한 다음 이 산출한 데이터를 내림차순하기

   ```mysql
   SELECT continent, SUM(population) as total_population, sum(GNP) as total_gnp, sum(GNP) / SUM(population) as gpp
   FROM country
   WHERE population >= 10000000
   GROUP BY continent
   HAVING gpp >= 0.01
   ORDER BY gpp DESC;
   ```

   

### DDL

1. 데이터베이스 생성

   ```mysql
   SHOW DATABASES;
   CREATE DATABASE test;
   ```

   제약 조건이 없는 테이블 생성하기

   ```mysql
   USE test;
   CREATE TABLE user1(
   user_id INT,
   name varchar(20),
   email varchar(30),
   age INT,
   rdate DATE
   );
   ```

   제약 조건이 있는 테이블 생성하기

   ```mysql
   USE test;
   CREATE TABLE user2(
   user_id INT PRIMARY KEY AUTO_INCREMENT,
   name Varchar(20) NOT NULL,
   email Varchar(30) UNIQUE NOT NULL,
   age INT(3) DEFAULT '30',
   rdate TIMESTAMP
   );
   ```

2. ALTER: 속성을 수정할 때 사용한다.

   ```mysql
   SHOW VARIABLES LIKE "character_set_database";
   ALTER DATABASE test CHARACTER SET = utf8;
   ```
   
   ALTER를 이용해서 데이터 속성값을 수정하기

   ```mysql
   DESC user2;
   ALTER TABLE user2 ADD article TEXT;
   ALTER TABLE user2 MODIFY COLUMN article varchar(200);
   ```
   
3. DROP: 데이터베이스/테이블 삭제하기

   ```mysql
   ALTER TABLE user2 DROP article;
   ```
   
   ```mysql
   CREATE DATABASE tmp;
   SHOW DATABASES;
   USE tmp;
   CREATE TABLE test(id INT);
   DROP TABLE test;
   DROP DATABASE tmp;
   ```
   
4. INSERT: 속성값 삽입하기

   ```mysql
   USE test;
   INSERT INTO user1(user_id, name, email, age, rdate)
   VALUES (1, "jin", "pdj@gmail.com", 30, now()),
   (2, "peter", "peter@daum.net", 33, '2017-02-20'),
   (3, "alice", "alice@naver.com", 23, '2018-01-05'),
   (4, "po", "po@gmail.com", 43, '2002-09-16'),
   (5, "andy", "andy@gmail.com", 17, '2016-04-28'),
   (6, "jin", "jin1224@gmail.com", 33, '2013-09-02');
   
   SELECT *
   FROM user1;
   
   SELECT now();
   ```
   
   SELECT된 결과를 특정 테이블에 삽입하기

   인구수가 800만명 이상인 도시를 검색해 특정 테이블에 저장하기

   ```mysql
   USE world;
   SELECT name, countrycode, population
   FROM city
   WHERE population >= 8000000;
   
   CREATE TABLE city_2 (
   name VARCHAR(50),
   countrycode CHAR(3),
   population INT
   );
   
   INSERT INTO city_2
   SELECT name, countrycode, population
   FROM city
   WHERE population >= 8000000;
   
   SELECT *
   FROM city_2;
   ```
   
5. UPDATE SET: 데이터를 특정 기준으로 업데이트 하기

   MySQL Workbench에서는 업데이트를 할 때 LIMIT을 설정하지 않으면 에러가 발생한다.

   ```mysql
   USE test;
   
   SELECT *
   FROM user1;
   
   UPDATE user1
   SET age=50, email="bbj@gmail.com"
   WHERE age > 30
   LIMIT 2;
   
   SELECT *
   FROM user1;
   ```

6. DELETE: 데이터 삭제하기

   MySQL Workbench에서는 삭제할 때 LIMIT을 설정하지 않으면 에러가 발생한다.

   ```mysql
   SELECT *
   FROM user1;
   
   DELETE FROM user1
   WHERE age >= 50
   LIMIT 2;
   ```

7. TRUNCATE: 테이블 구조만 남기고 모든 데이터 삭제하기

   ```mysql
   TRUNCATE user1;
   ```

   

### Functions

1. CEIL(): 소수점 올려서 정수로 표시하기

   ```mysql
   SELECT CEIL(12.345); # 13
   
   SELECT CEIL(percentage)
   FROM countrylanguage;
   ```

2. ROUND(): 지정한 자릿수를 올림하여 표시하기

   ```mysql
   SELECT ROUND(12.345, 2); # 12.35
   ```

3. TRUNCATE(): 지정한 자릿수까지만 소수점 표시하기

   ```mysql
   SELECT ROUND(12.345, 2); # 12.34
   ```

4. DATE_FORMAT(): 날짜 데이터 포맷을 변경하기

   ```mysql
   USE sakila;
   
   SELECT DATE_FORMAT(payment_date, "%Y-%M") as monthly, SUM(amount)
   FROM payment
   GROUP BY monthly;
   ```

5. IF

   도시인구가 100만 이상: big_city, 100만 미만: small_city

   ```mysql
   SELECT name, population, IF(population >= 1000000, "big_city", "small_city") as city_scale
   FROM city
   ORDER BY population DESC;
   ```

6. IFNULL: 값이 NULL인 경우에 어떻게 처리할지 작성한다

   ```mysql
   SELECT name, indepyear, IFNULL(indepyear, 0)
   FROM country;
   ```

7. CASE WHEN THEN

   국가별 인구가 10억 이상, 1억 이상, 1억 이하 구분하는 컬럼 만들기

   ```mysql
   SELECT name, population,
   CASE
      WHEN population >= 1000000000 THEN "upper 1 bilion"
      WHEN population >= 100000000 THEN "upper 100 milion"
      ELSE "below 100 milion"
      END as result
   FROM country
   ORDER BY population DESC;
   ```

8. JOIN
   두 개 이상의 테이블에서 데이터를 모아서 보여줄 때 사용
   
   ENGINE은 InnoDB와 MyISAM으로 설정할 수 있는데 InnoDB가 로그 단위로 락을 거는 방법이기 때문에 동시에 접속했을 때 데이터를 빨리 가져올 수 있다는 장점이 있어서 많이 활용된다.
   
   ```mysql
   CREATE TABLE user (
   user_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
   name VARCHAR(30) DEFAULT NULL,
   PRIMARY KEY (user_id)
   ) ENGINE = InnoDB DEFAULT CHARSET=UTF8;
   
   CREATE TABLE addr (
   addr_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
   addr VARCHAR(30) DEFAULT NULL,
   user_id INT(20) DEFAULT NULL,
   PRIMARY KEY (addr_id)
   ) ENGINE = InnoDB DEFAULT CHARSET=UTF8;
   
   INSERT INTO user(name)
   VALUES ("jin"), ("andy"), ("peter");
   
   INSERT INTO addr(addr, user_id)
   VALUES ("seoul", 1), ("busan", 2), ("jeju", 4), ("seoul", 5), ("deagu", 6);
   ```
   
   1) INNER JOIN
   
   ```mysql
   SELECT user.user_id, user.name, addr.addr
   FROM user
   INNER JOIN addr
   ON user.user_id = addr.user_id;
   ```
   
   INNER JOIN은 WHERE절을 활용할 수 있다 (INNER JOIN만 가능)
   
   ```mysql
   SELECT user.user_id, user.name, addr.addr
   FROM user, addr
   WHERE user.user_id = addr.user_id;
   ```
   
   국가명, 도시명, 도시 인구수, 국가 인구수에 대한 도시 인구수의 비율 출력하기
   
   ```mysql
   SELECT city.countrycode
   , country.name as country_name
   , city.name as city_name
   , city.population as city_population
   , country.population as country_population
   , city.population / country.population as rate
   FROM city
   JOIN country
   ON city.countrycode = country.code
   HAVING rate >= 0.5;
   ```
   
   3개 이상의 테이블을 JOIN하기
   
   국가명, 도시명, 사용 언어, 사용률 출력하기
   
   ```mysql
   SELECT country.name as country_name
   , city.name as city_name
   , countrylanguage.language as language
   , countrylanguage.percentage as percentage
   FROM country
   JOIN city
   ON country.code = city.countrycode
   JOIN countrylanguage
   ON country.code = countrylanguage.countrycode
   ORDER BY country_name ASC, city_name ASC, percentage DESC;
   ```
   
   INNER JOIN의 경우 JOIN ON 절을 여러 번 사용하지 않고 WHERE을 사용할 수 있다.
   
   ```mysql
   SELECT country.name as country_name
   , city.name as city_name
   , countrylanguage.language as language
   , countrylanguage.percentage as percentage
   FROM country, city, countrylanguage
   WHERE country.code = city.countrycode AND country.code = countrylanguage.countrycode
   ORDER BY country_name ASC, city_name ASC, percentage DESC;
   ```
   
   
   
   2) LEFT JOIN
   
   ```mysql
   SELECT user.user_id, user.name, addr.addr
   FROM user
   LEFT JOIN addr
   ON user.user_id = addr.user_id;
   ```
   
   지역별, 대륙별 사용 언어 출력 (distinct를 활용해 중복을 제거한다)
   
   ```mysql
   SELECT distinct country.region, country.continent, countrylanguage.language
   FROM country
   LEFT JOIN countrylanguage
   ON country.code = countrylanguage.countrycode;
   ```
   
   3) RIGHT JOIN
   
   ```mysql
   SELECT addr.user_id, user.name, addr.addr
   FROM user
   RIGHT JOIN addr
   ON user.user_id = addr.user_id;
   ```
   
   4) OUTTER JOIN (UNION)
   
   SELECT문의 결과를 하나로 합쳐서 출력
   
   ```mysql
   SELECT name
   FROM user;
   
   SELECT addr
   FROM addr;
   ```
   
   위와 같은 경우 UNION을 사용하면 결과를 하나로 합쳐서 출력한다. 다만 UNION은 기본적으로 중복 제거를 하는데, 만약 중복을 제거하면 안 될 경우 UNION ALL을 해야 한다.
   
   ```mysql
   SELECT name
   FROM user
   UNION
   SELECT addr
   FROM addr;
   ```
   
   LEFT JOIN절과 RIGHT JOIN절을 UION으로 합칠 수 있다.
   
   ```mysql
   # LEFT JOIN
   SELECT user.user_id, user.name, addr.addr
   FROM user
   LEFT JOIN addr
   ON user.user_id = addr.user_id;
   
   # RIGHT JOIN
   SELECT addr.user_id, user.name, addr.addr
   FROM user
   LEFT JOIN addr
   ON user.user_id = addr.user_id;
   
   # UNION OUTTER JOIN
   SELECT user.user_id, user.name, addr.addr
   FROM user
   LEFT JOIN addr
   ON user.user_id = addr.user_id
   UNION
   SELECT addr.user_id, user.name, addr.addr
   FROM user
   LEFT JOIN addr
   ON user.user_id = addr.user_id;
   ```
   
9. SUB-QUERY

   SELECT, FROM, WHERE에서 서브쿼리를 사용할 수 있다.

   1) SELECT절에서 서브쿼리 사용하기

   전체 나라 수, 전체 도시 수, 전체 언어 수 출력하기

   FROM절이 필요하지 않을 때는 `FROM DUAL`이라고 작성하면 된다.

   ```mysql
   SELECT
   (SELECT count(name) FROM country) as total_count,
   (SELECT count(name) FROM city) as city_count,
   (SELECT count(distinct(language)) FROM countrylanguage) as language_count
   FROM DUAL;
   ```

   2) FROM절에서 서브쿼리 사용하기

   인구가 800만 이상인 도시의 국가 코드, 도시명, 인구 수 출력하기

   ```mysql
   SELECT country.code, country.name, city.countrycode, city.population
   FROM (
   SELECT countrycode, name, population
   FROM city
   WHERE population >= 8000000
   ) as city
   JOIN country
   on city.countrycode = country.code
   ORDER BY city.population DESC;
   ```

   위와 같은 코드는 서브쿼리를 사용하지 않고도 아래와 같이 사용이 가능하지만 JOIN의 경우 최대한 테이블이 덜 만들어지는 방향일 때 사용하는 것이 좋다. JOIN을 사용하는 것은 성능을 느리게 할 가능성이 높으므로 JOIN을 사용하는 것이 더 효율이 좋다고 판단될 때 JOIN을 써야한다.

   ```mysql
   SELECT country.code, country.name, city.countrycode, city.population
   FROM city
   JOIN country
   ON city.countrycode = country.code
   HAVING city.population >= 8000000
   ORDER BY city.population DESC;
   ```

   3) WHERE절에서 서브쿼리 사용하기

   인구가 800만 이상인 도시의 국가 코드, 국가 이름, 대통령 이름 출력하기

   ```mysql
   SELECT code, name, headofstate
   FROM country
   WHERE CODE IN (
   SELECT countrycode
   FROM city
   WHERE population >= 8000000
   );
   ```

10. VIEW

    쿼리를 단순하게 만들어주는 기능을 한다.

    뷰는 실제로 데이터를 갖고 있는 것이 아니라 쿼리를 수행할 데이터의 주소값만 가지고 있다. 때문에 데이터를 수정하거나 인덱스를 설정하는 것이 불가능하다.

    VIEW는 많은 데이터를 가지고 JOIN을 여러 번 하는 복잡한 쿼리문이 있을 때 그 데이터들의 주소값만 가진 테이블을 생성하게 빠르게 데이터를 읽을 수 있게 한다.

    국가 코드, 국가명, 도시명을 출력하기

    ```mysql
    SELECT code, name, headofstate
    FROM country
    WHERE CODE IN (
    SELECT countrycode
    FROM city
    WHERE population >= 8000000
    );
    ```

    위의 코드를 VIEW로 만들면 아래와 같은 코드로 만들 수 있다.

    ```mysql
    CREATE VIEW code_name as
    SELECT country.code, country.name as country_name, city.name as city_name
    FROM country
    JOIN city
    ON country.code = city.countrycode;
    ```

    생성한 VIEW를 활용해 국가 코드, 국가 이름, 도시 이름을 출력하는 쿼리는 아래와 같다.

    ```mysql
    SELECT *
    FROM code_name;
    ```

11. INDEX

    인덱스는 방대한 양의 데이터를 좀 더 쉽게 찾을 수 있는 역할을 한다. 다만 설정한 데이터에 대한 인덱스를 생성해야 하기 때문에 인덱스가 없는 경우보다 데이터의 용량이 커질 수 있고, 찾고자 하는 데이터의 인덱스를 제대로 설정하지 않는 경우 인덱스를 사용하는 것이 쓸모가 없어질 수 있다.

    데이터가 중간에 추가되거나 삭제되는 등의 변화가 있을 때 인덱스도 함께 동기화되므로 데이터를 읽어오는 것에는 인덱스가 있는 것이 빠르지만 데이터를 추가, 삭제, 변경하는 동작을 할 경우에는 인덱스가 없는 경우보다 속도가 느리다.

    ```mysql
    SELECT count(*)
    FROM salaries;
    
    CREATE INDEX tdate
    ON salaries (to_date);
    ```

    데이터 실행 속도 확인은 EXPLAIN으로 할 수 있다.

    ```mysql
    EXPLAIN
    SELECT *
    FROM salaries
    WHERE to_date < "1986-01-01";
    ```

    

