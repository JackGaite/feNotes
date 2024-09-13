> ### HTML网站
- [官网：](https://html.spec.whatwg.org/multipage/ "https://html.spec.whatwg.org/multipage/")
- [MDN：](https://developer.mozilla.org/zh-CN/docs/Web/HTML "https://developer.mozilla.org/zh-CN/docs/Web/HTML")
- [官方文档：](https://www.w3cschool.cn/html/dict "https://www.w3cschool.cn/html/dict")
- [参考手册：](https://www.w3cschool.cn/htmltags/ "https://www.w3cschool.cn/htmltags/")
- [标签手册：](https://www.w3school.com.cn/tags/index.asp#google_vignette "https://www.w3school.com.cn/tags/index.asp#google_vignette")


# HTML基本语法

# 基本结构
```
<!-- 放置文档的元信息 -->
<!DOCTYPE html>
<html>
	<head>
		<!-- 放置文档的元信息 -->
		<title>your_title</title>
		<meta charset="UTF-8">
		<link rel="stylesheet" type="text/css" href="styles.css">
		<script src="script.js"></script>
	</head>
	<body>
		<h1>title</h1>
		<p>paragraph</p>
		<a href="...">your_link</a>
		<!-- 其他内容 -->
	</body>
</html>
```
# 基本标签

## 标题标签
h1~h6共六级标签
## 段落标签
<p></p>	//浏览器会自动在标题和段落前后添加空行
## 列表
无序：<ul></ul>  
```
<ul>
<li>Coffee</li>
<li>Milk</li>
</ul>
```
有序：<ol></ol>  
自定义列表：自定义列表以 <dl> 标签开始。每个自定义列表项以 <dt> 开始。每个自定义列表项的定义以 <dd> 开始。
```
<dl>
<dt>Coffee</dt>
<dd>- black hot drink</dd>
<dt>Milk</dt>
<dd>- white cold drink</dd>
</dl>
```
## 表格
<table border="1">	// 可添加属性
	<tr>
		<th>...</th>	// 列标题 table header
		<th>...</th>
	</tr>
	<tr>
		<td>...</td>	// 表元素 table data, 可以包含文本、图片、列表、段落、表单、水平线、表格等
		<td>...</td>
	</tr>
</table>  
- <thead> <tbody>
- <th>也可以放在body中，比如把列表每行的符号·换成图片，就可以把该图片放在<th>中：
	`<th width="34"><img decoding="async" src="/images/lamp.jpg" width="32" height="32" alt="lamp"></th>`
- <tfoot >可用于在表格的底部定义摘要、统计信息等内容。 <caption >可用于为整个表格定义标题。

## img标签
- 用例：  
	<img src="logo.png" alt="该图片无法显示" width="100" height="100">  
	
## a链接
```
<a href="https://www.example.com">访问示例网站</a>
// 图片作为链接
<a href="https://www.example.com">
  <img src="example.jpg" alt="示例图片">
</a>
// 同一页面内部链接跳转（锚点）
<a href="#section2">跳转到第二部分</a>
<!-- 在页面中的某个位置 -->
<a name="section2"></a>
// 链接用于下载文件，使用download属性
<a href="document.pdf" download>下载文档</a>
```
	
## 其他
- 换行：<br>  
- 分割线：<hr>  
- <div>：块标签，容器，创建页面布局结构  
	> 快捷方法：利用.class快速创建<div class="class">,用#class创建带id的
- <span> 与div一样联合css和js使用
- 文本格式化
	<b>	定义粗体文本
	<em>	定义着重文字
	<i>	定义斜体字
	<small>	定义小号字
	<strong>	定义加重语气
	<sub>	定义下标字
	<sup>	定义上标字
	<ins>	定义插入字(下划线)
	<del>	定义删除字
- 注释： 请始终将正斜杠添加到子文件夹。假如这样书写链接：href="https://www.runoob.com/html"，就会向服务器产生两次 HTTP 请求。
	这是因为服务器会添加正斜杠到这个地址，然后创建一个新的请求，就像这样：href="https://www.runoob.com/html/"。


# HTML属性
> 属性名不区分大小写
> 适用于大多数HTML元素的属性（与CSS相关）：  
	- class：为HTML元素定义一个或多个类名（从样式文件引入）  
	- id：定义元素唯一的id  
	- style：规定元素的行内样式  
	
	- href属性  
		<a href="..." target="_blank">这是一个超链接</a>
		// target: _self在该页打开，_blank在空白页打开  
	- target 用于<a>中指定打开方式如新窗口: 'target="_blank"' 此窗口：_self
	
	- src属性
	- alt属性 img中提供替代文本
	- title鼠标悬停时提供额外信息
		<button title="click here">Submit</button>
		
	- name 定义表单元素的名称
	- value 表单元素的值
	- type 表单元素类型
		
	

# HTML区块
> - 块元素：通常从新行开始，占据整行宽度；可包含其它块元素和行内元素；  
> - 行内元素：只占据其内容所需宽度；只能包含其它行内元素；常见有：span, a, strong, img, br, input等  

# HTML表单<form>
	<form>
		<input type="text" placeholder="请输入内容后自动消失" value="提前准备的内容">
		<input type="radio" name="gender"> 男
		<input type="radio" name="gender"> 女
		<input type="checkbox" name="hobby"> 唱跳rap
		<input type="password">
		<input type="submit">
	</form>
	<form action="#"></form> //向服务器发送
	

# iframe框架
- 通过使用框架，你可以在同一个浏览器窗口中显示不止一个页面。
- 语法：`<iframe src="URL" width="200" height="200"></iframe>`
- frameborder 属性定义iframe是否显示边框，设置为“0”则不显示
- (高级)iframe 可以显示一个目标链接的页面
	```
	<iframe src="demo_iframe.htm" name="iframe_a"></iframe>
	<p><a href="https://www.runoob.com" target="iframe_a" rel="noopener">RUNOOB.COM</a></p>
	```
	
# 字符实体
- 用于显示预留字符如< >
- https://www.runoob.com/html/html-entities.html

------
------
> 问题解决专区
> - vscode中如何用md格式显示txt文档：https://cloud.tencent.com/developer/ask/sof/1574892
