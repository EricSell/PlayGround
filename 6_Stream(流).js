// Stream 流
// 四个类型:Readable - 可读
//        Writable - 可写
//        Duplex - 可读可写
//        Transform - 操作被写入数据,然后读出结果
// 所有的stream对象都是EventEmitter实例,
// 常用的事件有: data - 有数据可读时触发
//             end - 数据读完时触发
//             error - 接收或写入出错时触发
//             finish - 数据写入底层时触发

// 从流中读取数据
function read_stream(){
    var read_fs = require('fs');
    var data = '';
    // 创建可读流
    var readerStream = read_fs.createReadStream('./test_file/input.txt');
    // 设置编码
    readerStream.setEncoding('UTF8');
    // 处理事件流 -> data, end , error
    readerStream.on('data',function (chunk) {
        data += chunk;
    });
    readerStream.on('end',function () {
        console.log(data);
    });
    readerStream.on('error',function (err) {
        console.log(err.stack);
    });
    console.log('程序执行完毕');
}

// 写入流
// 文件不存在会创建
function write_stream(){
    var write_fs = require('fs');
    var writeStream = write_fs.createWriteStream('./test_file/Stream_out.txt');
    writeStream.write('使用Stream写入数据','UTF8');
    // 标记文件末尾
    writeStream.end();
    writeStream.on('finish',() => {
        console.log('写入完成')
    })
    writeStream.on('error',(err) => {
        console.log(err.stack)
    })
    console.log('程序执行完毕')
}

// 管道流
// 相当于一个管道, 将读出的数据写入到另一个文件, 从而实现大文件的复制
function pipe_stream(){
    var pipe_fs = require('fs');
    var pipe_readStream = pipe_fs.createReadStream('./test_file/input.txt');
    var pipe_writStream = pipe_fs.createWriteStream('./test_file/pipe_out.txt');
    pipe_readStream.pipe(pipe_writStream)
    console.log('程序执行完毕');
}

// 链式流
// 用于管道的链式操作,例如: 压缩,解压
function chain_Gzip_stream(){
    var zip_fs = require('fs');
    var zlib = require('zlib');

    // 压缩 input.txt 为 input.txt.gz
    zip_fs.createReadStream('./test_file/input.txt')
        .pipe(zlib.createGzip())
        .pipe(zip_fs.createWriteStream('./test_file/input.txt.gz'));
    console.log('文件压缩完成');
}

function chain_Gunzip_stream(){
    var zip_fs = require('fs');
    var zlib = require('zlib');

    // 压缩 input.txt 为 input.txt.gz
    zip_fs.createReadStream('./test_file/input.txt.gz')
        .pipe(zlib.createGunzip())
        .pipe(zip_fs.createWriteStream('./test_file/chain_steam.txt'));
    console.log('文件解压完成');
}

chain_Gunzip_stream()
