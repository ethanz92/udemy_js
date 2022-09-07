'use strict'; //create visable error flags, needs to be first line
/*
let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriverLicense = true;
if (hasDriversLicense) console.log('I can drive :D'); //without strict mode, no error msg will show up (misspelling hasDriverLicense in the above line)
*/
// const interface = 'Audio';
// const private = 534; strict mode will show error msg on using reserved key words

/*
function logger() {
    console.log('My name is Jonas');
}

// calling / running / invoking function:
logger();

function cutFruitPieces(fruit) {
    return fruit * 4;
}

// function declarations:
function fruitProcessor(apples, oranges) {
    const applePieces = cutFruitPieces(apples);
    const orangePieces = cutFruitPieces(oranges);
    const juice = `Juice with ${applePieces} apples and ${orangePieces} oranges.`;
    return juice;
}

console.log(fruitProcessor(2, 3));

// TODO: types of functions:
// function declaration
function calcAge1(birthYear) {
    return 2022 - birthYear;
}

const age1 = calcAge1(1992);

// function expression
const calcAge2 = function (birthYear) {
    return 2022 - birthYear
}

const age2 = calcAge2(1992);

console.log(age1, age2);

// arrow functions
const calcAge3 = birthYear => 2022 - birthYear; //one-line can ommit 'return'
const age3 = calcAge3(1992);
console.log(age3);


const yearsUntilRetirement = (birthYear, firstName) => {
    const age = 2022 - birthYear;
    const retirement = 65 - age;
    // return retirement;
    if (retirement > 0) {
        console.log(`${firstName} retires in ${retirement} years`);
        return retirement;
    } else {
        console.log(`${firstName} has already retired 🎉`);
        return -1;
    }
}
console.log(yearsUntilRetirement(1992, 'Jonas'));
console.log(yearsUntilRetirement(1950, 'John'));
*/

// challenge #1
/*
const calcAverage = (score1, score2, score3) => (score1+score2+score3)/3

let avgDolphins = calcAverage(44, 23, 71)
console.log(avgDolphins);
let avgKoalas = calcAverage(65, 54, 49)
console.log(avgKoalas);

function checkWinner(avgDolphins, avgKoalas) {
    if (avgDolphins >= avgKoalas * 2) {
        console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`);
    } else if (avgKoalas >= avgDolphins * 2) {
        console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`);
    } else {
        console.log(`No one wins`);
    }
}

checkWinner(avgDolphins, avgKoalas)
*/

/*
const friends = ['Michael', 'Steven', 'Peter'];
console.log(friends);

const years = new Array(1991, 1992, 2008, 2020);

console.log(friends[0]);

console.log(friends.length);
console.log(friends[friends.length - 1]);

friends[2] = 'Jay';
console.log(friends);

const firstName = 'Jonas'
const jonas = [firstName, 'Schmedtmann', 2037 - 1991, 'teacher', friends];
console.log(jonas);
console.log(jonas.length);
*/

// TODO: basic Array methods
/*
const friends = ['Michael', 'Steven', 'Peter'];
const newLength = friends.push('Jay') //默认return新的长度
console.log(friends);
console.log(newLength);

friends.unshift('John'); //默认return新的长度
console.log(friends);

friends.pop();
const popped = friends.pop(); //默认return丢掉的元素（尾）
console.log(friends);
console.log(popped);

friends.shift();
console.log(friends); //默认return丢掉的元素（头）

console.log(friends.indexOf('Steven'));
console.log(friends.indexOf('Bob')); //没有，return -1

//includes: ES6 method
console.log(friends.includes('Steven')); //true
console.log(friends.includes('Bob')); //false

if (friends.includes('Steven')) {
    console.log('You have a friend called Steven');
}
*/
//coding challenge #2
/*
function calcTip(billVal) {
    if (billVal >= 50 && billVal <= 300) {
        return (0.15 * billVal);
    } else if (billVal < 0) {
        return (`bill value must be positive`);
    } else {
        return (0.20 * billVal);
    }
}

let tip = calcTip(100)
console.log(tip);
*/
/*
const calcTip = function(billVal) {
    return billVal >= 50 && billVal <= 300 ? billVal * 0.15 : billVal * 0.2;
}

const bills = [125, 555, 44]

const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])]
console.log(tips);
const total = [bills[0]+tips[0], bills[1]+tips[1], bills[2]+tips[2]]
console.log(total);
*/
/*
//////////////////////////////////
// TODO:objects
const jonas = {
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    // age: 2037 - 1991,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven'],
    birthYear: 1991,
    hasDriverLicense: true,

    // calcAge: function(birthYear) { //function attached to object is a method. use expression not declaration.
    //     return 2037 - birthYear;
    // }

    // calcAge: function () {
    //     console.log(this);
    //     return 2037 - this.birthYear //TODO: this keyword
    // }

    calcAge: function () {
        this.age = 2037 - this.birthYear
        return this.age;
    },

    getSummary: function () {
        return `${this.firstName} is a ${this.calcAge()}-year old ${this.job}, and he has ${this.hasDriverLicense ? 'a' : 'no'} driver's license.`
    }
};
*/
/*
console.log(jonas);

console.log(jonas.lastName);
console.log(jonas['lastName']); //用这种方式可以用expression:

const nameKey = 'Name';
console.log(jonas['first' + nameKey]);
console.log(jonas['last' + nameKey]);

const interestedIn = prompt('What do you want to know about Jonas? Choose between firstName, lastName, age, job and friends');
// console.log(jonas.interestedIn); 括号不能用expression所以不会work，会返回undefined
console.log(jonas[interestedIn]);

if (jonas[interestedIn]) {
    console.log(jonas[interestedIn]);
} else {
    console.log('wrong request');
}

jonas.location = 'Portugal';
jonas['twitter'] = '@jonasschmedtman';
console.log(jonas);

const fName = jonas.firstName;
const noOfFriends = jonas.friends.length;
const bestFriend = jonas.friends[0];

console.log(`${fName} has ${noOfFriends} friends, and his best friend is called ${bestFriend}`);

console.log(jonas.calcAge());
console.log(jonas.age);
console.log(jonas.age);
console.log(jonas.age);

console.log(jonas.getSummary());
*/

//challenge #3
/*
const markInfo = {
    firstName: 'Mark',
    lastName: 'Miller',
    mass: 78,
    height: 1.69,

    calcBMI: function() {
        this.bmi = this.mass / this.height ** 2;
        return this.bmi;
    }
};

const johnInfo = {
    firstName: 'John',
    lastName: 'Smith',
    mass: 92,
    height: 1.95,
    
    calcBMI: function() {
        this.bmi = this.mass / this.height ** 2;
        return this.bmi;
    }
};

if (markInfo.calcBMI() > johnInfo.calcBMI()) {
    console.log(`Mark's BMI (${markInfo.bmi}) is higher than John's BMI (${johnInfo.bmi})!`);
} else if (markInfo.calcBMI() < johnInfo.calcBMI()) {
    console.log(`John's BMI (${johnInfo.bmi}) is higher than Mark's BMI (${markInfo.bmi})!`);
} else {
    console.log('Mark and John has the same BMI: (${markInfo.bmi})!');
}
*/

// for(let rep = 1; rep <= 5; rep++) {
//     console.log(`Lifting weights repetition ${rep} 🏋️‍♂️`);
// }
/*
const jonas = [
    'Jonas', 
    'Schmedtmann', 
    2037 - 1991, 
    'teacher',
    ['Michael', 'Peter', 'Steven'],
];

const types = [];

for (let i = 0; i < jonas.length; i++) {
    console.log(jonas[i], typeof jonas[i]);
    // types[i] = typeof jonas[i];
    types.push(typeof jonas[i]);
}

console.log(types);

const years = [1991, 2007, 1969, 2020];
const ages = [];

for (let i = 0; i < years.length; i++) {
    ages.push(2037 - years[i]);
}

console.log(ages);

//TODO: continue vs. break
console.log('--- ONLY STRINGS ---');
for (let i = 0; i < jonas.length; i++) {
    if (typeof jonas[i] !== 'string') continue;
    console.log(jonas[i], typeof jonas[i]);
}

console.log('--- BREAK WITH NUMBER ---');
for (let i = 0; i < jonas.length; i++) {
    if (typeof jonas[i] === 'number') break;
    console.log(jonas[i], typeof jonas[i]);
}
*/
/*
const jonas = [
    'Jonas', 
    'Schmedtmann', 
    2037 - 1991, 
    'teacher',
    ['Michael', 'Peter', 'Steven'],
];

for (let i = jonas.length - 1; i >= 0; i--) {
    console.log(i, jonas[i]);
}

for (let exercise = 1; exercise < 4; exercise++) {
    console.log(`------ Starting exercise ${exercise}`);
    for (let rep = 1; rep < 4; rep++) {
        console.log(`Lifting weight repetition ${rep} 🏋️‍♂️`);
    }
}
*/
/*
for(let rep = 1; rep <= 5; rep++) {
    console.log(`Lifting weights repetition ${rep} 🏋️‍♂️`);
}

let rep = 1;
while (rep <= 5) {
    console.log(`Lifting weights repetition ${rep} 🏋️‍♂️`);
    rep++;
}

let dice = Math.trunc(Math.random() * 6) + 1;

while (dice !== 6) {
    console.log(`You rolled a ${dice}`);
    dice = Math.trunc(Math.random() * 6) + 1;
    if (dice === 6) console.log('Loop is about to end...');
}
*/

//challenge #4
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52]
const tips = []
const totals = []

const calcTip = function (bill) {
    return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
}

for (let i = 0; i < bills.length; i++) {
    const tip = calcTip(bills[i]);
    tips.push(tip);
    totals.push(tip + bills[i]);
}

console.log(tips, totals);

function calcAverage(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum / arr.length;
}

console.log(calcAverage(totals));