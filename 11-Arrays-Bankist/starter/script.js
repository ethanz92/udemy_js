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
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  //有点像textContent，这里是把默认值去掉，用array里的真实值来替代（下面的forEach）

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements; //slice做一个copy，因为有chain所以不用...

  movs.forEach(function (mov, i) {
    //mov is element we are looping over
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
    //ATTNMDN看这个函数的指令，比如beforeend顺序就会全部倒过来
  });
};
displayMovements(account1.movements);

// console.log(containerMovements.innerHTML);
//concole里可以看到上面代码生成的HTML块

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1; //bank rule: only pay interest that is >= 1EUR
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};
// calcDisplaySummary(account1.movements);

//SECTION ATTN Computing username

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner //在每个account object里添加username property
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);
// console.log(accounts);

const updateUI = function (acc) {
  //Display movements
  displayMovements(acc.movements);

  //Display balance
  calcDisplayBalance(acc);

  //Display summary
  calcDisplaySummary(acc);
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

// calcDisplayBalance(account1.movements);

// SECTION Implement login: Event handler
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  //prevent form from submitting:
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //?先确定账号存在
    //Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = ''; //从右到左
    inputLoginPin.blur(); //去掉光标

    // Update UI
    updateUI(currentAccount);
  }
});

// SECTION Implement transfer
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); //ATTN 避免自动刷新
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = ''; //去掉输入框中内容

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username //'?'判断了receiver是否存在
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

// SECTION Request Loan: Using some/every
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = ''; //去掉输入框中内容
});

// SECTION ATTN Close account: findIndex Method
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    //Delete account
    accounts.splice(index, 1); //从accounts array中去掉index位置元素

    //Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = ''; //去掉输入框中内容
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

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
//CHAP DATA TRANSFORMATION METHODS
/*
// SECTION Map Method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

//ATTN 跟forEach一样需要一个call back function
const movementsUSD = movements.map(function (mov) {
  return mov * eurToUsd;
});
console.log(movements);
console.log(movementsUSD);

//也可以用箭头函数写，不过readability可能会低一些
const movementsUSDarr = movements.map(mov => mov * eurToUsd);
console.log(movementsUSDarr);

// for loop same effect:
const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);

//ATTN map比起来更倾向于modern js的方向，也就是functional programming
//ATTN map和forEach一样有index操作：
const movementsDescriptions = movements.map((mov, i) => {
  if (mov > 0) {
    return `Movement ${i + 1}: You deposited ${mov}`;
  } else {
    return `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`;
  }
});
console.log(movementsDescriptions);
*/
/*
//SECTION Filter Method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const deposits = movements.filter(function (mov) {
  return mov > 0; //filter条件
});
console.log(movements);
console.log(deposits); //[200, 450, 3000, 70, 1300]

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);
//ATTN 和map一样，filter比起来更倾向于modern js的方向，也就是functional programming

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);
*/
/*
//SECTION Reduce Method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log(movements);

//ATTN reduce有点不一样的是，callback fc第一个parameter是accumulator(像一个snowball)
const balance = movements.reduce(function (acc, cur, i, arr) {
  console.log(`Iteration ${i}: ${acc}`);
  return acc + cur;
}, 0); //ATTN reduce还有第二个parameter是acc的起始值，如果是0可以不写
console.log(balance); //3840

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2); //3840

//ATTN Maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max); //3000
*/
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
/*
console.log(movements);
const eurToUsd = 1.1;

// SECTION PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  // .map(mov => mov * eurToUsd)
  .map((mov, i, arr) => {
    // console.log(arr); //map的arr可以用来实时展示和check arr
    return mov * eurToUsd;
  })
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);

// SECTION ATTN Find method

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
*/
/*
// SECTION ATTN Some and Every
console.log(movements);

//EQUALITY
console.log(movements.includes(-130));

//SOME: CONDITION
console.log(movements.some(mov => mov === -130)); //=includes()
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits); //true (have some mov > 0)

//EVERY
console.log(movements.every(mov => mov > 0)); //所有都是deposit？false
console.log(account4.movements.every(mov => mov > 0)); //true, acc4只有存款

//Seperate Callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

// SECTION ATTN Flat and FlatMap
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); //[1, 2, 3, 4, 5, 6, 7, 8]
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat()); //[Array(2), 3, 4, Array(2), 7, 8]
console.log(arrDeep.flat(2)); //[1, 2, 3, 4, 5, 6, 7, 8] 深度参数

// flat
const overallBalance = accounts
.map(acc => acc.movements)
.flat()
.reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

// flatMap
const overallBalance2 = accounts
.flatMap(acc => acc.movements) //only go one level deep
.reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance2); //same result
*/
/*
// SECTION ATTN Sorting arrays
// Strings
const owners = ['jonas', 'zach', 'adam', 'martha'];
console.log(owners.sort()); //sort by default work on strings

// Numbers
console.log(movements);
//console.log(movements.sort()); //[-130, -400, -650, 1300, 200, 3000, 450, 70]不work，这里default是把他们当成了strings排序
//return < 0, a, b
//return > 0, b, a (switch order)

//Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
movements.sort((a, b) => a - b); //这样更简单，只要结果是正数就会调换位置
console.log(movements); //already mutated

//Descending
movements.sort((a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
});
console.log(movements);

//implementing sorting balances (refer const displayMovements)
*/
/*
// SECTION More ways to create and filling arrays
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

const x = new Array(7);
console.log(x); //[empty × 7] (=python [] * 7)
console.log(x.map(() => 5)); //[empty × 7] map doesn't work

// Empty arrays + Fill method
// x.fill(1);  //[1, 1, 1, 1, 1, 1, 1]
// x.fill(1, 3); //[empty × 3, 1, 1, 1, 1]
x.fill(1, 3, 5); //[empty × 3, 1, 1, empty × 2]
console.log(x);

arr.fill(23, 4, 6);
console.log(arr); //[1, 2, 3, 4, 23, 23, 7]

// Array.from
const y = Array.from({ length: 7 }, () => 1); //Array这里是函数（同new Array)
console.log(y); //[1, 1, 1, 1, 1, 1, 1]

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z); //[1, 2, 3, 4, 5, 6, 7]

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'), el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);
  // const movementsUI2 = [...document.querySelectorAll('.movements__value')]; //方法2，不推荐
});
*/

/// CHAP Array methods practice
/*
// 1. 加总所有账户的所有交易
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);

console.log(bankDepositSum);

// 2. 超过1000的数目
//method 1
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

//method 2
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
// .reduce((count, cur) => (cur >= 1000 ? count ++ : count), 0);
// ++不行，虽然++会加一，但是return的是old value
// .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
// 这样就可以

console.log(numDeposits1000);

//ATTN ++
let a = 10;
console.log(a++); //10
console.log(a); //11
console.log(++a); //12

// 3.
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur); //ATTN
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur; //等价于 ATTN
      return sums; //ATTN
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(deposits, withdrawals);

// 4.
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalise = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalise(word)))
    .join(' ');
  return capitalise(titleCase);
};
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
*/

/// CHAP Challenges
///////////////////////////////////////
// SECTION Coding Challenge #1

// Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

// Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

// 1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
// 2. Create an array with both Julia's (corrected) and Kate's data
// 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
// 4. Run the function for both test datasets

// HINT: Use tools from all lectures in this section so far 😉

// TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

// GOOD LUCK 😀
/* 
//SECTION SELF ATTEMPT
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = [...dogsJulia].slice(1, -2);
  const dogsAll = dogsJuliaCorrected.concat(dogsKate);
  dogsAll.forEach(function (age, i, arr) {
    const alterText =
      age < 3 ? 'still a puppy 🐶' : `an adult, and is ${age} years old`;
    console.log(`Dog ${i + 1} is ${alterText}`);
  });
};
console.log('---TEST DATA 1---');
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
console.log('---TEST DATA 2---');
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
*/

///////////////////////////////////////
// SECTION Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
//SECTION SELF ATTEMPT
const calcAverageHumanAge = function (ages) {
  const humanAge = ages.map(dogAge =>
    dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4
  );
  const humanAgeFiltered = humanAge.filter(age => age >= 18);
  const averageHumanAge = humanAgeFiltered.reduce((acc, age) => acc + age, 0) / humanAgeFiltered.length;
  console.log(`The average human age of the dogs is ${averageHumanAge}.`);
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
*/
///////////////////////////////////////
// SECTION Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const calcAverageHumanAge2 = ages =>
  ages
    .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

const avg1 = calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);
*/

////////////////////////////////////////
// SECTION Coding Challenge #4
// Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
// Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
// Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

// TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
// 1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
dogs.forEach(dog => {
  dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
});
console.log(dogs);

// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓

const eating = function (dog) {
  console.log(
    `${
      dog.curFood > dog.recommendedFood
        ? 'Eating too much!'
        : 'Eating too little!'
    }`
  );
};

const findOwner = function (owner) {
  return dogs.filter(dog => dog.owners.includes(owner))[0];
};

const dogSarah = findOwner('Sarah');
console.log(dogSarah);
eating(dogSarah);

// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

// 5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
// 6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
// 8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

// HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
// HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.
