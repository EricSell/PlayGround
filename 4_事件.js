// EventEmitter()
// events 模块 只提供了一个 EventEmitter一个对象

// 相同的事件名称按循序依次执行
var events = require('events')
var emitter = new events.EventEmitter()
emitter.on('sameEvent',(arg1, arg2) => {
    console.log('我是第一个执行的',arg1, arg2)
})
emitter.on('sameEvent',(arg1, arg2) => {
    console.log('我是第二个执行的',arg1, arg2)
})
emitter.emit('sameEvent','eric',22)
// 结果: 我是第一个执行的 eric 22
//      我是第二个执行的 eric 22


// 常用的API
// EventEmitter.on(event, listener)、emitter.addListener(event, listener) 作用:事件监听器
// EventEmitter.emit(event, [arg1],[arg2],[...]]) 作用:发射event事件,可选参数
// EventEmitter.once(event, listener) 作用:只能触发一次的事件监听器
// EventEmitter.removeListener(event, listener) 作用:移除监听器(此事件必须是已经注册过的,你没注册它怎么移除)
// EventEmitter.removeAllListener([event]) 作用: 移除所有监听器, 也可以指定event移除



// error 事件
// 当error被发射时, 要给它设置监听器, 否则node会将他视为异常,程序退出


// EventEmitter 常常在会继承它,而不是直接使用.
// 原因: 1.具有某个功能的对象实现事件,事件的监听和发射应该是一个对象的方法
//      2.javascript对象机制基于原型的,支持部分多重继承,继承EventEmitter不会打乱对象原有的继承关系