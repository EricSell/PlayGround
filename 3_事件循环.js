// 流程:
// 引入events
// 创建 eventEmitter 对象
// 绑定事件与事件处理函数, 对于每一个事件都需要绑定并处理
// 触发

var events = require('events');
var eventEmitter = new events.EventEmitter();
eventEmitter.on('connection',() => {
    console.log('建立连接')
    eventEmitter.emit('receivedMsg');
})
eventEmitter.on('receivedMsg',() => {
    console.log('开始接收')
})
eventEmitter.emit('connection')
console.log('接收完成')

// require('events') // 引入
// new events.EventEmitter() // 创建新的对象
// eventEmitter.emit(e) // 触发事件
// eventEmitter.on(e) // 绑定事件

