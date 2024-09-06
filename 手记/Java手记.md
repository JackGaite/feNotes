
----------------------------
目录  

第一部分 语法基础  

第二部分 OOP  

第三部分 杂项  


----------------------------
<br>

# 第一部分 Java语法基础  
<br>

# 第〇章     
## 输入输出  
- 输入：Scanner
	```
	import java.util.Scanner
	Scanner sc = new Scanner(System.in);
	String name = sc.next();
	int age = sc.nextInt();
	double d = sc.nextDouble();
	boolean sex = sc.nextBoolean(); 
	char c = sc.next().charAt(0); // !!
	sc.close();
	```

## 注释  
- 单行和多行注释同C/C++  
- 文档注释：  
	```
		/** 
		notes...
		@author ljj
		@version 1.0.0
		*/
	```

## 随机数
- `double ranNum = Math.random();`返回一个位于\[0.0, 1.0)d的double数  
<br>

# 第一章 变量类型  

## 整型    
- byte: 1字节（-128~127）    
- short：2字节    
- int：4字节    
- long：8字节（需加后缀l/L）  

## 浮点型  
- float：4字节，尾数精确到7位有效数字（需加后缀f/F）  
- double：8字节，是默认的浮点类型  

## 字符类型和布尔类型
- char：2字节，单引号或\uxxxx形式
- boolean

## String类
- String和基本数据类型间只能进行 + 连接运算  
- String无法强转为int等基本数据类型（需要用其它方式如下），反过来可以如`String str = 10 + ""`
	- 利用`int num = Integer.parseInt(str)`将字符串转为int

> ### 自动类型提升与强制类型转换  
> - byte、short、char -> int -> long -> float -> double
> - ！ byte/short/char之间进行运算，结果为int
> - `long a = 123` => 暗含着自动类型提升！
> - 强制类型转换：例如`int a = (int)3.14`

<br>

# 第二章 流程控制语句
## 条件语句   
- Switch-case语句  
	```
	switch(..){
		case case1:
		case case2:
		...
		default:
	}
	```
	- !注意：Switch在匹配上后会继续往后匹配，若希望单一匹配，则在该case语块中自行添加break语句
	- ！Switch判断中的类型只能是：除long外整型/char/enum枚举/String
## 循环语句
<br>

# 第三章 数组
## 初始化
- 先声明后初始化：
	```
	double[] arr;					// []也可以放在变量名后
	arr = new double[]{1,2,3,4,5};
	```
- 声明同时初始化：
	```
	String[] food = new String[]{"",""};	// 静态初始化
	String[] food = new String[2];			// 动态初始化
	```
> 不同类型数组元素的默认初始化值：  
> 整型：0，浮点：0.0，字符：0（'\u0000')，布尔：false，引用类型：null
## 调用
- .length获取数组长度

## 二维数组
- 初始化
	```
	int[][] arr = new int[][]{{1,2,3},{4,5},{6,7,8,9}};	// 注意！ arr[0].length = 3, arr[1].length = 2, arr[2].length = 4
		--> int[][] arr1 = {{1,2,3},{4,5},{6,7,8,9}};	// 类型推断
	String[][] str = new String[3][4];		// 动态方式一
	String[][] str = new String[3][];		// 动态方式二，列数可暂空
	```
- **！动态方式一，外层元素默认值为地址值；而方式二外层默认值为null <br>（结合内存解析理解，方式一外层元素保存了指向内层数组的地址值，方式二则什么都没有故为null**

## 数组工具类Arrays
- java.util.Arrays
- Arrays.equals(arr1,arr2) <=> arr1==arr2: 前者是<u>真正的</u>比较字符串，而后者是比较地址值
- Arrays.toString(arr): 直接输出所有数组元素而不需for循环，注意直接print(arr)打印的是地址值
- Arrays.sort(arr): 快排
- Arrays.binarySearch(arr)

--------------------------------------
<br>

# 第二部分 OOP  
<br>

# 第一章  OOP基础   

## 属性
- 权限
- 类变量与局部变量比较
## 方法
- 方法的重载
	- 同一个类中，方法名一样，形参列表不一样（**个数**或**参数类型**，与权限符和返回值无关）
- 可变个数形参列表
	```
	public void print(int ... nums){ }
	```
	- 个数为\[0, +∞)
	- 注意！编译器优先匹配参数个数确定的方法，可变个数方法的优先度更低
	- java5.0之前用数组传参实现可变个数，可以`obj.method1(new int[]{1,2,3})`达到同样效果
	- 可以改变个数下限：`public void print(int i, int ... nums)`，注意可变声明只能放最后
- 值传递
## 对象数组
- 与String[]类似，在for中`arr[i] = new Object()`进行初始化
## 构造器
- ... ...
## 代码块（初始化块）
- 作用：初始化类或对象的信息，即初始化成员变量
- 形式：一对大括号： `{` (代码块) `}` （形式就像“无名方法”）
- 只能用static修饰
	- 静态代码块：随着类的加载而执行，故只会执行一次，用来初始化类的信息
	- 非静态代码块：随着对象的创建而执行，可以执行多次，用来初始化对象的信息

	> ***问题?*** ：有构造器初始化为什么还要用代码块 --因为：
	> ①执行顺序为 super-> 代码块 -> this -> 自定义构造器，使用代码块；
	> ②静态代码块替代静态构造函数（在类中初始化一些静态变量）
## 内部类
- 将一个类定义在另一个类中，里面的类被称为内部类
- 某一个类的内部有个部分具有相对完整的结构，而该结构只为该外部类服务不在其它地方用，可把该结构做成内部类
- 例子：Thread类中的State类，HashMap类中的Node类
- 分类————成员内部类 & 局部内部类
	- 成员内部类：直接声明在外部类里面
	- 局部内部类：声明在方法、构造器、代码块内的  **匿名局部内部类**
- 内部可以调用外部类的结构，如`Person.this.xxx()`
- 创建实例：`Person.XiaoMing xiaoming = new Person.XiaoMing()`
## 枚举类 enum关键字
- 定义：实例个数确定的类
- jdk5之前自定义枚举类：
	```
	class Season{
		private final String name;
		// 构造器私有化 & 提供get方法
		private Season(String name){
			this.name = name;
		}
		public String getName{
			return name;
		}
		// 创建当前类的实例
		public static final Season SPRING = new Season("春天");
		...
		...
		public static final Season WINTER = new Season("冬天");
	}
	调用：Season.SPRING.getName 
	```
- jdk5中使用enum定义枚举类
	```
	enum Season{	// 必须在枚举类开头声明多个对象，之间用逗号隔开
		SPRING(""),	// 名字前的各修饰符都去掉
		SUMMER(""),
		AUTUMN(""),
		WINTER("");
		private final String name;	// private final 属性
		private Season(String name){	// 私有化构造器
			this.name = name;
		}
		public String getName{
			return name;
		}
	}
	```
- Enum类中的常用方法
	- String toString(): 默认返回对象名，可重写
	- static enumType[] values(): 返回该类的对象数组，即遍历枚举类中的对象
		```
		Season[] values = Season.values();
		```
	- static enumType valueOf(String name): 把一个字符串转为对应的枚举类对象
		```
		Season season = Season.valueof("WINTER");
		```
	- String name(): 建议优先使用toString()
	- int ordinal(): 返回当前枚举对象的次序号，从0开始
- 枚举类与接口
	- 可以让枚举类中的每个对象重写接口的抽象方法（调用不同方法）
	- 若在类中重写接口，则不同枚举类对象调用同一种方法
---------------------------------------
> ### Object类
> - **equals()**
> - **toString()**
> - clone() 复制对象
> - finalize() GC回收前执行操作
> - （反射）getClass(),（集合）hashCode(),（多线程）notify()、notifyAll()、wait()
---------------------------------------
<br>

# 第二章 OOP三大特征

## 封装
- 4种权限修饰：private、-、protected、public  
	示意：  
	|  修饰符 	|	本类	|	本包	|  其它包的子类	|	其它包非子类	|  
	|	:---:	|	:---:	|	:---:	|	  :---:		|		:---:		|  
	|private	|	√		|	×		|		×		|		×			|  
	|缺省		|	√		|	√		|		×		|		×			|  
	|protected	|	√		|	√		|		√		|		×			|  
	|public		|	√		|	√		|		√		|		√			|  
- get & set

## 继承 
- class B **extends** A
- 若没有显式的声明父类，则默认继承于java.lang.Object
> ### 重写
- super关键字
	- 作用：1.对被重写的父类方法进行调用；2.区分与父类中同名的方法
	- 在方法或属性不同名的情况下，可以省略super.
	- 若在子类构造器的首行既没有显式的调用this()也没有调用super()，则默认调用父类中的空参构造器
	- `super.method01()` 一直沿继承链向上查找直到找到否则报错
	- 父类构造器同样会调用父类的父类的构造器，直到调用Object类的构造器 -> 故都具有Object中的属性方法

## 多态
- 初步理解：
	```
	不用多态性（Man继承自Person）
	Person p1 = new Person();
	Man m1 = new Man();
	多态:
	Person p2 = new Man();
	```
- 含义：子类对象的多态性：父类的引用指向子类对象
- 多态适用于方法，而不适用于属性（不满足多态性）
- **多态需要有方法的重写！**
- 使用时，仍然按子类：`p2.eat()`调用的是Man的方法而非Person的
	- ！编译时，认为方法是声明的父类的方法；执行时，实际执行的是子类的方法【编译看左边，执行看右边】
	- 内存中加载了子类，但由于声明的是父类类型，所以无法调用子类
- 使用多态可以避免方法重写，根据需要new不同的子类就行了

> ### 向上转型（多态）与向下转型（使用强转）
> 向下转型可能出现转换异常，应使用instanceof进行判断以避免：  
	`if (woman instanceof Man){`<br> 
	`Man man = (Man)woman;`<br> 
	`man.earnMoney();}`
<br>

# 第三章 OOP高级
## static修饰符  
- 作用：让一个成员变量/方法被类的所有实例共享，即作为**类属性/方法**，也称为**静态属性/方法**
	- 静态变量在内存中只有一份，被实例所共享
	- 静态变量（静态域）在堆中（jdk7及以后）
	- 可以被类直接调用，也可以用对象调用
	- 一些常量往往声明为静态的
	- 方法内操作的变量如果都是静态变量，则建议声明为静态方法
	- **static修饰的方法内不能调用this或super**
	- **工具类的方法也往往用静态方法，例如：Arrays.sort(), Math.random(), 从而省得实例化后再调**
	- 在某个类的方法中调用该类的一个静态方法，可以不用加xxx.
	- 为什么main函数加了static修饰符？ - 因为执行main不需先创建对象

## final关键字
- 作用：
	1. 表示此类不能被继承
	2. 此方法不能被重写
	3. 成员变量为常量（必须显式或在构造器/代码块中赋值且不能修改）
- 例如String类不能被继承，Object的getClass方法不能被重写
- static与final搭配————**全局常量**

## abstract关键字与抽象类
- 抽象类：不能实例化造对象
- 抽象方法————没有方法体： `public abstract void xxx();`
- 包含抽象方法的类必须是抽象类
- 抽象类包含构造器（子类实例化时需要用到父类构造器）
- 子类必须重写父类的所有抽象方法，才能够实例化，否则子类仍是抽象类

## 接口
- 定义接口————**interface**关键字
- 接口内部：
	- 属性必须使用public static final修饰（可以省略）
	- 方法可以为抽象方法（jdk8前只能）、静态方法/默认方法default（jdk8）、私有方法（jdk9）（可以省略）
	- 不可以声明构造器、代码块
- 实现————**implements**: `class A extends superA implements B,C{}`
	- 类可以实现多个接口
	- 类必须将接口中的所有抽象方法重写（即实现），方可实例化，否则必须声明为抽象类
- 接口可以多继承：`interface C extends A,B`
- 接口的多态性 e.g.`Fly f = new Bullet()`
	> ### 抽象类与接口
	> 都可以声明抽象方法；都不能实例化
	> 抽象类一定有构造器而接口没有；
	> 如果两者都可以使用的话，优先使用接口，以避免单继承的局限
	

--------------------------------------
<br>

# 第三部分 Java高级
<br>

> ### 注解Annotation
> - 注解可以被编译器或程序读取，做出相应处理，用@表示
> - 注解是一种趋势，未来：框架 = 注解 + 反射 + 设计模式
> - 功能
> 	- 保护机制：如@override会进行检查是否正确重写
> - 常用  
	- @Deprecated  
	- @SupressWarnings  
> - 自定义注解（idea中直接右键选择新建annotation即可），配合反射使用
	```
	public @interface MyAnnotation{
		String value();	// String value() default "hello" 这样写则调用时不用给参数赋值
	}
	调用: @MyAnnotation(value="class")
	```
> - 元注解：对现有的注解进行解释说明的注解【4个元注解】
	- @Target：注解的使用范围，即能够修饰哪些结构（类、方法、构造器、模块...）
	- @Retention：
	
> ### junit单元测试
> 1. 导入jar包：hamcrest-core-1.3.jar  junit-4.12.jar
> 2. 测试代码函数前加上@Test
> 3. 注意：
>	- 所在类必须是public的，非抽象的，有唯一的无参构造器；
>	- @Test标记的方法必须是public，非抽象的，非静态的，void，无形参（有返回值的方法放进有效的测试方法中进行测试即可）
>

> ### 包装类
> - 用途：让基本数据类型和引用类型一样可以使用为对象设计的API或特性
> - 与基本类型一一对应有自己的包装类，共8种；除int的包装是Integer/char的是Character，其余把首字母大写即可
> - 例子：`Integer obj = new Integer(100);`
> - 自定义包装类
> - ~~转换：基本-->包装：调用包装类的valueOf()；包装--> 基本：调用包装类的xxxValue()~~
>> 注意：jdk5引入了自动拆箱装箱：`int i = 10; Integer ii = i;`
> - String类与基本数据类型/包装类的相互转化
	- --> 法一：String.valueOf(xx); 法二：利用连接符 `String str = ii + "";`
	- <-- 调用包装类的parseXxx()：`int i = Integer.parseInt(s);`

# 第一节 异常处理


# 第二节 多线程
1. 创建和启动线程
	- 创建方式一 继承法：
		- ① 创建一个继承于Thread类的子类
		- ② 重写Thread类的run()方法，即线程要执行的操作
		- ③ 创建该子类对象，通过对象调用start()
		> **匿名子类方式:**
			```
			new Thread(){
				public void run() {
					...
				}
			}.start();
			```
	- 创建方式二 接口法：
		```
		class PrimeRun implements Runnable {	// 创建实现Runnable接口的类
			long minPrime;
			PrimeRun(long minPrime){
				this.minPrime = minPrime;
			}
			public void run(){	// 实现接口中的run方法
				...
			}
		}
		PrimeRun p = new PrimeRun(143);
		new Thread(p).start();	// 将创建好的对象作为参数到Thread类的构造器中
		```
		- 匿名实现类的匿名对象方法：
			```
			new Thread(new Runnable(){
				public void run(){
					...
				}
			}).start();
			```
	- 建议使用接口法，因为：
		- 避免了类的单继承的局限性
		- 适合处理有共享数据
		- 代码和数据的分离

# 第三节 String类与基础API


# 第四节 集合、数据结构及其源码
## Collection

## List

## set

## TreeSet

## Map

## 第五节 泛型


## 第六节 File类及IO


## 第七节 网络编程


## 第八节 反射


## 第九节 JDK8-17新特性