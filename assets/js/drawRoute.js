var mapWidth;
var mapHeight;
var scaleFactor;
var currentFloor = 1;
var allRooms = [];

const FLOOR_1_WIDTH = 613;
const FLOOR_1_HEIGHT = 541;
const FLOOR_2_WIDTH = 617;
const FLOOR_2_HEIGHT = 528;
var route = [
	{floor:1,x:5,y:26},
	{floor:1,x:7,y:26},
	{floor:1,x:7,y:12},
	{floor:2,x:6,y:10},
	{floor:2,x:6,y:11},
	{floor:2,x:21,y:11},
	{floor:2,x:21,y:9},
	{floor:2,x:25,y:9}
];

$(document).ready(function(){
	getRooms();
	loadMap();
});
$(window).resize(loadMap);

function loadMap() {
	mapWidth = Math.floor($(window).innerWidth() * 0.6);
	mapHeight = Math.floor(mapWidth/FLOOR_1_WIDTH * FLOOR_1_HEIGHT);
	scaleFactor = mapWidth*1.0/FLOOR_1_WIDTH;
	console.log('map width:  '+mapWidth);
	console.log('map height:  '+mapHeight);

	$('#map').html('');
	let mapDivStart = `
		<svg id="routesvg"
			width="${mapWidth}"
			height="${mapHeight}"
		>
			<image
				id="floorplanImg"
				x="0"
				y="0"
				href="assets/images/fsb${currentFloor}.png"
				width="${mapWidth}"
				height="${mapHeight}"
			/>
		`;
	let mapDivMid = loadRoute();
	let mapDivEnd = `
	   	<br />
		</svg>
		<button class="btn btn-danger btn-xs" onclick="changeFloor(1);">Floor 1</button>
		<button class ="btn btn-danger btn-xs" onclick="changeFloor(2)">Floor 2</button>
	`;
	// fill in the entire div with svg stuff
	$('#map').html(mapDivStart+mapDivMid+mapDivEnd);
}
function changeFloor(newFloor) {
	// document.getElementById('floorplanImg').href='assets/images/fsb'+newFloor+'.png';
	currentFloor = newFloor;
	loadMap();
}
function xcoord(x) {
	return String(Math.round((x+0.5)*(1/57)*mapWidth));
}
function ycoord(y) {
	return String(Math.round((y+0.5)*(1/51)*mapHeight));
}
function loadRoute() {
	// loop through coordinates in route
	let lines = '';
	for(let i=0;i<route.length-1;i++) {
		if(route[i].floor!==route[i+1].floor) continue;
		if(route[i].floor!==currentFloor) continue;
		let line = `
			<line
				x1="${xcoord(route[i].x)}"
				y1="${ycoord(route[i].y)}"
				x2="${xcoord(route[i+1].x)}"
				y2="${ycoord(route[i+1].y)}"
				stroke="blue"
				stroke-width="3"
			/>
		`;
		// console.log(line);
		lines += line;
	}
	// console.log('lines:');
	// console.log(lines);
	let start = route.length>0 && route[0].floor===currentFloor?`
		<circle
			cx=${xcoord(route[0].x)}
			cy=${ycoord(route[0].y)}
			r="5"
			fill="#005500"
		/>
		<circle
			cx=${xcoord(route[0].x)}
			cy=${ycoord(route[0].y)}
			r="3"
			fill="#00bb00"
		/>
	`:'';
	let end = route.length>0 && route[route.length-1].floor===currentFloor?`
		<circle
			cx=${xcoord(route[route.length-1].x)}
			cy=${ycoord(route[route.length-1].y)}
			r="6"
			fill="red"
		/>
		<circle
			cx=${xcoord(route[route.length-1].x)}
			cy=${ycoord(route[route.length-1].y)}
			r="3"
			fill="black"
		/>
	`:'';
	lines += start;
	lines += end;
	return lines;
}

function getRooms() {
	let url = 'http://10.36.0.144:3000/rooms';
	$.ajax(url,{
		method: 'GET',
		dataType: 'json',
		success: function(data) {
			console.log('success');
			console.log(data);
			allRooms = data;
			allRooms.sort((a,b)=>a.roomName.localeCompare(b.roomName));
			fillRooms();
		},
		error: function(jqhxr,text,err) {
			console.log(text);
			console.log(err);
		}
	})
}
function fillRooms() {
	console.log('filling rooms');
	for(let i=0;i<allRooms.length;i++) {
		let room = `
			<option value="${allRooms[i].roomNumber}">
				${allRooms[i].roomName}
			</option>
		`;
		console.log(room);
		$('#start').append(room);
		$('#end').append(room);
	}
}
