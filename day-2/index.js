/**
 * Determine which games would have been possible if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes.
 * What is the sum of the IDs of those games?
 */

import fs from 'fs';

const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;

function transformInput(input) {
    const gameId = parseInt(input.split(':')[0].split(' ')[1]);

    return {
        gameId,
        gameArray: input
            .split(':')[1]
            .split(';')
            .map((game) => game.split(',')),
    };
}

function isGamePossible(input) {
    const { gameArray, gameId } = transformInput(input);
    let isPossible = true;

    gameArray.forEach((game) => {
        game.forEach((cube) => {
            const count = parseInt(cube);
            const color = cube.replace(count, '').trim();

            if (color === 'red' && count > maxRed) {
                isPossible = false;
            }

            if (color === 'green' && count > maxGreen) {
                isPossible = false;
            }

            if (color === 'blue' && count > maxBlue) {
                isPossible = false;
            }
        });
    });

    if (isPossible) {
        return gameId;
    } else {
        return 0;
    }
}

function partOne(inputFile) {
    const fileInput = fs.readFileSync(inputFile, 'utf8').trim().split('\n');

    return fileInput.reduce((acc, input) => acc + isGamePossible(input), 0);
}

function getPowerOfLowestSet(input) {
    const { gameArray } = transformInput(input);
    let lowestPossible = {
        red: 0,
        green: 0,
        blue: 0,
    };

    gameArray.forEach((game) => {
        game.forEach((cube) => {
            const count = parseInt(cube);
            const color = cube.replace(count, '').trim();

            if (lowestPossible[color] === 0 || lowestPossible[color] < count) {
                lowestPossible[color] = count;
            }
        });
    });

    return lowestPossible.red * lowestPossible.green * lowestPossible.blue;
}

function partTwo(inputFile) {
    const fileInput = fs.readFileSync(inputFile, 'utf8').trim().split('\n');

    fileInput.forEach((input) => {
        console.log(getPowerOfLowestSet(input));
    });

    return fileInput.reduce((acc, input) => acc + getPowerOfLowestSet(input), 0);
}

console.log(partTwo('./input.txt'));
