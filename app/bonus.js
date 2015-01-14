var bonuses = [];
var lifes = 1;
var lifesText;

var bonusInterval = setInterval(function(){
    var ch = getRandomInt(1, 6);
    switch(ch){
    	case 1:
    	case 2:
    		timeStopBonus();
    		break;
    	case 3:
    	case 4:
    		bombBonus();
    		break;
    	case 5:
    		lifeBonus();
    }

}, 3500)

function timeStopBonus(){
	var x = getRandomInt(5, GAME_WIDTH-TIMEOUT_WIDTH-5);
    var y = getRandomInt(5, maxBlockY-TIMEOUT_HEIGHT-5);
    var timestop = game.add.sprite(x, y, 'stop_balls');
    timestop.inputEnabled = true;
    timestop.events.onInputDown.add(timeStopClicked, timestop);
    killTimeStopStatic(timestop);
    bonuses.push(timestop);
}

function bombBonus(){
	var x = getRandomInt(5, GAME_WIDTH-BOMB_WIDTH-5);
    var y = getRandomInt(5, maxBlockY-BOMB_HEIGHT-5);
    var bomb = game.add.sprite(x, y, 'bomb');
    bomb.inputEnabled = true;
    bomb.events.onInputDown.add(bombClicked, bomb);
    killBonusStatic(bomb);
    bonuses.push(bomb);
}

function lifeBonus(){
	var x = getRandomInt(5, GAME_WIDTH - LIFE_WIDTH - 5);
    var y = getRandomInt(5, maxBlockY - LIFE_HEIGHT - 5);
    var life = game.add.sprite(x, y, 'life');
    life.width = 45;
    life.height = 45;

    life.inputEnabled = true;
    life.events.onInputDown.add(lifeClicked, life);
    killBonusStatic(life);
    bonuses.push(life);
}



function killTimeStopStatic(t) {
    setTimeout(function () {
        killTimeStop(t);
        points -= 2;
        pointsText.text = '' + points;
    }, 2500)
}
function killBonusStatic(bonus) {
    setTimeout(function () {
        bonus.kill();
        points -= 2;
        pointsText.text = '' + points;
    }, 2500)
}

function timeStopClicked() {
    for(var i=0; i<balls.length; i++){
        balls[i].body.velocity.x = 0;
        balls[i].body.velocity.y = 0;
    }
    killTimeStop(this);
    StartBallsMove();
}

function bombClicked() {
    points += 12;
    pointsText.text = ''+points;
    killBomb(this);
    for(var i=0; i<balls.length; i++){
        killBall(balls[i]);
    }
}

function lifeClicked() {
    points += 7;
    pointsText.text = ''+points;
    lifes++;
    lifesText.text = ''+lifes;
    killLifeBonus(this);
}