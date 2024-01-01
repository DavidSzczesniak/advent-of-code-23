import fs from 'fs';

const fileInput = fs.readFileSync('./input.txt', 'utf8').trim().split('\n');
const instructions = fileInput[0];

const map = {};

fileInput.slice(2).forEach((line) => {
    const [key, left, right] = line
        .replace(/[^a-zA-Z ]/g, '')
        .split(' ')
        .filter((letter) => letter);

    map[key] = { left, right };
});

function partOne() {
    let currentElement = 'AAA';
    let steps = 0;

    while (currentElement !== 'ZZZ') {
        instructions.split('').forEach((letter) => {
            const { left, right } = map[currentElement];

            if (letter === 'L') {
                currentElement = left;
            } else {
                currentElement = right;
            }

            steps++;
        });
    }

    return steps;
}

console.log('result', partOne());
