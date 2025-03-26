let board;
let boardWidth=1000;
let boardHeight=1000;
let context;

//player
let playerWidth=150;
let playerHeight=25;
let playerVelocity=50;
let player={
    x:boardWidth/2-playerWidth/2,
    y:boardHeight-playerHeight-5,
    width:playerWidth,
    height:playerHeight,
    speedx:playerVelocity,
}
//ball
let ballWidth=20;
let ballHeight=20;
let ballVelocityx=5;
let ballVelocityy=4;
let ball={
    x:boardWidth/2,
    y:boardHeight/2,
    width:ballWidth,
    height:ballHeight,
    speedx:ballVelocityx,
    speedy:ballVelocityy,
}

//block
let blockArray=[];
let blockWidth=75;
let blockHeight=60;
let blockColumns=10;
let blockRows=4;
let blockMaxRows=10;
let blockCount=0;
let blockX=15;
let blockY=45;

let score=0;
let gameover=false

window.onload=function(){
    board=document.getElementById("board");
    board.height=boardHeight
    board.width=boardWidth
    context=board.getContext("2d");

    context.fillStyle = "yellow";
    context.fillRect(player.x,player.y,player.width,player.height);
    requestAnimationFrame(update)
    document.addEventListener("keydown",moveplayer)

    createblocks()
}
function update(){
    requestAnimationFrame(update)
    if (gameover){
        return
    }
    context.clearRect(0,0,boardWidth,boardHeight);
    context.fillStyle = "yellow";
    context.fillRect(player.x,player.y,player.width,player.height);
    context.fillStyle = "white";
    context.fillRect(ball.x,ball.y,ball.width,ball.height);
    ball.x+=ball.speedx;
    ball.y+=ball.speedy;
    
    // Wall collisions
    if(ball.x <= 0 || ball.x + ball.width >= boardWidth){
        ball.speedx *= -1;
    }
    if(ball.y <= 0){
        ball.speedy *= -1;
    }
    else if(ball.y + ball.height >= boardHeight){
        context.font="20px sans-serif"
        context.fillText("Game Over, Click on Spacebar to restart",80,400)
        gameover=true
    }

    // Player collision
    if (checkCollision(ball,player)){
        ball.speedy *= -1;
    }

    // Block collisions
    context.fillStyle="skyblue"
    for (let i = blockArray.length - 1; i >= 0; i--){
        let block = blockArray[i]
        if (!block.break){
            if(checkCollision(ball, block)){
                block.break = true;
                blockCount--;
                score += 100;
                
                // Determine collision side and bounce accordingly
                let overlapLeft = ball.x + ball.width - block.x;
                let overlapRight = block.x + block.width - ball.x;
                let overlapTop = ball.y + ball.height - block.y;
                let overlapBottom = block.y + block.height - ball.y;
                
                let minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);
                
                if (minOverlap === overlapLeft || minOverlap === overlapRight) {
                    ball.speedx *= -1;
                } else {
                    ball.speedy *= -1;
                }
            }
            context.fillRect(block.x, block.y, block.width, block.height);
        }
    }

    // Check if all blocks are destroyed
    if (blockCount == 0){
        score += 100 * blockRows * blockColumns;
        blockRows = Math.min(blockRows + 1, blockMaxRows)
        createblocks()
    }

    // Display score
    context.fillStyle = "white";
    context.font="20px sans-serif";
    context.fillText(score, 10, 25);
}

function outbound(xpos){
    return (xpos < 0 || xpos + player.width > boardWidth);
}

function moveplayer(event){
    if(gameover){
        if (event.code=="Space") resetgame()
    }
    if(event.code=="ArrowLeft"){
        let newx = player.x - player.speedx;
        if (!outbound(newx)){
            player.x = newx;
        }
    }
    if(event.code=="ArrowRight"){
        let newx = player.x + player.speedx;
        if (!outbound(newx)){
            player.x = newx;
        }
    }
}

function checkCollision(a, b){
    return a.x < b.x + b.width && 
           a.x + a.width > b.x && 
           a.y < b.y + b.height && 
           a.y + a.height > b.y
}

function createblocks(){
    blockArray = [];
    for (let i = 0; i < blockColumns; i++){
        for (let j = 0; j < blockRows; j++){
            let block = {
                x: blockX + blockWidth * i + i * 24,
                y: blockY + blockHeight * j + j * 24,
                width: blockWidth,
                height: blockHeight,
                break: false
            }
            blockArray.push(block);
        }
    }
    blockCount = blockArray.length
}

function resetgame(){
    gameover = false;
    player = {
        x: boardWidth/2 - playerWidth/2,
        y: boardHeight - playerHeight - 5,
        width: playerWidth,
        height: playerHeight,
        speedx: playerVelocity,
    }
    ball = {
        x: boardWidth/2,
        y: boardHeight/2,
        width: ballWidth,
        height: ballHeight,
        speedx: ballVelocityx,
        speedy: ballVelocityy,
    }
    blockArray = [];
    blockRows = 3
    score = 0;
    createblocks();
}