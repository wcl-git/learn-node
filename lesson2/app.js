/**
	简单爬虫
*/

// var express = require('express');
// var cheerio = require('cheerio');
// var superagent = require('superagent');

// var app = express();

// app.get('/', function(req, res, next) {
// 	superagent.get('https://cnodejs.org/')
// 		.end(function(err, sres) {
// 			if(err) {
// 				return next(err);
// 			}
// 			var $ = cheerio.load(sres.text);
// 			var items = [];
// 			$('#topic_list .topic_title').each(function(idx, element) {
// 				var $element = $(element);
// 				items.push({
// 					title: $element.attr('title'),
// 					href: $element.attr('href'),
// 				});
// 			});

// 			res.send(items);
// 		});
// });

// app.listen(3000, function() {
// 	console.log('port 3000')
// })

//异步并发爬虫
var express = require('express');
var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');  // url 结构和拼接

var app = express();

var cnodeUrl = 'https://cnodejs.org/';
app.get('/', function(request, respose, next) {
	superagent.get(cnodeUrl)
	.end(function(err, sres) {
		if(err) {
			return next(err);
		}
		var topicUrls = [];
		var $ = cheerio.load(sres.text);
		$('#topic_list .topic_title').each(function(idx, element) {
			var $element = $(element);
			var href = url.resolve(cnodeUrl, $element.attr('href'));
			topicUrls.push(href);
		});

		var ep = new eventproxy();
		ep.after('topic_html', topicUrls.length, function(topics) {
			topics = topics.map(function(topicPair) {
				var topicUrl = topicPair[0];
				var topicHtml = topicPair[1];
				var $ = cheerio.load(topicHtml);
				return ({
					title: $('.topic_full_title').text().trim(),
					href: topicUrl,
					comment1: $('.reply_content').ep(0).text().trim(),
				})
			})

			// console.log('final:');
			// console.log(topics);

			respose.send(topics);
		});

		topicUrls.forEach(function(topicUrl) {
			superagent.get(topicUrl)
				.end(function(err, res) {
					// console.log('fetch' + topicUrl + 'success');
					// console.log(res);
					ep.emit('topic_html', [topicUrl, res.text]);
				});

		});
	});

})

app.listen(3000, function() {
	console.log('port 3000')
})



