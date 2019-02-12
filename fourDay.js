网络操作

不了解网络编程的程序员不是好前端，而nodejs提供了一扇了解网络编程的窗口。
node的本来用途时编写高性能web服务器。使用nodejs内置的http 模块简单实现一个 http服务器。

````
var http = require('http');

http.createServer(function(request, respose) {
	respose.writeHead(200, {'Content-Type': 'text-plain'});
	respose.end('Hello Word\n');
}).listen(8124);
````

http 模块提供两种使用方式：

作为服务器端使用，创建一个http服务器，监听http客户端请求并返回响应

作为客户端使用，发起一个http客户端请求，获取服务器端响应

服务器端：

首先需要使用 createServer方法创建一个服务器，然后调用 listen方法监听端口。
之后，每当来了一个客户端请求，创建服务器时传入的回调函数就被调用一次。可以看出，这是一种机制。

http 请求本质上就是一个数据流，由请求头和请求体组成。例如一个完整的http请求数据内容

````
POST / HTTP/1.1
User-Agent: curl/7.26.0
Host: localhost
Accept: * / *
Content-Length: 11
Content-Type: application/x-www-form-urlencoded


Hello Word

````

上面是请求头。hello word 是请求体

http 请求在发送给服务器时，可以认为是按照从头到尾的顺序一个一个字节的以数据流方式发送的。
而http模块创建的http服务器在接收到完整的请求头后，就会调用回调函数。
除了可以使用 request 对象访问请求头数据外，还能吧request对象当做一个只读数据流来访问请求体数据。
````
var http = require('http');
http.createServer(function(request, respose) {
	var body = [];

	console.log(request.method);
	console.log(request.headers);

	request.on('data', function(chunk) {
		body.push(chunk);
	});
	request.on('end', function() {
		body = Buffer.concat(body);
		console.log(body.toString())
	})
}).listen(8124)
````

http 响应本质也是一个数据流，同样有响应头 和 响应体组成。
在回调函数中，除了可以使用response对象来写入响应头数据外，还能吧response 对象当成一个只写数据流来写入响应体数据。

````
var http = require('http');
http.createServer(function(request, respose) {
	respose.writeHead(200, {'Content-Type': 'text-plain'});

	request.on('data', function(chunk) {
		respose.write(chunk);
	});

	request.on('end', function() {
		respose.end();
	})
}).listen(8124);
````
客户端模式下
````
var options = {
        hostname: 'www.example.com',
        port: 8124,
        path: '/upload',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

var request = http.request(options, function (response) {});

request.write('Hello World');
request.end();
````

 这一点http很重要需要多看多写

 domain 来异步编程，这里就不累述，有空看看。很有用

