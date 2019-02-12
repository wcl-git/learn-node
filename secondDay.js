包 (package)

JS 基本单位是单个js文件，但是复杂的模块 往往由多个子模块组成。
为了便于管理和使用，我们可以把由多个子模块组成的大模块称为 包，
并把所有子模块放到同一个目录里。

在组成一个包的所有子模块中，需要一个入口模块，入口模块的导出对象被作为包的导出对象，例如

-/home/user/lib/
	-cat/
		head.js
		body.js
		main.js

其中cat目录定义了一个包，其中含有三个子模块。main.js作为入口模块，其内容

const head = require('./head');
const body = require('./body');


export.create = (name) => {
	return {
		name: name,
		head: head.create(),
		body: body.create()
	}
}

其他模块使用包时候，只需要加载入口模块即可
require('/home/user/lib/cat/main') 能达到目的，但是这样路径不像是哟个模块，并且路径太死。

这个时候 node能识别的 index.js ，当模块文件名为。index.js 加载模块可以使用模块所在目录的路径代替文件路径。
require('/home/user/lib/cat');这样也能应用模块

提起node 必须了解 package.json这个文件
如果想自定义入口模块的额文件和存放位置，就要在包下面有一个package.json 文件，并在其中指定入口模块的路径。
上面例子重构一波；
-/home/user/lib/
 -cat/
   +doc/
   -lib/
    head.js
    body.js
    main.js
   +tests/
  package.json

  ```
  	{
  		name: 'cat',
  		main: './lib/main.js'
  	}
  ````
  require('/home/user/lib/cat') 可以加载模块。这就是nodejs 根据包目录下的package.json 找到入口模块所在位置。

  对于node 要么就是一个包。要么就是一个命令行程序。其实上面的引用开起来不像是一个包，倒像是一个文件。接着往下看：

  npm 包

  npm 是随着node一起安装的包管理工具，解决node代码部署上的很多问题，
  npm 来源和场景

  允许用户从npm 服务器上下载别人编写的三方包使用，
  允许用户从包下载别人编写的命令行程序本地使用
  允许自己编写npm包并发到npm 上，共别人使用
  这里就不用展开。具体u 哦研究一下 package.json关键字段

  发布一个 npm 包
  注册账号， 终端下运行 npm adduser ,之后按照提示做即可。账号搞定
  接着我们需要编辑package.json 里必要字段

  版本号分为X.Y.Z三位，分别代表主版本号、次版本号和补丁版本号。当代码变更时，版本号按以下原则更新
  只是修改bug需要更新z位， 如果新增功能，但是向下兼容，需要更新y位， 如果有大变动，向下变动，需要更新x位。

   ```
   {
   	name: 'node-echo',  # 包名
   	version: '1.0.0',   # 版本号
   	dependencies: {  // 三方依赖 devdependencies是开发环境，dependencies是线上环境
   		'argv': '0.0.2',
   	},
   	main: './lib/echo.js',   // 入口模块位置
   	bin: {
   		'node-echo': './bin/node-echo' // 命令行程序名和主模块位置
   	}

   }
   ````
之后，我们就可以在package.json 所在目录下运行 npm publish  发布代码了。
上面很重要，理解之后，发一个npm 就像喝水一样简单。

学习node 就是要学习他的nodejs 操作文件。

同步读写，异步读写 write.js, yibuwrite.js 简单列子
























