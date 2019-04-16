// Default parameters

// falsy: a value that can be considered false
// 0
// null
// empty string
// false

// truthy: a value that can be considered true
// empty array
// empty object
// negative numbers
// positive numbers
// true

// without es6
function logData(data) {
  data = data || 0;
  console.log(data);
}

logData(null); // > 0

// es6
function logData(data = 0) {
  console.log(data);
}

logData(); //0

function noop() {
  // nothing
}

function logData(data = 0, logger = noop) {
  logger(data);
}

logData(); // nothing happens

// Rest parameters

// variadic functions
function arity(a, ...args) {
  // spread operator
  console.log(a, ...args);
}

arity(1, 2, 3); // 1, 2, 3

// Object Destructuring

// Objects-In Objects-out
function validateUser(user) {
  const { name = "unknow" } = user;
  return name === "john";
}

var john = {
  name: "john"
};

validateUser(john); // true

// destructuring on the parameters
function validateUser({ name = "unknown" }) {
  return name === "john";
}

var john = {
  name: "john"
};

validateUser(john); // true

// default values + destructuring on the parameters
function validateUser({ name = "unknown" } = {}) {
  return name === "john";
}

validateUser(); // false

// destructuring-inception
function validateUser({
  name = "unknow",
  address: { street = "unknown" } = {}
} = {}) {
  return name === "john" && street === "102";
}

var john = {
  name: "john",
  address: {
    street: "102"
  }
};

validateUser(john); // true

// Array destructuring
// Tuple
const tuple = [1, 2];

function head(tuple) {
  const [head] = tuple;
  return head;
}

function tail(tuple) {
  const [_head, ...tail] = tuple;
  return tail;
}

head(tuple); // 1
tail(tuple); // [2]

// Primitives passed as value
function inc(num) {
  num++;
  return num;
}

var one = 1;
inc(one); // 2
one; // 1

// Object passes by reference
// Object -> reference
// Privimite -> value
function inc(count) {
  count.value++;
  return count;
}

var count = {
  value: 1
};

inc(count); // { value: 2 }
// SIDE EFFECT
// avoid: immutability, purity
count; // { value: 2 }

// Arrow functions: syntax
// es6 syntax
var logger = value => {
  console.log(value);
};

var sum = (a, b) => {
  return a + b;
};

// both are equivalent
var sum = (a, b) => a + b;

var person = name => ({ name: name });

// anon funcs -> name = undefined
// named funcs -> name = variable
// arrow funcs -> name = variable

// Arrow functions: bound context

// Literal object syntax
var john = new Object();
var person = {
  kind: "human"
};
var student = Object.assign({}, person);

// prototype chain
var jenny = Object.create(person);

// Object property access (dot, string, dynamic)
var person = {
  kind: "human",
  3: "three"
};

person.kind; // 'human'
person["kind"]; // 'human'
person[1 + 2]; // 'three'

// Object Property descriptor
var person = {
  3: "three"
};

Object.defineProperty(person, "kind", {
  value: "human",
  writable: false,
  enumerable: false,
  configurable: false
});
person.kind = "alien"; // doesn't modify anything
Object.getOwnPropertyDescriptor(person, "kind"); // { value: 'human', writable: false, enumerable: false, configurable: false }
person.kind; // 'human'

// Object defineProperty

// "Methods"
var person = {
  name: "john",
  sayHi: function() {
    return `Hi, my name is ${this.name}`;
  }
};

name = "jenny";
var sayHi = person.sayHi;

console.log(sayHi()); // 'Hi my name is jenny'
console.log(person.sayHi()); // 'Hi my name is john'

// Methods are properties that point to functions

// Method-like syntax
var person = {
  name: "john",
  sayHi() {
    return `Hi, my name is ${this.name}`;
  }
};

person.sayHi(); // 'Hi my name is john'

// Functions as constructors with methods
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHi = function() {
  return `Hi, my name is ${this.name} and I'm ${this.age} yo.`;
};

var john = new Person("john", 21);
var jenny = new Person("jenny", 21);

Object.getOwnPropertyNames(john); // Person { sayHi: [Function] }
Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(john))); // null
john.toString(); // [object Object]
john.asdfasdf; // undefined
john.sayHi(); // 'Hi, my name is john and I'm 21 yo.'

// property resolution algorithm
// john.sayHi: [OwnProperties] -> [Prototype of john] -> [Person] -> [Protptype of Person] -> [Function] -> [Prototype of Function] -> [Object] -> [Prototype of Object] -> undefined

// Protype-based inheritance -> Self, Scheme, Lua
// Class-based inheritance -> C++/Java/PHP/Python
