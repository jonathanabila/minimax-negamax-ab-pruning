const { humanMark, aiMark } = require('./constants')
const { checkIfWinnerFound, getAllEmptyCellsIndexes } = require('./utils')


function minimax(currBdSt, currMark) {
    // Pega todas as posições disponíveis para jogadas.
    const availCellsIndexes = getAllEmptyCellsIndexes(currBdSt);

    // Verifica se o tabuleiro está em um estado terminal - vitória, derrota ou empate.
    if (checkIfWinnerFound(currBdSt, humanMark)) {
        return {score: -1};
    } else if (checkIfWinnerFound(currBdSt, aiMark)) {
        return {score: 1};
    } else if (availCellsIndexes.length === 0) {
        return {score: 0};
    }

    const allTestPlayInfos = [];

    for (let i = 0; i < availCellsIndexes.length; i++) {
        const currentTestPlayInfo = {};

        currentTestPlayInfo.index = currBdSt[availCellsIndexes[i]];
        currBdSt[availCellsIndexes[i]] = currMark;

        // Inverte o próximo jogador para continuar abrindo as jogadas possíveis para o movimento realizado.
        const nextPlayer = aiMark === currMark ? humanMark : aiMark
        // Chama recursivamente a função para continuar expandido os nós.
        const result = minimax(currBdSt, nextPlayer);
        currentTestPlayInfo.score = result.score;

        currBdSt[availCellsIndexes[i]] = currentTestPlayInfo.index;
        allTestPlayInfos.push(currentTestPlayInfo);
    }

    let bestTestPlay = null;

    // Escolhe o valor máximo para as jogadas disponíveis - buscando maximizar seu possível resultado.
    if (currMark === aiMark) {
        let bestScore = -Infinity;
        for (let i = 0; i < allTestPlayInfos.length; i++) {
            if (allTestPlayInfos[i].score > bestScore) {
                bestScore = allTestPlayInfos[i].score;
                bestTestPlay = i;
            }
        }
    } else {
        // Realiza o oposto, buscando reduzir a pontuação da jogada simulada para o jogador humano.
        let bestScore = Infinity;
        for (let i = 0; i < allTestPlayInfos.length; i++) {
            if (allTestPlayInfos[i].score < bestScore) {
                bestScore = allTestPlayInfos[i].score;
                bestTestPlay = i;
            }
        }
    }

    return allTestPlayInfos[bestTestPlay];
}


const currentBoardState = ["X", 1, "O", "X", 4, "X", "O", "O", 8];
const currentPlayer = aiMark
const bestPlayInfo = minimax(currentBoardState, currentPlayer);
console.log(`currentBoardState: [${currentBoardState}]`)
console.log(`Best move for '${currentPlayer}' mark is to add to the cell number ${bestPlayInfo.index} - score: ${bestPlayInfo.score}`)