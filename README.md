# 											**小粉猪**

这是一个基于alist + raiDrive + tauri 构建的通过wevdav链接阿里云盘播放视频的桌面应用

<img src="http://img-file.linqiaoyan.top/logo.svg" alt="[img-file.linqiaoyan.top/logo.svg](http://img-file.linqiaoyan.top/logo.svg)" style="zoom:25%;" />

![[img-file.linqiaoyan.top/RaiDrive.Logo.svg](http://img-file.linqiaoyan.top/RaiDrive.Logo.svg)](http://img-file.linqiaoyan.top/RaiDrive.Logo.svg)

![[img-file.linqiaoyan.top/tauri_logo_light.svg](http://img-file.linqiaoyan.top/tauri_logo_light.svg)](http://img-file.linqiaoyan.top/tauri_logo_light.svg)

## 部署流程

### 一、服务器部署（推荐）

#### 服务端

首先你需要拥有一台windows服务器在其上面部署我们的alist然后再通过raiDrive将资源通过webdav同步到本地磁盘，**这里要记得选择Y：盘**

**还有切记将alist挂载的阿里云盘目录命名为aliyunpan**

如下图

![[1674630381510.png (1632×840) (linqiaoyan.top)](http://img-file.linqiaoyan.top/1674630381510.png)](http://img-file.linqiaoyan.top/1674630381510.png)

然后在里面建立我们的放置各个类型视频的目录，后面将其资源放入相应的目录下确保使用

![[1674631813828.png (1286×639) (linqiaoyan.top)](http://img-file.linqiaoyan.top/1674631813828.png)](http://img-file.linqiaoyan.top/1674631813828.png)

注意 **电影下资源放入mp4即可 电视剧要携带文件夹**

然后确保我们的windows操作系统安装了node环境和ffmpeg环境，这个自行百度

然后切换到我们node工程目录内执行node app.js即可

默认导出端口在其app目录内的port属性可自行修改，如下图

![[1674631038643.png (1307×857) (linqiaoyan.top)](http://img-file.linqiaoyan.top/1674631038643.png)](http://img-file.linqiaoyan.top/1674631038643.png)

默认为3000

最后记得放开相应的端口，让我们客户端可以通过服务器外网地址加端口号范围到我们的node工程

#### 客户端

下载我们目录内的**playerapp_0.0.0_x64_en-US.msi**进行安装

安装后会看到提示输入相应的服务端url即可这里记得服务端的url必须是https不是http，然后软件会自动关闭我们自己重新打开就会看到下面的内容

![[1674631527430.png (1500×750) (linqiaoyan.top)](http://img-file.linqiaoyan.top/1674631527430.png)](http://img-file.linqiaoyan.top/1674631527430.png)

然后单机即可播放

![[img-file.linqiaoyan.top/1674631637538.png](http://img-file.linqiaoyan.top/1674631637538.png)](http://img-file.linqiaoyan.top/1674631637538.png)

这样就大功告成

### 二、本地部署（不推荐）

本地部署就和服务器部署差不多只是都将其设置在本地 由于开机要去等待node的链接 得不偿失所以不推荐