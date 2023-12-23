/**
 * Each card has two lists of numbers separated by a vertical bar (|): a list of winning numbers and then a list of numbers you have:
 * Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
 * Figure out which of the numbers you have appear in the list of winning numbers.
 * The first match makes the card worth one point and each match after the first doubles the point value of that card.
 *
 * Part One: How many points are they worth in total?
 *
 * Part Two: Scratchcards now only cause you to win more scratchcards equal to the number of winning numbers you have.
 * Specifically, you win copies of the scratchcards below the winning card equal to the number of matches.
 * So, if card 10 were to have 5 matching numbers, you would win one copy each of cards 11, 12, 13, 14, and 15.
 * Process all of the original and copied scratchcards until no more scratchcards are won.
 * Including the original set of scratchcards, how many total scratchcards do you end up with?
 */

import fs from 'fs';

const fileInput = fs.readFileSync('./input.txt', 'utf8').trim().split('\n');

function partOne() {
    let totalPoints = 0;

    fileInput.forEach((card) => {
        const [winningNumbers, yourNumbers] = card
            .split(':')[1]
            .split('|')
            .map((numbers) => numbers.split(' ').filter((n) => n));

        let points = 0;

        yourNumbers.forEach((number) => {
            if (!winningNumbers.includes(number)) return;

            if (points === 0) {
                points = 1;
            } else {
                points *= 2;
            }
        });

        totalPoints += points;
    });

    return totalPoints;
}

function partTwo() {
    let totalCards = fileInput.length;

    // warning: slowest recursive function ever
    // maybe better to store winning numbers in a map or something
    function processCards(cards) {
        cards.forEach((card) => {
            const [winningNumbers, yourNumbers] = card
                .split(':')[1]
                .split('|')
                .map((numbers) => numbers.split(' ').filter((n) => n));

            let points = 0;

            yourNumbers.forEach((number) => {
                if (!winningNumbers.includes(number)) return;

                points += 1;
                totalCards += 1;
            });

            if (points === 0) return;

            const nextCardIndex = fileInput.indexOf(card) + 1;
            const copies = fileInput.slice(nextCardIndex, nextCardIndex + points);

            processCards(copies);
        });
    }

    processCards(fileInput);

    return totalCards;
}

console.log('total cards', partTwo());
