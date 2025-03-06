
## 类型

- 类型推断
根据初始值自动判断类型，后续不能赋值给另一类型
- 类型注解
	- `let str: string`
- 类型断言
	- `const result = numArr.find(item => item>2) as number`
	- 断言result一定是个number（需要自行保证，例如上例可能会是undefined）
	
- string
- number
- boolean
- null
- undefined

- 联合类型
	- `let v1: string | null = null`
	- `let v2: 1 | 2 | 3 = 2		// 5则不通过`
	
- 数组
	- `let arr: number[] = [1, 2, 3]`
	- `let arr1: Array<string> = ['a', 'b']`
	
- 元组
	- `let t1: [number, string, number?] = [1, 'a']`
	- 问好表示可选
	
- 枚举
	- `enum myEnum { A, B, C}`

- 函数
```
function myFn (a: number, b: string, c = 10, d?: number, ...rest: number[]): number {
	return 100
}
```

- 接口
```
interface Obj {
	name: string,
	age: number
}
const obj: Obj = {
	name: 'a',
	age: 10
}
```

- 类型别名
`type myUserName = string | number		let a: myUserName = 'abc'`

- 泛型
```
function myFn<T> (a: T, b: T): T[] {
	return [a, b]
}

myFn<number>(1, 2)
myFn<string>('1', '2')
```

## 进阶
- 函数重载

- 接口继承

- 类的修饰符
```
class Article {
	title: string
	content: string
	aaa?: string
	bbb = 100
	
	private temp?: string
	protected inner?: string
	private static readonly author: string = 'ljj'

	constructor (title: string, content: string) {
		this.title = title
		this.content = content

```

- （get & set）

- 抽象类