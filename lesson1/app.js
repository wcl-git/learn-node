var express = require('express');
var utility = require('utility'); // 只是一个辅助方法
var app = express();

app.get('/', function(req, res) {
	
	var q = req.query.q;
	var md5Value = utility.md5(q);
	// res.send('hello word');
	res.send(md5Value);
});

app.listen(3000, function () {
	console.log('监听3000端口');
})


// 上面是简单express 一个服务器