

const getAllZhishuWithinN = (n) => {
  const res = []
  for (let i=2; i<n; i++) {
    let flag = true;   // 是否是质数
    for (let j=0; j<res.length; j++) {
      if (i % res[j] === 0) {
        flag = false;
        break;
      }
    }
    if (flag) res.push(i)
  }

  return res
}

