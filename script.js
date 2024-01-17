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
}

function update() { //this function is called upon reloading
    requestAnimationFrame(update);
    //clearing frames
    context.clearRect(0,0,board.width,board.height);

    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    //creating pipes
    for(let i=0;i<pipeArray.length;i++){
        let pipe = pipeArray[i];
        pipe.x += velocityX; //shifting position of pipe as the bird moves
        context.drawImage(pipe.img,pipe.x,pipe.y,pipe.width,pipe.height);
       
    }
}

function placePipes () {
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