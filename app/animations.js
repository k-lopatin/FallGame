function killBall(ball){
	ball.body.velocity.y = 0;
	ball.body.velocity.x = 0;
	var killInt = setInterval(function(){
		ball.width = ball.width-1;
		ball.height = ball.height-1;
		if(ball.width < 3 || ball.height < 3){
			ball.kill();
			clearInterval(killInt);
			return;
		}
	}, 4)
}

function killTimeStop(timestop){
	var killInt = setInterval(function(){
		timestop.width = timestop.width-1;
		timestop.height = timestop.height-1;
		timestop.angle = timestop.angle + 7;
		if(timestop.width < 3 || timestop.height < 3){
			timestop.kill();
			clearInterval(killInt);
			return;
		}
	}, 4)
}

function killBomb(bomb){
	var killInt = setInterval(function(){
		bomb.width = bomb.width-1;
		bomb.height = bomb.height-1;
		if(bomb.width < 3 || bomb.height < 3){
			bomb.kill();
			clearInterval(killInt);
			game.stage.backgroundColor = '#f4f4e8';
			return;
		}
		game.stage.backgroundColor = '#f45555';
	}, 3)
	
}

function killLifeBonus(life){
	game.stage.backgroundColor = '#55ff55';
	life.kill();
	setTimeout(function(){
		game.stage.backgroundColor = '#f4f4e8';
	}, 90);
	
}


function checkLifeAnimation(){
	isStop = true;
	game.stage.backgroundColor = '#000';

	killAllSprites(balls);

	lifes--;
    lifesText.text = ''+lifes;

	setTimeout(function(){
		isStop = false;
		game.stage.backgroundColor = '#f4f4e8';
	}, 150);
}