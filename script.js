let board;
let boardWidth=1000;
let boardHeight=1000;
let context;

//player
let playerWidth=150;
let playerHeight=25;
let playerVelocity=30;
let player={
    x:boardWidth/2-playerWidth/2,
    y:boardHeight-playerHeight-5,
    width:playerWidth,
    height:playerHeight,
    speedx:playerVelocity,
}
//ball
let ballWidth=15;
let ballHeight=15;
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

window.onload=function(){
    board=document.getElementById("board");
    board.height=boardHeight
    board.width=boardWidth
    context=board.getContext("2d");

    context.fillStyle = "yellow";
    context.fillRect(player.x,player.y,player.width,player.height);
    requestAnimationFrame(update)
    document.addEventListener("keydown",moveplayer)
}
function update(){
    requestAnimationFrame(update)
    context.clearRect(0,0,boardWidth,boardHeight);
    context.fillStyle = "yellow";
    context.fillRect(player.x,player.y,player.width,player.height);
    context.fillStyle = "white";
    context.fillRect(ball.x,ball.y,ball.width,ball.height);
    ball.x+=ball.speedx;
    ball.y+=ball.speedy;
    if(ball.x<0){
        ball.speedy*=-1;
    }
    else if(ball.x<=0 || ball.x+ball.width>=boardWidth){
        ball.speedx*=-1;
    }
    else if(ball.y+ball.height>=boardHeight){
        
    }

}
function outbound(xpos){
    return (xpos<0||xpos+player.width>boardWidth);
}
function moveplayer(event){
    if(event.code=="ArrowLeft"){
        let newx=player.x-player.speedx;
        if (!outbound(newx)){
            player.x=newx;
        }
    }
    if(event.code=="ArrowRight"){
        let newx=player.x+player.speedx;
        if (!outbound(newx)){
            player.x=newx;
        }
    }
}