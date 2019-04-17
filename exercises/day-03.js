// FUNCTIONS AS CONSTRUCTORS

// Create a function called `Vehicle` that accepts
// a driver as an argument and assign the driver
// to the context and execute it as a constructor
function Vehicle() {
  // @todo
}

var vehicle; /* = @TODO */

// Create a function called `Car` that accepts a driver,
// calls the function `Vehicle` with `call` and pass the
// driver and assign the speed in the context to 0
function Car() {
  // @TODO
}

var teslaS; /* = @TODO */

// Add a function called `drive`, `stop` and `speed` to
// the `Car` prototype. Every time you call the
// `drive` "method" it sets the `speed` to `50`,
// every time you call the "method" `stop` it sets the
// speed to `0` and finally every time you call the
// "method" `getSpeed` it returns the speed
Car.prototype.stop = function() {
  // @TODO
};

Car.prototype.drive = function() {
  // @TODO
};

Car.prototype.speed = function() {
  // @TODO
};

// CLASSES

// Create a class called `Vehicle` that accepts
// a driver as an argument on the constructor
//  and assign the driver to the context
class Vehicle {
  constructor(/* @TODO */) {
    // @todo
  }
}

var vehicle; /* = @TODO */

// Create a class called `Car` that accepts a driver,
// extends the `Vehicle` class and passes the driver
// to the `Car` constructor driver and assign the
// speed in the context to 0
class Car /* @TODO */ {
  constructor(/* @TODO */) {
    // @TODO
  }
}

var teslaS; /* = @TODO */

// Add the methods `drive`, `stop` and `getSpeed` to
// the `Car` class. Every time you call the
// `drive` "method" it sets the `speed` to `50`,
// every time you call the "method" `stop` it sets the
// speed to `0` and finally every time you call the
// "method" `getSpeed` it returns the speed
class Car /* @TODO */ {
  // the rest of the code

  drive() {
    // @TODO
  }

  stop() {
    // @TODO
  }

  speed() {
    // @TODO
  }
}

//
// SET PROTOTYPE OF
//

// Replicate all the previous examples using
// plain objects and `Object.setPrototypeOf`

//
// OBJECT CREATE
//

// Replicate all the previous examples using
// plain objects and `Object.create`

//
// MIXINS
//

// Replicate all the previous examples using
// plain objects and mixins

//
// FUNCTIONAL MIXINS
//

// Replicate all the previous examples using
// plain objects and functional mixins
