const cvs = document.getElementById("canvas")
const ctx = cvs.getContext("2d");

var bg = document.getElementById("bg")
var fg = document.getElementById("fg")
var bird = document.getElementById("bird")
var pipeNorth = document.getElementById("pipeNorth")
var pipeSouth = document.getElementById("pipeSouth")

var fly = document.getElementById("fly")
var scor = document.getElementById("scor")

var gap = 85;
var constant = pipeNorth.height + gap;
var bX = 50;
var bY = 200;
var gravity = 1;
var score = 0;

document.addEventListener("click", moveUp)

function moveUp(){
    bY -= 25;
    fly.play();
}

pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
}

function draw(){
    ctx.drawImage(bg,0,0);

    for(i=0; i<pipe.length; i++){
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y)
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant)

        pipe[i].x --;

        if( pipe[i].x == 50){
            pipe.push({
                x:cvs.width,
                y: Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height

            })
        }

        if (
            bX + bird.width >= pipe[i].x &&
            bX <= pipe[i].x + pipeNorth.width &&
            (bY <= pipe[i].y + pipeNorth.height ||
                bY + bird.height >= pipe[i].y + constant) ||
            bY + bird.height >= cvs.height - fg.height
        ) {
            // Collision occurred, restart the game
            resetGame();
        }

        if(pipe[i].x == bX){
            score++;
            scor.play();
        }
    }

    


    ctx.drawImage(bird, bX, bY)
    ctx.drawImage(fg, 0, cvs.height - fg.height)
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score:"+score,10,cvs.height -20);

    bY += gravity;

    requestAnimationFrame(draw)


}
function resetGame() {
    // Reset bird position
    bX = 50;
    bY = 200;
    // Reset pipes array
    pipe = [];
    pipe[0] = {
        x: cvs.width,
        y: 0
    };
    // Reset any other game variables as needed
    score=0
    draw()
}

draw();