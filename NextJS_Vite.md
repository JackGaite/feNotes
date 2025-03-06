# NextJS
全栈框架
- 基于react
- 更偏向于多页应用

- 创建
	- `npx create-next-app@latest`
	- `yarn create next-app`

- 路由
	- 静态路由下，文件目录就是路由
	- 动态路由
		- 用中括号`[postId].tsx`
		- `import {useRouter} from 'next/router'`
		- `const id = router.query.postId`获取到路由参数id值
		```
		// 访问post/1
		|- posts
			|- [postID]
				|- index.tsx
			|- index.tsx
		```
		- router.back()
		- router.push('/')
	- Link组件（类似antd中的）
		- `import Link from 'next/link'
		- ``` <li><Link href={`/post/${item.id}`}> ```
		
- 预生成静态页面
	- 不必像react一样动态获取数据显示，而是构建时准备好静态页，爬虫友好
	
- SSR服务端渲染
	- setServerSideProps
	
# Vite

- index.html作为入口文件而不是js了
- 在html中引入: `<script type="module" src="./main.js"></script>`

- 不用配置css等的loader，自带

```
# vite.config.js
import { defineConfig } from "vite"
export default defineConfig({
	server: {
		port: 2000,
		proxy: {
			
```

## 报错专区
- ”Failed to parse source for import analysis because the content contains invalid JS syntax.“
	- 原因和解决：https://juejin.cn/post/7018128782225571853