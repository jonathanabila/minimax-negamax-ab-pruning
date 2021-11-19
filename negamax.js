const { humanMark, aiMark } = require('./constants')
const { checkIfWinnerFound, getAllEmptyCellsIndexes } = require('./utils')

// Além das funções que se repetem entre o minimax e o negamax, algumas coisas foram modificadas
// e serão comentadas aqui.


function negamax(currBdSt, currMark) {
    const availCellsIndexes = getAllEmptyCellsIndexes(currBdSt);

    // Inverte o a pontuação do player, já que o objetivo é minimixar a pontuação do usuário na jogada dele.
    // Isso não era necessário no minimax já que havia duas funções diferentes para contabilizar o resultado final.
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

    // Inicializa as variáveis utilizadas para armazenar o melhor movimento e o melhor score.
    let bestTestPlay = null;
    let bestScore = -Infinity;

    for (let i = 0; i < availCellsIndexes.length; i++) {
        const currentTestPlayInfo = {};

        currentTestPlayInfo.index = currBdSt[availCellsIndexes[i]];
        currBdSt[availCellsIndexes[i]] = currMark;

        // Inverte o jogador para o próximo movimento igual no minimax.
        const nextMark = aiMark === currMark ? humanMark : aiMark
        const result = negamax(currBdSt, nextMark);
        // Inverte o resultado do score para esse jogador.
        currentTestPlayInfo.score = result.score * -1;

        currBdSt[availCellsIndexes[i]] = currentTestPlayInfo.index;
        allTestPlayInfos.push(currentTestPlayInfo);
    }

    // Realiza a interação para encontrar o maior score possível para esse conjunto de nós.
    for (let i = 0; i < allTestPlayInfos.length; i++) {
        const score = allTestPlayInfos[i].score;
        if (score > bestScore) {
            bestScore = score;
            bestTestPlay = i;
        }
    }

    return allTestPlayInfos[bestTestPlay];
}


const currentBoardState = ["X", 1, "O", "X", 4, "X", "O", "O", 8];
const currentPlayer = aiMark
const bestPlayInfo = negamax(currentBoardState, currentPlayer);
console.log(`currentBoardState: [${currentBoardState}]`)
console.log(`Best move for '${currentPlayer}' mark is to add to the cell number ${bestPlayInfo.index} - score: ${bestPlayInfo.score}`)