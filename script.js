var gameMap = {
    a1:'',a2:'',a3:'',
    b1:'',b2:'',b3:'',
    c1:'',c2:'',c3:'',
}

var playerTurn = '';
var warning = '';
var gameStatus = false;

var playerOne;
var playerTwo;

document.querySelector('.start').addEventListener('click',checkPlayers)

document.querySelector('.restart').addEventListener('click',resetGame);
document.querySelectorAll('.item').forEach(item=>{
    item.addEventListener('click',playerMove);
})


function checkPlayers(event){
    event.preventDefault();
    playerOne = document.querySelector('input[name="playerOne"]').value;
    playerTwo = document.querySelector('input[name="playerTwo"]').value;
    
    
    if(checkName(playerOne) == false || checkName(playerTwo) == false){
        gameStatus = false;
        alert('Fill the players\' names');
    }else{
        document.querySelector('.startArea').style.display ='none';
        document.querySelector('.area').style.display ='grid';
        document.querySelector('.info').style.display ='block';
        resetGame();
    }
    
    function checkName(name){
        let check = /^([a-zA-Z]+)$/.test(name);
        return check;
    }
}

function resetGame(){
    warning = '';
    let ramdom = Math.floor(Math.random()*2);
    playerTurn = (ramdom === 0)?'x':'o';

    for(let i in gameMap){
        gameMap[i] = '';
    }

    gameStatus = true;
    document.querySelector('.restart').style.display ='none';
    showMoves();
    gameInfo();
};

function togglePlayer(){
    playerTurn = (playerTurn === 'x')?'o':'x';
    gameInfo();
}

function showMoves(){
    for(let i in gameMap){
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = gameMap[i];
    }
    checkGame();
    togglePlayer();
}

function gameInfo(){
    if(gameStatus == false){
        document.querySelector('.info .title').innerHTML = 'End Game!';
        document.querySelector('.info .body').innerHTML = warning;
    }else{
        document.querySelector('.info .title').innerHTML = `Player turn (${playerTurn}):`;
        if(playerTurn == 'x'){
            warning = playerOne;
            document.querySelector('.info .body').innerHTML = warning;
        }else{
            warning = playerTwo;
            document.querySelector('.info .body').innerHTML = warning;
        } 
    } 
    
}

function playerMove(event){
    let target = event.target.dataset.item;
    if(gameStatus && gameMap[target] === ''){
        gameMap[target] = playerTurn;
        showMoves();
    }
}

function checkGame(){

    if(checkWinner(playerTurn)){
        warning = `${(playerTurn == 'x')?playerOne:playerTwo} Won!!!`;
        gameStatus = false;
        gameInfo();
        document.querySelector('.restart').style.display ='inline-block';
    }else if(draw()){
        warning = `It's a tie!`;
        gameStatus = false;
        gameInfo();
        document.querySelector('.restart').style.display ='inline-block';
    }
}

function checkWinner(player){
    let possibilities = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1',
    ]

    for(let i in possibilities){
        let arr = possibilities[i].split(',');
        let winner = arr.every(option => gameMap[option] === player);
        if(winner){
            return true;
        }
    }
    return false;
}

function draw(){
    for(let i in gameMap){
        if(gameMap[i] === ''){
            return false;
        }
    }
    return true;
}