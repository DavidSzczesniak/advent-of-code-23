import fs from 'fs';

const fileInput = fs.readFileSync('./input.txt', 'utf8').trim().split('\n');
const instructions = fileInput[0];

const map = {};

fileInput.slice(2).forEach((line) => {
    const [key, left, right] = line
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .split(' ')
        .filter((letter) => letter);

    map[key] = { left, right };
});

function getSteps(element) {
    let currentElement = element;
    let steps = 0;

    while (!currentElement.endsWith('Z')) {
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

function partOne() {
    return getSteps('AAA');
}

// least common multiple
function lcm(arr) {
    return arr.reduce((acc, n) => (acc * n) / gcd(acc, n));
}

// greatest common divisor
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function partTwo() {
    const startingElements = Object.keys(map).filter((key) => key.endsWith('A'));
    const steps = startingElements.map((element) => getSteps(element));

    return lcm(steps);
}

console.log('result', partTwo());
