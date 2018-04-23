function getRoute() {
	var imagePath = "assets/images/"
	var startingPoint = document.getElementById("start").value;
	var destination = document.getElementById("end").value;
	var start = startingPoint.concat("_");
	var navigationOption = document.getElementById("access").value;
	
	if (navigationOption == "elevator"){
		imagePath = imagePath.concat("elevator/");
	} else {
		imagePath = imagePath.concat("stairs/");
	}
	
	var pictureName = start.concat(destination);
	var imagePath = imagePath.concat(pictureName);
	document.getElementById('floor1').src = imagePath +".png" ;
}