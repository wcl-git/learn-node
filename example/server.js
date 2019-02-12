var http = require('http');

http.createServer(function(request, respose) {
	respose.writeHead(200, {'Content-Type': 'text-plain'});
	respose.end('Hello Word\n');
}).listen(8124);

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


// http.createServer(function(request, respose) {
// 	respose.writeHead(200, {'Content-Type': 'text-plain'});

// 	request.on('data', function(chunk) {
// 		respose.write(chunk);
// 	});

// 	request.on('end', function() {
// 		respose.end();
// 	})
// }).listen(8124);


// var options = {
//         hostname: 'www.example.com',
//         port: 8124,
//         path: '/upload',
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         }
//     };

// var request = http.request(options, function (response) {});

// request.write('Hello World');
// request.end();


