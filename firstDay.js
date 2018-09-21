nodejs是什麽？
JS是脚本语言，需要解析器才能运行，对于写在html页面里的JS浏览器充当解析器的角色。
而对于需要独立运行的JS，nodeJS就是一个解析器。

每一种解析器都是一个运行环境，不但允许JS定义各种数据结构，进行各种计算，还允许JS使用运行环境提供的内置对象和方法做一些事。
例如运行在浏览器中的JS的用途是操作DOM，浏览器就提供了document 之类的内置对象。

而运行在Nodejs中的JS的用途是操作磁盘文件或搭建HTTP服务器，NodeJS就相应提供了 fs、http等内置对象。

有啥用处

Nodejs的作者说，他创造Nodejs的目的是为了实现高性能WEB服务器，
他首先看重的是时间机制和异步IO模型的优越性，而不是JS。js异步，不能操作IO,就成了天然之选。

nodeJS 安装和运行就免了，比较简单。


模块

在nodeJS中，一般将代码合理扯分到不同的JS文件中，每一个文件就是一个模块，
而文件路径就是模块名。

在编写每一个模块时，都有 require, exports, module 三个预先定义好的变量可供使用

require函数用于在当前模块中加载和使用别的模块，传入一个模块名，返回一个模块导出对象。
可使用相对路径（./开头），或者是绝对路径(/或c:之类的盘符开头)。
另外，模块名称的.js扩展名可以省略。

例如：
var foo1 = require('./foo');
var foo2 = require('./foo.js');
var foo3 = require('/home/user/foo');
var foo4 = require('/home/user/foo.js');

// foo1至foo4中保存的是同一个模块的导出对象。

如果webpack 配置好的后缀。如.JSX，ES6等，也是可以省略。别的文件不能省略后缀。


exports
exports 对象是当前模块的导出对象，用于导出模块共有方法和属性。
别的模块通过require函数使用当前模块时得到的就是当前模块的 exports 对象。例如

exports.hello = function () {
  console.log('I come back');
}

通过module 对象可以访问到当前模块的一些相关信息，但最多的用途是替换当前模块的导出对象。
例如 模块导出对象默认是一个普通对象，如果想改成一个函数的话，可以使用以下方式。
module.exports = function () {
  console.log('Hello World!');
};

模块初始化

一个模块中JS代码仅在模块第一次被使用时执行一次，并在执行过车位那个中初始化模块的导出对象。
之后，缓存起来的导出对象被重复利用。

主模块

通过命令行参数传递给NodeJS以启动程序的模块被称为主模块。
主模块负责调度组成整个程序的其它模块完成工作。例如通过以下命令启动程序时，main.js就是主模块。
node main.js

例子

counter.js 内容

var i = 0;
function count(){
  return ++i;
}

exports.count = count;


main.js 内容

var counter1 = require('./counter');
var counter2 = require('./counter');

console.log(counter1.count());
console.log(counter2.count());
console.log(counter2.count());


node main.js 输出
1  
2
3

模块补充

1. require : node 和 ES6 都支持

2. import /  export: 只有ES6 支持

3. module.exports / exports: 只有node2支持


exports  module.exports

在一个node执行一个文件时，会给这个文件内生成一个exports 和module 对象，而 module 又有一个exports属性。
他们之间关系： exports = module.exports = {};

可以参考一下网上的例子

exports 只是辅助 module.exports蚕座内存中的数据，辛辛苦苦各种操作完，最后 require 的内容还是
module.exports的。
尽量都用module.exports导出， 然后用 require导出



ES6 的模块导出导入

export 与 export default 均可导出常量、函数、文件、模块等

在一个文件内 export 可以有多个，export default 仅有一个

通过 export 方式导出，在导入时要加{ }，export default 则不需要

export 能直接导出变量表达式，export default 不行。



AMD  CMD  区别

AMD : 模块预加载

CMD: 模块用时再加载

Common.js 适用于后台。不使用于浏览器