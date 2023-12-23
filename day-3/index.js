/**
 * The engine schematic (your puzzle input) consists of a visual representation of the engine.
 * There are lots of numbers and symbols you don't really understand, but apparently any number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum.
 * (Periods (.) do not count as a symbol.)
 *
 * Part One: What is the sum of all of the part numbers in the engine schematic?
 *
 * Part Two: What is the sum of all of the gear ratios in your engine schematic?
 * A gear is any * symbol that is adjacent to exactly two part numbers.
 * Its gear ratio is the result of multiplying those two numbers together.
 */

import fs from 'fs';

const fileInput = fs.readFileSync('./input.txt', 'utf8').trim().split('\n');

let numbers = [];
let symbols = [];

fileInput.forEach((line, lineIndex) => {
    const numberRegex = /\d+/g;
    let numberMatch;

    while ((numberMatch = numberRegex.exec(line)) !== null) {
        numbers.push({
            number: numberMatch[0],
            line: lineIndex,
            start: numberMatch.index,
            end: numberMatch[0].length + numberMatch.index - 1,
        });
    }

    const symbolRegex = /[^.\d\s]/g;
    let symbolMatch;

    while ((symbolMatch = symbolRegex.exec(line)) !== null) {
        symbols.push({
            symbol: symbolMatch[0],
            line: lineIndex,
            index: symbolMatch.index,
        });
    }
});

function partOne() {
    const partNumbers = [];

    numbers.forEach((number) => {
        const indexesToCheck = [...Array(number.number.length).keys()].map((i) => number.start + i);
        indexesToCheck.push(number.start - 1, number.end + 1);
        const linesToCheck = [number.line - 1, number.line, number.line + 1];

        symbols.forEach((symbol) => {
            if (linesToCheck.includes(symbol.line) && indexesToCheck.includes(symbol.index)) {
                partNumbers.push(parseInt(number.number));
            }
        });
    });

    return partNumbers.reduce((acc, number) => acc + number, 0);
}

function partTwo() {
    const gearRatios = [];

    symbols
        .filter((symbol) => symbol.symbol === '*')
        .forEach((symbol) => {
            const indexesToCheck = [symbol.index - 1, symbol.index, symbol.index + 1];
            const linesToCheck = [symbol.line - 1, symbol.line, symbol.line + 1];

            const adjacentNumbers = numbers
                .filter(
                    (number) =>
                        linesToCheck.includes(number.line) &&
                        [number.start, number.end, number.end - 1].some((num) =>
                            indexesToCheck.includes(num)
                        )
                )
                .map((number) => parseInt(number.number));

            if (adjacentNumbers.length === 2)
                gearRatios.push(adjacentNumbers.reduce((acc, number) => acc * number, 1));
        });

    return gearRatios.reduce((acc, number) => acc + number, 0);
}

console.log(partTwo());
