大示例

需求
开发一个简单的静态文件合并服务器，该服务需要支持类似js css文件合并请求
http://assets.example.com/foo/??bar.js,baz.js
在以上URL中，??是一个分隔符，之前是需要合并的多个文件的URL的公共部分，之后是使用,分隔的差异部分。因此服务器处理这个URL时，返回的是以下两个文件按顺序合并后的内容。

/foo/bar.js
/foo/baz.js
另外，服务器也需要能支持类似以下格式的普通的JS或CSS文件请求。

http://assets.example.com/foo/bar.js
以上就是整个需求。

