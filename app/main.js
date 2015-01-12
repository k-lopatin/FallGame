/**
 * Created by Константин on 12.01.2015.
 */

/*-- CONSTANTS ---*/
var gameWidth = 400;
var gameHeight = 640;

var blockWidth = 65;
var blockHeight = 30;
var blockSpace = 2;

var ballWidth = 45;
var ballHeight = 45;
//var initialBlockCount = 6;


var game = new Phaser.Game(400, 640, Phaser.AUTO, '', {preload: preload, create: create, update: update});

function preload() {

    game.load.image('ball', '../assets/img/ellipse.png');
    game.load.image('block', '../assets/img/polygon.png');

}

var blocks = [];
var balls = [];
var fallingBlocks = [];

function setBlocks() {

    for (var i = 0; i < gameWidth; i += blockWidth + blockSpace) {
        var block = game.add.sprite(i, gameHeight - blockHeight, 'block');
        game.physics.enable(block, Phaser.Physics.ARCADE);
        blocks.push(block);
    }
}

function create() {
    game.stage.backgroundColor = '#f4f4e8';
    setBlocks();
}

function update() {
    //console.log(bottom);
    
    checkFallingBall();
    
    checkFallingBlock();
}

function checkFallingBall(){
    for(var i=0; i<balls.length; i++){
        if(balls[i].y > gameHeight - ballHeight){
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
        if(fallingBlocks[i].y > gameHeight - blockHeight - 2){
            fallingBlocks[i].body.velocity.y = 0;
            fallingBlocks[i].y = gameHeight - blockHeight;
        }

        for(var j=0; j<blocks.length; j++){
            game.physics.arcade.collide(fallingBlocks[i], blocks[j], fallingBlockCollide, null, this);
        }
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*------ balls falling ------*/
setInterval(function () {
    var ball = game.add.sprite(getRandomInt(0, 355), -45, 'ball');
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    ball.body.velocity.x = 0;
    ball.body.velocity.y = getRandomInt(50, 300);
    ball.inputEnabled = true;
    ball.events.onInputDown.add(ballClicked, ball);

    balls.push(ball);

 }, 400)


/*------ blocks falling ------*/
setInterval(function () {
    var c = getRandomInt(0, 5)
    var block = game.add.sprite(67*c, -45, 'block');
    game.physics.enable(block, Phaser.Physics.ARCADE);
    block.body.velocity.x = 0;
    block.body.velocity.y = getRandomInt(150, 200);
    block.inputEnabled = true;
    block.events.onInputDown.add(fallingBlockClicked, block);

    fallingBlocks.push(block);
    blocks.push(block);
}, 1500)

function ballClicked() {
    this.kill();
}
function fallingBlockClicked() {
    this.kill();
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
}

/*
function bottomCollide(ball, block) {
    console.log('finished');
}
*/

