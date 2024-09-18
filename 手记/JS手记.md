# JS手记 BY LJJ


--------------------------------------------------------------------------
# 【第一部分】 语法基础

## 1.0 输入输出
- 三种输出
	- alert('')	弹窗
	- console.log('') 控制台
	- document.write('') 写入网页

	
## 1.1 变量
- let和var
	- let变量有块作用域（如if），而var是函数作用域
	- let不允许同一块作用域里出现冗余声明，而var可以多次声明同一变量
	- let不会进行变量提升，而var可以（关键字声明的变量会自动提升到函数作用域顶部，如未赋过值则为undefined）
	- 省略var可以创建全局变量（不推荐）
- const
	- const 的行为与 let 基本相同，唯一一个重要的区别是用它声明变量时必须同时初始化变量
	- 且尝试修改const声明的变量会导致运行时错误。
	- 可以用于每次迭代创建一个新变量，用于for-in或for-of语句：
		```
		for (const value of [1,2,3,4,5]) { 
		  console.log(value); 
		} 
		// 1, 2, 3, 4, 5 
		```
	> 使用 const 声明可以让浏览器运行时强制保持变量不变，也可以让静态代码分析工具提前发现不合法的赋值操作。
	> 因此，很多开发者认为应该优先使用 const 来声明变量，只在提前知道未来会有修改时，再使用let。
	> 这样可以让开发者更有信心地推断某些变量的值永远不会变，同时也能迅速发现因意外赋值导致的非预期行为。
- 可以同时声明多个变量，用逗号隔开
- JS变量存的是值的地址


## 1.2 基本数据类型

- 类型检查：`typeof variable`
	- 6种简单数据类型（也称为原始类型）：Undefined、Null、Boolean、Number、String和Symbol(ES6新增)
	- 1种复杂数据类型Object
	> **注意！**
	> typeof是一个操作符，不是函数，不需要参数（但可以使用参数），即`typeof xxx`和`typeof(xxx)`均可
	> 严格来讲，函数function在ES中被认为是对象，并不代表一种数据类型。但函数也有特殊的属性，因而有必要通过typeof来区分函数和其他对象
	> typeof null 返回的是"object"，因为null被认为是对空对象的引用

### ·   数
- 数值Number
	- JS中所有整数和浮点数都是Number类型
	- Infinity
		- isFinite()函数
	- NaN 表示本来要返回数值的操作失败了（而不是抛出错误）
		- e.g. 0除任意数值
		- `console.log(NaN == NaN); // false `
		- isNaN()函数
			```
			console.log(isNaN(NaN));     // true 
			console.log(isNaN(10));      // false，10 是数值 
			console.log(isNaN("10"));    // false，可以转换为数值10 
			console.log(isNaN("blue"));  // true，不可以转换为数值 
			console.log(isNaN(true));    // false，可以转换为数值1 
			```
			> isNaN()可用于测试对象。首先会调用对象的valueOf()方法，然后确定返回的值是否可转换为数值。若不能，再调用toString()方法并测试其返回值
- 大整数BigInt
	- 在整数后加后缀"n"
	- 可以表示的数无限大（只要不爆内存）
	```
	BigInt(Number.MAX_SAFE_INTEGER)     // => 9007199254740991n
	let string = "1" + "0".repeat(100); // 1 followed by 100 zeros
	```
	
### ·   字符串
- String
	- 字符串可以使用双引号（""）、单引号（''）或反引号（``）标示
	- 字符字面量：\n换行 \t制表 \b退格 \r回车 \f换页 \xnn以十六进制编码nn表示的字符 \unnnn以十六进制编码nnnn表示的Unicode字符
	- 字符串是**不可变的**（immutable）
- 模板字面量：保留换行字符，可以跨行定义字符串
	```
	let Template = `first line 
	second line`; 
	// 等同于'first line\nsecond line'
	```
	- 模板字面量在定义模板时特别有用，比如下面这个HTML模板
		```
		let pageHTML = `  
		<div> 
		  <a href="#"> 
			<span>Jake</span> 
		  </a> 
		</div>`; 
		```
	- 注意空格
		```
		// 这个模板字面量在换行符之后有25个空格符 
		let myTemplateLiteral = `first line  
								 second line`;
		```
	- ★ 可用模版${}将变量用作字符串，立即求值并转换：`str = '${name}'`
		```
		let name = "Bill"; 
		let greeting = `Hello ${ name }.`;  // greeting == "Hello Bill."
		```
	- 标签函数(tag function)

### ·   其它类型
- Boolean
- Null （typeof null = object，注意**使用typeof无法检查出空值**）
	- 用等于操作符（==）比较null和undefined始终返回true
	- **任何时候，只要变量要保存对象，而当时又没有那个对象可保存，就要用null来填充该变量！**
- Undefined：声明却没有赋值时 （typeof undefined = undefined字符串），typeof未声明和未初始化的变量的结果都是undefined
- Symbol：创建唯一的标识 （typeof symbol = symbol字符串）

### ·   类型转换
- toString() （注意原有变量类型不改变【JS字面量特性】，即需要通过赋值：`a = a.toString()`）
- String()函数 （同样的，`b = String(b)`）
	- toString对null和undefined会报错，String可以解决
	- 对于拥有toString方法的值调用String时，实际上调用其toString方法
- Number()函数 
	- 字符串 e.g. Number("011")返回11（十进制）, Number("1.1")返回1.1
	- 对于不合法的数字，则转换为NaN
	- 空字符串或全是空格，则转换为0
	- 布尔值true为1，false为0
	- null转换为0；undefined转换为NaN
	- 对象，调用valueOf()，并按上述规则转换返回的值。如果转换结果是NaN，则调用toString()，再按转换字符串的规则转换
- parseInt() 字符串-->整数
- parseFloat() 字符串 --> 浮点数
- Boolean()函数 （**0和NaN是false其余为true; 只有空串是false**）
- ※ Object和基本类型互转（见DefinitiveGuide p49）
- 其它
	```
	let n = 123456.789;
	n.toFixed(0)         // => "123457"
	n.toFixed(2)         // => "123456.79"
	n.toFixed(5)         // => "123456.78900"
	n.toExponential(1)   // => "1.2e+5"
	n.toExponential(3)   // => "1.235e+5"
	n.toPrecision(4)     // => "1.235e+5"
	n.toPrecision(7)     // => "123456.8"
	n.toPrecision(10)    // => "123456.7890"
	```

> #### 自动类型转换
>
	```
	a = 10 - '5'	// 10-5
	a = 10 + null	// 10+0
	a = 6 - undefined	// 6- NaN
	
	a = 'hello' + 'world'
	a = '1' + 2		// "12"
	a = true + ''	// "true" 比String()更实用的方法
	
	!!age			// Boolean(x)
	
	let octal = "0o" + n.toString(8);   // octal == "0o21"
	let hex = "0x" + n.toString(16);    // hex == "0x11"
	```
 
> #### Destructuring Assignment
	```
	let [x,y] = [1,2];  // Same as let x=1, y=2
	[x,y] = [x+1,y+1];  // Same as x = x + 1, y = y + 1
	[x,y] = [y,x];      // Swap the value of the two variables
	[x,y]               // => [3,2]: the incremented and swapped values
	// 用于函数输出
	let [r,theta] = toPolar(1.0, 1.0); 
	```
	
## 1.3 运算和操作符operators
- 位操作符
	- ~ 按位取反，数值上即符号相反并减去1
	- & 按位与
	- | 按位或
	- ^ 按位异或
	- << 左移，右端补零
	- >> 右移，有符号，即保留符号不变，是左移的逆运算
	- >>> 无符号右移，左端包括符号位补零，不能用于BigInt
- 布尔逻辑操作符 ! && ||
- 条件操作符 `var = bool_exp ? true_val : false_val;`

- 相等`==` <--> 全等`===`（值和类型均相同，因为**比较相等时不转换操作数**，推荐使用）
	- e.g. `var x = "5"; x == 5;`TRUE  <=>  `var x = "5"; x === 5;`FALSE
	> 规则：
	> ![图片alt](./img_resources/JS/JS04.png "")
	> null === undefined 为false
	
- 杂项
	- ??= 只有当变量的值为null或者undefined才赋值（ `a??b`等同于`(a !== null && a !== undefined) ? a : b`）
		```
		let max = maxWidth ?? preferences.maxWidth ?? 500;
		// 若maxWidth有定义, 则把它作为值. 否则往后找，如果也没有定义, 则用最后的常数.
		let options = { timeout: 0, title: "", verbose: false, n: null };
		options.title ?? "Untitled" // => "": as defined in the object
		options.verbose ?? true     // => false: as defined in the object
		options.quiet ?? false      // => false: property is not defined
		options.n ?? 10             // => 10: property is null
		// 与&&或||混用时必须加括号
		a ?? b || c     // SyntaxError: parentheses are required
		```
	- `b = '123'; b = +b`可将字符串转为数字
	- ES7新增乘方符`**`和`**=`以取代`Math.pow()`
	- eval("3+2")    // => 5
	
	
	> #### JS operators
	> ![图片alt](./img_resources/JS/JS02.png "")
	> ![图片alt](./img_resources/JS/JS03.png "")
	
	
## 1.4 语句statement if/switch/while/for
- for in : `for (x in array){...}`
- with

	> #### JavaScript statements
	> ![图片alt](./img_resources/JS/JS01.png "")


--------------------------------------------------------------------------
# 【第二部分】 对象、类和引用数据类型
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


--------------------------------------------------------------------------
# 【第三部分】 函数