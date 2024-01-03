import fs from 'fs';

const fileInput = fs.readFileSync('./input.txt', 'utf8').trim().split('\n');

const startLine = fileInput.filter((line) => line.includes('S'))[0];

const possibleMoves = {
    north: ['F', '|', '7'],
    east: ['-', '7', 'J'],
    south: ['L', '|', 'J'],
    west: ['-', 'L', 'F'],
};

const inputCopy = [...fileInput.map((line) => line.split(''))];
let startLineIndex = 0;
inputCopy.forEach((line, index) => {
    if (line.includes('S')) startLineIndex = index;
});
const startIndex = startLine.indexOf('S');

const loopElements = [];

let count = 0;
let currentNode = findNextNode(
    {
        lineIndex: startLineIndex,
        valueIndex: startIndex,
        value: 'S',
    },
    count
);

while (currentNode) {
    count++;
    currentNode = findNextNode(currentNode, count);
}

function findNextNode(node, count) {
    if (typeof node.value === 'number') return;

    const { lineIndex, valueIndex } = node;
    let nextNode = null;

    for (const [key, value] of Object.entries(possibleMoves)) {
        switch (key) {
            case 'north':
                const northValue = inputCopy[lineIndex - 1]?.[valueIndex];
                if (value.includes(northValue) && !['F', '7', '-'].includes(node.value)) {
                    nextNode = {
                        lineIndex: lineIndex - 1,
                        valueIndex,
                        value: northValue,
                    };
                }
                break;
            case 'east':
                const eastValue = inputCopy[lineIndex]?.[valueIndex + 1];
                if (value.includes(eastValue) && !['7', 'J', '|'].includes(node.value)) {
                    nextNode = {
                        lineIndex,
                        valueIndex: valueIndex + 1,
                        value: eastValue,
                    };
                }
                break;
            case 'south':
                const southValue = inputCopy[lineIndex + 1]?.[valueIndex];
                if (value.includes(southValue) && !['L', 'J', '-'].includes(node.value)) {
                    nextNode = {
                        lineIndex: lineIndex + 1,
                        valueIndex,
                        value: southValue,
                    };
                }
                break;
            case 'west':
                const westValue = inputCopy[lineIndex]?.[valueIndex - 1];
                if (value.includes(westValue) && !['L', 'F', '|'].includes(node.value)) {
                    nextNode = {
                        lineIndex,
                        valueIndex: valueIndex - 1,
                        value: westValue,
                    };
                }
                break;
        }
    }

    loopElements.push({
        lineIndex,
        valueIndex,
        value: node.value,
    });

    inputCopy[lineIndex][valueIndex] = count;

    return nextNode;
}

function partOne() {
    return Math.floor(count / 2) + 1;
}

// create ranges of indexes between pipes connecting down
// elements in those ranges that are not part of the loop are enclosed by it
// ...at least it works
function partTwo() {
    let tilesEnclosed = 0;

    fileInput
        .map((line) => line.split(''))
        .forEach((line, lineIndex) => {
            let leftBoundary = null;
            let rightBoundary = null;
            let rangesToCheck = [];

            line.forEach((_, index) => {
                const current = loopElements.find(
                    (element) => element.lineIndex === lineIndex && element.valueIndex === index
                );
                const below = loopElements.find(
                    (element) => element.lineIndex === lineIndex + 1 && element.valueIndex === index
                );
                const connectedBelow =
                    current &&
                    ['|', 'F', '7', 'S'].includes(current.value) &&
                    below &&
                    ['|', 'L', 'J', 'S'].includes(below.value);

                if (connectedBelow) {
                    if (rightBoundary !== null) {
                        leftBoundary = null;
                        rightBoundary = null;
                    }

                    if (leftBoundary === null) {
                        leftBoundary = index;
                    } else {
                        rightBoundary = index;
                        rangesToCheck.push([leftBoundary, rightBoundary]);
                    }
                }
            });

            rangesToCheck.forEach((range) => {
                for (let i = range[0]; i <= range[1]; i++) {
                    const partOfLoop = loopElements.find(
                        (element) => element.lineIndex === lineIndex && element.valueIndex === i
                    );

                    if (!partOfLoop) tilesEnclosed++;
                }
            });
        });

    return tilesEnclosed;
}

console.log('result', partTwo());
