/**
 * Created by Константин on 12.01.2015.
 */

GAME_WIDTH = window.innerWidth;
GAME_HEIGHT = window.innerHeight;

var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, '', {preload: preload, create: create, update: update});

function preload() {

    game.load.image('ball', 'assets/img/ellipse.png');
    game.load.image('block', 'assets/img/polygon.png');
    game.load.image('crazy_ball', 'assets/img/crazy.png');

    game.load.image('stop_balls', 'assets/img/time_ellipse.png');
    game.load.image('bomb', 'assets/img/bomb.png');
    game.load.image('life', 'assets/img/heart.png');

    game.load.image('restart', 'assets/img/reload.png');

}

var blocks = [];
var balls = [];
var fallingBlocks = [];


var points;
var pointsText;
var time;
var timeText;

var isStop = false;


var maxBlockY;

function setBlocks() {

    for (var i = 0; i < GAME_WIDTH; i += BLOCK_WIDTH + BLOCK_SPACE) {
        var block = game.add.sprite(i, GAME_HEIGHT - BLOCK_HEIGHT, 'block');
        game.physics.enable(block, Phaser.Physics.ARCADE);
        blocks.push(block);
    }
}
function setPoints(){
    points = INITIAL_POINTS;
    var style = { font: "26px Arial", fill: "#353", weight: "bold" };
    pointsText = game.add.text(10, 10, ''+points, style);
}
function setTimeSec(){
    time = 0;
    var style = { font: "26px Arial", fill: "#833", weight: "bold" };
    timeText = game.add.text(GAME_WIDTH - 50, 10, ''+time, style);
}

function setLifes(){
    var style = { font: "26px Arial", fill: "#353", weight: "bold" };
    lifesText = game.add.text(GAME_WIDTH/2, 10, ''+lifes, style);

    var lifesPic = game.add.sprite(GAME_WIDTH/2 - 28, 13, 'life');
    lifesPic.width = 24;
    lifesPic.height = 24;
}

/*--- SECONDS ---*/
var timeInterval = setInterval(function(){
    time++;
    timeText.text = ''+time;
}, 999);

function create() {
    game.stage.backgroundColor = '#f4f4e8';
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    setBlocks();
    setPoints();
    setTimeSec();
    setLifes();

    maxBlockY = GAME_HEIGHT - BLOCK_HEIGHT;
}

function update() {
    if(isStop) return;

    checkFallingBall();
    
    checkFallingBlock();
}

function checkFallingBall(){
    for(var i=0; i<balls.length; i++){
        if(balls[i].y > GAME_HEIGHT - BALL_HEIGHT - 1){
            console.log(balls[i].y);
            balls[i].y= 0;
            checkLifes();
            //game.destroy();
        }
        for(var j=0; j<blocks.length; j++){
            game.physics.arcade.collide(balls[i], blocks[j], blockCollide, null, this);
        }
    }
}

function checkFallingBlock(){
    for(var i=0; i<fallingBlocks.length; i++){
        if(fallingBlocks[i].y > GAME_HEIGHT - BLOCK_HEIGHT - 2){
            fallingBlocks[i].body.velocity.y = 0;
            fallingBlocks[i].y = GAME_HEIGHT - BLOCK_HEIGHT;
            removeBlockFromFalling(fallingBlocks[i]);
        }

        for(var j=0; j<blocks.length; j++){
            game.physics.arcade.collide(fallingBlocks[i], blocks[j], fallingBlockCollide, null, this);
        }
    }
}

/*------ balls falling ------*/
var ballsInterval = setInterval(function () {
    var ball = game.add.sprite(getRandomInt(0, GAME_WIDTH - BALL_WIDTH - 1), -BALL_HEIGHT, 'ball');
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    ball.body.velocity.x = 0;
    ball.body.velocity.y = getRandomInt(50+time*4, 100+time*10);
    ball.inputEnabled = true;
    ball.events.onInputDown.add(ballClicked, ball);

    balls.push(ball);

 }, 1000)

/*------ crazy balls falling ------*/
var crazyBallsInterval = setInterval(function () {
    var ball = game.add.sprite(getRandomInt(0, GAME_WIDTH - BALL_WIDTH - 1), -BALL_HEIGHT, 'crazy_ball');
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    ball.body.velocity.x = getRandomInt(0, 400);
    ball.body.velocity.y = getRandomInt(200, 350+time*2);

    ball.body.collideWorldBounds = true;
    ball.body.bounce.setTo(1, 1);

    ball.inputEnabled = true;
    ball.events.onInputDown.add(ballClicked, ball);

    balls.push(ball);

 }, 1500)


/*------ blocks falling ------*/
var blocksInterval = setInterval(function () {
    var c = getRandomInt(0, 5)
    var block = game.add.sprite(67*c, -45, 'block');
    game.physics.enable(block, Phaser.Physics.ARCADE);
    block.body.velocity.x = 0;
    block.body.velocity.y = getRandomInt(50, 200);
    block.inputEnabled = true;
    block.events.onInputDown.add(fallingBlockClicked, block);

    fallingBlocks.push(block);
    blocks.push(block);
}, 2000)




function ballClicked() {
    killBall(this);
    points += 5;
    pointsText.text = ''+points;
}
function fallingBlockClicked() {
    this.kill();
    points -= 2;
    pointsText.text = ''+points;
}




function StartBallsMove(){
    setTimeout(function(){
        for(var i=0; i<balls.length; i++){
            switch(balls[i].key)
            {
                case 'crazy_ball':
                    balls[i].body.velocity.x = getRandomInt(0, 400);
                    balls[i].body.velocity.y = getRandomInt(200, 350+time*2);
                    break;
                case 'ball' :
                    balls[i].body.velocity.x = 0;
                    balls[i].body.velocity.y = getRandomInt(50, 200);
                    break;
            }

        }
    }, 2500)
}



function blockCollide(ball, block) {
            ball.kill();
            block.kill();
}

function fallingBlockCollide(fallingBlock, block) {
    fallingBlock.body.velocity.y = 0;
    block.body.velocity.y = 0;


    /*-- check if height of blocks wall is higher ---*/
    if(fallingBlock.y < maxBlockY){
        maxBlockY = fallingBlock.y;
    }

    removeBlockFromFalling(fallingBlock);
}

function removeBlockFromFalling(block){
    block.events.onInputDown.removeAll();
    for(var i=0; i<fallingBlocks.length; i++){
        if(fallingBlocks[i] == block){
            fallingBlocks[i] == null;
            return;
        }
    }
}

function checkLifes(){
    console.log('test');
    
    checkLifeAnimation();
    if(lifes == 0){
        finishGame();
    } 
}

function finishGame(){

    isStop = true;

    killAllSprites( balls );
    killAllSprites( blocks );
    killAllSprites( fallingBlocks );
    killAllSprites( bonuses );

    clearInterval( timeInterval );
    clearInterval( ballsInterval );
    clearInterval( crazyBallsInterval );
    clearInterval( blocksInterval );
    clearInterval( bonusInterval );

    checkRecordTime(time);
    checkRecordPoints(points);

    var restart = game.add.sprite(GAME_WIDTH/2, GAME_HEIGHT/2, 'restart');
    restart.anchor.setTo(0.5, 0.5);
    restart.inputEnabled = true;
    restart.events.onInputDown.add(restartClicked, this);
}

function restartClicked(){
    location.reload();
}

/*
function bottomCollide(ball, block) {
    console.log('finished');
}
*/

