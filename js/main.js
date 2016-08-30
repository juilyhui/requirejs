
/*
* require()函数
* 接受两个参数，
第一个参数是一个数组，表示所依赖的模块，本例就是['jquery', 'underscore', 'backbone']，即主模块依赖这三个模块；
第二个参数是一个回调函数，当前面指定的模块都加载成功后，它将被调用。
加载的模块会以参数形式传入该函数，从而在回调函数内部就可以使用这些模块。
* require.js会先加载jQuery、underscore和backbone，然后再运行 alert() 函数
* 默认情况下，require.js假定这三个模块与main.js在同一个目录，文件名分别为jquery.js，underscore.js和backbone.js，然后自动加载。
*/

require(['jquery', 'underscore', 'backbone'], function($, _, Backbone){

    console.log("this is main.js");

})



/*
* require.config()方法
* 对模块的加载行为进行自定义
* 写在主模块（main.js）的头部
* 参数就是一个对象，这个对象的paths属性指定各个模块的加载路径。默认路径与main.js在同一个目录（js目录）
*/

require.config({
    paths: {
        // "jquery": "jquery.min", // 与main.js在同一目录
        // "underscore": "underscore.min",
        // "backbone": "backbone.min"

        "jquery": "lib/jquery.min", // 在其他目录，比如js/lib目录   逐一指定路径
        "underscore": "lib/underscore.min", // 不用加 .js ,加了错   -------------为啥？？？？？？
        "backbone": "lib/backbone.min"
    }
})

require.config({
    badeUrl: "js/lib", // 直接改变基目录
    paths: {
        "jquery": "lib/jquery.min", // 在其他目录，比如js/lib目录
        "underscore": "lib/underscore.min",
        "backbone": "lib/backbone.min"
    }
})

require.config({
    paths: {
        "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min"  // 直接指定网址
    }
})


// require.js要求，每个模块是一个单独的js文件。这样的话，如果加载多个模块，就会发出多次HTTP请求，会影响网页的加载速度。
// 因此，require.js提供了一个优化工具(requirejs optimizer)，当模块部署完毕以后，可以用这个工具将多个模块合并在一个文件中，减少HTTP请求数。






/*
* AMD模块的写法
* require.js加载的模块，采用AMD规范。
* 具体来说，就是模块必须采用特定的define()函数来定义。如果一个模块不依赖其他模块，那么可以直接定义在define()函数之中。
*/

require(['math'], function(math){
    console(math.add(1,1))
})






/*
* 加载非规范（非AMD写法）的模块
* 非规范的模块在用require()加载之前，要先用require.config()方法，定义它们的一些特征。
*/
// 举例来说，underscore和backbone这两个库，都没有采用AMD规范编写。如果要加载它们的话，必须先定义它们的特征。

// require.config()接受一个配置对象，这个对象除了有前面说过的paths属性之外，还有一个shim属性，专门用来配置不兼容的模块。
// 具体来说，每个模块要定义（1）exports值（输出的变量名），表明这个模块外部调用时的名称；（2）deps数组，表明该模块的依赖性。
require.config({
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
})

// 比如，jQuery的插件可以这样定义
require.config({
    shim: {
        'jquery.scroll': {
            deps: ['jquery'],
            exports: 'jQuery.fn.scroll'
        }
    }
})









/*
* require.js 插件
*/

// domready 插件，可以让回调函数在页面DOM结构加载完成后再运行。
require(['domready'], function(doc){

    // dom 结构加载完成后执行的函数

})

// text 和 image 插件，允许requires.js加载文本和图片位置
define(['text!review.txt', 'image!cat.jpg'], function(review, cat){
    console.log(review);
    document.body.appendChild(cat);
})

// 类似的插件还有json和mdown，用于加载json文件和markdown文件。
