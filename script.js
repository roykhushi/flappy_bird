//canvas dimensions
let board;
let boardWidht = 360; //ratio = 17:12
let boardHeight = 640;
let context;

//bird dimensions
let birdWidht = 34;
let birdHeight = 24;
let birdX = boardWidht/8;
let birdY = boardHeight/2;
let birdImg;
let bird = {
    x : birdX,
    y : birdY,
    width : birdWidht,
    height : birdHeight
}

//pipe dimensions
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512; //ratio = 1:8
let pipeX = boardWidht;
let pipeY = 0;
let topPipeImg;
let bottomPipeImg; 

//movements
let velocityX = -2; //as the pipe is moving towards left
let velocityY = 0; // bird's jumping speed
let gravity = 0.4; //bird will move downwards

let gameOver = false;
let score = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidht;
    context = board.getContext("2d"); //for drawing
    
     birdImg = new Image();
     birdImg.src = "images/flappybird.png";
     birdImg.onload = function () {
         context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
     }

     topPipeImg = new Image();
     topPipeImg.src = "images/toppipe.png";

     bottomPipeImg = new Image();
     bottomPipeImg.src = "images/bottompipe.png";
     requestAnimationFrame(update);
     setInterval(placePipes,1500);

     //adding key event listener
     document.addEventListener("keydown",moveBird); //everytime we press a key it will call the movebird func
}

function update() { //this function is called upon reloading
    requestAnimationFrame(update);
    if(gameOver){
        return;
    }
    //clearing frames
    context.clearRect(0,0,board.width,board.height);

    velocityY += gravity;
    //bird.y += velocityY;
    bird.y = Math.max(bird.y+velocityY , 0); //limiting birds upward motion to a max of canvas top
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    
    //if we fall down
    if(bird.y > board.height){
        gameOver = true;
        score = 0;
        context.fillStyle = "white";
        context.font = "45px sans-serif";
        context.fillText(score,5,45);
    
        if(gameOver){
            context.fillText("Game Over" , 5,90);
        }
        return;
    }
    
    //creating pipes
    for(let i=0;i<pipeArray.length;i++){
        let pipe = pipeArray[i];
        pipe.x += velocityX; //shifting position of pipe as the bird moves
        context.drawImage(pipe.img,pipe.x,pipe.y,pipe.width,pipe.height);
    
    if(!pipe.passed && bird.x > pipe.x + pipe.width){
        score += 0.5 // 0.5x2=1 as there are two pipes
        pipe.passed = true;
    }
    if(collision(bird,pipe)){
        gameOver = true;
    }
    }

    //clear pipes from memory
    while(pipeArray.length > 0 && pipeArray[0].x< -pipeWidth){
        pipeArray.shift();
    }

    //showing score
    context.fillStyle = "white";
    context.font = "45px sans-serif";
    context.fillText(score,5,45);

    if(gameOver){
        context.fillText("Game Over" , 5,90);
    }

}

function placePipes () {

    if(gameOver){
        return;
    }

    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/4); //randomly placing the pipes and shifting the position upwards b/w -1/4 to -3/4
    
    let space = board.height/4;
    
    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height: pipeHeight,
        passed : false // to check if the bird has passed the pipe or not

    }

    let bottomPipe = {
        img : bottomPipeImg,
        x : pipeX,
        y : randomPipeY + pipeHeight + space, //y position of the bottom pipe
        width : pipeWidth,
        height: pipeHeight,
        passed : false // to check if the bird has passed the pipe or not

    }

    pipeArray.push(topPipe);
    pipeArray.push(bottomPipe);

}

function moveBird(e) {
    if(e.code == "Space " || e.code == "KeyX" || e.code == "ArrowUp"){
        //jump
        velocityY = -6; //bird will move upwards

        //reset
        if(gameOver){
            bird.y = birdY;
            pipeArray = [];
            score = 0;
            gameOver = false;
        }
    } 
}

function collision(a,b) {
    return  a.x < b.x + b.width &&   
    a.x + a.width > b.x &&   
    a.y < b.y + b.height &&  
    a.y + a.height > b.y;    
}