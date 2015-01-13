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