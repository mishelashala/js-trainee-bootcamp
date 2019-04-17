// FUNCTIONS AS CONSTRUCTORS

// Create a function called `Vehicle` that accepts
// a driver as an argument and assign the driver
// to the context and execute it as a constructor
function Vehicle(driver) {
  this.driver = driver;
}

var vehicle = new Vehicle("John"); /* = @TODO */

// Create a function called `Car` that accepts a driver,
// calls the function `Vehicle` with `call` and pass the
// driver and assign the speed in the context to 0
function Car(driver) {
  Prototype.call(this, driver);
  this.speed = 0;
}

var teslaS = new Car("John"); /* = @TODO */

// Add a function called `drive`, `stop` and `speed` to
// the `Car` prototype. Every time you call the
// `drive` "method" it sets the `speed` to `50`,
// every time you call the "method" `stop` it sets the
// speed to `0` and finally every time you call the
// "method" `getSpeed` it returns the speed
Car.prototype.stop = function() {
  this.speed = 0;
};

Car.prototype.drive = function() {
  this.speed = 50;
};

Car.prototype.getSpeed = function() {
  this.speed = 0;
};

var teslaS = new Car("John");
teslaS.getSpeed(); // 0
teslaS.drive();
teslaS.getSpeed(); // 50
teslaS.stop();
teslaS.getSpeed(); // 0

// CLASSES

// Create a class called `Vehicle` that accepts
// a driver as an argument on the constructor
//  and assign the driver to the context
class Vehicle {
  constructor(driver) {
    this.driver = driver;
  }
}

var vehicle = new Vehicle("John"); /* = @TODO */

// Create a class called `Car` that accepts a driver,
// extends the `Vehicle` class and passes the driver
// to the `Car` constructor driver and assign the
// speed in the context to 0
class Car extends Vehicle {
  constructor(driver) {
    super(driver);
    this.speed = 0;
  }
}

var teslaS = new Car("John");

// Add the methods `drive`, `stop` and `getSpeed` to
// the `Car` class. Every time you call the
// `drive` "method" it sets the `speed` to `50`,
// every time you call the "method" `stop` it sets the
// speed to `0` and finally every time you call the
// "method" `getSpeed` it returns the speed
class Car extends Vehicle {
  constructor(driver) {
    super(driver);
    this.speed = 0;
  }

  drive() {
    this.speed = 50;
  }

  stop() {
    this.speed = 0;
  }

  getSpeed() {
    return this.speed;
  }
}

var teslaS = new Car("John");
teslaS.speed(); // 0
teslaS.drive();
teslaS.speed(); // 50
teslaS.stop();
teslaS.speed(); // 0

//
// SET PROTOTYPE OF
//

// Replicate all the previous examples using
// plain objects and `Object.setPrototypeOf`
var vehicle = {
  driver: "John"
};

var car = {};
Object.setPrototypeOf(car, vehicle);
car.driver; // "John"
car.speed; // 0

//
// OBJECT CREATE
//

// Replicate all the previous examples using
// plain objects and `Object.create`
var vehicle = {
  driver: "John"
};

var car = Object.create(vehicle);
car.driver = "John";
car.speed = 0;

//
// MIXINS
//

// Replicate all the previous examples using
// plain objects and mixins
var vehicle = {
  driver: "John"
};

var car = {
  ...vehicle,
  speed: 0
};

car.driver; // 'John0
car.speed; // 0

//
// FUNCTIONAL MIXINS
//

// Replicate all the previous examples using
// plain objects and functional mixins
function asVehicle(target, driver) {
  return {
    ...target,
    driver
  };
}

function asCar(target) {
  var speed = 0;

  function getSpeed() {
    return speed;
  }

  function drive() {
    speed = 50;
  }

  function stop() {
    speed = 0;
  }

  return {
    ...target,
    speed: 0,
    getSpeed,
    drive,
    stop
  };
}
