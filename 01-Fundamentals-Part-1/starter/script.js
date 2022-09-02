/* let js = 'amazing';
if (js=== 'amazing') alert('JavaScript is FUN!');

console.log(40 + 8);

let firstName = "Jonas";
console.log(firstName);

let javascriptIsFun = true;
console.log(javascriptIsFun, typeof javascriptIsFun);
console.log(typeof 23);
console.log(typeof 'jonas');

javascriptIsFun = "YES!";
console.log(javascriptIsFun, typeof javascriptIsFun);

let year;
console.log(year, typeof year);
year = 1991
console.log(year, typeof year);

console.log(typeof null); // returns object - this is a bug of js

let x = 10;
x += 10;
x ++;
console.log(x);


const massMark = 78;
const heightMark = 1.69;
const massJohn = 92;
const heightJohn = 1.95;
let bmiMark = massMark / heightMark ** 2;
let bmiJohn = massJohn / heightJohn ** 2;
console.log(bmiMark, bmiJohn);
let markHigherBMI = bmiMark > bmiJohn;
console.log(markHigherBMI, typeof markHigherBMI);

const textDemo1 = "Mark's BMI is " + bmiMark + ", and John's BMI is " + bmiJohn
console.log(textDemo1);

const textDemo2 = `Mark's BMI is ${bmiMark}, and John's BMI is ${bmiJohn}`
console.log(textDemo2);

console.log('string with \n\
multiple \n\
lines');

console.log(`string with
multiple
lines`); //用反引号换行简洁方便

const age = 16;
const isOldEnough = age >= 18;

if (isOldEnough) {
    console.log('Sarah can start driving license 🚗');
} else {
    const yearsLeft = 18 - age;
    if (yearsLeft == 1) {
        console.log(`Sarah is too young. Wait another year :)`);
    } else {
        console.log(`Sarah is too young. Wait another ${yearsLeft} years :)`);
    }
}

*/

/*
//TODO:type conversion 数据类型
const inputYear = '1991';
console.log(Number(inputYear), inputYear); // 1991 '1991'
console.log(inputYear + 18); // 199118
console.log(Number(inputYear) + 18); // 2009
console.log(Number('Jonas')); // NaN
console.log(typeof NaN); // number (means invalid number)

console.log(String(23), 23);

//TODO:type coercion
console.log('I am ' + 23 + ' years old');
console.log('23' + '10' - 3); //2307 (2310-3)
console.log('23' - '10' - 3); //10 (23-10-3)
console.log('1' + 1 - 1); //10 (11-1)
*/

//TODO: only 5 falsy values: 0, '', undefined, null, NaN
/*
console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean('Jonas')); //true
console.log(Boolean(''));
console.log(Boolean({})); //true
*/

//TODO: Equality operators == vs ===
// const age = '18';
// if (age === 18) console.log('strict');
// if (age == 18) console.log('loose');
//最好自己convert好然后使用===，不要轻易使用==，容易出bug

// const favorite = prompt("What's your favorite number?")
// console.log(favorite, typeof favorite); //string
// const favorite = Number(prompt("What's your favorite number?"))
// console.log(favorite, typeof favorite); //number
/*
if (favorite === 23) {
    console.log('23 is cool');
} else if (favorite = 7) {
    console.log('7 is also cool');
} else if (favorite = 9) {
    console.log('9 is also cool');
} else {
    console.log('fine');
}

if(favorite !== 23) console.log('why not 23?');
*/

/*
const hasLicense = true; 
const hasGoodVision = false;

console.log(hasLicense && hasGoodVision); //and
console.log(hasLicense || hasGoodVision); //or
console.log(!hasLicense);

const isTired = true;

if(hasLicense && hasGoodVision && !isTired) { //invert isTired
    console.log('Sarah is able to drive!');
} else {
    console.log('Someone else should drive...');
}
*/

/*
const Dolphins1 = 96;
const Dolphins2 = 108;
const Dolphins3 = 89;
const Koalas1 = 88;
const Koalas2 = 91;
const Koalas3 = 110;

const DolphinsScore = (Dolphins1 + Dolphins2 + Dolphins3) / 3
const KoalasScore = (Koalas1 + Koalas2 + Koalas3) / 3

console.log(`Dolphins scored an average of ${DolphinsScore}!`);
console.log(`Koalas scored an average of ${KoalasScore}!`);

if (DolphinsScore === KoalasScore && DolphinsScore >= 100) {
    console.log("It's a tie!");
} else if (DolphinsScore > KoalasScore && DolphinsScore >= 100) {
    console.log('Dolphins wins!');
} else if (DolphinsScore < KoalasScore && KoalasScore >= 100) {
    console.log('Koalas wins!');
} else {
    console.log('No one wins! No one scored over 100!');
}
*/


/* TODO: switch statement
const day = 'day';

switch(day) {
    case 'monday': // day === 'monday'
        console.log('Plan course structure');
        console.log('Go to coding meetup');
        break;
    case 'tuesday':
        console.log('Prepare theory videos');
        break;
    case 'wednesday':
    case 'thursday':
        console.log('Write code examples');
        break;
    case 'friday':
        console.log('Record videos');
        break;
    case 'saturday':
    case 'sunday':
        console.log('Enjoy the weekend! :D');
        break;
    default:
        console.log('Not a valid day!');
}
*/

//TODO: ternary operator ?
const age = 23;
age >= 18 ? console.log('I like to drink wine 🍷'): //if
console.log('I like to drink water 💧');  //else

//more used as below:
const drink = age >= 18 ? 'wine 🍷' : 'water 💧'; //single line 
console.log(drink);

//as compared to normal if statement:
let drink2;
if(age >= 18) {
    drink2 = 'wine 🍷';
} else {
    drink2 = 'water 💧';
}
console.log(drink2);

//the expression can also be handy in the below scenario:
console.log(`I like to drink ${age >= 18 ? 'wine 🍷' : 'water 💧'}`);

const bill = 40;
const tip = (50 <= bill && bill <= 300) ? 0.15 * bill : 0.20 * bill;
console.log(`The bill was ${bill}, the tip was ${tip}, and the total value was ${bill + tip}`);

