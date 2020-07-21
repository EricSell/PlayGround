// node.js 提供了exports和require两个对象
// exports 是模块的公开接口
// require 是从外部获取一个模块的接口

function helloworld(){
    var hello = require('./test_file/hello.js')
    hello.world();
}


