// GLOBAL VARIABLES
var isInPossiblePegsArray = false;
var possiblePegsArray = [3, 3];
var level = sessionStorage.getItem("level"); // actual level of the player
var posX; // actual x axis position
var posY; // actual y axis position
var lastX = 0; // last x axis position
var lastY = 0; // last y axis position
var highlight = [-1, -1]; // set peg position to highlight it [2]
var moveStarted = false; // define if a move has started
var canvasX; // canvas offset on x axis
var canvasY; // canvas offset on y axis
var gameStarted = false; // used to start the timer
var userName = getParameterByName("firstName"); // get the username
var avatar = getParameterByName("avatar"); // get the picture of the chosen avatar
var doTogglePeg = true; // execute the togglePeg if true
var possibleMoves; // storing the number of possible moves, used to check if the game has ended
var timer = new Timer(); // initializing the timer from easytimer.js
var pegArrayJSON; // JSON variable to handle the boardArray for localStorage
var resultArray = new Array(); // arrry to sort result data from localStorage
var levelUp = sessionStorage.getItem("levelUp"); // check if the next level must be loaded
var level1 = [ // two dimensional array to store the peg values - empty [-1], black [0], white [1] or black with red highlight [2]
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, 1, 0, 0, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1]
];
var level2 = [ // two dimensional array to store the peg values - empty [-1], black [0], white [1] or black with red highlight [2]
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, 1, -1, -1, -1, -1],
    [-1, -1, 0, -1, -1, -1, -1],
    [-1, -1, 1, 0, 0, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1]
];
var level3 = [ // two dimensional array to store the peg values - empty [-1], black [0], white [1] or black with red highlight [2]
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, 1, 0, 1, -1, -1],
    [-1, -1, 0, -1, -1, -1, -1],
    [-1, -1, 1, 0, 0, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1]
];
var level4 = [ // two dimensional array to store the peg values - empty [-1], black [0], white [1] or black with red highlight [2]
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, 1, 0, 1, -1, -1],
    [-1, -1, 0, -1, 0, -1, -1],
    [-1, -1, 1, 0, 0, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1]
];
var level5 = [ // two dimensional array to store the peg values - empty [-1], black [0], white [1] or black with red highlight [2]
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, 1, 0, 1, -1, 1],
    [-1, -1, 0, -1, 0, -1, 0],
    [-1, -1, 1, 0, 0, 0, 1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1]
];
var level6 = [ // two dimensional array to store the peg values - empty [-1], black [0], white [1] or black with red highlight [2]
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, 0, 0, 1, 1, 0, 1],
    [-1, -1, -1, -1, -1, -1, 0],
    [-1, -1, 1, 0, 1, -1, 1],
    [-1, -1, 0, -1, 0, -1, 0],
    [-1, -1, 1, 0, 0, 0, 1]
];
var level7 = [ // two dimensional array to store the peg values - empty [-1], black [0], white [1] or black with red highlight [2]
    [-1, 0, 0, -1, -1, -1, 0],
    [-1, 0, 0, -1, -1, -1, 0],
    [-1, 0, 0, 1, 1, 0, 1],
    [-1, -1, -1, -1, -1, -1, 0],
    [-1, -1, 1, 0, 1, -1, 1],
    [-1, -1, 0, -1, 0, -1, 0],
    [-1, -1, 1, 0, 0, 0, 1]
];
var level8 = [ // two dimensional array to store the peg values - empty [-1], black [0], white [1] or black with red highlight [2]
    [-1, -1, 0, 0, 0, -1, -1],
    [-1, -1, 0, 0, 0, -1, -1],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [-1, -1, 0, 0, 0, -1, -1],
    [-1, -1, 0, 0, 0, -1, -1]
];
var level9 = [ // two dimensional array to store the peg values - empty [-1], black [0], white [1] or black with red highlight [2]
    [-1, -1, -1, 0, -1, -1, -1],
    [-1, -1, 0, 0, 0, -1, -1],
    [-1, 0, 0, 0, 0, 0, -1],
    [0, 0, 0, 1, 0, 0, 0],
    [-1, 0, 0, 0, 0, 0, -1],
    [-1, -1, 0, 0, 0, -1, -1],
    [-1, -1, -1, 0, -1, -1, -1]
];
var level10 = [ // two dimensional array to store the peg values - empty [-1], black [0], white [1] or black with red highlight [2]
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
];
var level11 = [ // two dimensional array to store the peg values - empty [-1], black [0], white [1] or black with red highlight [2]
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, -1],
    [0, 0, 0, 0, 0, -1, -1],
    [0, 0, 0, 1, -1, -1, -1],
    [0, 0, 0, -1, -1, -1, -1],
    [0, 0, -1, -1, -1, -1, -1],
    [0, -1, -1, -1, -1, -1, -1]
];
var i = 0;
for (var key in localStorage) { // building result array
    if (key != 'key' && key != 'setItem' && key != 'getItem' && key != 'removeItem' && key != 'clear' && key != 'length' && key != 'board' && localStorage.getItem(key).split(',')[6] == 'level') {
        resultArray[i] = localStorage.getItem(key).split(',');
        i++;
    }
}

for (var i = 0; i < resultArray.length; i++) { // converting string number to int value in resultarray
    resultArray[i][0] = parseInt(resultArray[i][0]);
}

resultArray.sort(function(a, b) {
    // Sort by the first value
    if (a[0] < b[0]) {
        return -1;
    }

    if (a[0] > b[0]) {
        return 1;
    }

    // If first value is equal - sort by the third value of the array
    if (a[2] < b[2]) {
        return -1
    }

    if (a[2] > b[2]) {
        return 1;
    }

    // If third value is equal - sort by the second value of the array
    if (a[1] < b[1]) {
        return -1
    }

    if (a[1] > b[1]) {
        return 1;
    }

    // All are equal
    return 0;
});

canvasX = document.getElementById("canvas1").offsetLeft;
canvasY = document.getElementById("img-top").offsetTop + 53;

if (window.innerWidth < 810) {
    if (resultArray.length > 0) {
        var p1 = resultArray[0][3]
    } else {
        var p1 = "not available yet"
    }
    if (resultArray.length > 1) {
        var p2 = resultArray[1][3]
    } else {
        var p2 = "not available yet"
    }
    if (resultArray.length > 2) {
        var p3 = resultArray[2][3]
    } else {
        var p3 = "not available yet"
    }
    document.getElementById('canvas1').style.marginLeft = "0px";
    document.getElementById('gameInfo2').style.top = "calc(" + canvasY + "px + 650px)";
    document.getElementById('gameInfo2').style.position = "fixed";
    document.getElementById('gameInfo2').style.left = "calc(50% - 326px)";
    document.getElementById('gameInfo2').style.width = "650px";
    document.getElementById('gameInfo').style.display = "none";
    document.getElementById('first').style.display = "none";
    document.getElementById('second').style.display = "none";
    document.getElementById('third').style.display = "none";
    document.getElementById('gameInfo2').innerHTML = "<table width='100%' border='0' align='center'>  <tr>    <td align='center'><div id='timer2'></div><br><button type='button' id='settings2' class='submit-button'>Change Board</button></td>    <td align='center'><img class='centerImage' src='../images/" + avatar + "' width='100' id='avatarImg' alt='Avatar image'></td>    <td align='center'><h3>" + userName + "</h3></td><td align='center' width='100px'><img src='../images/1st.png' alt='1st place' /><br>" + p1 + "</td><td align='center' width='100px'><img src='../images/2nd.png' alt='2nd place' /><br>" + p2 + "</td><td align='center' width='100px'><img src='../images/3rd.png' alt='3rd place' /><br>" + p3 + "</td>  </tr></table>";
    document.getElementById('settings2').innerHTML = "Level " + level;
    document.getElementById('img-top').style.width = "655px";
} else {
    document.getElementById('img-top').style.width = "800px";
    document.getElementById('settings').innerHTML = "Level " + level;
    document.getElementById('gameInfo').style.top = "calc(" + ((window.innerHeight / 2) - 252) + "px)";
    document.getElementById('gameInfo').style.left = "calc(" + canvasX + "px - 144px)";
    document.getElementById('gameInfo').style.height = "297px";
    document.getElementById('gameInfo').style.width = "138px";
    document.getElementById('first').style.top = "calc(" + ((window.innerHeight / 2) + 47) + "px)";
    document.getElementById('first').style.left = "calc(" + canvasX + "px - 144px)";
    document.getElementById('first').style.height = "90px";
    document.getElementById('first').style.width = "138px";
    document.getElementById('second').style.top = "calc(" + ((window.innerHeight / 2) + 149) + "px)"; // positioning the changeBoard div
    document.getElementById('second').style.left = "calc(" + canvasX + "px - 144px)"; // positioning the changeBoard div
    document.getElementById('second').style.height = "90px";
    document.getElementById('second').style.width = "138px";
    document.getElementById('third').style.top = "calc(" + ((window.innerHeight / 2) + 251) + "px)"; // positioning the changeBoard div
    document.getElementById('third').style.left = "calc(" + canvasX + "px - 144px)"; // positioning the changeBoard div
    document.getElementById('third').style.height = "87px";
    document.getElementById('third').style.width = "138px";
    document.getElementById('gameInfo2').style.display = "none";
    var x = document.createElement("IMG");
    var linebreak = document.createElement("br");
    x.setAttribute("class", "centerImgage");
    x.setAttribute("src", "../images/" + avatar);
    x.setAttribute("width", "100");
    x.setAttribute("id", "avatarImg");
    x.setAttribute("alt", "Avatar image");
    document.getElementById("gameInfo").appendChild(linebreak);
    document.getElementById("gameInfo").appendChild(x);
    var para = document.createElement("P");
    var h1text = document.createElement("h3");
    var u = document.createTextNode(userName);
    h1text.appendChild(u);
    para.appendChild(h1text);
    document.getElementById("gameInfo").appendChild(para);
    getTop3();
}

if (levelUp == "true") {
    level = parseInt(level) + 1; // level is the next level
    sessionStorage.setItem("level", level);
    if (level == 12) {
        var lsContent;
        var timerVal;
        audio.pause();
        audio = document.getElementById("winner"); // audio of the game page
        audio.play();
        window.alert("Congratulations! You completed the game in level mode in " + secondTenthsToTime(sessionStorage.getItem("totalTime")) + " time!");
        resultsWritten = false;
        if (!resultsWritten) {
            lsContent = [level, secondTenthsToTime(sessionStorage.getItem("totalTime")), 1, userName.concat(",", avatar + ",last,level")];
            localStorage.setItem(Math.floor(Date.now() / 10000), lsContent);
            resultsWritten = true;
        }
        document.location.replace("../results.html" + window.location.search);
    } else {
        loadLevel(level, reloadGame);
    }
};

function reloadGame() { // relaod the page after the board has been changed [level up]
    document.location.href = document.location;
}

function loadLevel(level, callback) { // change the board if the level has changed

    switch (level) {
        case 1:
            pegArrayJSON = JSON.stringify(level1);
            sessionStorage.setItem("levelUp", false);
            break;
        case 2:
            pegArrayJSON = JSON.stringify(level2);
            sessionStorage.setItem("levelUp", false);
            break;
        case 3:
            pegArrayJSON = JSON.stringify(level3);
            sessionStorage.setItem("levelUp", false);
            break;
        case 4:
            pegArrayJSON = JSON.stringify(level4);
            sessionStorage.setItem("levelUp", false);
            break;
        case 5:
            pegArrayJSON = JSON.stringify(level5);
            sessionStorage.setItem("levelUp", false);
            break;
        case 6:
            pegArrayJSON = JSON.stringify(level6);
            sessionStorage.setItem("levelUp", false);
            break;
        case 7:
            pegArrayJSON = JSON.stringify(level7);
            sessionStorage.setItem("levelUp", false);
            break;
        case 8:
            pegArrayJSON = JSON.stringify(level8);
            sessionStorage.setItem("levelUp", false);
            break;
        case 9:
            pegArrayJSON = JSON.stringify(level9);
            sessionStorage.setItem("levelUp", false);
            break;
        case 10:
            pegArrayJSON = JSON.stringify(level10);
            sessionStorage.setItem("levelUp", false);
            break;
        case 11:
            pegArrayJSON = JSON.stringify(level11);
            sessionStorage.setItem("levelUp", false);
            break;
        default:
            break;
    }
    localStorage.setItem('board', pegArrayJSON); // store the selected board in localStorage
    callback(); // call the method passed as callback
}

function getParameterByName(name) { // function to get url parameters
    return new URL(window.location).searchParams.get(name);
}

function getTop3() { // show top3 users under gameinfo div
    var para = document.createElement("P");
    if (resultArray.length > 0) {
        var u = document.createTextNode(resultArray[0][3])
    } else {
        var u = document.createTextNode("not available yet")
    }
    para.appendChild(u);
    document.getElementById("first").appendChild(para);
    para = document.createElement("P");
    if (resultArray.length > 1) {
        var u = document.createTextNode(resultArray[1][3])
    } else {
        var u = document.createTextNode("not available yet")
    }
    para.appendChild(u);
    document.getElementById("second").appendChild(para);
    para = document.createElement("P");
    if (resultArray.length > 2) {
        var u = document.createTextNode(resultArray[2][3])
    } else {
        var u = document.createTextNode("not available yet")
    }
    para.appendChild(u);
    document.getElementById("third").appendChild(para);
}

if (localStorage.getItem("board") == null) { // define a board array
    retrPegArray = JSON.stringify(level1);
} else {
    retrPegArray = localStorage.getItem('board'); // get the actual board from localStorage
}

pegArray = JSON.parse(retrPegArray); // parse the boardArray from JSON to a two dimensional array

drawCanvas(pegArray); // drav the canvas using the matrix from above

function changeCanvas(event, callback) { // method to change the canvas (on click event)
    getSelectedPeg(event); // get the clicked peg on canvas x and y axis
    if (posX != undefined && posY != undefined) { // if a peg has been clicked
		var pegValue = pegArray[posY][posX]; // get the value of the clicked peg
		var highlightCheck = hasHighlighted(); // check if there is a highlighted peg (only one peg can be highlighted at the same time)
		lastX = highlightCheck[1]; // save the x axis from the last processed pen
		lastY = highlightCheck[0]; // save the y axis from the last processed pen
		isInPossiblePegsArray = false; // store if the clicked peg is a valid move (used for checkPossiblePegsArray function)
		checkPossiblePegsArray(posY, posX); // execute the check if the clicked peg is a valid move (contained in possiblee pegs array)
		if (pegValue == 0) { // if the peg is black [0]
			moveStarted = true; // set the flag to mark a move as started to true
			possiblePegsArray = checkPossiblePegsForMove(posY, posX); // possible pegs for a valid move in an array (generate or regenerate the possible pegs array)
			inPossiblePegsArray = false;
			if (highlightCheck[0] > -1 && highlightCheck[1] > -1) { // if there is a highlighted peg
				pegArray[highlightCheck[0]][highlightCheck[1]] = 0; // remove the highlight on the existing highlighted peg
			};
			pegValue = 2; // highlight the clicked peg
		} else if (pegValue == 1) { // if the peg is white [1]
			if (moveStarted && isInPossiblePegsArray && ((lastY == posY - 2) ||  (lastY == posY + 2) ||  (lastX == posX - 2) || (lastX == posX + 2))) { // if a move has started [moveStarted == true] and the move can be executed
				if (lastY == (posY - 2)) {
					deletePeg(lastX, (posY - 1));
				} else if (lastY == (posY + 2)) {
					deletePeg(lastX, (posY + 1));
				} else if (lastX == (posX - 2)) {
					deletePeg((posX - 1), lastY);
				} else if (lastX == (posX + 2)) {
					deletePeg((posX + 1), lastY);
				};
				pegValue = 0; // set the peg to black [0]
				deletePeg(lastX, lastY); // set the last clicked peg to white [1]
				moveStarted = false; // end the move [moveStarted == false]
			}
		} else if (pegValue == 2 && moveStarted) { // if the clicked peg is highlighted [2] and the move is started
			pegValue = 0; // remove the highlight [0]
			moveStarted = false; // end the move [moveStarted == false]
		}
		pegArray[posY][posX] = pegValue; // apply the change in pegArray defined above in this method
		drawCanvas(pegArray); // draw the canvas
		possibleMoves = countPossibleMoves(); // counting the number of possible moves after having toggeled this peg
    }
    if (!gameStarted) {
        var st = sessionStorage.getItem("totalTime");
        timer.start({
            precision: 'secondTenths',
            startValues: {
                secondTenths: st
            }
        });
        timer.addEventListener('secondTenthsUpdated', function(e) {
            if (window.innerWidth < 810) {
				var timerInfo = timer.getTimeValues().toString(['hours', 'minutes', 'seconds', 'secondTenths']);
				timerInfo = timerInfo.slice(0, 9) + timerInfo.substring(timerInfo.length -1) + '0';
                document.getElementById('timer2').innerHTML = timerInfo;
                gameStarted = true;
            } else {
				var timerInfo = timer.getTimeValues().toString(['hours', 'minutes', 'seconds', 'secondTenths']);
				timerInfo = timerInfo.slice(0, 9) + timerInfo.substring(timerInfo.length -1) + '0';
                document.getElementById('timer1').innerHTML = timerInfo;
                gameStarted = true;
            }
        });
        audio = document.getElementById("audio"); // audio of the game page
        audio.play(); // Start to play the mario sound
    }
    setTimeout(function() { // function to execute when there are no more possible moves
		var resultsWritten = false;
		var timerVal;
		var lsContent;
		if (possibleMoves == 0) { // if no more moves are possible
			var blackPegs = countBlackPegs(); // count the resting black pegs
			timer.stop(); // stop the timer
			if (window.innerWidth < 810) {
				timerVal = document.getElementById("timer2").innerHTML
			} else {
				timerVal = document.getElementById("timer1").innerHTML
			}
			if (blackPegs == 1) { // if just one black peg is left
				audio.pause();
				audio = document.getElementById("winner"); // audio of the game page
				audio.play();
				window.alert("Congratulations! Level " + level + " completed!");
				sessionStorage.setItem("levelUp", "true");
				sessionStorage.setItem("totalTime", timeToSecondTenths(timerVal));
				reloadGame();
			} else { // there are more than one black peg left
				audio.pause();
				audio = document.getElementById("gameOver"); // audio of the game page
				audio.play();
				window.alert("No more moves possible! " + blackPegs + " pegs left and " + timerVal + " elapsed!");
				if (!resultsWritten) {
					lsContent = [level, timerVal, blackPegs, userName.concat(",", avatar + ",last,level")];
					localStorage.setItem(Math.floor(Date.now() / 10000), lsContent);
					resultsWritten = true;
				}
				document.location.replace("../results.html" + window.location.search);
			}
		}
	},200);
}

function getSelectedPeg(event) { // get the clicked position on canvas x and y axis
    event = event || window.event; // handle events cross-browser based

    switch (true) {
        case event.clientX >= (50 + canvasX) && event.clientX <= (115 + canvasX):
            posX = 0;
            break;
        case event.clientX >= (130 + canvasX) && event.clientX <= (195 + canvasX):
            posX = 1;
            break;
        case event.clientX >= (210 + canvasX) && event.clientX <= (275 + canvasX):
            posX = 2;
            break;
        case event.clientX >= (290 + canvasX) && event.clientX <= (355 + canvasX):
            posX = 3;
            break;
        case event.clientX >= (370 + canvasX) && event.clientX <= (435 + canvasX):
            posX = 4;
            break;
        case event.clientX >= (450 + canvasX) && event.clientX <= (515 + canvasX):
            posX = 5;
            break;
        case event.clientX >= (530 + canvasX) && event.clientX <= (595 + canvasX):
            posX = 6;
            break;
    }

    switch (true) {
        case event.clientY >= (75 + canvasY) && event.clientY <= (140 + canvasY):
            posY = 0;
            break;
        case event.clientY >= (155 + canvasY) && event.clientY <= (220 + canvasY):
            posY = 1;
            break;
        case event.clientY >= (235 + canvasY) && event.clientY <= (300 + canvasY):
            posY = 2;
            break;
        case event.clientY >= (315 + canvasY) && event.clientY <= (380 + canvasY):
            posY = 3;
            break;
        case event.clientY >= (395 + canvasY) && event.clientY <= (460 + canvasY):
            posY = 4;
            break;
        case event.clientY >= (475 + canvasY) && event.clientY <= (540 + canvasY):
            posY = 5;
            break;
        case event.clientY >= (555 + canvasY) && event.clientY <= (620 + canvasY):
            posY = 6;
            break;
    }
    switch (true) {
        case event.clientX >= (0 + canvasX) && event.clientX <= (50 + canvasX):
        case event.clientX >= (115 + canvasX) && event.clientX <= (130 + canvasX):
        case event.clientX >= (195 + canvasX) && event.clientX <= (210 + canvasX):
        case event.clientX >= (275 + canvasX) && event.clientX <= (290 + canvasX):
        case event.clientX >= (355 + canvasX) && event.clientX <= (370 + canvasX):
        case event.clientX >= (435 + canvasX) && event.clientX <= (450 + canvasX):
        case event.clientX >= (515 + canvasX) && event.clientX <= (530 + canvasX):
        case event.clientX > (595 + canvasX):
        case event.clientY >= (0 + canvasY) && event.clientY <= (75 + canvasY):
        case event.clientY >= (140 + canvasY) && event.clientY <= (155 + canvasY):
        case event.clientY >= (220 + canvasY) && event.clientY <= (235 + canvasY):
        case event.clientY >= (300 + canvasY) && event.clientY <= (315 + canvasY):
        case event.clientY >= (380 + canvasY) && event.clientY <= (395 + canvasY):
        case event.clientY >= (460 + canvasY) && event.clientY <= (475 + canvasY):
        case event.clientY >= (540 + canvasY) && event.clientY <= (555 + canvasY):
        case event.clientY > (620 + canvasY):
            posX = undefined;
            posY = undefined;
            break;
    }
}

function togglePeg(x, y) { // toggle a value in the pegArray
    var pegValue = pegArray[y][x]; // get the value of the clicked peg
    var highlightCheck = hasHighlighted(); // check if there is a highlighted peg (only one peg can be highlighted at the same time)
    lastX = highlightCheck[1]; // save the x axis from the last processed pen
    lastY = highlightCheck[0]; // save the y axis from the last processed pen
    isInPossiblePegsArray = false; // store if the clicked peg is a valid move (used for checkPossiblePegsArray function)
    checkPossiblePegsArray(y, x); // execute the check if the clicked peg is a valid move (contained in possiblee pegs array)
    if (pegValue == 0) { // if the peg is black [0]
        moveStarted = true; // set the flag to mark a move as started to true
        possiblePegsArray = checkPossiblePegsForMove(y, x); // possible pegs for a valid move in an array (generate or regenerate the possible pegs array)
        inPossiblePegsArray = false;
        if (highlightCheck[0] > -1 && highlightCheck[1] > -1) { // if there is a highlighted peg
            pegArray[highlightCheck[0]][highlightCheck[1]] = 0; // remove the highlight on the existing highlighted peg
        };
        pegValue = 2; // highlight the clicked peg
    } else if (pegValue == 1) { // if the peg is white [1]
        if (moveStarted && isInPossiblePegsArray && ((lastY == posY - 2) ||  (lastY == posY + 2) ||  (lastX == posX - 2) || (lastX == posX + 2))) { // if a move has started [moveStarted == true] and the move can be executed
            if (lastY == (posY - 2)) {
                deletePeg(lastX, (posY - 1));
            } else if (lastY == (posY + 2)) {
                deletePeg(lastX, (posY + 1));
            } else if (lastX == (posX - 2)) {
                deletePeg((posX - 1), lastY);
            } else if (lastX == (posX + 2)) {
                deletePeg((posX + 1), lastY);
            };
            pegValue = 0; // set the peg to black [0]
            deletePeg(lastX, lastY); // set the last clicked peg to white [1]
            moveStarted = false; // end the move [moveStarted == false]
        }
    } else if (pegValue == 2 && moveStarted) { // if the clicked peg is highlighted [2] and the move is started
        pegValue = 0; // remove the highlight [0]
        moveStarted = false; // end the move [moveStarted == false]
    }
    pegArray[y][x] = pegValue; // apply the change in pegArray defined above in this method
    drawCanvas(pegArray); // draw the canvas
    possibleMoves = countPossibleMoves(); // counting the number of possible moves after having toggeled this peg
}

function checkPossiblePegsForMove(x, y) { // stores all possible pegs for a valid move in an array
    var pegList = new Array();
    if ((x + 2 < 7) && (pegArray[x + 2][y] == 1) && ((pegArray[x + 1][y] == 0) || (pegArray[x + 1][y] == 2))) {
        pegList.push([x + 2, y]);
    }
    if ((x - 2 > -1) && (pegArray[x - 2][y] == 1) && ((pegArray[x - 1][y] == 0) || (pegArray[x - 1][y] == 2))) {
        pegList.push([x - 2, y]);
    }
    if ((y + 2 < 7) && (pegArray[x][y + 2] == 1) && ((pegArray[x][y + 1] == 0) ||  (pegArray[x][y + 1] == 2))) {
        pegList.push([x, y + 2]);
    }
    if ((y - 2 > -1) && (pegArray[x][y - 2] == 1) && ((pegArray[x][y - 1] == 0) ||  (pegArray[x][y - 1] == 2))) {
        pegList.push([x, y - 2]);
    }
    return pegList;
}

function checkPossiblePegsArray(x, y) { // iterate through the array of possible pegs to find out if the searched position is contained
    for (var i = 0; i < possiblePegsArray.length; i++) {
        if (possiblePegsArray[i][0] == x && possiblePegsArray[i][1] == y) {
            isInPossiblePegsArray = true;
        }
    }
}

function countPossibleMoves() { // counting the number of possible moves
    var count = 0;
    for (var i = 0; i < pegArray.length; i++) {
        for (var j = 0; j < pegArray[i].length; j++) {
            if (i - 1 > -1) {
                if ((pegArray[j][i] == 0 || pegArray[j][i] == 2) && ((pegArray[j][i - 1] == 0)) &&
                    (((i - 2 > -1) && (pegArray[j][i - 2] == 1)) ||  ((i + 1 < 7) &&  (pegArray[j][i + 1] == 1)))) {
                    count++;
                };
            };
            if (i + 1 < 7) {
                if ((pegArray[j][i] == 0 || pegArray[j][i] == 2) && ((pegArray[j][i + 1] == 0)) &&
                    (((i + 2 < 7) && (pegArray[j][i + 2] == 1)) ||  ((i - 1 > -1) &&  (pegArray[j][i - 1] == 1)))) {
                    count++;
                };
            };
            if (j - 1 > -1) {
                if ((pegArray[j][i] == 0 || pegArray[j][i] == 2) && ((pegArray[j - 1][i] == 0)) &&
                    (((j - 2 > -1) && (pegArray[j - 2][i] == 1)) ||  ((j + 1 < 7) &&  (pegArray[j + 1][i] == 1)))) {
                    count++;
                };
            };
            if (j + 1 < 7) {
                if ((pegArray[j][i] == 0 || pegArray[j][i] == 2) && ((pegArray[j + 1][i] == 0)) &&
                    (((j + 2 < 7) && (pegArray[j + 2][i] == 1)) ||  ((j - 1 > -1) &&  (pegArray[j - 1][i] == 1)))) {
                    count++;
                };
            };
        }
    }
    return count; // return the number of possible moves
}

function deletePeg(x, y) { // delete a peg (from black [0] or highlighted [2] to white [1])
    var pegValue = pegArray[y][x];
    if (pegValue == 2 || pegValue == 0) {
        pegArray[y][x] = 1;
    }
}

function hasHighlighted() { // check if there is a highlighted peg [2]
    var found = [-1, -1];
    for (var i = 0; i < pegArray.length; i++) {
        for (var j = 0; j < pegArray[i].length; j++) {
            if (pegArray[i][j] == 2) {
                found = [i, j];
            }
        }
    }
    return found; // return the found position
}

function countBlackPegs() { // count how many black pegs [0 or 2] are left on the board
    var found = 0;
    for (var i = 0; i < pegArray.length; i++) {
        for (var j = 0; j < pegArray[i].length; j++) {
            if ((pegArray[i][j] == 0) || (pegArray[i][j] == 2)) {
                found++;
            }
        }
    }
    return found; // return the number of black pegs
}

function drawCanvas(pegArray) { // draw the canvas based on pegArray (empty [-1], black [0], white [1] or highlighted [2]
    canvasX = document.getElementById("canvas1").offsetLeft;
    canvasY = document.getElementById("img-top").offsetTop + 53;
    var side = -50;
    var board = document.getElementById("canvas1").getContext("2d");
    board.clearRect(0, 0, 700, 700);

    // YOU NEED 2 LOOPS TO DRAW THE CANVAS
    for (var i = 0; i < pegArray.length; i++) {
        // THIS VARIABLE IS FOR THE HEIGHT BETWEEN THE PEGS
        var top = 0;

        for (var j = 0; j < pegArray[i].length; j++) {
            // FIRST WE CONSTRUCT THE PEG AT EVERY POSITIONS
            var radius;
            board.rect(0, 0, 700, 700);
            board.beginPath();
            board.lineWidth = 6;

            if (pegArray[i][j] == 1) {
                radius = 27;
            } else {
                radius = 30;
            }

            board.arc(top += 80, 100 + side, radius, 0, 2 * Math.PI);

            // WE ADD IT IF THERE ARE NOT OUT OF THE GAME
            if (pegArray[i][j] == 1) {
                // WHITE PEG
                board.strokeStyle = 'black';
                board.stroke();
                // pegArray.push(board);
            } else if (pegArray[i][j] == 0 || pegArray[i][j] == 2) {
                // THIS CODE IS FOR THE BLACK PEG 
                board.fillStyle = "#303030";
                board.fill();
                if (pegArray[i][j] == 2) {
                    board.strokeStyle = 'red';
                    board.stroke();
                    highlight = [-1, -1];
                };
            }
        }
        side += 80;
    }
}