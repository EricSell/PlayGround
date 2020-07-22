// fs
// 提供了异步 fs.readFile() 同步 fs.readFileSync() 两个版本

var fs = require('fs')

// fs.readFile([filename,[encoding],[callback(err,data)])
fs.readFile('./test_file/input.txt', encoding='UTF8',function (err,data) {
    if(err){
        console.error(err);
    }else{
        console.log(data);
    }
})


// fs.readFileSync(filename,[encoding])
// 如果出错,fs抛出异常, 需要使用try和catch捕捉


// fs.open(path, flags, [mode], [callback(err, fd)])
// r ：以读取模式打开文件。
// r+ ：以读写模式打开文件。
// w ：以写入模式打开文件，如果文件不存在则创建。
// w+ ：以读写模式打开文件，如果文件不存在则创建。
// a ：以追加模式打开文件，如果文件不存在则创建。
// a+ ：以读取追加模式打开文件，如果文件不存在则创建

