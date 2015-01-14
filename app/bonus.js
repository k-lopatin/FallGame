var bonuses = [];

var bonusInterval = setInterval(function(){
    var ch = getRandomInt(1, 3);
    switch(ch){
    	case 1:
    		timeStopBonus();
    		break;
    	case 2:
    		bombBonus();
    		break;
    }

}, 4800)

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
	var x = getRandomInt(5, GAME_WIDTH-TIMEOUT_WIDTH-5);
    var y = getRandomInt(5, maxBlockY-TIMEOUT_HEIGHT-5);
    var bomb = game.add.sprite(x, y, 'bomb');
    bomb.inputEnabled = true;
    bomb.events.onInputDown.add(bombClicked, bomb);
    killBombStatic(bomb);
    bonuses.push(bomb);
}



function killTimeStopStatic(t) {
    setTimeout(function () {
        killTimeStop(t);
        points -= 2;
        pointsText.text = '' + points;
    }, 2500)
}
function killBombStatic(bomb) {
    setTimeout(function () {
        bomb.kill();
        points -= 2;
        pointsText.text = '' + points;
    }, 2500)
}