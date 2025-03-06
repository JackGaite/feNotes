# NodeJs与服务端
- Express
- json-server
- MongoDB

- nvm
	- nvm list available	列出可用的node版本
	- nvm install [version] 安装node对应版本
	- nvm use [version] 切换node版本

# npm

## npm "scripts"
https://ruanyifeng.com/blog/2016/10/npm_scripts.html

# Express
npm i express
OR：
npm i -g express-generator@4
express --no-view 项目名		// 使用脚手架创建

## 基础
```
// 导入
const express = require('express')

const app = express()

// 创建路由
app.get('/home', (req, res) => {
	// 原生操作
	req.method
	req.url
	req.httpVersion
	req.headers
	
	// Express
	req.path
	req.query 	// 发送的参数
	req.ip
	req.get('host')	// 获取特定请求头
	
	
})

// 获取路由参数
app.get('/:id.html', (req, res) => {
	clg(req.params.id)
	let {id} = req.params
})

app.post('login', (req, res) => {
	res.end('login')
})

```

## 响应
```
app.get('/response', (req, res) => {
	// 原生操作
	res.statusCode = 404
	res.statusMessage = ''
	res.setHeader('xx', 'yy')
	res.write('')
	res.end('')
	
	//Express 支持链式调用res.status(400).send('')
	res.status(500)
	res.set('aaa','bbb') 	// 设置header
	res.send('nihao')			// 不会乱码
	
	res.redirect('')		// 跳转
	res.download(__dirname + 'package.json')	// 下载
	res.json({				// json
		...
	})
})

```

## 中间件
- 全局中间件
```
const app = express()

function recordMiddleware(req, res, next){
	let {url, ip} = req;
	fs.appendFileSync(path.resolve(__dirname, './access.log'), `${url} ${ip}\r\n`)
	next()
}

app.use(recordMiddleware)

app.get('/home', (req, res) => {
	res.send('前台首页')
})
app.all('*', (req, res) => {
	res.send('<h1>404 not found</h1>')
})

app.listen...
```

- 路由中间件
与全局不同，将中间件函数放在路径后即第二个参数
```
function recordMiddleware...

app.get('/admin', recordMiddleware, (req, res) => {
	res.send('后台首页')
})

```

- 静态资源中间件
	- `app.use(express.static(__dirname + '/public'))`这样可以直接访问public下的静态文件
	- 例如public/css/css01.css，在url栏中输入localhost:3000/css/css01.css即可（还自动设置了类型content-type）
	- 由于/会默认打开index.html，所以静态资源与路由同时存在，谁先匹配谁响应

## 处理请求体内容：body-parser包
```
// 解析JSON格式的请求体的中间件
const jsonParser = bodyParser.json()

// 解析querystring格式的中间件
const urlencodedParser = bodyParser.urlencoded({ extended:false })

app.get('/login', (req, res) => {
	// 响应html文件内容，返回html界面
	res.sendFile(__dirname + '/11_form.html')

})

app.post('/login', urlencodedParser, (req, res) => {
	clg(req.body) 		// parser执行完会自动给req添加body

```

## 路由模块化
- 把路由拆分到各个文件中，在文件中导出各个路由
- 在主文件中导入，并设置app.use()，即可使用

## EJS模板引擎
分离用户界面和业务数据（随着前后端分离已不多用）


# json-server
npm i json-server

## 步骤
- 安装
- 新建db.json文件，写入假数据
- 启动服务：json-server db.json

--------------------------------------------
# 问题专区
注意即便系统环境变量生效了，若你之前打开的应用程序没关掉重启（在你没重启电脑的情况下），那你这个应用程序也可能读取不到该系统变量
npm config set prefix "D:\IDE_JDK_env_etc\nodejs\node_modules\npm"