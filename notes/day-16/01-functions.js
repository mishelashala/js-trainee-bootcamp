/**
 * BASIC CONCEPTS
 */

// function definition
function sayHi() {}

// function expresssion
var sayHello = function() {};

// lambda function
var greetings = () => {};

// arity: number of parameters
// arity: 1
var log = msg => {};

// arity: 2
var deliverMessage = (messenger, msg) => {};

// variadic functions/methods
// functions/methods with a dynamic arity
var deliverMessage = (messenger, ...args) => {
  var msg = args[0] || "<empty message>";
  messenger.deliver(msg);
};

deliverMessage({}); // '<empty message>'
deliverMessage({}, "custom message"); // 'custom message'

/**
 * ADVANCED CONCEPTS
 */
// function purity

var data = 10;

// impure function
var inc = num => {
  // side effect
  console.log("hello");
  return num + 1;
};

data = 11;

console.log(inc(10));

var data = 10;

// pure function
var inc = num => {
  // side effect
  return num + 1;
};

data = 11;

console.log(inc(10));

// replacement model
console.log(11);

/**
 * @param {int}
 * @return {int}
 */
// int increment(int number) {
//     return number + 1;
// }

// HM Type System
// Haskell Type System

// inc :: int -> int
// var inc = n => n + 1;

// lambda-calculus
// sum :: int -> int -> int
// var sum = a => b => a + b;

// async function
// readFile :: String -> (String -> Buffer) -> String
var readFile = filename => reader => {
  var data = reader(filename);
  return data.fromBufferToString();
};

/**
 * Function Composition
 */
// multiply :: Number -> Number -> Number
var multiply = a => b => a * b;

// dec :: Number -> Number
var dec = a => a - 1;

// // inc :: Number -> Number
var inc = a => a + 1;

// f º g º h
// h(g(f(x)))
console.log(inc(multiply(2)(inc(8))));

// compose2 :: (int -> int) -> (int -> int) -> int
const compose2 = f => g => x => {
  return g(f(x));
};

console.log(compose2(inc)(inc)(1));

const compose2 = (f, g) => x => {
  return g(f(x));
};

// compose2 :: [(int -> int), (int -> int)] -> int
console.log(compose2(inc, inc)(2));

/**
 * Partial Application
 */
var compose2 = (f, g, x) => {
  if (x === undefined) {
    return x2 => {
      return g(f(x2));
    };
  }

  return g(f(x));
};

console.log(compose2(inc, inc)(10));

/**
 * Currying
 */
compose2(inc)(inc)(10);

const compose = (...fns) => x => fns.reduceRight((y, fn) => fn(y), x);

console.log(
  compose(
    inc,
    inc,
    inc
  )(12)
);

/**
 * Every value must be produce from the result of
 * the execution of a function
 */
const data = {
  address: {
    number: "10",
    streetName: "Motul"
  },
  profile: {
    username: "mishelashala"
  }
};

console.log(data.address.streetName);

// isEmpty :: Null -> Boolean
var isEmpty = a => a === undefined || a === null;

var prop = key => obj => {
  if (isEmpty(obj)) {
    return null;
  }

  return isEmpty(obj[key]) ? null : obj[key];
};

// getAddress :: IUserData -> IAddress
var getAddress = prop("address");

// getStreetName :: IAddress -> String
var getStreetName = prop("streetName");

// getAddressStreetName :: IUserData -> String
var getAddressStreetName = compose(
  getStreetName,
  getAddress
);

console.log(getAddressStreetName(data));

/**
 * NULL POINTER EXCEPTIONS
 */

// upper :: String -> String
var upper = xs => (isEmpty(xs) ? null : xs.toUpperCase());

// defaultTo :: A -> B -> C
var defaultTo = a => b => (isEmpty(b) ? a : b);

var getUpperedUserName = compose(
  defaultTo("<ghost>"),
  upper,
  prop("username"),
  prop("profile")
);

console.log(getUpperedUserName(data));

class Just {
  constructor(value) {
    this.value = value;
  }

  static of(x) {
    return new Just(x);
  }

  join() {
    return this.value;
  }

  // map :: (a -> b) -> Just b
  map(fn) {
    return new Just(fn(this.value));
  }
}

var twice = compose(
  inc,
  inc
);

var ofJust = x => Just.of(x);

var mapj = f => xs => {
  return xs.map(f);
};

var joinj = xs => xs.join();

var tap = x => {
  console.log(x);
  return x;
};

var plusTwo = compose(
  joinj,
  mapj(inc),
  mapj(inc),
  ofJust
);

var result = new Just(10).map(inc).map(inc);
var result2 = Just.of(10)
  .map(twice)
  .join();

console.log(result);
console.log(plusTwo(2));

/**
 * Maybe Monad
 */
class Maybe {
  constructor(value) {
    this.value = value;
  }

  static of(x) {
    return new Maybe(x);
  }

  map(f) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.value));
  }

  join() {
    return this.value;
  }

  isNothing() {
    return this.value === undefined || this.value === null;
  }
}

var prop = key => obj => obj[key];

var maybeOf = x => Maybe.of(x);

var mapMaybe = f => xs => xs.map(f);

var joinMaybe = xs => xs.join();

var maybe = defaultValue => xs => (xs.isNothing() ? defaultValue : xs.join());

var getUsernameSafely = compose(
  maybe("<ghost>"),
  mapMaybe(prop("username")),
  mapMaybe(prop("profile")),
  maybeOf
);

var result = getUsernameSafely({
  profile: {
    username: "mishelashala"
  }
});

console.log(result);
