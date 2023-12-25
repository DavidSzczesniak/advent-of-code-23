import fs from 'fs';

const fileInput = fs.readFileSync('./input.txt', 'utf8').trim().split('\n');

function partOne() {
    const waysToWin = [];
    const raceTimeList = fileInput[0]
        .split(' ')
        .map((n) => parseInt(n))
        .filter((n) => !isNaN(n));
    const distanceRecords = fileInput[1]
        .split(' ')
        .map((n) => parseInt(n))
        .filter((n) => !isNaN(n));

    raceTimeList.forEach((race, index) => {
        const record = distanceRecords[index];
        let remainingTime = race;
        const newRecords = [];
        let previousDistance = 0;

        for (let i = 1; i < race; i++) {
            remainingTime -= 1;
            const travelDistance = i * remainingTime;

            if (travelDistance > record) {
                previousDistance = travelDistance;
                newRecords.push(travelDistance);
            } else if (travelDistance < previousDistance) {
                break;
            }
        }

        waysToWin.push(newRecords.length);
    });

    return waysToWin.reduce((a, b) => a * b);
}

function partTwo() {
    const raceDuration = parseInt(fileInput[0].split(':')[1].replace(/\s+/g, ''));
    const distanceRecord = parseInt(fileInput[1].split(':')[1].replace(/\s+/g, ''));

    let waysToWin = 0;
    let remainingTime = raceDuration;
    let previousDistance = 0;

    for (let i = 1; i < raceDuration; i++) {
        remainingTime -= 1;
        const travelDistance = i * remainingTime;

        if (travelDistance > distanceRecord) {
            previousDistance = travelDistance;
            waysToWin += 1;
        } else if (travelDistance < previousDistance) {
            break;
        }
    }

    return waysToWin;
}

console.log('result', partTwo());
