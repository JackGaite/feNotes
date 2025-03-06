git init
git add .
git commit -m ""
git remote add origin https://github.com/gaiteli/info-management-platform.git
git branch -m master main
git push origin main

答疑：
- git push 时遇到网络错误：Failed to connect to github.com port 443...
解决：使用代理，设置git端口号和代理的端口号（在Windows代理服务器中查看）保持一致
git config --global http.proxy 127.0.0.1:端口号  --global可以不写

- 拉取远端仓库直接覆盖本地代码：git fetch --all && git reset --hard origin/main