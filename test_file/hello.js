// method1
// exports.world = () => {
//     console.log('hello world')
// }

// method2
function Hello(){
    let name;
    this.setName = (theName) => {
        name = theName;
    };
    this.sayHello = () => {
        console.log('Hello ' + name);
    };
}
module.exports = Hello;