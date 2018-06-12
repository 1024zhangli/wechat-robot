1. 首先安装puppeteer

```bash
npm install puppeteer --save --ignore-scripts
```
2. 下载对应的[chrome版本](https://download-chromium.appspot.com/)

3. 在`node_modules\puppeteer`文件中新建`.local-chromium`文件夹

4. 查看`node_modules\puppeteer\package.json`中的`chromium_revision`字段，假设为`564778`。在步骤3的文件夹中建立名为`win64-564778`（**Mac上为mac-564778**）的文件夹

5. 把下载的chrome压缩包进行解压，将`chrome-win32`（**Mac上为chrome-mac**）放入`win64-564778`（Mac上为**mac-564778**）文件夹

6. 安装webchaty等
```bash
npm install -d
```

7. 将`binary`文件夹中的`cmdmp3.exe`复制到`c:\windows`目录或者增加到PATH环境变量。Mac用户需要运行`brew install sox`


8. 运行程序
> 修改index.js中的`wechat.queryRoom('巴啦啦测试群')`，更具需要修改群名

```bash
npm run start
```
系统会出现如下内容：

```bash
18:37:27 INFO Wechaty v0.14.10 starting...
[0] Scan https://login.weixin.qq.com/qrcode/odciE2iMQw== to login.

```
在浏览器上打开后用微信进行扫一扫，会出现如下内容则表示运行成功：
```bash
欢迎欢迎，石头登入成功！
```

> 可以修改jobs.js中的 `rule.hour = [22, 23, 24, 0, 1, 2, 3, 4, 5, 6]`来进行测试，默认22:00 - 06:00自动进行发送消息。