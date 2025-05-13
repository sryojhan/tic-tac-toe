
addEventListener('DOMContentLoaded', ()=>{


    const EMPTY = 0;
    const X = 1;
    const O = 2;

    
    function CreatePlayer(value){
        
        (function ConfigurePlayerName(){

            let player = `player${value}`;

            let name = prompt(`Please insert ${player} name`);

            if(name === "") name = player;

            document.querySelector(`#${player}`).textContent = name;

        })();
       
        return {};
        
    }
    
    const Game = (function (){
        
        
        const players = [CreatePlayer(1), CreatePlayer(2)];
        
        const board = Array(9).fill(0);
        
        const playMove = () => {};
        
        
        return {};
    })();









});