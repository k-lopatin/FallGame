/**
 * Created by Константин on 12.01.2015.
 */

var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, '', {preload: preload, create: create, update: update});

function preload() {

    game.load.image('ball', 'assets/img/ellipse.png');
    game.load.image('block', 'assets/img/polygon.png');
    game.load.image('crazy_ball', 'assets/img/crazy.png');

}

var blocks = [];
var balls = [];
var fallingBlocks = [];

var points;
var pointsText;
var time;
var timeText;

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

/*--- SECONDS ---*/
setInterval(function(){
    time++;
    timeText.text = ''+time;
}, 999);

function create() {
    game.stage.backgroundColor = '#f4f4e8';
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    setBlocks();
    setPoints();
    setTimeSec();
}

function update() {

    checkFallingBall();
    
    checkFallingBlock();
}

function checkFallingBall(){
    for(var i=0; i<balls.length; i++){
        if(balls[i].y > GAME_HEIGHT - BALL_HEIGHT-1){
            alert('Game is Finished');
            game.destroy();
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
setInterval(function () {
    var ball = game.add.sprite(getRandomInt(0, 355), -45, 'ball');
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    ball.body.velocity.x = 0;
    ball.body.velocity.y = getRandomInt(50+time*4, 100+time*10);
    ball.inputEnabled = true;
    ball.events.onInputDown.add(ballClicked, ball);

    balls.push(ball);

 }, 1000)

/*------ crazy balls falling ------*/
setInterval(function () {
    var ball = game.add.sprite(getRandomInt(0, 355), -45, 'crazy_ball');
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
setInterval(function () {
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


function blockCollide(ball, block) {
    console.log('test');
    ball.kill();
    block.kill();
}

function fallingBlockCollide(fallingBlock, block) {
    console.log('oops');
    fallingBlock.body.velocity.y = 0;
    block.body.velocity.y = 0;
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

/*
function bottomCollide(ball, block) {
    console.log('finished');
}
*/

