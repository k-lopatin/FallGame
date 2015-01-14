function getRecordTime(){
	var record = localStorage.getItem("recordTime");
	if (record === null) {
  		return 0;
	} else {
		return record;
	}
}
function getRecordPoints(){
	var record = localStorage.getItem("recordPoints");
	if (record === null) {
  		return 0;
	} else {
		return record;
	}
}

function checkRecordTime(time){
	var record = getRecordTime();
	if(time > record){
		localStorage.setItem("recordTime", time);
		alert("Поздравляем! У вас новый рекорд, вы продержались "+time+" секунд!");
	}
}

function checkRecordPoints(points){
	var record = getRecordPoints();
	if(points > record){
		localStorage.setItem("recordPoints", points);
		alert("Поздравляем! У вас новый рекорд, вы получили "+points+" очков!");
	}
}