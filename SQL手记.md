DDL

## nodejs中使用mysql
安装包：
npm i -g sequelize-cli
npm i sequelize mysql2
初始化： sequelize init
建立模型：
sequelize model:generate --name Article --attributes title:string,content:text
注意表名这里要是单数
sequelize db:migrate
迁移到数据库，打开客户端可以看到已经有建好的表了
sequelize seed:generate --name article		// 种子文件
sequelize db:seed --seed xxx-article		// 运行种子文件
> ##### 需要对数据表修改
> 1.数据还不多不重要时，回滚迁移：sequelize db:migrate:undo
>> 注意：对于较早前创建的迁移文件，需要回滚多次才能回滚到它，一次回滚只管一个文件；改好后迁移可以同时迁移所有表文件
> 2.数据已经有很多了，增加另一个迁移文件

### 数据类型
建表：  
- date -- DATETIME
- 不能用int，应该是integer
- 会自动创建createdAt和updatedAt时间字段，无需手动添加

### 密码加密
在模型model中引入bcryptjs库，找到password字段，设置set方法：
```
set(value) {
	if (value.length >= 6 && value.length <= 255) {
		this.setDataValue('password', bcrypt.hashSync(value, 8))
	} else {
		throw new Error('密码长度至少6位')
	}
}
```

库
show databases;
select database();
create database if not exists [name] [utf8] [collate desc/asc]
drop database if exists [name]
use [name]
表
show tables;
create table [name](
	id int [comment 'xx'],
	name varchar(50) [comment 'xx'] 
) [comment ''];
desc [name] --查询表结构
show create table [name] --查询建表语句create...
------------------------------
【数值类型】
数字：
tinyint 1bit, smallint 2bit, mediumint 3bit, int 4bit, bigint 8bit,
float 4, double 8, decimal 小数； signed | unsigned
e.g. score double(4,1) --最大有效位数4位，小数位数1位
字符串：
char 定长0-255字节, varchar 变长0-65535字节，blob, text, ……
日期：
date YYYY-MM-DD, time HH:MM:SS, year, datetime
-------------------------------
添加字段 alter table [name] add [name] [type] [comment ''] 
	e.g. alter table emp add nickname varchar(10)
修改数据类型 alter table [name] modify [name] [newtype]
	e.g. alter table emp modify nickname char(1)
修改字段名和类型 alter table [name] change oldname newname type
	e.g. alter table emp change nickname username varchar(30)
删除字段 alter table name drop name
修改表名 alter table name rename to newname
清空表即删除后再创建 truncate table name

**主键** 能够唯一区分每一条数据
> 主键并不意味着只有一个属性，有时单个属性不足以唯一区分每个数据时，需要多个属性共同组成主键
**外键** 对应外表的主键，注意，也可以是本表主键
> 一个属性可以同时是主键和外键

## SELECT
SELECT DISTINCT/ALL	目标列表达式	// 显示的属性列
FROM 表名
WHERE 条件表达式
GROUP BY 列名 HAVING 条件表达式
ORDER BY 列名 次序

1. 指定列：
SELECT X, Y FROM TAB 
2. 全部列：
SELECT * 
3. 查计算后的值
SELECT 表达式
4. 改变查询结果的列标题
SELECT X X1, Y Y1 		// 换成别名X1 Y1显示
5. 取消重复行
SELECT DISTINCT X1	// 查询X属性并去掉结果中的重复列
6. 聚集函数 【只能用于SELECT GROUP语句中，不能用于where】
	1. 统计元组个数
	SELECT COUNT(*) FROM 
	2. 统计某一列值的个数
	SELECT COUNT (DISTINCT/ALL 列名)
	3. 平均值（该列必须为数值型）
	SELECT AVG(Grade) FROM 
	4. 求和（必须为数值型）
	SELECT SUM (DISTINCT/ALL 列名)
	5. 最值
	SELECT MAX/MIN (DISTINCT/ALL 列名)
	
- WHERE条件表达式
	1. 比较大小 基本运算符（ `... !=或<> !> !<`）
	`SELECT Y FROM TAB WHERE X>20`
	2. 范围
	SELECT name, sex FROM TAB WHERE age BETWEEN 20 AND 30
	3. 集合
	SELECT name FROM TAB WHERE Sdept NOT IN ('CS', 'MA')
	// 在TAB表的Sdept列中查找既不是CS又不是MA的学生姓名
	4. 字符匹配
	通配符： %-表示任意长度可为0的字符串； _-表示单个字符
	`a%b: a开头b结尾的任意长度字符串，如ab acb；  a_b: a开头b结尾长度为3的字符串`
	注意：匹配一个汉字需要占2个单位长度，如`刘_ _ _ _`匹配三个字的刘姓人名
	5. 空值
	WHERE 列名 IS NULL / IS NOT NULL
	6. 多重查询
	WHERE 条件1 AND/OR 条件2
	
- GROUP BY

- LIKE 模糊搜索
- LIMIT 分页功能
	- SELECT * FROM `Articles` LIMIT 0, 10 // 从索引0开始，查10条数据

```
CREATE DATABASE `tutorial`;	/* 反引号避免和关键字冲突 */
SHOW DATABASES;
USE tutorial;

/* 删除数据库 */
-- DROP DATABASE tutorial;

/* 数据类型
INT		-- 整数
DECIMAL(3,2)	-- 小数
VARCHAR(10)		-- 字符串（长度）
BLOB		-- 存放二进制文件，如图片
DATE 		-- 'YYYY-MM-DD'
TIMESTAMP	-- 'YYYY-MM-DD HH:MM:SS'
*/

CREATE TABLE student(
	student_id INT PRIMARY KEY,
    `name` VARCHAR(20),
    major VARCHAR(20)
);
/* 也可以这样写：把主键设置挪到下面
CREATE TABLE student(
	student_id INT,
    `name` VARCHAR(20),
    major VARCHAR(20),
    PRIMARY KEY(student_id)
);	*/

DESCRIBE student;
DROP TABLE student;

ALTER TABLE student ADD gpa DECIMAL(3,2);	-- 新增属性
ALTER TABLE student DROP COLUMN gpa;

-- 列出所有条目
SELECT * FROM student;

-- 填入数据
INSERT INTO student VALUES(4, '小红', 'BIOLOGY', 3.5);
INSERT INTO student VALUES(2, '小黑', 'maths', NULL);
INSERT INTO student(major, student_id) VALUES('ENGLISH', 3);	-- name = NULL

-- 约束
/* 
CREATE TABLE student(
	student_id INT PRIMARY KEY,
		student_id INT AUTO_INCREMENT	-- 每次自增，不用手动填
    `name` VARCHAR(20) NOT NULL,	-- NOT NULL 不能为空
    major VARCHAR(20) UNIQUE		-- UNIQUE 唯一
    gpa int DEFAULT 4		-- 默认值用于INSERT INTO student(major, student_id) VALUES('ENGLISH', 5);
);	*/

-- 修改 删除
SET SQL_SAFE_UPDATES = 0;	-- 关闭该设置

CREATE TABLE student(
	student_id INT PRIMARY KEY,
    `name` VARCHAR(20),
    major VARCHAR(20),
    score INT
);
SELECT * FROM student;

UPDATE student
SET major = 'English literature'
WHERE major = 'ENGLISH';

DELETE FROM student
WHERE student_id = 5;

-- 查询 SELECT
SELECT * 
FROM student 
ORDER BY gpa, student_id DESC
LIMIT 3;

SELECT * 
FROM student 
WHERE major = 'BIOLOGY' AND gpa > 3;
/*
WHERE major IN('XX', 'YY', 'ZZ')	-- 多个OR可以简写成这种方式
*/

-- 聚合函数
SELECT COUNT(*) FROM employee;	-- 取得员工人数
SELECT AVG(attr) FROM employee;	-- 求某属性的平均值


-- union 合并 (几列变一列
SELECT nam
FROM employee
UNION
SELECT nam
FROM `client`;

-- join 连接俩个表格
SELECT emp_id, nam, branch_name
FROM employee
JOIN branch
ON employee.emp_id = branch.manager_id;
/* LEFT JOIN 左表返回，右表根据条件返回内容，不符合条件的返回null
*/

-- 子查询
SELECT * 
FROM student 
WHERE major = (
	SELECT major 
	FROM student 
	WHERE gpa > 3
);

```


DML
## insert/ update/ delete 操作字段
insert into table_name(x字段x,xx,...) values (xx,xx,...)
多条：values (), (), ()
update table_name set name1 = value1, name2 = value2,... [where condition] -- 没有where则修改整张表
delete from table_name [where condition]
(删除某个字段：update -> null)

DQL 查询
select 字段列表 from 表名列表 where 条件列表 group by 分组字段列表 having 分组后条件列表 order by 排序字段列表 limit 分页参数