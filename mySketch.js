//###########################################################################
//# By Legacy Development                                                   #
//# Nim 1.0                                                                 #
//# Release 1/6/2018 8:00 AM EST                                            #
//###########################################################################

function setup() {
	createCanvas(500, 500);
	background(0);
	fill(100);
	rect(0, 0, 500, 500);
	win("start");
}

let finalLoc = 0;
function game() {
	for (ite = 1; ite < 13; ite++) {
		fill(0);
		ellipse(20 * ite, 150, 15, 15);
		finalLoc = ite;
	}
	fill(112, 6, 6);
	ellipse(20 * (ite - 1), 150, 15, 15);
	strokeWeight(0);
	fill(160);
	rect(20, 75, 200, 50);
	strokeWeight(1);
	fill(160);
	rect(275, 20, 208, 150);
	strokeWeight(0);
	fill(0);
	textSize(13);
	text("Nim - a game where you try to", 280, 40);
	text("	collect the last coin.", 280, 60);
	text("- You can only collect 1, 2, or 3", 280, 100);
	text("  coins per a turn.", 280, 120);
	text("- After your turn an AI takes a turn", 280, 160);
	textSize(23);
	text("Player's turn", 20, 120);
	button(20, 250, 40, 40, 160, 160, 160, "+1", true, 1, 3);
	button(80, 250, 40, 40, 160, 160, 160, "+2", true, 1, 4);
	button(140, 250, 40, 40, 160, 160, 160, "+3", true, 1, 5);
	textSize(13);
	show();
}

let winDatabase = [];
let winCount = 0;
let playWin = 0;
let aiWin = 0;
let winScore = 0;
let lastWin = "none";
function win(t) {
	winCount++;
	clear();
	fill(160);
	rect(0, 0, 500, 500);
	buttonReset();
	fill(0);
	if (t === "ai") {
		textSize(50);
		text("AI Wins!!!", 150, 200);
		aiWin++;
		winScore--;
		lastWin = "ai";
		winDatabase[winCount] = "AI";
	} else if (t === "play") {
		textSize(50);
		text("Player Wins!!!", 150, 200);
		playWin++;
		winScore++;
		lastWin = "play";
		winDatabase[winCount] = "PLAY";
	} else if (t === "start") {
		textSize(50);
		text("Nim", 150, 200);
	}
	strokeWeight(0);
	fill(160);
	rect(15, 390, 125, 50);
	fill(0);
	textSize(16);
	if (gameM === 2) {
		text("Hard Mode", 35, 420);
	} else if (gameM === 1) {
		text("Easy Mode", 35, 420);
	}
	button(200, 300, 50, 50, 160, 160, 160, "Start", true, 1, 6);
	button(20, 450, 40, 40, 160, 160, 160, "Easy", true, 1, 1);
	button(80, 450, 40, 40, 160, 160, 160, "Hard", true, 1, 2);
	textSize(10);
	ai = 0;
	v = 0;
	ba = 0;
	gameM = 2;
	show();
}

let ai = 0;
function draw() {
	if (ai > 0) {
		ai--;
	}
	if (ai === 1) {
		ai = -1;
		ite = 0;
		if (gameM === 1) {
			itec = floor(random(1, 4));
			fill(0);
			strokeWeight(0);
			fill(160);
			rect(20, 75, 200, 50);
			fill(0);
			text("Player's turn", 20, 120);
			while (ite < itec) {
				if (ba > 13) {
					ba = 13
				}
				fill(100, 0, 0);
				textSize(23);
				text("X", 20 * ba - 5, 156);
				ite++;
				ba++;
			}
		} else {
			if (gameM === 2) {
				ite = 0;
				strokeWeight(0);
				fill(160);
				rect(20, 75, 200, 50);
				fill(0);
				text("Player's turn", 20, 120);
				while (ite < 4 - v) {
					fill(100, 0, 0);
					textSize(23);
					text("X", 20 * ba - 5, 156);
					ite++;
					ba++;
				}
			}
		}
		if (ba >= 13) {
			win("ai");
		} else {
			ai = 0;
		}
	}
}

let eventR = 0;
let gameM = 2;
function mouseClicked() {
	eventR = check();
	if (eventR === 1) {
		gameM = 1;
		strokeWeight(0);
		fill(160);
		rect(15, 390, 125, 50);
		fill(0);
		textSize(16);
		text("Easy Mode", 35, 420);
	} else {
		if (eventR === 2) {
			gameM = 2;
			strokeWeight(0);
			fill(160);
			rect(15, 390, 125, 50);
			fill(0);
			textSize(16);
			text("Hard Mode", 35, 420);
		} else {
			if (eventR === 3) {
				if (ai === 0) {
					cross(1);
				}
			} else {
				if (eventR === 4) {
					if (ai === 0) {
						cross(2);
					}
				} else {
					if (eventR === 5) {
						if (ai === 0) {
							cross(3);
						}
					} else {
						if (eventR === 6) {
							clear();
							fill(160);
							rect(0, 0, 500, 500);
							buttonReset();
							fill(0);
							ai = 0;
							ba = 1;
							game();
						}
					}
				}
			}
		}
	}
}

let ba = 1;
let v = 0;
function cross(a) {
	if (ai === 0) {
		v = a;
		ite = 0;
		while (ite < a) {
			if (ba > 12) {
				ba = 12
			}
			textSize(23);
			fill(100, 0, 0);
			text("X", 20 * ba - 7, 158);
			ite++;
			ba++;
		}
		if (ba <= 12) {
			ai = floor(random(300, 400));
			strokeWeight(0);
			fill(160);
			rect(20, 75, 200, 50);
			fill(0);
			text("AI's turn", 20, 120);
		} else {
			if (ba >= 13) {
				if (ai === 0) {
					win("play");
				}
			}
		}
	}
}

function buttonReset() {
	buttonX = [];
	buttonY = [];
	buttonW = [];
	buttonH = [];
	buttonC1 = [];
	buttonC2 = [];
	buttonC3 = [];
	buttonT = [];
	buttonS = [];
	buttonWe = [];
	buttonE = [];
	buttonC = 0;
	buttonD = 0;
	bDetX = 0;
	bDetY = 0;
	bDetW = 0;
	bDetH = 0;
	bDetX2 = 0;
	bDetY2 = 0;
	bDetC1 = 0;
	bDetC2 = 0;
	bDetC3 = 0;
	bDetS = 0;
	bDetWe = 0;
	buttonD2 = 0;
}

let buttonX = [];
let buttonY = [];
let buttonW = [];
let buttonH = [];
let buttonC1 = [];
let buttonC2 = [];
let buttonC3 = [];
let buttonT = [];
let buttonS = [];
let buttonWe = [];
let buttonE = [];
let buttonC = 0;
let buttonD = 0;
let bDetX = 0;
let bDetY = 0;
let bDetW = 0;
let bDetH = 0;
let bDetX2 = 0;
let bDetY2 = 0;
let bDetC1 = 0;
let bDetC2 = 0;
let bDetC3 = 0;
let bDetS = 0;
let bDetWe = 0;
let buttonD2 = 0;

function button(x, y, w, h, c1, c2, c3, t, s, we, e) {
	buttonX.push(x);
	buttonY.push(y);
	buttonW.push(w);
	buttonH.push(h);
	buttonC1.push(c1);
	buttonC2.push(c2);
	buttonC3.push(c3);
	buttonT.push(t);
	buttonS.push(s);
	buttonWe.push(we);
	buttonE.push(e);
	buttonC++;
}

function check() {
	buttonD = 0;
	while (buttonD < buttonC) {
		bDetX = buttonX[buttonD];
		bDetY = buttonY[buttonD];
		bDetW = buttonW[buttonD];
		bDetH = buttonH[buttonD];
		bDetX2 = bDetX + bDetW;
		bDetY2 = bDetY + bDetY;
		if (mouseX >= bDetX && mouseX <= bDetX2) {
			if (mouseY >= bDetY && mouseY <= bDetY2) {
				return (buttonE[buttonD]);
			}
		}
		buttonD++;
	}
}

function show() {
	buttonD2 = 0;
	while (buttonD2 < buttonC) {
		bDetX = buttonX[buttonD2];
		bDetY = buttonY[buttonD2];
		bDetW = buttonW[buttonD2];
		bDetH = buttonH[buttonD2];
		bDetC1 = buttonC1[buttonD2];
		bDetC2 = buttonC2[buttonD2];
		bDetC3 = buttonC3[buttonD2];
		bDetS = buttonS[buttonD2];
		bDetWe = buttonWe[buttonD2];
		if (bDetS === true) {
			stroke(0);
			strokeWeight(bDetWe);
		} else {
			if (bDetS === false) {
				noStroke();
			}
		}
		fill(160);
		rect(bDetX, bDetY, bDetW, bDetH);
		fill(0);
		strokeWeight(0);
		text(buttonT[buttonD2], bDetX + 3, bDetY + 23);
		buttonD2++;
	}
}
