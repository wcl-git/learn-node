const fs = require('fs');
const path = require('path');

function copy(src, dst) {
  fs.readFile(src, function(err, data) {
    console.log('我是写文件完毕回调');
    fs.writeFile(dst, data.toString(), (err) => {
      console.log('异步');
    });
  });
}

const src = path.join(__dirname, 'test.js');
const dst = path.join(__dirname, 'copytest.js');

copy(src, dst);