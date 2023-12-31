import fs from 'fs';

const fileInput = fs.readFileSync('./input.txt', 'utf8').trim().split('\n');
const cardStrengths = {
    A: 13,
    K: 12,
    Q: 11,
    J: 10,
    T: 9,
    9: 8,
    8: 7,
    7: 6,
    6: 5,
    5: 4,
    4: 3,
    3: 2,
    2: 1,
};

function getTypeOfHand(hand) {
    const amounts = [];

    hand.split('').forEach((card) => {
        if (amounts[card]) {
            amounts[card] += 1;
        } else {
            amounts[card] = 1;
        }
    });

    const checkForOccurences = (...occurences) => {
        let result = true;
        const amountsCopy = { ...amounts };

        [...occurences].forEach((occurence) => {
            if (!Object.values(amountsCopy).includes(occurence)) {
                result = false;
            } else {
                // handle case where you look for two pairs
                const indexToRemove = Object.values(amountsCopy).indexOf(occurence);
                delete amountsCopy[Object.keys(amountsCopy)[indexToRemove]];
            }
        });

        return result;
    };

    const keysLength = Object.keys(amounts).length;

    let type;

    if (checkForOccurences(5)) {
        type = 7;
    } else if (checkForOccurences(4)) {
        type = 6;
    } else if (checkForOccurences(3, 2)) {
        type = 5;
    } else if (checkForOccurences(3) && keysLength === 3) {
        type = 4;
    } else if (checkForOccurences(2, 2) && keysLength === 3) {
        type = 3;
    } else if (checkForOccurences(2) && keysLength === 4) {
        type = 2;
    } else if (keysLength === 5) {
        type = 1;
    }

    return type;
}

function getTotalWinnings() {
    const handsWithStrength = fileInput
        .map((line) => {
            const [value, bid] = line.split(' ');
            return { value, bid: parseInt(bid), strength: getTypeOfHand(value) };
        })
        .sort((a, b) => b.strength - a.strength);

    let continueSorting = true;

    while (continueSorting) {
        let changesMade = false;
        handsWithStrength.forEach((hand, index) => {
            const nextHand = handsWithStrength[index + 1];

            if (nextHand && hand.strength === nextHand.strength) {
                for (let i = 0; i < hand.value.length; i++) {
                    const currentCardStrength = cardStrengths[hand.value[i]];
                    const nextCardStrength = cardStrengths[nextHand.value[i]];

                    if (currentCardStrength < nextCardStrength) {
                        const temp = hand;
                        handsWithStrength[index] = nextHand;
                        handsWithStrength[index + 1] = temp;

                        changesMade = true;
                        break;
                    }

                    if (index === handsWithStrength.length - 2 && !changesMade) {
                        continueSorting = false;
                    }

                    if (currentCardStrength > nextCardStrength) {
                        break;
                    }
                }
            }
        });
    }

    let totalWinnings = 0;
    handsWithStrength.forEach((hand, index) => {
        const handRank = Math.abs(index - handsWithStrength.length);
        totalWinnings += hand.bid * handRank;
    });

    return totalWinnings;
}

console.log('total winnings', getTotalWinnings());
