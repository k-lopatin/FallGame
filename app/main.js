/**
 * Created by Константин on 12.01.2015.
 */
var game = new Phaser.Game(400, 640, Phaser.AUTO, '', { preload: preload, create: create });

function preload() {

    game.load.image('ball', '../assets/img/ellipse.png');
    game.load.image('block', '../assets/img/polygon.png');

}

function setBlocks() {
    for(var i=0; i<400; i+=67){
        var block = game.add.sprite(i, 610, 'block');
        console.log(game.world.height);
    }
}

function create() {
    game.stage.backgroundColor = '#f4f4e8';
    setBlocks();
}

function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

setInterval( function() {
    var ball = game.add.sprite(getRandomInt(0, 355), 0, 'ball');
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    ball.body.velocity.x = 0;
    ball.body.velocity.y = getRandomInt(50, 300);
    ball.inputEnabled = true;
    ball.events.onInputDown.add(ballClicked, ball);
}, 400)

function ballClicked(){
    this.kill();
}



