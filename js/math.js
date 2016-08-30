

/*
* AMD 模块的写法
*/

// 简单的值对   仅含值对，没有任何依赖
define({
    color: 'black';
    size: "unsize"
})


// 函数式定义
// 具体来说，就是模块必须采用特定的define()函数来定义。如果一个模块不依赖其他模块，那么可以直接定义在define()函数之中。
define(function(){

    var add = function(x, y){
        return x+y;
    }

    return {
        add: add
    }

})


// 存在依赖的函数式定义
// 如果这个模块还依赖其他模块，那么define()函数的第一个参数，必须是一个数组，指明该模块的依赖性。
// 依赖关系会以参数的形式注入到该函数上，参数列表与依赖名称列表一一对应。
// 当require()函数加载下面这个模块的时候，就会先加载myLib.js文件。
define(['myLib'], function(){

    function foo(){
        myLib.doSomething();
    }

    return {
        foo: foo
    }

})

// 循环依赖
// 如果你定义了一个循环依赖(a依赖b，b同时依赖a)，则在这种情形下当b的模块函数被调用的时候，它会得到一个undefined的a。
// b可以在模块已经定义好后用require()方法再获取(记得将require作为依赖注入进来)。
define(['require', 'a'], function(require, a){
    return function(title){
        return require("a").doSomething();
    }
})


/*
* CommonJs 模块格式
* 如果你现有一些以CommonJS模块格式编写的代码，而这些代码难于使用上述依赖名称数组参数的形式来重构，你可以考虑直接将这些依赖对应到一些本地变量中进行使用。
*/

define(function(require, exports, modules) {
    var a = require('a'),
        b = require('b');
    return function(){};
})
