'use strict'; //create visable error flags, needs to be first line
/*
let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriverLicense = true;
if (hasDriversLicense) console.log('I can drive :D'); //without strict mode, no error msg will show up (misspelling hasDriverLicense in the above line)
*/
// const interface = 'Audio';
// const private = 534; strict mode will show error msg on using reserved key words

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
    return `${firstName} retires in ${retirement} years.`;
}
console.log(yearsUntilRetirement(1992, 'Jonas'));