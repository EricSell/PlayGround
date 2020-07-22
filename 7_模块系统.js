// node.js 提供了exports和require两个对象
// exports 是模块的公开接口
// require 是从外部获取一个模块的接口

function method1Hello(){
    var Hello = require('./test_file/hello.js')
    Hello.world();
}

function method2Hello(){
    var Hello = require('./test_file/hello.js')
    hello = new Hello();
    hello.setName('Eric');
    hello.sayHello();
}


// method2Hello()
// Node.js中 require方法的查找策略是:
//  文件模块缓冲区 -> 原生模块 -> 原生模块缓冲区 -> 文件模块