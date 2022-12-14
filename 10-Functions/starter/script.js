'use strict';

/*
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES5:
  //   numPassengers = numPassengers || 1; //falsy then 1
  //   price = price || 199; //falsy then 199

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123'); // {flightNum: 'LH123', numPassengers: undefined, price: undefined}
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);

createBooking('LH123', undefined, 1000);
*/
/*
const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 24739479284,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;
  if (passenger.passport === 24739479284) {
    alert('Checked in');
  } else {
    alert('Wrong passport!');
  }
};

// checkIn(flight, jonas);
// console.log(flight); //LH234
// console.log(jonas);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000000);
};

newPassport(jonas);
checkIn(flight, jonas);
*/
/*
// SECTION Higher-order function, first-class function
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
//Original string: JavaScript is the best!
//Transformed string: JAVASCRIPT is the best!
//Transformed by: upperFirstWord

transformer('JavaScript is the best!', oneWord);
//Original string: JavaScript is the best!
//Transformed string: javascriptisthebest!
//Transformed by: oneWord

// JS uses callbacks all the time
const high5 = function () {
  console.log('????');
};
document.body.addEventListener('click', high5);
['Jonas', 'Martha', 'Adam'].forEach(high5);
*/
/*
// SECTION Functions returning functions
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey'); //greeterHey?????????????????????function (name)
greeterHey('Jonas'); //Hey Jonas

greet('Hello')('Jonas'); //Hello Jonas

//???????????????????????????????????????
const greetArr = greeting => name => console.log(`${greeting} ${name}`);

greetArr('Hello')('Jonas'); //Hello Jonas
*/

/*
// SECTION The call, apply and bind methods

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function() {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};
//this??????lufthansa object

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book; //?????????lufthansa object???function

//book(23, 'Sarah Williams'); //TypeError: book????????????????????????????????????this??????undefined
//????????????????????????
// ATTN CALL Method
book.call(eurowings, 23, 'Sarah Williams'); //?????????argument????????????js this?????????
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper'); //?????????????????????????????????????????????object???
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');
console.log(swiss);

// ATTN APPLY Method
const flightData = [583, 'George Cooper']; //????????????????????????array???apply
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData); //?????????????????????apply??????????????????

// ATTN BIND Method
// book.call(eurowings, 23, 'Sarah Williams');

const bookEW = book.bind(eurowings); //bind???????????????return??????????????????bind????????????object
const bookLX = book.bind(swiss);
const bookLH = book.bind(lufthansa);
bookEW(23, 'Steven Williams');

const bookEW23 = book.bind(eurowings, 23); //book?????????argument???(flightNum, name)????????????????????????flightNum???????????? ATTN partial application
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');

// with Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

// lufthansa.buyPlane(); //301
// ATTN
// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);
//this????????????buy??????button??????????????????work
//addEventListener???????????????this??????????????????handler apply?????????????????????.buy??????button???

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
//??????this???bind??????lufthansa????????????work???

// Partial application

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200)); //220
// ATTN
const addVAT = addTax.bind(null, 0.23); //this: null, rate preset to 0.23
//addVAT = value => value + value * 0.23;

console.log(addVAT(100)); //123
//?????????preset???argument??????????????????????????????work

// Challenge - ??????????????????????????????
const addTaxRate = function(rate) {
  return function(value) {
    return value + value * rate;
  }
}

const addVAT2 = addTaxRate(0.23)
console.log(addVAT2(100)); //123

console.log(addTaxRate(0.23)(100)); //123
*/
/*
//SECTION Immediately Invoked Function Expression
const runOnce = function () {
  console.log('This will never run again');
};
runOnce();

//IIFE
(function () {
  console.log('This will never run again');
  const isPrivate = 23;
})(); //???function??????()???????????????statement??????????????????()???call??????function

// console.log(isPrivate); //scope chain???global????????????function scope??????variable

(() => console.log('This will ALSO never run again'))(); //???????????????IIFE

{
  // const isPrivate = 23;
  var notPrivate = 46;
}
// console.log(isPrivate); //cannot access in the block
console.log(notPrivate); //46

//modern js can just use {} block to make information private
*/
/*
// SECTION ATTN Closures
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

// ATTN A function has access to the variable environment (VE) of the execution context in which it was created. 
// ATTN Closure: VE attached to the function, exactly as it was at the time and place the function was created.
// ATTN We cannot access closed-over variables explicitly. A closure is NOT a tangible JavaScript object.

console.dir(booker); //f anonymous() -> [[Scopes]] -> Closure ([[]] means internal properties that cannot be accessed by code)
*/

let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

g();
f(); //46 //closure exists even if f was defined outside g block, the value of f was assigned inside the g block so closure exists for variable a. (a variable is inside the backpack of f function)

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();

// ATTN Re-assigning f function
h(); //46
f(); //1554 (b variable is inside the backpack of f function)
console.dir(f); //a is no longer in the backpack of f (old closure disappears)

//Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000); //execute function after wait * 1000ms (=1s)
  //closure worked here, ?????????????????????boardPassengers()??????????????????call stack????????????closure?????????????????????function??????access n???perGroup???????????????
  //closure???scope chain?????????global????????????perGroup???1000????????????????????????????????????60

  console.log(`Will start boarding in ${wait} seconds`); //will not wait
};

const perGroup = 1000;
boardPassengers(180, 3);
