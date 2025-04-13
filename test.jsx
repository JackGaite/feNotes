const { useState, useEffect } = require("react")

// 左边按钮，右边有个数字，点击开始，右边数字每秒+1；功能：开始和暂停
const page = () => {
  const [isStart, setIsStart] = useState(false)
  const [count, setCount] = useState(0)
  let timerId

  const toggleTimer = () => {
    if (!isStart) {
      timerId = setInterval(() => setCount(count => count + 1), 1000)
    } else {
      clearInterval(timerId)
    }
    setIsStart(!isStart)
  }

  return (
    <div>
      <button onClick={toggleTimer}>
        {!isStart ? "开始" : "暂停"}
      </button>
      <span>{count}</span>
    </div>
  )
}

export default page;