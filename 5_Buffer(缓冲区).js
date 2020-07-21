// Buffer  类似于 整数数组
// 存放二进制数据的缓存区

// 创建:
// 方法1: 长度10个字节
var buf1 = new Buffer(10);
// 方法2:
var buf2 = new Buffer([10, 20, 30, 40, 50]);
// 方法3:
// utf-8 是默认编码, 其他支持:"ascii", "utf8", "utf16le", "ucs2", "base64" 和 "hex"。
var buf3 = new Buffer('这是一个缓冲区','utf-8');

console.log('--------缓冲区写入---------')
// 写入缓冲区
// 语法: buf.write(string[, offset[, lengt]][, encoding])
// string - 写入缓冲区的字符串
// offset - 缓冲区开始写入的索引值, 默认为0
// length - 写入的字节数, 默认为buffer.length
// encoding - 使用的编码, 默认为'utf8'
// 返回值: 放得下返回写入的大小, 放不下只会写入部分
var wrt_buffer = new Buffer(256);
var len = wrt_buffer.write('写入缓冲区');
console.log('写入字节数:',len); // 写入字节数:15

console.log('--------缓冲区读取---------')
// 从缓冲区读数据
// 语法: buf.toString([encoding[,start[,end]]])
// encoding - 使用的编码.默认为'utf8'
// start - 指定开始读取的索引位置, 默认为0
// start - 指定结束读取的索引位置, 默认为结尾
// 返回值: 解码缓冲区数据并使用指定的编码返回字符串
var toS_buffer = new Buffer(26);
for(var i=0; i<26; i++){
    toS_buffer[i] = i+97;
}
console.log(toS_buffer.toString('ascii')); // abcdefghijklmnopqrstuvwxyz
console.log(toS_buffer.toString('ascii',0,5)); // abcde
console.log(toS_buffer.toString('utf8',0,5));  // abcde
console.log(toS_buffer.toString(undefined,0,5)); // abcde

console.log('--------Buffer转Json---------')
// 将Buffer专为Json
// 语法: buf.toJSON()
// 犯规值:返回JSON对象
var comm_buffer = new Buffer('这是Buffer转Json');
var buf_json = comm_buffer.toJSON(comm_buffer);
console.log(buf_json)

console.log('--------缓冲区合并---------')
// 缓冲区合并
// 语法:Buffer.concat(list[,totalLength])
// list - 用来合并的Buffer
// totalLength - 指定合并后Buffer对象的总长度
// 返回值: 返回一个新Buffer
var son_buffer1 = new Buffer('abc');
var son_buffer2 = new Buffer('def');
var conc_buffer = Buffer.concat([son_buffer1,son_buffer2]);
console.log('合并之后:',conc_buffer)

console.log('--------缓冲区比较---------')
// 缓冲区比较
// 语法:buf.compare(otherBuffer);
// otherBuffer - 其他缓冲区
// 返回值: 返回数字, 包含返回1,不包含返回-1,相等返回0
var dif_buffer1 = new Buffer('abc');
var dif_buffer2 = new Buffer('abcd');
var dif_buffer3 = new Buffer('ef');
console.log(dif_buffer1.compare(dif_buffer2))
console.log(dif_buffer2.compare(dif_buffer3))

console.log('--------缓冲区拷贝---------')
// 缓冲区拷贝
// 语法:buf.copy(target[,targetStart[,sourceStart[,souceEnd]]])
// target - 要拷贝的Buffer对象
// targetStart - 数字, 默认0
// sourceStart - 数字, 默认0
// sourceEnd - 数字
// 返回值 : 无
var cp_buffer1 = new Buffer('ABC');
var cp_buffer2 = new Buffer(3);
cp_buffer1.copy(cp_buffer2);
console.log('copy_buffer2 content:' + cp_buffer2.toString());

console.log('--------缓冲区切割---------')
// 缓冲区切割
// 语法:buf.slice([start[,end]])
// start - 0
// end - 默认buffer.length
// 返回值: 返回一个新的缓冲区,他和旧缓冲区指向同一块内存,但是从索引的位置剪切
var sli_buffer1 = new Buffer('eric');
var sli_buffer2 = sli_buffer1.slice(0, 2);
console.log('slice_buffer2 content:' + sli_buffer2.toString());

console.log('--------缓冲区长度---------')
// 缓冲区长度
// 语法: Buffer.length
// 返回值: 数字
console.log('conc_buffer的长度是:',conc_buffer.length)








