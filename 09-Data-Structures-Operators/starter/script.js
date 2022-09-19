'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

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
