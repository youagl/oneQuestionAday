// 第一题
const config = {
    languages:[],
    set language(lang){
      return this.languages.push(lang);
    },
    // get language(){
      
    // }
  }
console.log('第一题 ',config.language);
/**
 * 打印输出 undefined
 * 原因：config.language把方法当成属性值使用，但对象里并没有定义相关的get方法，故此处报没有定义，所以打印undefined
 */

// 第二题
const name = "tom";
const age = 21;

console.log(Number.isNaN(name));
console.log(Number.isNaN(age));
console.log(Number.isNaN('123'));
console.log(Number.isNaN(NaN));
console.log('---------------');
console.log(isNaN(name));
console.log(isNaN(age));
console.log(isNaN(NaN));
console.log(isNaN({}));
console.log(isNaN('123'));
console.log(isNaN(true));
/**
 * isNaN是es5的方法，大意是 Not a Number
 * es5中的isNaN会先转成数字型，如果转换成功，就返回true。例子中的'123' true 21都可以转成数字型，所以返回false。
 * 对于不能成功转成Number就会给到NaN，但它存在一个bug，isNaN(NaN)返回true，ES6中提供了Number.isNaN用于判断一个值是否严格等于NaN。
 * 只有当NaN时，才返回true
 */
// 第三题
class Chameleon {
   static colorChange(newColor) {
        this.newColor = newColor;
    }
    
    constructor({ newColor = "green" } = {}) {
        this.newColor = newColor;
    }
}
const freddie = new Chameleon({ newColor: "purple" });
// console.log(freddie.colorChange("orange"));
/**
 * freddie.colorChange is not a function，静态方法不对外的原因，所以找不到该方法
 * 假设去掉static，会输出什么呢？答案是，undefined，因为方法没有返回值。
 */
// 第四题
function Car() {
    this.make = "a";
    return { make: "b" };
}
const myCar = new Car();
console.log(myCar.make);
/**
 * 由于return了一个object {make: "b"}，所以make就是b
 */

// 第六题
// for...in、 Object.keys() 和 Object.getOwnPropertyNames() 的区别
var parent = Object.create(Object.prototype, {
    a: {
        value: 1,
        writable: true,
        enumerable: true,
        configurable: true            
    }
});
var child = Object.create(parent, {
    b: {
        value: 2,
        writable: true,
        enumerable: true,
        configurable: true
    },
    c: {
        value: 3,
        writable: true,
        enumerable: false,
        configurable: true
    }
});
console.log('---------------');
for (const key in child) {// a b
    if (Object.hasOwnProperty.call(child, key)) {//过滤掉原型链上的可枚举属性
        const element = child[key];
        console.log(key,element);
    }
}
console.log(Object.keys(child));//b
console.log(Object.getOwnPropertyNames(child));//b c
/**
 * for in会输出自身以及原型链上可枚举的属性，一般原型链的属性都是不可枚举的。
 * 过滤掉原型链上的可枚举属性  if (Object.hasOwnProperty.call(obj,key))
 * 后两者都是以数组形式返回自身属性，区别在 
 * Object.keys只显示可枚举的属性
 * Object.getOwnPropertyNames 返回自身所有属性
 * 
 */

// LRU 缓存机制 手写
// 一个Map对象在迭代时会根据对象中元素的插入顺序来进行
// 新添加的元素会被插入到map的末尾，整个栈倒序查看
class LRUCache{
    constructor(capacity){
        this.secretKey = new Map();
        this.capacity = capacity;
    }
    get(key){
        // key存在，取值时删掉后重新加到map的末尾
        // 表示最近使用
        if(this.secretKey.has(key)){
            let tempValue = this.secretKey.get(key);
            this.secretKey.delete(key);
            this.secretKey.set(key,tempValue);//插入map的末尾
            return tempValue;
        }else return -1;
    }
    put(key,value){
        // key存在，仅修改值
        if(this.secretKey.has(key)){
            this.secretKey.delete(key);
            this.secretKey.set(key,value);
        }
        // key不存在，cache未满
        else if(this.secretKey.size<this.capacity){
            this.secretKey.set(key,value);
        }
        // 添加新key，删除旧key
        else{
            this.secretKey.set(key,value);
            // 删除map的第一个元素，即为最长未使用的
            this.secretKey.delete(this.secretKey.keys().next().value);
        }
    }
}
console.log('------LRUCache---------');
let cache = new LRUCache( 2 /* 缓存容量 */ );

console.log(cache.put(1, 1));
console.log(cache.put(2, 2));
console.log(cache.get(1));       // 返回  1
console.log(cache.put(3, 3));    // 该操作会使得密钥 2 作废
console.log(cache.get(2));       // 返回 -1 (未找到)
console.log(cache.put(4, 4));    // 该操作会使得密钥 1 作废
console.log(cache.get(1));       // 返回 -1 (未找到)
console.log(cache.get(3));       // 返回  3
console.log(cache.get(4));       // 返回  4

// 总结：
// 1、利用map的有序性
// 2、每次set值前，把存在的key对应的值删除。最近最少使用，即map的第一个元素值。key = map.keys().next().value

// es6 的 let 实现原理
/**
 *  如果区块内存在let和const命令，这个区块对这些命令声明的变量，
 * 从一开始就形成了封闭作用域。凡是在声明之前使用这些变量，就会报错。--暂时性死区
 * let在polyfill之后，是使用var声明的变量，但借助闭包和函数作用域来实现块级作用域的效果。
 * */
// 原始es6代码
var funcs = [];
for(let i=0;i<10;i++){
    funcs[i] = function(){
        console.log(i);
    }
}
console.log('------let 实现原理---------');
funcs[3]();

// polyfill后 es5实现
var func5 = [];

var _loop = function(i){
    func5[i] = function(){
        console.log(i);
    }
}
for(var i=0;i<10;i++){
    _loop(i);
}
func5[3]();