import fs from 'fs';

const fileInput = fs.readFileSync('./input.txt', 'utf8').trim().split('\n');

function calculateDifferences(sequence, allDifferences) {
    const differences = [];

    sequence.forEach((number, index) => {
        if (index >= sequence.length - 1) return;

        differences.push(sequence[index + 1] - number);
    });

    allDifferences.push(differences);

    if (!differences.every((number) => number === 0)) {
        calculateDifferences(differences, allDifferences);
    }

    return;
}

function getAllDifferences(sequenceString) {
    const sequenceArray = sequenceString.split(' ').map((number) => parseInt(number));
    const allDifferences = [sequenceArray];

    calculateDifferences(sequenceArray, allDifferences);

    allDifferences[allDifferences.length - 1].push(0);

    return allDifferences;
}

function partOne() {
    const nextValues = [];

    fileInput.forEach((line) => {
        const allDifferences = getAllDifferences(line);

        for (let i = allDifferences.length - 2; i >= 0; i--) {
            const currentSequenceLength = allDifferences[i].length;
            const nextInSequence =
                allDifferences[i][currentSequenceLength - 1] +
                allDifferences[i + 1][currentSequenceLength - 1];

            allDifferences[i].push(nextInSequence);
        }

        nextValues.push(allDifferences[0][allDifferences[0].length - 1]);
    });

    return nextValues.reduce((acc, number) => acc + number);
}

function partTwo() {
    const nextValues = [];

    fileInput.forEach((line) => {
        const allDifferences = getAllDifferences(line);

        for (let i = allDifferences.length - 2; i >= 0; i--) {
            const nextInSequence = allDifferences[i][0] - allDifferences[i + 1][0];

            allDifferences[i].unshift(nextInSequence);
        }

        nextValues.push(allDifferences[0][0]);
    });

    return nextValues.reduce((acc, number) => acc + number);
}

console.log('result', partTwo());
