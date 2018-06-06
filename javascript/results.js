if (new URL(window.location).searchParams.get("dummydata") == "true") {
    localStorage.setItem('152620022', [1, 'completed', '00:01:06:32', 'Mario,3.png,,classic,1']);
    localStorage.setItem('152620524', [1, 'completed', '00:04:03:14', 'Toad,2.png,,classic,2']);
    localStorage.setItem('152660131', [3, 'notCompleted', '00:13:53:04', 'Luigi,4.png,,classic,2']);
    localStorage.setItem('152620122', [2, 'notCompleted', '00:08:09:37', 'Princess,5.png,,classic,1']);
    localStorage.setItem('152622032', [12, 'notCompleted', '00:06:01:59', 'Luigi,4.png,,classic,1']);
    localStorage.setItem('152630832', [3, 'notCompleted', '00:04:34:37', 'Luigi,4.png,,classic,2']);
    localStorage.setItem('152630839', [7, 'notCompleted', '00:04:34:37', 'Luigi,4.png,,classic,2']);
    localStorage.setItem('152630432', [7, 'notCompleted', '00:04:34:37', 'Luigi,4.png,,classic,4']);
    localStorage.setItem('152660332', [3, 'notCompleted', '00:13:53:04', 'Luigi,4.png,,classic,1']);
    localStorage.setItem('152600025', [1, 'notCompleted', '00:04:02:20', 'Yoshi,1.png,,classic,3']);
} else if (new URL(window.location).searchParams.get("dummydata") == "reset") {
	localStorage.clear();
}
var resultArray = new Array();
var resultArrayClassic = new Array();
var resultArrayLevel = new Array();
var i = 0;
var j = 0;
var k = 0;
var pegsLeft;
var gameDone = "";
var ranking = -1;

for (var key in localStorage) {
    if (key != 'key' && key != 'setItem' && key != 'getItem' && key != 'removeItem' && key != 'clear' && key != 'length' && key != 'board' && key != 'key') {
        resultArray[i] = localStorage.getItem(key).split(',');
        i++;
    }
}

for (var i = 0; i < resultArray.length; i++) {
    resultArray[i][0] = parseInt(resultArray[i][0]);
}

i = 0;
j = 0;
k = 0;
for (var item in resultArray) {
    if (resultArray[i][6] == 'classic') {
        resultArrayClassic[j] = resultArray[i];
        j++;
    } else {
        resultArrayLevel[k] = resultArray[i];
        k++;
    }
    i++;
}

var mode = new URL(window.location).searchParams.get("mode");

resultArrayClassic.sort(function(a, b) {
    // Sort by the 7th value
    if (a[7] < b[7]) {
        return -1;
    }

    if (a[7] > b[7]) {
        return 1;
    }


    // If 7th value is equal - sort by the second value of the array
    if (a[1] < b[1]) {
        return -1;
    }

    if (a[1] > b[1]) {
        return 1;
    }

    // If second value is equal - sort by the first value of the array
    if (a[0] < b[0]) {
        return -1
    }

    if (a[0] > b[0]) {
        return 1;
    }

    // If first value is equal - sort by the third value of the array
    if (a[2] < b[2]) {
        return -1;
    }

    if (a[2] > b[2]) {
        return 1;
    }

    // All are equal
    return 0;
});

resultArrayLevel.sort(function(a, b) {
    // Sort by the first value
    if (a[0] > b[0]) {
        return -1;
    }

    if (a[0] < b[0]) {
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

if (mode == 'classic') {
    for (i = 0; i < resultArrayClassic.length; i++) {
        if (resultArrayClassic[i][5] == ("last")) {
            resultArrayClassic[i][5] = "";
            ranking = i;
        }
    }

    for (i = 0; i < resultArrayLevel.length; i++) {
        if (resultArrayLevel[i][5] == ("last")) {
            resultArrayLevel[i][5] = "";
        }
    }
} else {
    for (i = 0; i < resultArrayClassic.length; i++) {
        if (resultArrayClassic[i][5] == ("last")) {
            resultArrayClassic[i][5] = "";
        }
    }

    for (i = 0; i < resultArrayLevel.length; i++) {
        if (resultArrayLevel[i][5] == ("last")) {
            resultArrayLevel[i][5] = "";
            ranking = i;
        }
    }
}

function restartGame() { // relaod the page after the board has been changed [method used for callback]
    window.history.back(-2);
    window.history.go(0);
}

updateLocalStorage();

function updateLocalStorage() {
    var tmpVal0, tmpVal1, tmpVal2, tmpVal3, tmpVal4, tmpVal6, tmpVal7;
    for (var key in localStorage) {
        if ((key != 'key' && key != 'setItem' && key != 'getItem' && key != 'removeItem' && key != 'clear' && key != 'length' && key != 'board') && (localStorage.getItem(key).split(',')[5] == 'last')) {
            tmpVal0 = localStorage.getItem(key).split(',')[0];
            tmpVal1 = localStorage.getItem(key).split(',')[1];
            tmpVal2 = localStorage.getItem(key).split(',')[2];
            tmpVal3 = localStorage.getItem(key).split(',')[3];
            tmpVal4 = localStorage.getItem(key).split(',')[4];
            tmpVal6 = localStorage.getItem(key).split(',')[6];
            tmpVal7 = localStorage.getItem(key).split(',')[7];
            localStorage.setItem(key, [tmpVal0, tmpVal1, tmpVal2, tmpVal3, tmpVal4, '', tmpVal6, tmpVal7]);
        }
    }
}

var lastBoard = 0;
var boardRanking = 0;

if (resultArrayClassic.length > 0) {
    document.write("<table width='80%' border='0' align='center' style='border-collapse:collapse;'>");
    document.write("<tr><td colspan=6 align='center'><h2>Classic Mode Results</h2></td></tr>");
    for (i = 0; i < resultArrayClassic.length; i++) {
        if (resultArrayClassic[i][1] == 1) {
            pegsLeft = " peg"
        } else {
            pegsLeft = " pegs"
        };
        if (resultArrayClassic[i][1] == "completed") {
            gameDone = "game completed"
        } else {
            gameDone = " "
        };
        if (lastBoard != parseInt(resultArrayClassic[i][7])) {
            boardRanking = 0;
            document.write("<tr><td colspan=6 align='center'><br><br><h3>Results for board " + resultArrayClassic[i][7] + "</h3></td></tr>");
        }
        document.write("  <tr");
        if (ranking == i && mode == 'classic') {
            document.write(" bgcolor='#FFCC00' id='actual'>")
        } else {
            document.write(">")
        };
        document.write("    <td width='30'>" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + (boardRanking + 1) + ".</td>");
        document.write("    <td width='30'><img src='images/" + resultArrayClassic[i][4] + "' class='img' width='30'></td>");
        document.write("    <td>" + resultArrayClassic[i][3] + resultArrayClassic[i][5] + "</td>");
        document.write("    <td width='15%'>" + resultArrayClassic[i][0] + pegsLeft + " left</td>");
        document.write("    <td width='15%'>" + gameDone + "</td>");
        document.write("    <td width='15%'>" + resultArrayClassic[i][2] + "</td>");
        document.write("  </tr>");
        lastBoard = parseInt(resultArrayClassic[i][7]);
        boardRanking++;
    }
    document.write("</table>");
}

if (resultArrayLevel.length > 0) {
    document.write("<br><br><br><table width='80%' border='0' align='center' style='border-collapse:collapse;'>");
    document.write("<tr><td colspan=6 align='center'><br><br><h2>Level Mode Results</h2></td></tr>");
    for (i = 0; i < resultArrayLevel.length; i++) {
        if (resultArrayLevel[i][1] == 1) {
            pegsLeft = " peg"
        } else {
            pegsLeft = " pegs"
        };
        document.write("  <tr");
        if (ranking == i && mode == 'level') {
            document.write(" bgcolor='#FFCC00' id='actual'>")
        } else {
            document.write(">")
        };
        document.write("    <td width='30'>" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + (i + 1) + ".</td>");
        document.write("    <td width='30'><img src='images/" + resultArrayLevel[i][4] + "' class='img' width='30'></td>");
        document.write("    <td>" + resultArrayLevel[i][3] + "</td>");
        document.write("    <td width='15%'>Level " + resultArrayLevel[i][0] + "</td>");
        document.write("    <td width='15%'>" + resultArrayLevel[i][2] + pegsLeft + " left</td>");
        document.write("    <td width='15%'>" + resultArrayLevel[i][1] + "</td>");
        document.write("  </tr>");
    }
    document.write("</table>");
}

if (resultArrayClassic == 0 && resultArrayLevel == 0) {
    document.write("<br><br><br><table width='80%' height='80%' border='0' align='center' style='border-collapse:collapse;'>");
    document.write("<tr><td colspan=6 align='center'><h2>No results are available yet!<br><br><br></h2></td></tr>");
    document.write("</table>");
}