'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekdays[3]]: {
    //ES6 enhanced object literals enables computing property names
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  // openingHours: openingHours, //before ES6
  openingHours, //ES6 Enhanced Object Literals, need to use same name as the variable outside the object

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // Destructuring right in the method
  orderDelivery: function ({
    starterIndex = 1, //giving default values
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

// SECTION Working with Strings -
const airline = 'TAP Air Portugal';

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix capitalisation in name:
const passenger = 'jOnAS'; // ->Jonas?
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect); //Jonas

// Check email
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';

const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail); //hello@jonas.io

//可以写成一行，因为上面的method会return string
const normalisedEmail = loginEmail.toLowerCase().trim()
console.log(normalisedEmail);
console.log(email === normalisedEmail);
// ATTN there are also trimstart and trimend methods

// Replacing
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS); //288.97$

const announcement = 'All passengers come to boarding door 23. Boarding door 23!'

console.log(announcement.replace('door', 'gate')); //only replacing first occurence

console.log(announcement.replaceAll('door', 'gate')); //newly available

/*
// SECTION Working with Strings - index, slicing
const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]); //B
console.log(airline.length);
console.log('B737'.length);

console.log(airline.indexOf('r')); //6 - only first occurence
console.log(airline.lastIndexOf('r')); //10 - only last occurence
console.log(airline.indexOf('Portugal')); //8 - CASE sensitive //cannot find: -1

// Slicing
console.log(airline.slice(4)); //Air Portugal
console.log(airline.slice(4, 7)); //Air 左闭右开

console.log(airline.slice(0, airline.indexOf(' '))); //TAP
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); //Portugal

console.log(airline.slice(-2)); //al
console.log(airline.slice(1, -1)); //AP Air Portuga

const checkMiddleSeat = function (seat) {
  //B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log('You got the middle seat');
  else console.log('You got lucky');
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

console.log(new String('jonas')); 
console.log(typeof new String('jonas')); //object
console.log(typeof new String('jonas').slice(1)); //string
*/

/*
// SECTION Map iteration
// ATTN 除了set() method，还可以这样构建map：
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
]);
console.log(question);

// ATTN Convert object to map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// Quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}
// const answer = Number(prompt('Your answer'));
const answer = 3;
console.log(answer);

console.log(question.get(answer === question.get('correct')));

// Convert map to array
console.log([...question]);
// console.log(question.entries());
console.log([...question.keys()]);
console.log([...question.values()]);
*/

/*
// SECTION Map
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal')); //set() will actually return the Map
ATTN
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :('); //can chain the set() method

console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

console.log(rest.has('categories'));
rest.delete(2); //take key to delete
// rest.clear(); //clear all
rest.set([1, 2], 'Test');
console.log(rest);
console.log(rest.size); //7

console.log(rest.get([1, 2])); //undefined, because this array and the array as key are not the same object

const arr = [1, 2];
rest.set(arr, 'Test');
console.log(rest.get(arr)); //now this works

rest.set(document.querySelector('h1'), 'Heading'); //the object can be the key
*/
/*
// SECTION Set
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pizza',
  'Pasta',
]);
console.log(ordersSet); //去重

console.log(new Set('Jonas'));

console.log(ordersSet.size); //3 size v.s. length for array
console.log(ordersSet.has('Pizza')); //true - has() v.s. includes() for array
console.log(ordersSet.has('Bread')); //false
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread'); //ignore
ordersSet.delete('Risotto');
console.log(ordersSet); //no way to get data out from set, no order

for (const order of ordersSet) console.log(order);

//Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)]; //...unpacks set and put into array
console.log(staffUnique);
console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
);

console.log(new Set('jonasschmedtmann').size);
*/
/*
// SECTION Looping objects
//Property names (KEYS)
const properties = Object.keys(openingHours);
console.log(properties); //return array

let openStr = `We are open on ${properties.length} days: `;
for (const day of Object.keys(openingHours)) {
  openStr += `${day}, `;
}
console.log(openStr);

//Property VALUES
const values = Object.values(openingHours);
console.log(values);

//Entire object //注意和array loop区别！
const entries = Object.entries(openingHours);
// console.log(entries);

for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}
*/
/*
// SECTION optional chaining ?
if (restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open);
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);
//这样做如果nest很深会非常麻烦，ES6提供optional chain来解决：
console.log(restaurant.openingHours.mon?.open); //.mon exist then .open, otherwise, undefined
console.log(restaurant.openingHours?.mon?.open); //.openingHours exist and .mon exist then .open, otherwise undefined

//Example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed'; //sat是0点所以不要用||
  console.log(`On ${day}, we open at ${open}`);
}

// Methods
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist'); //(0,1) passed to order function
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// Arrays
const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];

console.log(users[0]?.name ?? 'user array empty'); //jonas: users[0] exists so return name

//相比起来if就复杂很多：
if (users.length > 0) console.log(users[0].name);
else console.log('user array empty');
*/

// SECTION Enhanced object literals see const openingHours

/*
// SECTION Looping through arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) console.log(item);

console.log(...menu.entries()); //generates arrays of [index, item] (像enumerate)

// for (const item of menu.entries()) {
//   console.log(`${item[0] + 1}: ${item[1]}`);
// }
//等价于：
for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}
*/

/*
// SECTION ATTN Logical assignment operators
const rest1 = {
  name: 'Capri',
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// OR Assignment Operator
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

//等价于：
// rest1.numGuests ||= 10; // if first value falsy, then assign second value
// rest2.numGuests ||= 10;

// Nullish assignment operator
rest1.numGuests ??= 10; // if first value falsy, then assign second value
rest2.numGuests ??= 10;

// rest1.owner = rest1.owner && '<ANONYMOUS>'; //undefined, first value is falsy short-circuiting
// rest2.owner = rest2.owner && '<ANONYMOUS>'; //<ANONYMOUS>

rest1.owner &&= '<ANONYMOUS>'; //no undefined (only assign if currently truthy)
rest2.owner &&= '<ANONYMOUS>'; //truthy, so assign

console.log(rest1); //||=shows 10, ??= shows 0, as 0 is falsy but not nullish
console.log(rest2); //10
*/

/*
// SECTION ATTN NULLISH Operator
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests); //10, as 0 is falsy

// Nullish: null and undefined (NOT 0 or '')
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect); //0, as 0 here is not nullish
*/

/*
// SECTION ATTN OR AND Operators

console.log('------OR------');
// Use ANY data type, return ANY data type, short-circuiting
console.log(3 || 'Jonas'); // 3 (3 is truthy value, the second value won't even be evaluated)
console.log('' || 'jonas'); // jonas (first value is not truthy)
console.log(true || 0); // true
console.log(undefined || null); // null (undefined and null are both falsy, will return null)

console.log(undefined || 0 || '' || 'Hello' || 23 || null); //Hello, it's the first truthy value in the OR chain

const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1); //10, numGuests 不存在，所以取10 [Won't work if num = 0!]

const guests2 = restaurant.numGuests || 10;
console.log(guests2); //10, first value is undefined [Won't work if num = 0!]

console.log('------AND------');
console.log(0 && 'Jonas'); //0, 0 is falsy, immediate return (short-circuiting)
console.log(7 && 'Jonas'); //Jonas, both truthy, return last value
console.log('hello' && 23 && null && 'jonas'); //null, first falsy value

//Practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}
//same effect:
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');
*/

/*
// SECTION ATTN Rest pattern: opposite of Spread, take values and pack into array
// 1. Destructuring
// SPREAD, because on RIGHT side of =
const arr = [1, 2, ...[3, 4]];

// REST, because on LEFT side of =
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others); // 1 2 [3, 4, 5]

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood); // Pizza Risotto ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'] //DOES NOT include Pasta because it skipped!!!

// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays); //{thu: {…}, fri: {…}}

// 2. Functions
const add = function (...numbers) {
  //can accept any number of parameters
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
};
add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x = [23, 5, 7];
add(...x); //35

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms'); //mushrooms, []
*/

/*
// SECTION ATTN Spread operator ...
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr); //[1,2,7,8,9]

const newArr = [1, 2, ...arr];
console.log(newArr); //[1,2,7,8,9] 相当于直接把arr的元素加到后面（注意区别[1,2,arr]）

console.log(...newArr); //1,2,7,8,9 直接写出newArr中的元素，不再是数组，而是元素逐一列出

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// Copy array
const mainMenuCopy = [...restaurant.mainMenu]; //shallow copy

// Join 2 arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

// Iterables: arrays, strings, maps, sets. NOT objects
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters); //['J', 'o', 'n', 'a', 's', ' ', 'S.']
console.log(...str); // J o n a s
// console.log(`${...str}`); //SyntaxError 因为...str返回的是逗号隔开的一系列值

// Real-world example
// const ingredients = [prompt("Let's make pasta! Ingredient 1?"),
// prompt('Ingredient 2?'),
// prompt('Ingredient 3?'),];
// console.log(ingredients);

// restaurant.orderPasta(...ingredients); //这样可以快速取出array的三个值然后装进method as arguments

// Objects
const newRestaurant = {foundedIn: 1998, ...restaurant, founder: 'Guiseppe'};
console.log(newRestaurant);

const restaurantCopy = {...restaurant};  //making a new COPY
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);  //Ristorante Roma
console.log(restaurant.name);  //Classico Italiano
*/
/*
// SECTION ATTN Destructuring Objects
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 1,
});

const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// Default values
const { menu = [], starterMenu: starters = [] } = restaurant; //giving default values
console.log(menu, starters); //[], and the starterMenu values

// Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

({ a, b } = obj); //如果{开头}js会以为是block，所以放在括号里解决这个问题
console.log(a, b); //23, 7

// Nested objects
const { fri } = openingHours;
console.log(fri); //{open: 11, close: 23}

const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c); // 11, 23
*/

/*
// SECTION Destructuring Arrays
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr; //declaring individual value of x, y and z
console.log(x, y, z);
console.log(arr);

let [main, , secondary] = restaurant.categories;
//not required to take ALL elements in array
console.log(main, secondary);
// second will be Vegetarian, we skipped the second element in the array in the above line

// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary); //交换

//交换方法二
[main, secondary] = [secondary, main];
console.log(main, secondary);

console.log(restaurant.order(2, 0));

//receive 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

//Nested destructuring
const nested = [2, 4, [5, 6]];
// const [i, ,j] = nested;
// console.log(i, j); //2, [5, 6]
const [i, , [j, k]] = nested;
console.log(i, j, k); //2, 5, 6

//Default values
// const [p, q, r] = [8, 9];
// console.log(p, q, r); //8, 9, undefined
const [p=1, q=1, r=1] = [8, 9];
console.log(p, q, r); //8, 9, 1
*/
