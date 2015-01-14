function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function killAllSprites(sprites){
	for(var i=0; i<sprites.length; i++){
		sprites[i].kill();
	}
}