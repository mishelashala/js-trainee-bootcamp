// stack
// [ multiply ] -> sum, num1, num2
// [ 01 ] -> result
//

// stack (2)
// [ 01 ] -> result
//

// Heap
// num1, num2, sum
// result = 2 * 2
//

// Heap (2)
// result = 2 * 2
//

// SCOPE
// how gets created
// where it is
// how gets deleted

// GLOBAL SCOPE
// created: program executed
// functions and variables declared
// inside the main program

// FUNCTION SCOPE
// created: function executed
// functions and variables declared
// insed another function

// function declaration
function multiply(num1, num2) {
  // body
  function sum() {}

  return num1 * num2;
}

var result = multiply(2, 2)

// BLOCK SCOPE
// es6 way (2015)
if (someCondition) {
  // new scope, yay
} else {
  // new scope, yay
}

{
  // new scope
}

// HOISTING
// function and variable declarations get
// moved to the top of the function (or file)
function sum(num1, num2) {
  if (num1 === num2) {
    var result = num1 * 2;
    function sum() {}
  } else {
    var result = num1 + num2;
    function sum() {}
  }

  return result;
}

sum(1, 1); // 2
sum(2, 3); // 5

// pre-compiled code
function sum(num1, num2) {
  var result;
  function sum() {}

  if (num1 === num2) {
    result = num1 * 2;
  } else {
    result = num1 + num2;
  }

  return result;
}

// temporary death zone
function sum(num1, num2) {
  if (num1 === num2) {
    var result = num1 * 2;
  } else {
    console.log(result);
  }

  return result;
}

// pre-compiled: temporary death zone
// race condition
function sum(num1, num2) {
  var result; // undefined

  if (num1 === num2) {
    result = num1 * 2;
  } else {
    console.log(result); // > undefined
  }

  return result;
}

// const, let
// es6 way (2015)
function sum(num1, num2) {
  if (num1 === num2) {
    let result = num1 * 2;
    return result;
  } else {
    return num2 * num2;
  }
}

// CONTEXT
// class-based oop langs
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }


  get age() {
    return this.age;
  }

  get name() {
    return this.name;
  }
}

var john = new Person("john doe", 21);
john.name // 'john doe'

// js is a prototype-based oop lang

// GLOBAL CONTEXT
// created: execute your script/program
// by default is the window object (in the browser)

// FUNCTION CONTEXT
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// functions as constructors
var person = new Person('john doe', 21);
person.name // 'john doe';

// pre-compiled:
function Person(name, age) {
  var this = {};

  this.name = name;
  this.age = age;

  return this;
}

// Broken person
function Person(name, age) {
  this.name = name;
  this.age = age;

  return { name:'Chuck testa', age: 60}
}

var person = new Person('john doe', 21)
// john is that you?
person.name // nope, it's chuck testa!

// BIND OTHER CONTEXT
global.name = 'John'; // nodejs, in browser global ctx is window object

function sayHello() {
  console.log(`Hello ${this.name}`);
}

sayHello(); // 'Hello John'

var otherContext = {
  name: 'Chuck Testa'
}

sayHello.apply(otherContext);

// BIND
var boundSayHello = sayHello.bind(otherContext);

boundSayHello() // 'Hello Chuck Testa'

// First Class Citizens
// Functions are values

var data = 10;
logData(data);

function getData() {
  return 10;
}

// FUNCTION EXPRESSION
var getData = function () {

}

// named function
function getData() {

}

// anonymous function
var anonGetData = function () {

}

getData.name // 'getData'
anonGetData.name // 'undefined' || goolge chrome: 'anonGetData'

let getData = function () {}
const getData = function () {}

// same variable
var data = 10;
var data = 20;

// different declarations
// Error: duplicated
let data = 10;
let data = 20;

// error: duplicated
const name = 'john'
const name = 'john'

// Reasignment
var data = 10;
let name = 'john';

// ... more code
data = 20
name = 'jenny'

// constant... reasigment, not to mutability
const list = [1,2,3];
list.push(4);
list.pop();

// error
list = [5,6,7]
