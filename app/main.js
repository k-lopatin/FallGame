/**
 * Created by Константин on 12.01.2015.
 */
var game = new Phaser.Game(400, 640, Phaser.AUTO, '', { preload: preload, create: create });

function preload() {

    //  You can fill the preloader with as many assets as your game requires

    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)
    game.load.image('ball', '../assets/img/ellipse.png');
}

function create() {
    var ball = game.add.sprite(game.world.centerX, 0, 'ball');
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    ball.body.velocity.x = 0;
    ball.body.velocity.y = 50;
}

function releaseBall() {
       /* ball.body.velocity.x = 1;
        ball.body.velocity.y = 10;*/
    ball.velocity.y = 10;
}

function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



setInterval( function() {
 var ball = game.add.sprite(getRandomInt(0, 370), 0, 'ball');
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    ball.body.velocity.x = 0;
    ball.body.velocity.y = getRandomInt(50, 100);
}, 1500)
