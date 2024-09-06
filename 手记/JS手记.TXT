# 语法基础

## 1.0 输入输出
- 三种输出
	- alert('')	弹窗
	- console.log('') 控制台
	- document.write('') 写入网页
	
## 1.1 变量和运算
- let变量有块作用域，而var没有
- JS变量存的是值的地址
- 类型检查：`typeof variable`

### ·   数
- 数值Number
	- JS中所有整数和浮点数都是Number类型
	- Infinity、NaN
- 大整数BigInt
	- 在整数后加后缀"n"
	- 可以表示的数无限大（只要不爆内存）
	
### ·   字符串
- String
- 使用单引号或双引号
- 可用模版${}将变量用作字符串：`str = '${name}'`

### ·   其它类型
- Boolean
- Null （typeof null = object，注意**使用typeof无法检查出空值**）
- Undefined：声明却没有赋值时 （typeof undefined = undefined字符串）
- Symbol：创建唯一的标识 （typeof symbol = symbol字符串）

### ·   类型转换
- toString() （注意原有变量类型不改变【JS字面量特性】，即需要通过赋值：`a = a.toString()`）
- String()函数 （同样的，`b = String(b)`）
	- toString对null和undefined会报错，String可以解决
	- 对于拥有toString方法的值调用String时，实际上调用其toString方法
- Number()函数 
	- 对于不合法的数字，则转换为NaN
	- 空字符串或全是空格，则转换为0
	- 布尔值true为1，false为0
	- null转换为0；undefined转换为NaN
- parseInt() 字符串-->整数
- parseFloat() 字符串 --> 浮点数
- Boolean()函数 （0和NaN是false其余为true；只有空串是false）

> #### 自动类型转换
>
	```
	a = 10 - '5'	// 10-5
	a = 10 + null	// 10+0
	a = 6 - undefined	// 6- NaN
	
	a = 'hello' + 'world'
	a = '1' + 2		// "12"
	a = true + ''	// "true" 比String()更实用的方法
	```
	
### ·   运算
- ??= 只有当变量的值为null或者undefined才赋值
- `b = '123'; b = +b`可将字符串转为数字
- ! && ||
- 三元运算符
- 相等`==` <--> 相同`===`（值和类型均相同）
	- e.g. `var x = "5"; x == 5;`TRUE  <=>  `var x = "5"; x === 5;`FALSE
	
### ·   if/switch/while/for
- for in : `for (x in array){...}`
- with

> #### JavaScript statements
> ![图片alt](./img_resources/JS/JS01.png "图片title")


## 1.2 对象
除七种基本类型，其余都属于对象

```
let obj = Object()	// 创建对象
let obj2 = {}		// 对象字面量创建对象
let obj3 = {
	name:"..", 
	age:18,
	["gender"]:"man"
	inner_obj:{
		x:xx,
		y:yy,
	}
}

obj.name = '..'

delete obj.name		// 删除属性

for (let proName in obj){
	console.log(proName, obj[proName])	// 打印属性名和属性值，注意不能用obj.proName调属性值，需用中括号形式
}
```
- 如果读取一个不存在的属性，不会报错，返回undefined
- 对象进行相等或全等比较时，比较的时内存地址，所以两种方式没有差别
- `const obj2 = obj` --> 给对象变量加const可以避免后期不小心对其修改，但仍可对对象的属性进行修改


## 1.3 函数