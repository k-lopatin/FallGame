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