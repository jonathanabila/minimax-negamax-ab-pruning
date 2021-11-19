Para executar os três scripts:
- minimax.js
- negamax.js
- ab-pruning.js

Você deve possuir o node instalado em seu sistema operacional, e estando na pasta raiz do repositório deve executar:
```shell
node minimax.js
```

Podendo substituir o minimax por qualquer uma das 3 opções disponíveis.

O funcionamento é muito simples, e a implementação foi feita para o jogo de damas. Para modificar as condições atuais 
você deve modificar as seguintes variáveis:
```javascript
const currentBoardState = ["X", 1, "O", "X", 4, "X", "O", "O", 8];
const currentPlayer = aiMark
```
Sendo `currentBoardState` o estado atual do tabuleiro no qual o "X" representa a jogada da AI e o "O" a jogada 
do ser humano. Os espaços disponiveis são representados pela posição deles na array. E parar alterar qual jogador 
joga no turno atual a variável é `currentPlayer`, sendo as opções `aiMark` e `humanMark`.