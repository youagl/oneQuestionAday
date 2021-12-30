1.
const config = {
languages: [],
set language(lang) {
return this.languages.push(lang);
},
};
console.log(config.language);

2.
const name = "tom";
const age = 21;

console.log(Number.isNaN(name));
console.log(Number.isNaN(age));

console.log(isNaN(name));
console.log(isNaN(age));

3.
class Chameleon {
static colorChange(newColor) {
this.newColor = newColor;
}

 this.newColor = newColor;
}
constructor({ newColor = "green" } = {}) {

}
const freddie = new Chameleon({ newColor: "purple" });
freddie.colorChange("orange");

4.
function Car() {
this.make = "a";
return { make: "b" };
}
const myCar = new Car();
console.log(myCar.make);//b

5.  for...in、 Object.keys() 和 Object.getOwnPropertyNames() 的区别
6.  LRU 缓存机制 手写
7.  es6 的 let 实现原理