
addEventListener('load', () => {



    (function () {


        function translate(value) {

            if (value === 1) return 'X';
            if (value === 2) return '0';
            return "";
        }


        function createPlayer(value) {


            let player = `player${value}`;

            let name = prompt(`Please insert ${player} name`);

            if (!name) {
                name = player;
            }

            let documentElem = document.querySelector(`#${player}`);
            documentElem.textContent = name;


            return { name, documentElem};

        }



        const players = [createPlayer(1), createPlayer(2)];
        const board = Array(9).fill(0);

        let currentPlayer = 0;

        let playing = true;


        function onPlayerAction(DOMdata, idx) {

            if(!playing) return;

            if(board[idx] !== 0) return;

            updateBoard(DOMdata, idx);

            let result = checkGameEnded();

            if (result.complete) {

                recolorSolution(result.indexes);
                processGame(result.value);

                playing = false;
            }
            else{
                if(checkDraw())
                    processGame(null, true);
            }

            advanceNextPlayer();
        }

        function advanceNextPlayer(){
            currentPlayer = (currentPlayer + 1) % 2;

            players[1 - currentPlayer].documentElem.classList.remove('current-player');
            players[    currentPlayer].documentElem.classList.   add('current-player');
        }

        function updateBoard(data, idx) {

            data.target.classList.remove('empty');
            data.target.textContent = translate(currentPlayer + 1);

            board[idx] = currentPlayer + 1;

        }


        function checkGameEnded() {


            let result = { complete: false, value: 0 };

            const complete = function (value, idx1, idx2, idx3) {


                if (value !== 0) {

                    result.complete = true;
                    result.value = value;

                    result.indexes = [idx1, idx2, idx3];
                }
            }

            //Check horizontals
            for (let i = 0; i < 9; i += 3) {

                if (board[i] === board[i + 1] && board[i + 1] === board[i + 2])
                    complete(board[i], i, i + 1, i + 2);
            }

            //Check verticals
            for (let i = 0; i < 3; i++) {

                if (board[i] === board[i + 3] && board[i + 3] === board[i + 6])
                    complete(board[i], i, i + 3, i + 6);
            }


            if (board[0] === board[4] && board[4] === board[8])
                complete(board[0], 0, 4, 8);


            //check diagonal

            if (board[2] === board[4] && board[4] === board[6])
                complete(board[2], 2, 4, 6);


            return result;
        }


        function checkDraw(){

            return board.reduce((previous, value) => Math.min(previous, value)) !== 0;
        }


        function recolorSolution(indexes){

            const cells = document.querySelectorAll('.cell');

            indexes.forEach((element, idx) => {
                
                cells[element].classList.add('win');

                let cellOrder = idx === 0 ? 'first' : (idx === 1 ?  'second' : 'third');
                cells[element].classList.add(cellOrder);
            });
        }


        function processGame(value, isDraw = false) {

            const results = document.querySelector('.results');

            results.classList.add('visible');
            let resultText = !isDraw ?  `${players[value - 1].name} wins!` : `It's a draw`;
            results.querySelector('#game-result').textContent = resultText;
        }



        (function initializeBoard() {

            const cells = document.querySelectorAll('.cell');


            cells.forEach((element, idx) => {

                element.addEventListener('click', (data) => {

                    onPlayerAction(data, idx);
                });

            });

        })();

        (function initialiseRemathButton() {

            document.querySelector('#restart').addEventListener('click', () => {

                playing = true;

                //Add empty class to all elements
                const cells = document.querySelectorAll('.cell');
                cells.forEach((element) => {

                    element.classList.add('empty');
                    element.classList.remove('win');
                    element.classList.remove('first');
                    element.classList.remove('second');
                    element.classList.remove('third');
                    element.textContent = "";

                });


                //Hide score div
                const results = document.querySelector('.results');
                results.classList.remove('visible');


                //Reset array
                board.fill(0);

            });
        })();

        return {};
    })();






});