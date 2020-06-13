// SELECT CANVAS ELEMENT
const cvs = document.getElementById("breakout");
const ctx = cvs.getContext("2d");
counter = 0;
// ADD BORDER TO CANVAS
cvs.style.border = "1px solid #0ff";

// MAKE LINE THIK WHEN DRAWING TO CANVAS
ctx.lineWidth = 3;

// GAME VARIABLES AND CONSTANTS
const PADDLE_WIDTH = 100;
const PADDLE_MARGIN_BOTTOM = 50;
const PADDLE_HEIGHT = 20;
const BALL_RADIUS = 8;
let LIFE = 3; // PLAYER HAS 3 LIVES
let SCORE = 0;
const SCORE_UNIT = 10;
let LEVEL = 1;
const MAX_LEVEL = 3;
let GAME_OVER = false;
let leftArrow = false;
let rightArrow = false;
let buttonGap = 30;

gameState ={
    current : 0,
    StartMode:0,
    selectMode : 1,
    gameplay : 2,
    gameover : 3,
    gamewin : 4,
    gameAbout:5
}
gameMode ={
    current:1,
    easy:1,
    medium:2,
    hard:3
}
ballSpeed={
    current : 5,
    easy : 5,
    mudium : 8,
    hard : 10
}

brickMode = {
    current : 1,
    easy : 1,
    mudium:2,
    hard:3
}

// CREATE THE PADDLE
const paddle = {
    x : cvs.width/2 - PADDLE_WIDTH/2,
    y : cvs.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
    width : PADDLE_WIDTH,
    height : PADDLE_HEIGHT,
    dx :5
}

// DRAW PADDLE
function drawPaddle(){
    ctx.fillStyle = "#2e3548";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    
    ctx.strokeStyle = "#ffcd05";
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// CONTROL THE PADDLE
document.addEventListener("keydown", function(event){
   if(event.keyCode == 37){
       leftArrow = true;
   }else if(event.keyCode == 39){
       rightArrow = true;
   }
});
document.addEventListener("keyup", function(event){
   if(event.keyCode == 37){
       leftArrow = false;
   }else if(event.keyCode == 39){
       rightArrow = false;
   }
});


//control the game
cvs.addEventListener("click", function(evt){
 
    let rect = cvs.getBoundingClientRect();
     let clickX = evt.clientX - rect.left;
     let clickY = evt.clientY - rect.top;
    
     let easyhover =clickX >= easyButton.x && clickX <= easyButton.x + easyButton.w && clickY >= easyButton.y && clickY <= easyButton.y + easyButton.h; 
     // medium button hover
  
     let meduiemhover=clickX >= MediumButton.x && clickX <= MediumButton.x + MediumButton.w && clickY >= MediumButton.y && clickY <= MediumButton.y + MediumButton.h;
     // hard button hover
     let hardhover=clickX >= hardButton.x && clickX <= hardButton.x + hardButton.w && clickY >= hardButton.y && clickY <= hardButton.y + hardButton.h;
     
     let imgX =10 ;
     let imgY =750 ;
     // CHECK IF WE CLICK ON THE START BUTTON
     if(clickX >= imgX && clickX <= imgX + 25 && clickY >= imgY && clickY <= imgY + 25){
        gameState =false; 
        //cvs.style.background= 'rgba(0,0,0,0.5)';
        //audioManager();        
     }
     if(gameState.current == gameState.selectMode)
     {
     if(easyhover){
        buttonClicked.play();
        gameMode.current = gameMode.easy;
        gameState.current =gameState.gameplay;
        ballSpeed.current = ballSpeed.easy;
        brickMode.current = brickMode.easy;
      GameSelect_sound.pause();
     }
     if(meduiemhover){
        buttonClicked.play();
        gameMode.current = gameMode.medium;
        gameState.current =gameState.gameplay;
        ballSpeed.current = ballSpeed.mudium;
        brickMode.current = brickMode.mudium;
        GameSelect_sound.pause();
     }
     if(hardhover){
        buttonClicked.play();
        gameMode.current = gameMode.hard;
        gameState.current =gameState.gameplay
        ballSpeed.current = ballSpeed.hard;
        brickMode.current = brickMode.hard;
        GameSelect_sound.pause();
     }}
     else if(gameState.current == gameState.StartMode){
        // easy button hover

        let Starthover =clickX >= StartButton.x && clickX <= StartButton.x + easyButton.w +20&& clickY >= StartButton.y && clickY <= StartButton.y + easyButton.h+50; 
        // medium button hover
        console.log("start : "+ Starthover );
        let Abouthover= clickX >= AboutButton.x && clickX <= AboutButton.x + easyButton.w+20 && clickY >= AboutButton.y && clickY <= AboutButton.y + easyButton.h+50;
      
        if(Starthover){
            gameState.current = gameState.selectMode;

        }
        console.log(Abouthover);
        if(Abouthover){
           
           gameState.current = gameState.gameAbout;
           


       }
    }
     if(GAME_OVER){
        let Restarthover=clickX >= RESETButton.x && clickX <= RESETButton.x + hardButton.w && clickY >= RESETButton.y -hardButton.h && clickY <= RESETButton.y + hardButton.h;
        if(Restarthover){
            gameState.current = gameState.StartMode;
            gameMode.current = 1;
            location.reload();

        }
     }

     if(GAME_OVER && gameState.current == gameState.gamewin){
        let Restarthover=clickX >= easyButton.x-35 && clickX <= easyButton.x-35 + (hardButton.w+30) && clickY >= easyButton.y+60 -(hardButton.h-10) && clickY <= easyButton.y+60 + hardButton.h;

        if(Restarthover){
            gameState.current = gameState.StartMode;
            gameMode.current = 1;
            location.reload();

        }
    }

    if( gameState.current == gameState.gameAbout){
        let BackToMenuhover=clickX >= easyButton.x-60 && clickX <= easyButton.x-60 + (hardButton.w+30) && clickY >= easyButton.y+120 -(hardButton.h-30) && clickY <= easyButton.y+120 + hardButton.h;
        if(BackToMenuhover){
            gameState.current = gameState.StartMode;
        }
       }
     brick.row = brickMode.current;
     createBricks();

});


cvs.addEventListener("mousemove", function(evt){
    let rect = cvs.getBoundingClientRect();
    let clickX = evt.clientX - rect.left;
    let clickY = evt.clientY - rect.top;

    let imgX =10 ;
     let imgY =750 ;
     // CHECK IF WE CLICK ON THE START BUTTON
     if(clickX >= imgX && clickX <= imgX + 25 && clickY >= imgY && clickY <= imgY + 25 ){
        cvs.style.cursor ='pointer';
     }
     else
        cvs.style.cursor ='default';
    //select 
    if(gameState.current == gameState.selectMode){
        // easy button hover

        let easyhover =clickX >= easyButton.x && clickX <= easyButton.x + easyButton.w && clickY >= easyButton.y && clickY <= easyButton.y + easyButton.h; 
        // medium button hover
     
        let meduiemhover=clickX >= MediumButton.x && clickX <= MediumButton.x + MediumButton.w && clickY >= MediumButton.y && clickY <= MediumButton.y + MediumButton.h;
        // hard button hover
        let hardhover=clickX >= hardButton.x && clickX <= hardButton.x + hardButton.w && clickY >= hardButton.y && clickY <= hardButton.y + hardButton.h;

        if(easyhover|| meduiemhover|| hardhover){
            cvs.style.cursor ='pointer';            
        }
        else{
            cvs.style.cursor ='default';
        }

    }
    else if(gameState.current == gameState.StartMode){
        // easy button hover

        let Starthover =clickX >= StartButton.x && clickX <= StartButton.x + easyButton.w +20&& clickY >= StartButton.y && clickY <= StartButton.y + easyButton.h+50; 
        // medium button hover
     
        let Abouthover=clickX >= AboutButton.x && clickX <= AboutButton.x + MediumButton.w+20 && clickY >= AboutButton.y && clickY <= AboutButton.y + MediumButton.h+50;
        
        if(Starthover||Abouthover){
            cvs.style.cursor ='pointer';            
        }
        else{
            cvs.style.cursor ='default';
        }

    }
    if(GAME_OVER){
        let Restarthover=clickX >= RESETButton.x && clickX <= RESETButton.x + hardButton.w && clickY >= RESETButton.y -hardButton.h && clickY <= RESETButton.y + hardButton.h;

        if(Restarthover){
            cvs.style.cursor ='pointer';            
        }
        else{
            cvs.style.cursor ='default';
        }
    }
    if(GAME_OVER && gameState.current == gameState.gamewin){
        let Restarthover=clickX >= easyButton.x-35 && clickX <= easyButton.x-35 + (hardButton.w+30) && clickY >= easyButton.y+60 -(hardButton.h-10) && clickY <= easyButton.y+60 + hardButton.h;

        if(Restarthover){
            cvs.style.cursor ='pointer';            
        }
        else{
            cvs.style.cursor ='default';
        }
    }
    if( gameState.current == gameState.gameAbout){
        let BackToMenuhover=clickX >= easyButton.x-60 && clickX <= easyButton.x-60 + (hardButton.w+30) && clickY >= easyButton.y+120 -(hardButton.h-30) && clickY <= easyButton.y+120 + hardButton.h;
        if(BackToMenuhover){
            cvs.style.cursor ='pointer';            
        }
        else{
            cvs.style.cursor ='default';
        }
    }


    
})



// MOVE PADDLE
//check if he press right we move paddle to right bt value dx
// and the same for left 
function movePaddle(){
    if(rightArrow && paddle.x + paddle.width < cvs.width){
        paddle.x += paddle.dx;
    }else if(leftArrow && paddle.x > 0){
        paddle.x -= paddle.dx;
    }
}

// CREATE THE BALL
const ball = {
    x : cvs.width/2,
    y : paddle.y - BALL_RADIUS,
    radius : BALL_RADIUS,
    speed : ballSpeed.current,
    dx : 3 * (Math.random() * 2 - 1),
    dy : - ballSpeed.current
    
}

// DRAW THE BALL
function drawBall(){
    ctx.beginPath();
    
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = "#ffcd0 5";
    ctx.fill();
    
    ctx.strokeStyle = "#2e3548";
    ctx.stroke();
    
    ctx.closePath();
}

// MOVE THE BALL
function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;
}

// BALL AND WALL COLLISION DETECTION
function ballWallCollision(){
    //if ball hit right or left wall
    if(ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0){
        ball.dx = - ball.dx;
        WALL_HIT.play();
    }
    // if ball hit top walll
    
    if(ball.y - ball.radius < 0){
        ball.dy = -ball.dy;
        WALL_HIT.play();
    }
     
    //if ball fail 
    if(ball.y + ball.radius > cvs.height){
        LIFE--; // LOSE LIFE
        LIFE_LOST.play();
        resetBall();
    }
}

// RESET THE BALL
function resetBall(){
    ball.x = cvs.width/2;
    ball.y = paddle.y - BALL_RADIUS;
    ball.dx = 3 * (Math.random() * 2 - 1);
    ball.dy = - ballSpeed.current;
}

// BALL AND PADDLE COLLISION
function ballPaddleCollision(){
    if(ball.x < paddle.x + paddle.width && ball.x > paddle.x && paddle.y < paddle.y + paddle.height && ball.y > paddle.y){
        
        // PLAY SOUND
        PADDLE_HIT.play();
        
        // CHECK WHERE THE BALL HIT THE PADDLE
        let collidePoint = ball.x - (paddle.x + paddle.width/2);
        
        // NORMALIZE THE VALUES
        collidePoint = collidePoint / (paddle.width/2);
        
        // CALCULATE THE ANGLE OF THE BALL
        let angle = collidePoint * Math.PI/3;
            
            
        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = - ballSpeed.current ;
    }
}

// CREATE THE BRICKS
const brick = {
    row : brickMode.current,
    column : 9,
    width : 55,
    height : 20,
    offSetLeft : 20,
    offSetTop : 20,
    marginTop : 80,
    fillColor : "#2e3548",
    strokeColor : "#FFF"
}

let bricks = [];

function createBricks(){
   // console.log(brickMode.current);
    
   brick.row = brickMode.current+LEVEL;
    
    for(let r = 0; r < brick.row; r++){
        bricks[r] = [];
        for(let c = 0; c < brick.column; c++){
            bricks[r][c] = {
                x : c * ( brick.offSetLeft + brick.width ) + brick.offSetLeft,
                y : r * ( brick.offSetTop + brick.height ) + brick.offSetTop + brick.marginTop,
                status : true
            }
        }
    }
}



// draw the bricks
function drawBricks(){
    
    brick.row =brickMode.current+LEVEL;
    for(let r = 0; r < brick.row; r++){
        for(let c = 0; c < brick.column; c++){
            let b = bricks[r][c];
            // if the brick isn't broken
            if(b.status){
                ctx.fillStyle = brick.fillColor;
                ctx.fillRect(b.x, b.y, brick.width, brick.height);
                
                ctx.strokeStyle = brick.strokeColor;
                ctx.strokeRect(b.x, b.y, brick.width, brick.height);
            }
        }
    }
}

// ball brick collision
function ballBrickCollision(){
    for(let r = 0; r < brick.row; r++){
        for(let c = 0; c < brick.column; c++){
            let b = bricks[r][c];
            // if the brick isn't broken
            if(b.status){
                if(ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brick.width && ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brick.height){
                    BRICK_HIT.play();
                    ball.dy = - ball.dy;
                    b.status = false; // the brick is broken
                    SCORE += SCORE_UNIT;
                }
            }
        }
    }
}

// Create Buttons Mode

//Easy Mode
//ctx.drawImage(ButtonSprits_IMG,495,242,210,63, cvs.width/2-100, cvs.height/4,210,63);
const easyButton = {
    sX : 495,
    sY : 242,
    w : 210,
    h : 63,
    x : cvs.width/2-100,
    y : cvs.height/3,
    
    draw : function(){
        ctx.drawImage(ButtonSprits_IMG, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
    
}

//Medium button
//ctx.drawImage(ButtonSprits_IMG,495,332,210,63, cvs.width/2-100, cvs.height/4+63+30,210,63);
const MediumButton = {
    sX : 495,
    sY : 332,
    w : 210,
    h : 63,
    x : cvs.width/2-100,
    y : cvs.height/3+easyButton.h+buttonGap,
    
    draw : function(){
        ctx.drawImage(ButtonSprits_IMG, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
    
}

//Hard button

const hardButton = {
    sX : 495,
    sY : 418,
    w : 210,
    h : 63,
    x : cvs.width/2-100,
    y : cvs.height/3+easyButton.h+MediumButton.h+(buttonGap*2),
    
    draw : function(){
        ctx.drawImage(ButtonSprits_IMG, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
    
}

//Rest button 
const RESETButton = {

    x :cvs.width/2-85 ,
    y : cvs.height/2+(3*(buttonGap*2)),
    
    
}

//Start button

const StartButton = {
    sX : 786,
    sY : 126,
    w : 2720,
    h : 1150,
    x : cvs.width/2-110,
    y : cvs.height/4,
    
    draw : function(){
        ctx.drawImage(StartButton_IMG, this.sX, this.sY, this.w, this.h, this.x, this.y, hardButton.w+20, hardButton.h+50);
    }
    
}

//About button

const AboutButton = {
    sX : 786,
    sY : 2560,
    w : 2720,
    h : 1150,
    x : cvs.width/2-110,
    y : cvs.height/4+  hardButton.h+60  + buttonGap,
    
    draw : function(){
        ctx.drawImage(StartButton_IMG, this.sX, this.sY, this.w, this.h, this.x, this.y, hardButton.w+20, hardButton.h+50);
    }
    
}

// show game stats
function showGameStats(text, textX, textY, img, imgX, imgY){
    // draw text
    ctx.fillStyle = "#FFF";
    ctx.font = "25px Germania One";
    ctx.fillText(text, textX, textY);
    
    // draw image
    ctx.drawImage(img, imgX, imgY, width = 25, height = 25);
}

// DRAW FUNCTION
function draw(){
    drawPaddle();
    
    drawBall();
    
    drawBricks();
    
    // SHOW SCORE
    showGameStats(SCORE, 35, 25, SCORE_IMG, 5, 5);
    // SHOW LIVES
    showGameStats(LIFE, cvs.width - 25, 25, LIFE_IMG, cvs.width-55, 5); 
    // SHOW LEVEL
    showGameStats(LEVEL, cvs.width/2, 25, LEVEL_IMG, cvs.width/2 - 30, 5);

    //ctx.drawImage(MUTE_IMG, 10 , 750, width = 35, height = 35);
}

// game over
function gameOver(){
    if(LIFE <= 0){
        showYouLose();
        GAME_OVER = true;
    }
}

// level up
function levelUp(){
    let isLevelDone = true;
    
    // check if all the bricks are broken
    for(let r = 0; r < brick.row; r++){
        for(let c = 0; c < brick.column; c++){
            isLevelDone = isLevelDone && ! bricks[r][c].status;
        }
    }
    
    if(isLevelDone){
        WIN.play();
        
        if(LEVEL >= MAX_LEVEL){
            showYouWin();
            gameState.current = gameState.gamewin; 
            GAME_OVER = true;
            return;
        }
        //brick.row++;
        LEVEL++;
        createBricks();
        ball.speed += 0.5;
        resetBall();
       
    }
}

// UPDATE GAME FUNCTION
function update(){
    movePaddle();
    
    moveBall();
    
    ballWallCollision();
    
    ballPaddleCollision();
    
    ballBrickCollision();
    
    gameOver();
    
    levelUp();
}

// GAME LOOP
function loop(){
    // CLEAR THE CANVAS
    if(gameState.current == gameState.selectMode){

        ctx.drawImage(SELECTMODEBG_IMG,0,0,1267,713, 0, 0,cvs.width,cvs.height);
        easyButton.draw();
        MediumButton.draw();
        hardButton.draw();
        GameSelect_sound.play();
    }
    else if(gameState.current == gameState.gameplay){
        ctx.drawImage(BG_IMG, 0, 0);
        draw();
        update();
    }
    else if(gameState.current== gameState.StartMode){
        ctx.drawImage(SELECTMODEBG_IMG,0,0,1267,713, 0, 0,cvs.width,cvs.height);
        StartButton.draw();
        AboutButton.draw();
        GameSelect_sound.play();

    }
    else if(gameState.current == gameState.gamewin){
       
        showYouWin();
    }
    console.log(gameState.current)
 if(gameState.current ==  gameState.gameAbout){
        console.log(":in loop")
        ctx.drawImage(SELECTMODEBG_IMG,0,0,1267,713, 0, 0,cvs.width,cvs.height);
        ShowAbout();
    }

    //console.log(gameState)
    if(!GAME_OVER){
        requestAnimationFrame(loop);
    }

    



}
loop();


// SELECT SOUND ELEMENT


function audioManager(){
    // CHANGE IMAGE SOUND_ON/OFF
    counter++;

    
    if(counter%2 ==0){
        MUTE_IMG.src = "img/SOUND_ON.png";
    }
    else{
        MUTE_IMG.src = "img/SOUND_OFF.png";
        
    }
    draw();

    WALL_HIT.muted = WALL_HIT.muted ? false : true;
        PADDLE_HIT.muted = PADDLE_HIT.muted ? false : true;
        BRICK_HIT.muted = BRICK_HIT.muted ? false : true;
        WIN.muted = WIN.muted ? false : true;
        LIFE_LOST.muted = LIFE_LOST.muted ? false : true;
    // MUTE AND UNMUTE SOUNDS
   
}

// SHOW GAME OVER MESSAGE
/* SELECT ELEMENTS */


// CLICK ON PLAY AGAIN BUTTON
/*restart.addEventListener("click", function(){
    location.reload(); // reload the page
})*/
//About message
function ShowAbout(){
    
    ctx.fillStyle = "#black";
    ctx.font = "20px Germania One";
    ctx.fillText("* You Can use Arrows Right / Left To pLay" , easyButton.x-60,easyButton.y);
    ctx.fillText("* you Must not let ball fall  " , easyButton.x-60,easyButton.y+30);
    ctx.fillText("* you must destory all bricks to win and pass the level" , easyButton.x-60,easyButton.y+60);
    ctx.fillText("Back To Menu", easyButton.x+60,easyButton.y+120 );
    WON_sound.play();
}


// SHOW YOU WIN
function showYouWin(){
    ctx.drawImage(WON_IMG,0,0,6500,2925, 0, 0,cvs.width,cvs.height);
    ctx.fillStyle = "#FFF";
    ctx.font = "45px Germania One";
    ctx.fillText("You Win", easyButton.x+10,easyButton.y );
    ctx.fillText("PLAY AGAIN", easyButton.x-35,easyButton.y+60 );
    WON_sound.play();
   // gameover_sound.play();
    
}

// SHOW YOU LOSE
function showYouLose(){
  //  gameover.style.display = "block";
   // youlose.style.display = "block";
   // ctx.drawImage(GAMEOVER_IMG, 0, 0);
    ctx.drawImage(GAMEOVER_IMG,0,0,2000,2000, 0, 0,cvs.width,cvs.height);
    ctx.fillStyle = "#FFF";
    ctx.font = "40px Germania One";
    ctx.fillText("PLAY AGAIN", RESETButton.x,RESETButton.y );
    gameover_sound.play();
    //RESETButton.draw();
}



















