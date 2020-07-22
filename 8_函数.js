// node.js 函数
function say(word){
    console.log(word);
}

function execute(Fun, value){
    Fun(value)
}

execute(say, 'Hello');

// 匿名函数
execute(function (word) {
    console.log('匿名函数:')
    console.log(word)
}, 'Hello');
