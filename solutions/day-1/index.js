/**
On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.

For example:

1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet

Consider your entire calibration document. What is the sum of all of the calibration values?
*/

import fs from 'fs';

function getCalibrationValue(input) {
    let numbers = [];

    input.split('').forEach((char) => {
        if (isNaN(char)) return;

        if (numbers.length === 0) {
            numbers.push(char, char);
        } else {
            numbers[1] = char;
        }
    });

    return numbers[0] + numbers[1];
}

function transformInput(input) {
    const mappings = {
        one: 'one1one',
        two: 'two2two',
        three: 'three3three',
        four: 'four4four',
        five: 'five5five',
        six: 'six6six',
        seven: 'seven7seven',
        eight: 'eight8eight',
        nine: 'nine9nine',
    };

    Object.keys(mappings).forEach((key) => {
        input = input.replaceAll(key, mappings[key]);
    });

    return input;
}

function getSumOfValues(array) {
    return array.reduce((acc, curr) => {
        return acc + parseInt(getCalibrationValue(curr));
    }, 0);
}

function partOne(inputFile) {
    const fileInput = fs.readFileSync(inputFile, 'utf8').trim().split('\n');

    return getSumOfValues(fileInput);
}

function partTwo(inputFile) {
    let fileInput = fs.readFileSync(inputFile, 'utf8').trim().split('\n');

    fileInput = fileInput.map((input) => {
        return transformInput(input);
    });

    return getSumOfValues(fileInput);
}

console.log(partTwo('./input.txt'));
