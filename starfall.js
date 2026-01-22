/*!
// Snow.js, originally v0.0.3 from kurisubrooks.com / https://www.cssscript.com/minimalist-falling-snow-effect-with-pure-javascript-snow-js/
// with modifications from me [sneek]
*/

// Amount of Snowflakes
// var snowMax = 20;
var snowMax = document.body.scrollHeight / 100;
if(snowMax < 10) {snowMax = 10;}
if(snowMax > 200) {snowMax = 200;}
// console.log(snowMax);

// Snowflake Colours
// var snowColor = ["#FFF", "#EEE"];
// var snowColor = "var(--maintext)";
var snowColor = ['#eac05f'];

// Snow Entity
// var snowEntity = ["<img src='/pics/...' alt=''>", "*", "●"];
var starEntity = "★";

// Falling Velocity (can be set negative too, won't break in this ver)
var snowSpeed = 0.75;

// Min + Max Flake Size
var snowMinSize = 15;
var snowMaxSize = 30;

// Refresh Rate (in milliseconds)
var snowRefresh = 35;

// additional styles via base.css in my case

// End of Config

var snow = [],
	pos = [],
	coords = [],
	lefr = [],
	marginBottom,
	marginRight;

function randomise(range) {
	rand = Math.floor(range * Math.random());
	return rand;
}

function initSnow() {
	var snowSize = snowMaxSize - snowMinSize;
	marginBottom = document.body.scrollHeight + snowMaxSize / 2;
	marginRight = window.innerWidth - 50;
	// marginBottom = window.innerHeight - 5;
	// marginRight = window.innerWidth - snowMaxSize;

	for (i = 0; i <= snowMax; i++) {
		coords[i] = 0;
		lefr[i] = Math.random() * 15 * snowSpeed;
		pos[i] = 0.03 + Math.random() / 10;
		snow[i] = document.getElementById("flake" + i);
		snow[i].style.fontFamily = "inherit";
		snow[i].size = randomise(snowSize) + snowMinSize;
		snow[i].style.fontSize = snow[i].size + "px";
		snow[i].style.color = snowColor[randomise(snowColor.length)];
		snow[i].style.zIndex = 10;
		snow[i].sink = snowSpeed * snow[i].size / 5;
		snow[i].posX = randomise(marginRight - snow[i].size);
		snow[i].posY = randomise(2 * marginBottom - marginBottom - 2 * snow[i].size);
		snow[i].style.left = snow[i].posX + "px";
		snow[i].style.top = snow[i].posY + "px";
	}

	moveSnow();
}

function resize() {
	marginBottom = document.body.scrollHeight + snowMaxSize / 2;
	marginRight = window.innerWidth - 50;
}

function moveSnow() {
	for (i = 0; i <= snowMax; i++) {
		coords[i] += pos[i];
		snow[i].posY += snow[i].sink;
		snow[i].style.left = snow[i].posX + lefr[i] * Math.sin(coords[i]) + "px";
		snow[i].style.top = snow[i].posY + "px";

		if (snow[i].posY < -snow[i].size || snow[i].posY >= marginBottom - 2 * snow[i].size || parseInt(snow[i].style.left) > (marginRight - 3 * lefr[i])) {
			snow[i].posX = randomise(marginRight - snow[i].size);
			if (snowSpeed < 0) {
				snow[i].posY = marginBottom - snow[i].size * 2;
			} else {
				snow[i].posY = -snow[i].size;
			}
		}
	}

	setTimeout("moveSnow()", snowRefresh);
}

function invisibleSnow() {
	if (snow[0].style.display == 'initial') {
		for (i = 0; i <= snowMax; i++) {
			snow[i].style.display = 'none';
		}
	} else {
		for (i = 0; i <= snowMax; i++) {
			snow[i].style.display = 'initial';
		}
	}
}

for (i = 0; i <= snowMax; i++) {
	document.write("<span id='flake" + i + "' style='display: initial; transform: rotate(" + randomise(60) + "deg); position:absolute; top: -" + snowMaxSize + "px'>" + starEntity[randomise(starEntity.length)] + "</span>");
}

window.addEventListener('load', initSnow);
window.addEventListener('resize', resize);