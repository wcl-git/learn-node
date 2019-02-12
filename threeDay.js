NodeJs 通过 fs 内置模块提供对文件的操作。fs模块提供的api基本上可以分为三类：

1、文件属性读写

其中常用的有 fs.stat   fs.chmod  fs.chown 等等。

2、文件内容读写

其中常用的有 fs.readFile  fs.readdir  fs.writeFile  fs.mkdir 等等。

3、底层文件操作。

其中常用的有 fs.open fs.read fs.write fs.close等等

NodeJs最精华的异步io模型在fs模块里有着充分的体现，例如上边提到的这些api都通过回调函数传递结果。例如：

```
fs.readFile(pathname, function(err, data) {
	if(err) {
		// 提示错误
	}else {
		// 这里做点事
	}
})
```

操作文件难免合路径打交道，nodejs 提供的 path 内置模块来简化路径相关操作。并提高代码可读性

API path.normalize path.join  path.resolve  path.extname 

注意： path.join 和 path.resolve 的区别是，join 只是路径拼接，resolve 是生成绝对路径，不只是字符串拼接,
如果拼接是绝对路径，则两者没区别。

遍历目录
```
function travel(dir, callback) {
	fs.readFileSync(dir).forEach(function(file) {
		var pathname = path.join(dir, file);
		if(fs.statSync(pathname).isDirectory()) {
			travel(pathname, callback);
		}else {
			callback(pathname);
		}
	})
}
```

文本编码，

单字节编码
不关心是utf8还是gbk 统一都用单字节

```
function replace(pathname) {
	var str = fs.readFileSync(pathname, 'binary');
	str = str.replace('foo', 'bar');
	fs.writeFileSync(pathname, str 'binary')
}
```

总结：
学好文件操作，编写各种程序都不怕
如果不是很在意新能，fs模块同步API能让生活更美好
需要对文件读写做到字节节别的精细控制时，请使用fs模块的文件底层操作API
不要使用拼接字符串的方式来处理路径，使用path模块
掌握好目录遍历和文件编码处理技巧，很实用。

这部分需要仔细消化一下