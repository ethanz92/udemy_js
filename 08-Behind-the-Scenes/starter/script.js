'use strict';
/*
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName}, You are ${age}, born in ${birthYear}`;
    console.log(output); //ATTN firstName is from global: jonas

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;

      //creating new variable with same name as outer scope's variable
      const firstName = 'Steven'; //ATTN firstName is from local block: steven

      // reassigning outer scope's variable
      output = 'NEW OUTPUT!'; //output will be shown as new output

      const str = `Oh, and you are a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }
    // console.log(str); ATTN const/let block scoped
    // console.log(millenial); ATTN var function scoped
    // add(2, 3); function is block scoped in strict mode
    console.log(output);
  }
  printAge();

  return age;
}

//SECTION hoisting and TDZ

const firstName = 'Jonas';
calcAge(1991);
// console.log(age);
// printAge();

console.log(me); //no error msg, showing 'undefined'
// console.log(job); //ReferenceError: cannot access before initialisation
// console.log(year); //ReferenceError: cannot access before initialisation

var me = 'jonas';
let job = 'teacher';
const year = 1991;

console.log(addDecl(2, 3)); //showing 5 (hoisted)
// console.log(addExpr(2,3)); //ReferenceError: cannot access before initialisation
// console.log(addArrow(2, 3)); //TypeError: because defined using var, it's undefined, therefore addArrow is not a function

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;

// Example

if (!numProducts) deleteShoppingCart(); //because var, here will be undefined, so it will trigger the function, even if here we say num is 10!

var numProducts = 10;

function deleteShoppingCart() {
  console.log('All products deleted!');
}

var x = 1;
let y = 2;
const z = 3;
// in console, look up window object, you can only find x: 1 property (due to var)

console.log(x === window.x); //true
console.log(y === window.y); //false
console.log(z === window.z); //false

*/

//SECTION This keyword
/*
console.log(this); //showing window

const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this); //strict mode: undefined. sloppy mode: window
};
calcAge(1991);

const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  console.log(this); //arrow function does not have this keyword defined, so it uses its lexical 'this' (from surrounding environment), which is window.
};
calcAgeArrow(1980);

const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },
};
jonas.calcAge(); //this is jonas object, console prints: {year: 1991, calcAge: ƒ}

const matilda = {
  year: 2017,
};

matilda.calcAge = jonas.calcAge; //copy calcAge() to matilda (method borrowing)

matilda.calcAge(); //this is pointing to matilda, because it's matilda who's calling the method.

const f = jonas.calcAge;
f(); //TypeError: f is now a regular function call and does not have object, year is not defined
*/

// SECTION Reg function vs arrow function
/*
var firstName = 'Matilda';

const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
    */
/* //solution 1:
    const self = this; //self or that to work around (pre-ES6 solution)
    const isMillenial = function () {
      console.log(self.year >= 1981 && self.year <= 1996);
      //console.log(this.year >= 1981 && this.year <= 1996);
      //this will not work, because the next line is a simple function call (even if it's inside a method) and the rule (refer slides) says simple function has this set to undefined
    };
*/
/*
    //solution 2 (ES6):
    const isMillenial = () => {
      console.log(this.year >= 1981 && this.year <= 1996);
      //this will work, because this is an arrow function, and this keyword uses this from its parent scope (this = object jonas)
    };
    isMillenial();
  },

  greet: () => {
    console.log(this); //window
    console.log(`Hey ${this.firstName}`);
  },
};
jonas.greet(); //'Hey Matilda'
//arrow function does not have firstName defined, so it goes to global (window) to look for firstName, which is then Matilda. this.firstName is then window.firstName.
//This is why we don't use var, because var creates firstName in window properties, and then got picked up by the arrow function.
//We should not use arrow functions as methods in an object for the above reasons.
jonas.calcAge();

//arguments keyword
const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr(2, 5); //return an array [2, 5]
addExpr(2, 5, 8, 12); //return an array [2, 5, 8, 12] even though 8, 12 won't be used

var addArrow = (a, b) => {
  console.log(arguments); //won't work in arrow functions - arguments not defined
  return a + b;
};
addArrow(2, 5, 8);
*/

//SECTION Primitives vs objects

let age = 30;
let oldAge = age;
age = 31;
console.log(age); //31
console.log(oldAge); //30

//however!

const me = {
  name: 'Jonas',
  age: 30,
};
const friend = me;
friend.age = 27;
console.log('Friend:', friend); //age 27
console.log('Me:', me); //age 27
