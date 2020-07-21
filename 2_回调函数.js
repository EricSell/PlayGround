// 阻塞代码实例
// var fs = require('fs');
//
// var data = fs.readFileSync('./test_file/input.txt');
//
// console.log(data.toString());
// console.log("程序执行结束!");

// 结果:  这是一个文件内的文字~
//       程序执行结束!





// 非阻塞代码实例
var fs = require('fs')

fs.readFile('./test_file/input.txt',function (err,data) {
    if (err) return console.err(err);
    console.log(data.toString());
});

console.log('程序执行结束')

// 结果:  程序执行结束!
//       这是一个文件内的文字~