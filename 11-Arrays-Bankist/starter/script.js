'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//SECTION LECTURE 147 Project Start/////////////////////////
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  //有点像textContent，这里是把默认值去掉，用array里的真实值来替代（下面的forEach）

  movements.forEach(function (mov, i) {
    //mov is element we are looping over
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html); 
    //ATTNMDN看这个函数的指令，比如beforeend顺序就会全部倒过来
  });
};
displayMovements(account1.movements);

// console.log(containerMovements.innerHTML);
//concole里可以看到上面代码生成的HTML块

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
*/

/////////////////////////////////////////////////

//SECTION Array methods
/*
//SECTION Array Slice ATTN slice不改变原arr
let arr = ['a', 'b', 'c', 'd', 'e'];

console.log(arr.slice(2)); //['c', 'd', 'e']
console.log(arr.slice(2,4)); //['c', 'd']
console.log(arr.slice(-2)); //['d', 'e']
console.log(arr.slice(-1)); //['e']
console.log(arr.slice(1, -2)); //['b', 'c']
console.log(arr.slice()); //['a', 'b', 'c', 'd', 'e']
console.log([...arr]); //['a', 'b', 'c', 'd', 'e']

//SECTION Array Splice ATTN 区别：splice会delete splice过的部分
console.log(arr.splice(2)); //['c', 'd', 'e']
console.log(arr.splice(-1)); //['b']
console.log(arr); //['a']

arr = ['a', 'b', 'c', 'd', 'e'];
arr.splice(1, 2); //ATTN 这里的2是指切掉2个元素
console.log(arr); //['a', 'd', 'e'] 切掉了从1开始的2个元素

// SECTION Array Reverse ATTN reverse也会mutate原arr
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); //['f', 'g', 'h', 'i', 'j']
console.log(arr2); //['f', 'g', 'h', 'i', 'j']

// SECTION Array Concat ATTN 以下两种方式都不会mutate原arr
const letters = arr.concat(arr2);
console.log(letters); //['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
console.log([...arr, ...arr2]); //same result

// SECTION Array Join
console.log(letters.join('-')); //a-b-c-d-e-f-g-h-i-j

// SECTION At method
const arr = [23, 11, 64];
console.log(arr[0]); //23
console.log(arr.at(0)); //23

//getting last element
console.log(arr[arr.length - 1]); //64
console.log(arr.slice(-1)); //[64]
console.log(arr.slice(-1)[0]); //64
console.log(arr.at(-1)); //64
console.log(arr[-1]); //ATTN undefined!!!
//also works on string
console.log('jonas'.at(0)); //j
*/
/*
//SECTION forEach method
//for of:
//entries()拿到的是array的index和value的组合
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}
//forEach
console.log('---forEach---');

//ATTN 注意这里movement放在call back function的parameter里
//顺序很重要: element, index, array(if needed)
movements.forEach(function (mov, i, arr) { 
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});

//forEach on map
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

//forEach on set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _value, map) {
  console.log(`${_value}: ${value}`); //set doesn't have key/index
});
*/
