> # CSS放入HTML
> 放入head标签中：
```    
<style>
	p {
		color: blue;
		font-size: 16px;
	}
</style>
```
---
# 0 CSS三种导入方式
1. 内联样式：直接放在HTML标签中用style定义
	> 例子：  
	```
	<body>
		<h1 style="color: green;">This is a Tier one title</h1>
	</body>
	```
2. 内部样式表：如上在HTML的head标签中
	> 例子：  
	```
	<style>
		/* 选择器 {声明块} */
		h2 {
			color: red;
		}
	</style>
	<body>
		<h2>This is a Tier two title using 内部样式</h2>
	</body>
	```
3. 外部样式表：单独放在一个CSS文件中，在head中引用（可复用）
	- 在HTML所在目录下新建文件夹中存放CSS文件，并在HTML中用<link rel="stylesheet" type="text/css" href="./css/style.css">进行导入
	- type="text/css"是默认的可以省略，如果不是css样式表请声明
---
-  **！** 优先级1>2>3
- 如果外部样式放在内部样式的后面，则外部样式将覆盖内部样式！
	```
	<style type="text/css">
      h3{color:green;}
    </style>
    <link rel="stylesheet" type="text/css" href="style.css"/>
	```
---

# 1 CSS选择器
- 通用选择器：用\*表示，即\* {...}，对所有元素起变化
- 元素选择器：（就像上面那样，style中规定的是全局的，所有h2都要变）
- 类选择器：用.表示（可利用类、id等条件控制部分元素的变化）  
	```
	.highlight {
		background-color: yellow;
	}
	<h2 class="highlight">only h2 in highlight class will be changed!</h2>
	```
	> **注意！**
	> · 即使类型不同，只要属于一个class，也起作用
	> · ☆如果想让一个元素属于两个或多个class，请将class用空格隔开：`<p class="classA classB">`
	> · 后面的类会覆盖之前的类，注意不是行内样式中的先后，而是内部样式中的先后，即`<p class="classB classA>`并不改变顺序
- id选择器：用\#表示，精准到一个，不能重复且一个元素只能有1个id  
	```
	#id01 {
		background-color: yellow;
	}
	```

- 交集选择器：如`h1.classA`表示作用于classA的h1标题
	- 注意元素选择器放类~之前
	- 利用多个类选择器可逐层添加属性：
	```
	<h1 class="center">标题居中</h1>
	<p class="center color">段落居中，颜色为红色。</p>
	```
- 并集选择器：`.classA,.classB,.classC`，一般逗号后换行
- 子元素选择器：只对儿子辈生效 .xx> x，如div>p
- 后代选择器：所有后代包含儿子辈 .xx x，如div p
- 相邻兄弟选择器: 对该元素之后的第一个元素生效 xx + x, 如div+p
	```
	div+p
	{
		background-color:yellow;
	}	
	...
	<div>
	<h2>DIV 内部标题</h2>
	<p>DIV 内部段落。</p>
	</div>
	<p>DIV 之后的第一个 P 元素。</p>
	```
- 后续兄弟选择器：该元素之后的所有兄弟元素 xx ~ x, 如div~p
	
- 属性选择器：一般用来选择除了class和id属性以外的其它属性，如title等，用[]把属性名框起来
	```
	<style>
		[title] {...}			// 用法01，基本写法
		[title=".."] {...}		// 用法02，选择某指定值的属性
		[title^=".."] {...}		// 用法03，值开头为。。
		[title$=".."] {...}		// 用法04，值结尾为。。
		[title*=".."] {...}		// 用法05，值包含了。。
	</style>
	```
	> #### CSS 属性选择器 ~=, |=, ^=, $=, *= 的区别
	> ~=, |= 要求值为完整单词
	> 1.[attribute~=value] 属性中包含独立的单词为 value
	>   [attribute*=value] 属性中做字符串拆分，只要能拆出来 value 这个词就行
	> 2.[attribute|=value] 属性中必须是完整且唯一的单词，或者以 - 分隔开
	>   [attribute^=value] 属性的前几个字母是 value 就可以
	> 3.[attribute$=value] 属性的后几个字母是 value 就可以

- 伪类选择器：区分一个元素的不同状态，如访问过的超链接变灰色
	- 动态伪类
		```
		// 1.选中没有访问过的a元素
		a:link {
			color: orange;
		}
		// 2.选中访问过的a元素
		a:visited {...
		}
		// 3.选中鼠标悬浮的a元素
		a:hover {...
		}
		// 4.选中处于激活状态（点击不放）的a元素
		a:active {...
		}
		// 选中处于焦点的表单元素
		input:focus,
		select:focus {
			color: orange;
			background-color: yellow;
		}
		```
		> **!注意**
		> - 1-4的顺序不要改变否则导致有些效果无法显示（根据“后来居上”原理分析, a元素可能同时有link&hover&active状态）
		> - hover和active伪类在很多种元素上都适用
		
	- 结构伪类
		```
		// 1 选择div的第一个p元素儿子
		div>p:first-child {...}
		// 2 选择div的最后一个p元素儿子
		div>p:last-child {...}
		// 3 选择div的第n个p元素儿子
		div>p:nth-child(2) {...}
		div>p:nth-child(2n) {...}	// 选取偶数序号的
		div>p:nth-child(-n+5) {...}	// 选取前5个
		// 4 第一个该类型的儿子/最后一个.../第n个...
		div>p:first-of-type {...}
		div>p:last-of-type {...}
		div>p:nth-of-type {...}
		// 
		div>p:nth-last-child(2) {...} // 倒数的第n个
		div>p:nth-last-of-type {...}
		div>p:only-of-type {...}
		div>p:only-child {...}
		:root {...}
		div:empty {...}
		```
		> **!注意** 
		> - 若1中div的第一个儿元素不是p类型，则结果为空，没有任何元素被选中，依此类推（可以使用4则可以选中第一个p元素）
		> - 3中注意括号内的形式必须是an+b，即不能写成5-n；同理(2)即(0n+2)；0或留空无法选中任何元素
		
	- 否定伪类: 排除
		```
		div>p:not(.fail){...}	// 排除类名为fail的元素
		div>p:not([title^="..."]){...}	// 排除title属性值开头为...的元素
		div>p:not(:first-child){...}	// 排除第一个儿p元素
		```
	- UI伪类: 复选框、单选按钮、表单（是否禁用）
		```
		input:checked {...}
		input:disabled {...}
		```
		> 复选框和单选按钮不能操作颜色和背景色属性
	- 目标伪类：`div:target`与超链接搭配：`<a href="#first">跳到第一个</a>`
	- 语言伪类：`div:lang(en)` `div:lang(zh-CN)`
- 伪元素选择器: 例如一段话中选首字母
	```
	div::first-letter {..}
	div::first-line {..}
	div::selection {..}	// 被鼠标选中的文字（CSS3）
	input::placeholder {..}	// 被鼠标选中的表单框中的文字（CSS3）
	p::before {content=“”}		// 
	p::after {content=“”}		// 
	```


> ## 权重与选择器优先级
> 行内样式 > ID选择器 > 类选择器 > 元素选择器 > 通配选择器
> **权重：(a：ID选择器个数, b：类/伪类/属性选择器的个数, c：元素/伪元素选择器的个数)**
> 比较：a b c依次比较，大者胜出；都一样则依旧采用“后来居上”原则(标准术语为“层叠”)
> !important加在属性值后则优先级最高（<u>但权重无变化，只有该属性优先级最高</u>）：`.class {color: orange !important; font-size: 40px}`

# 2 CSS常用属性
## 颜色 

## 字体

## 文本
- 颜色
- 间距
- 修饰
- 缩进
- 对齐
- 行高

## 列表<ul>

## 表格及边框<table>

## 背景

## 鼠标


# 3 盒子模型

## 前置知识 
- 长度单位
	- px
	- cm/mm
	- em：对font-size乘以一个倍数em（若自己没有设置fs则找其父元素的fs）
	- rem：相对于根元素<html>的倍数
	- 百分比%：相对于父元素的百分比
- 块元素/行内元素/行内块元素
	- 块元素：独占一行；默认宽-撑满父元素；默认高-取决于内容；可以用CSS设置宽高
	- 行内元素：不独占一行；宽高均由内容撑开；**无法用CSS设置宽高**
	- 行内块元素：不独占一行；宽高均由内容撑开（所以应该算作行内元素）；**可以通过CSS设置宽高**
	> **整理**
	> ![图片alt](./img_resources/CSS01.png "图片title")
	- 修改显示模式：设置属性**display：block/inline/inline-block**
	
## 组成

### 内容区 
	```
	width:
	min-width:	// 视口宽小于该值后出现滚动条左右滚动显示
	max-width:	// 视口宽大于该值后元素宽度不会随视口宽继续变大而变大
	height:
	min-height:
	max-height:	// 如果文字太多，显示上会溢出内容区
	```
	- width/height和min-/max-一般不一起使用因为没有必要
	- 默认宽度
		- 若没有指定元素宽高，则填满父元素，如div填满body
		- 且此时margin影响盒子宽高（总宽度=父content-margin）;（内容区宽高=父content-margin-border-padding）
### 内边距padding
	```
	padding-left/right/top/bottom
	padding: 20px;					//
	padding: 10px 20px;				// 上下 左右
	padding: 10px 20px 30px;		// 上 左右 下
	padding: 10px 20px 30px 40px;	// 上 右 下 左
	```
	- 注意行内元素如span，设置上下内边距会占据上下其它元素的位置造成重叠！
### 边框border
	```
	border-width:
	border-color:
	border-style:
	border-bottom-color: red;
	border-left: 20px solid purple;
	...
	```
### 外边距margin
	```
	//类似padding
	```
	- margin左右（必须是块元素）设置为auto，则“距离能有多远就多远” `margin: 0 auto //左右居中`
	- margin可以是负值
	
	> ##### margin塌陷
	> 第一个子元素的margin-top会作用于父元素，最后一个子元素的margin-bottom会作用于父元素
	> 解决方案：1.给父元素设置宽度不为0的padding或border：`border: 1px solid transparent`(不推荐)；2.**父元素设置属性overflow**：`overflow: hidden`
	> ##### margin合并	
	> 兄弟元素的margin-bottom与另一兄弟元素的margin-top会取较大值而非相加
	> 只给其中一个兄弟元素赋值margin即可规避该问题

## 其它

### 内容溢出
- **overflow属性**：visible（默认值）、hidden（隐藏不显示）、scroll（无论是否溢出显示滚动条）、auto（溢出时显示滚动条）
- 设置overflow为hidden或auto解决溢出问题

### 元素隐藏
- **visibility属性**：show、hidden
- 也可用：`display: none`。<u>区别：前者元素仍然占位，后者不但看不见，也没有大小不占位了</u>

### 样式继承
- 能继承的属性：字体、文本、color等<u>不影响布局的（即和盒子模型没有关系）</u>
- 不能继承的：边框、背景、padding、margin、宽高、overflow等

### 空白
- 由于换行引起行内元素或行内快元素间存在“空白”
- 将其父元素设置font-size=0px，再设置自身的fs可解决问题
- 图片和下边界之间有空隙，是因为字体设计基线的原因 
	- 1.设置vertical-align为bottom（原本是baseline） 
	- 2.或设置fs=0px（适用于后面不加文字时）

	> **布局技巧**
	> ![图片alt](./img_resources/CSS02.png "图片title")


# 4 浮动和定位

## 浮动后的影响及解决

## 定位
- 相对定位
	```
	position: relative;
	left: -50px;
	```
	> **注意：若元素开启任意定位，则层级高于普通元素，即可能覆盖其它普通元素**
- 绝对定位
	```
	position: absolute;
	top: 0px; // ②
	left: 0px;
	
	.outer:hover .box2{		// 伪类加后代选择器，实现当鼠标置于外层框上时，box2绝对定位到left220px处
		left: 220px;
	}
	```
	1. 与相对定位不同，绝对定位会脱离文档流，即类似浮动“飘起来”（注意与浮动不同，文字一并移动）
	2. 绝对定位的参考点：若元素没有脱离文档流，则参考父元素；若脱离文档流，则参考第一个开启定位的祖先元素，都没有则参考根html
	3. left和right不能同时设置，top和bottom不能同时设置
	4. 绝对定位不能与浮动同时使用，若是则以绝对定位为先
	5. 绝对定位常和相对定位一起使用，以实现hover时显示新内容覆盖在原有元素的功能
	