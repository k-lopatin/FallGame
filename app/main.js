/**
 * Created by Константин on 12.01.2015.
 */
var game = new Phaser.Game(400, 640, Phaser.AUTO, '', {preload: preload, create: create, update: update});

function preload() {

    game.load.image('ball', '../assets/img/ellipse.png');
    game.load.image('block', '../assets/img/polygon.png');

}

var blocks = [];
var balls = [];
var helperSprites = [];

function setBlocks() {

    for (var i = 0; i < 400; i += 67) {
        var block = game.add.sprite(i, 610, 'block');
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
    for(var i=0; i<balls.length; i++){
        if(balls[i].y > 590){
            alert('Game is Finished');
            game.destroy();
        }
        for(var j=0; j<blocks.length; j++){
            game.physics.arcade.collide(balls[i], blocks[j], blockCollide, null, this);
        }
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

setInterval(function () {
    var ball = game.add.sprite(getRandomInt(0, 355), -45, 'ball');
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    ball.body.velocity.x = 0;
    ball.body.velocity.y = getRandomInt(50, 300);
    ball.inputEnabled = true;
    ball.body.collideWorldBounds = true;
    ball.body.bounce.setTo(1, 1);
    ball.events.onInputDown.add(ballClicked, ball);

    balls.push(ball);

}, 400)

function ballClicked() {
    this.kill();
}

function blockCollide(ball, block) {
    console.log('test');
    ball.kill();
    block.kill();
}

function bottomCollide(ball, block) {
    console.log('finished');
}


