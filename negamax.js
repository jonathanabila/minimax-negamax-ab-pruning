const { humanMark, aiMark } = require('./constants')
const { checkIfWinnerFound, getAllEmptyCellsIndexes } = require('./utils')


function negamax(currBdSt, currMark) {
    const availCellsIndexes = getAllEmptyCellsIndexes(currBdSt);

    if (checkIfWinnerFound(currBdSt, humanMark)) {
        if (currMark === humanMark) return {score: 1}
        return {score: -1};
    } else if (checkIfWinnerFound(currBdSt, aiMark)) {
        if (currMark === humanMark) return {score: -1}
        return {score: 1};
    } else if (availCellsIndexes.length === 0) {
        return {score: 0};
    }

    const allTestPlayInfos = [];

    let bestTestPlay = null;
    let bestScore = -Infinity;

    for (let i = 0; i < availCellsIndexes.length; i++) {
        const currentTestPlayInfo = {};

        currentTestPlayInfo.index = currBdSt[availCellsIndexes[i]];
        currBdSt[availCellsIndexes[i]] = currMark;

        const nextMark = aiMark === currMark ? humanMark : aiMark
        const result = negamax(currBdSt, nextMark);
        currentTestPlayInfo.score = result.score * -1;

        currBdSt[availCellsIndexes[i]] = currentTestPlayInfo.index;
        allTestPlayInfos.push(currentTestPlayInfo);
    }

    for (let i = 0; i < allTestPlayInfos.length; i++) {
        const score = allTestPlayInfos[i].score;
        if (score > bestScore) {
            bestScore = score;
            bestTestPlay = i;
        }
    }

    return allTestPlayInfos[bestTestPlay];
}


const currentBoardState = ["X", 1, "O", 3, 4, 5, "O", 7, "X"];
const currentPlayer = aiMark
const bestPlayInfo = negamax(currentBoardState, currentPlayer);
console.log(`Best move for '${currentPlayer}' mark is to add to the cell number ${bestPlayInfo.index} - score: ${bestPlayInfo.score}`)