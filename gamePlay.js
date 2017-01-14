var turn = 1,gameOver = false,gameTurns = 0, checked = 0,Checked_new = 0,check_mark_p2,check_mark_p1,cpu_match_type,win,difficulty;
var pos = [['b1',0],['b2',0],['b3',0],['b4',0],['b5',0],['b6',0],['b7',0],['b8',0],['b9',0],[0,1]];
var matches = [['b1','b2','b3','b4','b7','b5','b9',0,0],['b2','b1','b3','b5','b8',0,0,0,0],['b3','b1','b2','b6','b9',0,0,'b5','b7'],['b4','b5','b6','b1','b7',0,0,0,0],['b5','b4','b6','b2','b8','b1','b9','b3','b7'],['b6','b4','b5','b3','b9',0,0,0,0],['b7','b1','b4','b8','b9',0,0,'b5','b3'],['b8','b7','b9','b2','b5',0,0,0,0],['b9','b7','b8','b3','b6',0,0,'b1','b5']];	
function reset() {
		location.reload();
}
function play() {
	document.getElementById("cover").style.display = "block";
	document.getElementById("msg").innerHTML="Click on the boxes to Start the Game!";
	document.getElementById("myButton").style.display = "none";
	difficulty = document.getElementById("drop").value;
	
}
function move(selected_b) {
	var type, place;
	if(selected_b.innerHTML || gameOver){
		return;
	}
	else {
		selected_b.innerHTML ="x";
		for(var i=0;i<9;i++) {
			var j = 0;
			if(pos[i][j] === selected_b.id)
			{
				pos[i][j+1] = "x";
				type = "x";
				place = i;
				gameTurns++;
				break;
			}
		}
		match(selected_b.id,type,place,"user");
		if(gameTurns<9 && !gameOver) {
			cpu_move(place);
		}
		else {
			if(!win){
				document.getElementById("msg").innerHTML = "It's a Tie!";
			}
		}
	}
}

function match(id,type,place,player) {
	var j = 1, match_type;
	
	// Horizontal match
	if(pos[search(matches[place][j])][1] === type && pos[search(matches[place][j+1])][1] === type)
	{
		match_type = "h";
		mark_match(match_type,place);
		//mark(match_type);
	}
	
	// vertical match
	if(pos[search(matches[place][j+2])][1] === type && pos[search(matches[place][j+3])][1] === type)
	{
		match_type = "v";
		mark_match(match_type,place);
		//mark(match_type);
	}
	
	// diagonal1 match	
	if(pos[search(matches[place][j+4])][1] === type && pos[search(matches[place][j+5])][1] === type)
	{
		match_type = "d1";
		mark_match(match_type,place);
		//mark(match_type);
	}
	
	// diagonal2 match	
	if(pos[search(matches[place][j+6])][1] === type && pos[search(matches[place][j+7])][1] === type)
	{
		match_type = "d2";
		mark_match(match_type,place);
		//mark(match_type);
	}
}

function cpu_move(place) {
	var j = 1,random_move ="true",k = 0;;
	check_mark_p2 = [0,0];
	//Horizontal Check
	if(pos[search(matches[place][j])][1] === "x" || pos[search(matches[place][j+1])][1] === "x") {
		if(pos[search(matches[place][j])][1] === "x" && !pos[search(matches[place][j+1])][1]){
			random_move = "false";
			check_mark_p2[k] = pos[search(matches[place][j+1])][0];
			k++;
		}
		if(pos[search(matches[place][j+1])][1] === "x" && !pos[search(matches[place][j])][1]){
			random_move = "false";
			check_mark_p2[k] = pos[search(matches[place][j])][0];
			k++;
		}
	}
	
	// vertical check
	if(pos[search(matches[place][j+2])][1] === "x" || pos[search(matches[place][j+3])][1] === "x") {
		if(pos[search(matches[place][j+2])][1] === "x" && !pos[search(matches[place][j+3])][1]){
			random_move = "false";
			check_mark_p2[k] = pos[search(matches[place][j+3])][0];
			k++;
		}
		if(pos[search(matches[place][j+3])][1] === "x" && !pos[search(matches[place][j+2])][1]){
			random_move = "false";
			check_mark_p2[k] = pos[search(matches[place][j+2])][0];
			k++;
		}
	}
	
	// diagonal1 check	
	if(pos[search(matches[place][j+4])][1] === "x" || pos[search(matches[place][j+5])][1] === "x") {
		if(pos[search(matches[place][j+4])][1] === "x" && !pos[search(matches[place][j+5])][1]){
			random_move = "false";
			check_mark_p2[k] = pos[search(matches[place][j+5])][0];
			k++;
		}
		if(pos[search(matches[place][j+5])][1] === "x" && !pos[search(matches[place][j+4])][1]){
			random_move = "false";
			check_mark_p2[k] = pos[search(matches[place][j+4])][0];
			k++;
		}
	}
	
	// diagonal2 check	
	if(pos[search(matches[place][j+6])][1] === "x" || pos[search(matches[place][j+7])][1] === "x") {
		if(pos[search(matches[place][j+6])][1] === "x" && !pos[search(matches[place][j+7])][1]){
			random_move = "false";
			check_mark_p2[k] = pos[search(matches[place][j+7])][0];
			k++;
		}
		if(pos[search(matches[place][j+7])][1] === "x" && !pos[search(matches[place][j+6])][1]){
			random_move = "false";
			check_mark_p2[k] = pos[search(matches[place][j+6])][0];
			k++;
		}
	}
	cpu_match();
	cpu_mark(random_move);
}

function cpu_match() {
	
	var j = 1, match_type;
	check_mark_p1 = 0;
	cpu_match_type = 0;
	for(var i = 0;i<9;i++) {
		if(pos[i][j]==="o") {
			//Horizontal Check
			if(pos[search(matches[i][j])][1] === "o" || pos[search(matches[i][j+1])][1] === "o") {
				if(pos[search(matches[i][j])][1] === "o" && !pos[search(matches[i][j+1])][1]){
					check_mark_p1 = pos[search(matches[i][j+1])][0];
					cpu_match_type = "h";
					break;
				}
				if(pos[search(matches[i][j+1])][1] === "o" && !pos[search(matches[i][j])][1]){
					check_mark_p1 = pos[search(matches[i][j])][0];
					cpu_match_type = "h";
					break;
				}
			}
			
			// vertical check
			if(pos[search(matches[i][j+2])][1] === "o" || pos[search(matches[i][j+3])][1] === "o") {
				if(pos[search(matches[i][j+2])][1] === "o" && !pos[search(matches[i][j+3])][1]){
					check_mark_p1 = pos[search(matches[i][j+3])][0];
					cpu_match_type = "v";
					break;
				}
				if(pos[search(matches[i][j+3])][1] === "o" && !pos[search(matches[i][j+2])][1]){
					check_mark_p1 = pos[search(matches[i][j+2])][0];
					cpu_match_type = "v";
					break;
				}
			}
			
			// diagonal1 check	
			if(pos[search(matches[i][j+4])][1] === "o" || pos[search(matches[i][j+5])][1] === "o") {
				if(pos[search(matches[i][j+4])][1] === "o" && !pos[search(matches[i][j+5])][1]){
					check_mark_p1 = pos[search(matches[i][j+5])][0];
					cpu_match_type = "d1";
					break;
				}
				if(pos[search(matches[i][j+5])][1] === "o" && !pos[search(matches[i][j+4])][1]){
					check_mark_p1 = pos[search(matches[i][j+4])][0];
					cpu_match_type = "d1";
					break;
				}
			}
			
			// diagonal2 check	
			if(pos[search(matches[i][j+6])][1] === "o" || pos[search(matches[i][j+7])][1] === "o") {
				if(pos[search(matches[i][j+6])][1] === "o" && !pos[search(matches[i][j+7])][1]){
					check_mark_p1 = pos[search(matches[i][j+7])][0];
					cpu_match_type = "d2";
					break;
				}
				if(pos[search(matches[i][j+7])][1] === "o" && !pos[search(matches[i][j+6])][1]){
					check_mark_p1 = pos[search(matches[i][j+6])][0];
					cpu_match_type = "d2";
					break;
				}
			}
		}
	}
}

function cpu_mark(random_move) {
	var id;
	if(check_mark_p1) {
		id = search(check_mark_p1);
		pos[id][1] = "o";
		document.getElementById(pos[id][0]).innerHTML="o";
		mark_match(cpu_match_type,id);
		return;
		//gameOver Cpu won!
	}
	
	if(check_mark_p2[0]) {
		id = search(check_mark_p2[0]);
		pos[id][1] = "o"; 
		document.getElementById(pos[id][0]).innerHTML="o";
		gameTurns++;
		return;
	}
	if(difficulty === "2") {
		if(random_move){
		
				var score = 9;
				while(pos[score][1]&&gameTurns<9) {
					//check for centre first
					if(!pos[4][1]){
						score = 4;
						break;
					}
					//check for corners
					if(!pos[0][1] || !pos[2][1] || !pos[6][1] || !pos[8][1]) {
						//check for possible places which can hinder the victory of human
						while(true){
							score = Math.floor((Math.random() * 10)%9);
							if((score === 0 || score === 2 || score === 6 || score === 8) && !pos[score][1] ) {
								break;
							}
						}
					}
					else {
						score = Math.floor((Math.random() * 10)%9);
					}
				}	
			if(gameTurns!=9) {
			pos[score][1] = "o";
			document.getElementById(pos[score][0]).innerHTML="o";
			gameTurns++;  
			}
			else {
				gameOver = "true";
			}
		}
	}
	else if(difficulty === "1") {
		if(random_move){
			score = Math.floor((Math.random() * 10)%9);
			while(pos[score][1]&&gameTurns<9) {
				score = Math.floor((Math.random() * 10)%9);
			}	
			if(gameTurns!=9) {
			pos[score][1] = "o";
			document.getElementById(pos[score][0]).innerHTML="o";
			gameTurns++;  
			}
			else {
				gameOver = "true";
			}
		}
	}
}

function mark_match(match_type,place) {
	var id1, id2,id3;
	id3 = matches[place][0];
	if(match_type === "h") {
		id1 = matches[place][1];
		id2 = matches[place][2];
	}
	if(match_type === "v") {
		id1 = matches[place][3];
		id2 = matches[place][4];
	}
	if(match_type === "d1") {
		id1 = matches[place][5];
		id2 = matches[place][6];
	}
	if(match_type === "d2") {
		id1 = matches[place][7];
		id2 = matches[place][8];
	}
	document.getElementById(id1).style.color = "red";
	document.getElementById(id2).style.color = "red";
	document.getElementById(id3).style.color = "red";
	if(document.getElementById(id3).innerHTML === "x"){
		win = "x";
		document.getElementById("msg").innerHTML = "Congrats! You beat the Computer!";
	}
	else {
		win ="o"
		document.getElementById("msg").innerHTML = "Oops! you lost! press Reset button to try again";
	}
	gameOver = true;
}
function search(id) {
	if(!id){
		return 9;
	}
	for(var i=0;i<9;i++) {
		if(pos[i][0] === id){
			return i;
		}
	}
}