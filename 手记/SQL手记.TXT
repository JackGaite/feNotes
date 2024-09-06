DDL 
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


DML
# insert/ update/ delete 操作字段
insert into table_name(x字段x,xx,...) values (xx,xx,...)
多条：values (), (), ()
update table_name set name1 = value1, name2 = value2,... [where condition] -- 没有where则修改整张表
delete from table_name [where condition]
(删除某个字段：update -> null)

DQL 查询
select 字段列表 from 表名列表 where 条件列表 group by 分组字段列表 having 分组后条件列表 order by 排序字段列表 limit 分页参数