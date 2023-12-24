/**
 * The almanac (your puzzle input) lists all of the seeds that need to be planted.
 * It also lists what type of soil to use with each kind of seed, what type of fertilizer to use with each kind of soil, what type of water to use with each kind of fertilizer, and so on.

	seeds: 79 14 55 13

	seed-to-soil map:
	50 98 2
	52 50 48

	soil-to-fertilizer map:
	0 15 37
	37 52 2
	39 0 15
	...

 * The almanac starts by listing which seeds need to be planted: seeds 79, 14, 55, and 13.
 * The rest of the almanac contains a list of maps which describe how to convert numbers from a source category into numbers in a destination category.
 * The maps describe entire ranges of numbers that can be converted.
 * Each line within a map contains three numbers: the destination range start, the source range start, and the range length.
 * 
 * Part One: What is the lowest location number that corresponds to any of the initial seed numbers?
 * To do this, you'll need to convert each seed number through other categories until you can find its corresponding location number.
 * 
 * Part Two: It looks like the seeds: line actually describes ranges of seed numbers.
 * The values on the initial seeds: line come in pairs. Within each pair, the first value is the start of the range and the second value is the length of the range.
 * Consider all of the initial seed numbers listed in the ranges on the first line of the almanac.
 * What is the lowest location number that corresponds to any of the initial seed numbers?
*/

import fs from 'fs';

const fileInput = fs.readFileSync('./input.txt', 'utf8').trim().split('\n');

function processSeed(seed) {
    let currentNumber = seed;
    let skipLine = false;

    fileInput.slice(2).forEach((line) => {
        if (skipLine) {
            if (line === '') skipLine = false;
            return;
        }

        const [destinationRangeStart, sourceRangeStart, rangeLength] = line
            .split(' ')
            .map((n) => parseInt(n));

        if (sourceRangeStart <= currentNumber && currentNumber <= sourceRangeStart + rangeLength) {
            const newNumber = destinationRangeStart + (currentNumber - sourceRangeStart);

            currentNumber = newNumber;
            skipLine = true;
        }
    });

    return currentNumber;
}

function getLowestLocationNumber(seeds) {
    let result = Infinity;

    seeds.forEach((seed) => {
        const finalNumber = processSeed(seed);

        if (finalNumber < result) result = processSeed(seed);
    });

    return result;
}

function partOne() {
    const seeds = fileInput[0]
        .split(' ')
        .map((n) => parseInt(n))
        .filter((n) => !isNaN(n));

    return getLowestLocationNumber(seeds);
}

function partTwo() {
    // fuck part two, I'm not doing it

    const seeds = fileInput[0]
        .split(' ')
        .map((n) => parseInt(n))
        .filter((n) => !isNaN(n));

    const seedRanges = [];
    seeds.forEach((seed, index) => {
        if (index % 2 === 0) {
            seedRanges.push({
                start: seed,
                length: seeds[index + 1],
            });
        }
    });

    let result = Infinity;
    let count = 0;
    seedRanges.forEach((seedRange) => {
        for (let i = 0; i < seedRange.length; i++) {
            const finalNumber = processSeed(seedRange.start + i);

            console.log('count', count++);
            console.log('finalNumber', finalNumber);
            if (finalNumber < result) {
                result = finalNumber;
            } else {
                // break;
            }
        }
    });

    return result;
}

console.log('result', partOne());
