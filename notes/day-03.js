// Inheritance (aka constructor.call)
function Person(name, age) {
  this.name = name;
  this.age = age;
}

var john = new Person("john", 21);
john; // Person { name: 'john', age: 21 }

// Inheritance: mechanism to share properties and behavior

// Duplication
function Student(name, age, enrollment) {
  this.name = name;
  this.age = age;
  this.enrollment = enrollment;
}

var jenny = new Student("jenny", 22, "CS101");
console.log(jenny);

// Student inherits from Person
function Student(name, age, enrollment) {
  // super()
  Person.call(this, name, age);
  this.enrollment = enrollment;
}

var jenny = new Student("jenny", 22, "CS101");
jenny; // Student { name: 'jenny', age: 22, enrollment: 'CS101' }

// Delegational inheritance
// Own Properties -> Protype -> Prototype -> Prototype
// John           -> Person  -> Function -> Object
john.name; // Own Properties
john.toString(); // Own Properties -> Person -> Function -> Object
john.toString = function() {};
// Own Properties = { name, age, toString }
// override

// Classes
// es6
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

// Inheritance with classes
class Student extends Person {
  constructor(name, age, enrollment) {
    super(name, age);
    this.enrollment = enrollment;
  }
}

var jenny = new Student("jenny", 21, "CS101");
jenny; // Student { name: 'jenny', age: 21, enrollment: 'CS101' }

// "OOP principles"
// Data Privacy
// Encapsulation
// Polimorphism
function Person(name, age) {
  this.name = name;
  this.age = age;
  Object.defineProperty(this, "_privateData", {
    value: 12,
    enumerable: false
  });
}

Person.prototype.sayHello = function() {
  return `Hi, my name is ${this.name}`;
};

var jenny = new Person("jenny", 21);
jenny._privateData; // 12
Object.getOwnPropertyNames(jenny); // [ 'name', 'age', '_privateData' ]
jenny.sayHello; // [Function]

// Object.setPrototypeOf
var jennyPerson = {
  name: "jenny",
  age: 22
};

var jennyStudent = {
  enrollment: "CS101"
};

Person.prototype.sayHello = function() {};

// OLOO
// Object Linked to Other Objects
Object.setPrototypeOf(jennyStudent, jennyPerson);
jennyStudent; // { enrollment: 'CS101' }
jennyStudent.name; // jenny
Object.getPrototypeOf(jennyStudent); // { name: 'jenny', age: 22 }

// __proto__, [[proto]], [[prototype]]
// deprecated
console.log(jennyStudent.__proto__);

// Object.create
var jennyPerson = {
  name: "jenny",
  age: 22
};

var jennyStudent = Object.create(jennyPerson);
jennyStudent.enrollment = "CS101";
jennyStudent; // { enrollment: 'CS101' }
Object.getPrototypeOf(jennyStudent); // { name: 'jenny', age: 22 }

// Concatenative inheritance (aka mixins)
var jennyPerson = {
  name: "jenny",
  age: 22
};

var jennyStudent = Object.assign({ enrollment: "CS101" }, jennyPerson);
jennyStudent; // { enrollment: 'CS102', name: 'jenny', age: 22 }

// es6 syntax
var jennyStudent = {
  ...jennyPerson,
  enrollment: "CS101"
};

// jennyStudent; // { name: 'jenny', age: 22, enrollment: 'CS101' }

// Functional mixins
function asPerson(target, name, age) {
  return {
    ...target,
    name: name,
    age: age
  };
}

function asStudent(target, enrollment) {
  return {
    ...target,
    enrollment: enrollment
  };
}

var jenny = asPerson({}, "jenny", 22);
var jennyStudent = asStudent(jenny, "CS101");
jennyStudent; // { name: 'jenny', age: 22, enrollment: 'CS101' }

// es6 syntax
const asPerson = (target, name, age) => ({
  ...target,
  name,
  age
});

const asStudent = (target, enrollment) => ({
  ...target,
  enrollment
});

// Lexical Scope
var data = 10;

function logData() {
  console.log(data);
}

logData(); // > 10

var data = 10;

// Closures

function logData() {
  function otherData() {
    console.log(data);
  }

  otherData();
}

logData(); // > 10

// Shadowing
// identifier resolution algorithm
// Diferent scopes, diferent variables
var data = 10;

function logData() {
  var data = 20;
  function otherData() {
    console.log(data);
  }

  otherData();
}

logData(); // > 20

// "OOP principles" with closures
// Factory function
function Person(name, age) {
  function sayHi() {
    return `Hi, my name is ${name}`;
  }

  return {
    sayHi: sayHi
  };
}

var jenny = Person("jenny", 22);
jenny; // { sayHi: [Function: sayHi] }
jenny._age; // undefined

// Immediately-Invoked Function Expression
// avoid populating the global state
(function() {
  data = 10;
  console.log("wut");
})();

// Pass variables to an iife
(function(value) {
  console.log("value:", value);
})(10);

// Module Pattern
var person = (function(name) {
  return {
    sayHi: function sayHi() {
      return `Hi, my name is ${name}`;
    }
  };
})(10);

person; // { sayHi: [Function: sayHi] }

// Module revealing pattern
var person = (function(name) {
  function sayHi() {
    return `Hi, my name is ${name}`;
  }

  return {
    sayHi
  };
})(10);

// Introduction to modules
var consoleLogger = (function() {
  function info(msg) {
    console.log(msg);
  }

  return {
    info
  };
})();

// Module composition
var register = (function(logger) {
  function doLogin(user, pass) {
    // some magic
    logger.info("Success!");
  }

  return {
    doLogin
  };
})(consoleLogger);

register.doLogin("asdf", "adsf"); // Success!
