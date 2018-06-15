
var scl;
var rows;
var cols;
var s;
var hisX;
var hisY;
var food;
var score;
var stop;

function setup(){

	frameRate(7);
	createCanvas(400,400);
	scl = 20;
	rows = width/scl;
	cols = height/scl;
	s = new Snake();
	hisX = [];
	hisY = [];
	food = new Food();
	score = 0;

}

function keyPressed(){

		if(keyCode == 65){
			s.speedx = -scl;
			s.speedy = 0;
		}

		else if(keyCode == 68){
			s.speedx = scl;
			s.speedy = 0;
		}

		else if(keyCode == 87){
			s.speedx = 0;
			s.speedy = -scl;
		}

		else if(keyCode == 83){
			s.speedx = 0;
			s.speedy = scl;
		}
		
}


function Food(){

	var r = floor(random(0,rows));
	var t = floor(random(0,cols));
	this.x = r*scl;
	this.y = t*scl;
	this.sz = scl;


	this.show = function(){
		push();
		fill(255,0,0);
		rect(this.x, this.y, scl, scl);
		pop();
	}

	this.update = function(){

		this.x = scl*(floor(random(0,rows)));
		this.y = scl*(floor(random(0,cols)));
	}

}


function Snake(){
	
	this.x = 0;
	this.y = 0;
	this.sz = scl;
	this.speedx = scl;
	this.speedy = 0;

	this.update = function(){
		this.x += this.speedx;
		this.y += this.speedy;
	}

	this.show = function(){
		rect(this.x, this.y, scl, scl);
	}

}

function draw(){

	background(51);
	s.update();
	s.show();
	food.show();
	for(i = 0; i < hisX.length; i++){
		if(s.x == hisX[i] && s.y == hisY[i]){
			s.x = 0;
			s.y = 0;
			s.speedx = scl;
			s.speedy = 0;
			hisX = [];
			hisY = [];
			score = 0;
		}
	}
	hisX.push(s.x);
	hisY.push(s.y);
	push();
	color(0,255,0);
	textSize(40);
	text('Score = ' + score, 10, 40);
	pop();

	for(var i = hisX.length-1; i >= 0; i--){
		fill(255);
		rect(hisX[i], hisY[i], scl, scl);
	}	
	
	if(dist(s.x, s.y, food.x, food.y) < 2){
		food.update();
		hisX.push(s.x);
		hisY.push(s.y);
		score++;
	}
	hisX.shift();
	hisY.shift();
	

	if(s.x > width-scl || s.x < 0 || s.y > height-scl || s.y < 0){
		s.x = 0;
		s.y = 0;
		s.speedx = scl;
		s.speedy = 0;
		hisX = [];
		hisY = [];
		score = 0;
	}	
	
}
