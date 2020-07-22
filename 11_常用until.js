var util = require('util');


// until.inherits
// 仅仅继承 原型 中的函数
function Base(){
    this.name = 'base';
    this.base = 1991;
    this.sayHello = () =>{
        console.log('Hello ' + this.name);
    }
}

// 给Base的原型"上"一个方法
Base.prototype.showName = function(){
    console.log(this.name);
}

function Sub(){
    this.name = 'sub';
}

util.inherits(Sub, Base);
var objBase = new Base();
objBase.showName();
objBase.sayHello();
console.log('Base => ',objBase)
console.log('Base prototype =>',objBase.__proto__)
var objSub = new Sub()
objSub.showName();
// objSub.sayHello()
console.log('Sub => ',objSub)


// inspect
// 可以将任意对象转换成字符串
// util.inspect(object,[showHidden],[depth],[colors])
// showHidden - true,显示更多隐藏信息
// depth - 最大递归层数
// color - 出个的格式回一个ANSI颜色编码
function Person(){
    this.name = 'eric';
    this.toString = function () {
        return this.name;
    };
}
var obj = new Person();
console.log(util.inspect(obj));
console.log(util.inspect(obj,true));

// isArray(object) , isRegExp(object) , isDate(object) , isError(object)
// 是否是数组 bool     是否是正则 bool       是否是日期 bool   是否是一个错误对象 bool
console.log(util.isArray([]))
console.log(util.isArray(new Array))
console.log(util.isArray({}))