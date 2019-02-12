const fs = require('fs');
const  path = require('path');



function copy(src, dst) {
  fs.writeFileSync(dst, fs.readFileSync(src));
}

// function main(argv) {
//   copy(argv[0], argv[1]);
// }
console.log(process.argv);
// main(process.argv.slice(2));
const src = path.join(__dirname, 'test.js');
const dst = path.join(__dirname, 'copytest.js');
copy(src, dst);