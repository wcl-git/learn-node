var fs = require('fs');
var path = require('path');
var http = require('http');

var MIME = {
	'.css': 'text/css',
	'.js': 'application/javascript'
};


function combineFiles(pathname, callback) {
	var output = [];

	(function next(i, len) {
		if(i < len) {
			fs.readFile(pathname[i], function (err, data) {
				if(err) {
					callback(err);
				}else {
					output.push(data);
					next(i+1, len);
				}
			})
		}else {
			callback(null, Buffer.concat(output));
		}
	})(0, pathname.length);
}

function main(argv) {
	var config = JSON.parse(fs.readFileSync(argv[0], 'utf-8'));
	var root = config.root || '.';
	var port = config.root || 8124;


	http.createServer(function(request, respose) {
		var urlInfo = parseURL(root, request.url);

		combineFiles(urlInfo.pathname, function(err, data) {
			if(err) {
				respose.writeHead(404);
				respose.end(err.message);
			}else {
				respose.writeHead(200, {
					'Content-Type': urlInfo.mime
				});
				respose.end(data);
			}
		})
	}).listen(port);
}

function parseURL(root, url) {
	var base, pathnames, parts;

	if(url.indexOf('??') === -1) {
		url = url.replace('/', '/??');
	}

	parts = url.split('??');
	base = parts[0];
	pathnames = parts[1].split(',').map(function(value) {
		return path.join(root, base, value);
	})

	return {
		mime: MIME[path.extname(pathnames[0])] || 'text/plain',
		pathnames: pathnames
	};
}

main(process.argv.slice(2));





