var async = require('async')

var currentCount = 0;
var fetchUrl = function (url, callback) {
	var delay = parseInt((Math.random() * 10000000) % 2000, 10);
	currentCount++;
	console.log('现在并发数是', currentCount, '正在抓去', url, '耗时', delay);
	setTimeout(function() {
		currentCount--;
		callback(null, url + 'html content');
	}, delay);
};

var urls = [];
for(var i = 0; i < 30; i++) {
	urls.push('http://datasource_' + i);
}

async.mapLimit(urls, 5, function(url, callback) {
	fetchUrl(url, callback);
}, function(err, result) {
	console.log('final');
	console.log(result);
})