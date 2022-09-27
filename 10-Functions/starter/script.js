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
  console.log('👋');
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

const greeterHey = greet('Hey'); //greeterHey实际上就是一个function (name)
greeterHey('Jonas'); //Hey Jonas

greet('Hello')('Jonas'); //Hello Jonas

//以上也可以用箭头函数写出来
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
//this指向lufthansa object

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book; //直接从lufthansa object拿function

//book(23, 'Sarah Williams'); //TypeError: book现在是普通函数，普通函数this指向undefined
//解决方法有三种：
// ATTN CALL Method
book.call(eurowings, 23, 'Sarah Williams'); //第一个argument就是告诉js this指向谁
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper'); //因为是普通函数，所以能用在任意object上
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');
console.log(swiss);

// ATTN APPLY Method
const flightData = [583, 'George Cooper']; //区别就是要有一个array给apply
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData); //同样效果，所以apply现在不怎么用

// ATTN BIND Method
// book.call(eurowings, 23, 'Sarah Williams');

const bookEW = book.bind(eurowings); //bind做的事就是return一个函数永远bind给指明的object
const bookLX = book.bind(swiss);
const bookLH = book.bind(lufthansa);
bookEW(23, 'Steven Williams');

const bookEW23 = book.bind(eurowings, 23); //book函数的argument是(flightNum, name)，这里提前设置好flightNum，这叫做 ATTN partial application
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
//this返回的是buy那个button元素，函数不work
//addEventListener的函数中的this永远指向这个handler apply的元素（也就是.buy那个button）

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
//现在this就bind去了lufthansa，按键也work了

// Partial application

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200)); //220
// ATTN
const addVAT = addTax.bind(null, 0.23); //this: null, rate preset to 0.23
//addVAT = value => value + value * 0.23;

console.log(addVAT(100)); //123
//注意要preset的argument一定要放第一个不然不work

// Challenge - 把上面的写成嵌套函数
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
})(); //把function装进()里当成一个statement，然后后面的()是call这个function

// console.log(isPrivate); //scope chain：global无法抓取function scope里的variable

(() => console.log('This will ALSO never run again'))(); //箭头函数的IIFE

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
  //closure worked here, 下一行先运行，boardPassengers()理应已经移出call stack，但因为closure的机制，延迟的function还能access n和perGroup两个变量。
  //closure比scope chain优先，global里定义了perGroup是1000，但是最后执行用的依然是60

  console.log(`Will start boarding in ${wait} seconds`); //will not wait
};

const perGroup = 1000;
boardPassengers(180, 3);
