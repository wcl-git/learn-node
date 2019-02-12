const fs = require('fs');
const path = require('path');

function copy(src, dst) {
  fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}

// const src = path.join(__dirname, 'test.js');
// const dst = path.join(__dirname, 'copytest.js');
const src = path.resolve('test.js');
const dst = path.resolve('copytest.js');

copy(src, dst);

// 读文件流事件， data 读取事件， end 读取结束事件
const rs = fs.createReadStream(src);
rs.on('data', function(chunk) {
  //  读取中做一些事情
  console.log('duqu')
})
rs.on('end', function(chunk) {
  // 结束后的回调
  console.log('完毕')
  console.log(path.resolve('stream.js'));
  console.log(path.join('learn-node', 'stream.js'))
})