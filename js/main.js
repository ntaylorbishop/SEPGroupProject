var kBoardWidth = 8;
var kBoardHeight= 8;
var kPieceWidth = 60;
var kPieceHeight= 60;
var kPixelWidth = 1 + (kBoardWidth * kPieceWidth);
var kPixelHeight= 1 + (kBoardHeight * kPieceHeight);
var xOffset;
var yOffset;

var gCanvasElement;
var gDrawingContext;
var gPattern;

var myturn;
var sleeping;
var timer;

var user1Name;
var user2Name;

var kingInCheck;
var recentlyCaptured;

var oPieces = [];
var oCapturedPieces = new Array();
var oColor;
var oNumPieces;

var yPieces = [];
var yDest;
var yMovedPieces = new Array();
var yCapturedPieces = new Array();
var yColor;
var yNumPieces;
var selectedPieceIndex;
var selectedPieceHasMoved;

var gGameInProgress;

function Cell(x, y) {
    this.y = y;
    this.x = x;
}

function Piece(x, y, pieceType) {
    this.y = y;
    this.x = x;
    this.pieceType = pieceType;
}

function getCursorPosition(e) {
    /* returns Cell with .y and .x properties */
    var x;
    var y;
    if (e.pageX !== undefined && e.pageY !== undefined) {
        x = e.pageX;
        y = e.pageY;
    }

    else {
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    x -= gCanvasElement.offsetLeft;
    y -= gCanvasElement.offsetTop + 80;
    x = Math.min(x, kBoardWidth * kPieceWidth);
    y = Math.min(y, kBoardHeight * kPieceHeight);
    var cell = new Cell(Math.floor(x/kPieceWidth), Math.floor(y/kPieceHeight));
    return cell;
}

function clickOnCell(e) {
    if(selectedPieceHasMoved || !myturn) { return; }
    var cell = getCursorPosition(e);
//     alert(cell.x + ", " + cell.y);
    for (var i = 0; i < yNumPieces; i++) {
    	if ((yPieces[i].y === cell.y) && (yPieces[i].x === cell.x)) {
            selectedPieceIndex = i;
//            if(kingInCheck && yPieces[selectedPieceIndex].pieceType !== 'K') {
//                selectedPieceIndex = -1;
//            }
    	    drawBoard();
    	    return;
    	}
    }

    clickOnEmptyCell(cell);
}

function clickOnEmptyCell(cell) {
    if(selectedPieceIndex === -1) { return; }
    if(selectedPieceHasMoved) { return; }
    var piece = yPieces[selectedPieceIndex];
    var validMove = false;
    if(piece.pieceType === 'P')
        validMove = checkValidPawnMove(piece, cell);
    else if(piece.pieceType === 'R') 
        validMove = checkValidRookMove(piece, cell);
    else if(piece.pieceType === 'K') 
        validMove = checkValidKingMove(piece, cell);
    else if(piece.pieceType === 'Q') 
        validMove = checkValidQueenMove(piece, cell);
    else if(piece.pieceType === 'B') 
        validMove = checkValidBishopMove(piece, cell);
    else if(piece.pieceType === 'N') 
        validMove = checkValidKnightMove(piece, cell);

//    alert(validMove);
    if(validMove) {
        selectedPieceHasMoved = true;
        for(var i = 0; i < yPieces.length; i++) {
            yMovedPieces.push(new Piece(yPieces[i].x, yPieces[i].y, yPieces[i].pieceType));
        }
        yMovedPieces[selectedPieceIndex].y = cell.y;
        yMovedPieces[selectedPieceIndex].x = cell.x;
        dest = cell;
        drawBoard();
    }
}

function drawBoard() {
    xOffset -= gCanvasElement.offsetLeft;
    yOffset -= gCanvasElement.offsetTop + 80;

    gDrawingContext.clearRect(0, 0, kPixelWidth, kPixelHeight);
    gDrawingContext.beginPath();

    //Draw board
    for(var y = 0; y < 8; y++) {
        for(var x = 0; x < 8; x++) {
            if ((x + y) % 2 === 0) {
                gDrawingContext.fillStyle="#F0D9B5"; 
                gDrawingContext.fillRect(x*kPieceWidth,y*kPieceHeight,kPieceWidth,kPieceHeight);
            }
            else {
                gDrawingContext.fillStyle="#B58863"; 
                gDrawingContext.fillRect(x*kPieceWidth,y*kPieceHeight,kPieceWidth,kPieceHeight);
            }
        }
    }


    //Draw opponent pieces
    for (var i = 0; i < oPieces.length; i++)
	   drawPiece(oPieces[i], false, oColor);

    //Draw player pieces
    if (selectedPieceHasMoved) {
        for (var i = 0; i < yMovedPieces.length; i++)
            drawPiece(yMovedPieces[i], i === selectedPieceIndex, yColor);
    }
    else if(!selectedPieceHasMoved) {
        for (var i = 0; i < yPieces.length; i++)
            drawPiece(yPieces[i], i === selectedPieceIndex, yColor);
    }
}

function drawPiece(p, selected, color) {
    var x = p.x;
    var y = p.y;
    var x = (x * kPieceWidth) + 5;
    var y = (y * kPieceHeight) + 5;

    if(selected) {
        gDrawingContext.beginPath();
        gDrawingContext.rect(x - 5, y - 5, kPieceWidth, kPieceHeight);
        gDrawingContext.closePath();
        if(!selectedPieceHasMoved)
            gDrawingContext.fillStyle="#ffea00"; 
        else 
            gDrawingContext.fillStyle="#0000ff";
        gDrawingContext.fill();
    }

    var imageObj = new Image();
    imageObj.onload = function() {
        gDrawingContext.drawImage(imageObj, x, y, 50, 50);
    };

    if (p.pieceType === 'P' && color === 'B')
        imageObj.src = 'img/chesspieces/bP.png';
    else if (p.pieceType === 'P' && color === 'W')
        imageObj.src = 'img/chesspieces/wP.png';
    if (p.pieceType === 'Q' && color === 'B')
        imageObj.src = 'img/chesspieces/bQ.png';
    else if (p.pieceType === 'Q' && color ==='W')
        imageObj.src = 'img/chesspieces/wQ.png';
    if (p.pieceType === 'K' && color === 'B')
        imageObj.src = 'img/chesspieces/bK.png';
    else if (p.pieceType === 'K' && color === 'W')
        imageObj.src = 'img/chesspieces/wK.png';
    if (p.pieceType === 'R' && color === 'B')
        imageObj.src = 'img/chesspieces/bR.png';
    else if (p.pieceType === 'R' && color === 'W')
        imageObj.src = 'img/chesspieces/wR.png';
    if (p.pieceType === 'B' && color === 'B')
        imageObj.src = 'img/chesspieces/bB.png';
    else if (p.pieceType === 'B' && color === 'W')
        imageObj.src = 'img/chesspieces/wB.png';
    if (p.pieceType === 'N' && color === 'B')
        imageObj.src = 'img/chesspieces/bN.png';
    else if (p.pieceType === 'N' && color === 'W')
        imageObj.src = 'img/chesspieces/wN.png';

}

if (typeof resumeGame !== "function") {
    saveGameState = function() {
	return false;
    };
    resumeGame = function() {
	return false;
    };
}

function newGame() {
    
    var info = JSON.parse(getBasicInfo($.cookie('user')));
    if(info.user1 === $.cookie('user')) {
        yColor = 'W';
        oColor = 'B';
        
        user1Name = $.cookie('user');
        user2Name = info.user2;
        myturn = true;
        
        $('#uname').html(info.user1);
        $('#ename').html(info.user2);
        
        $('#uChessClock').html(info.user1Time);
        $('#eChessClock').html(info.user2Time);
        
        var myPieces = JSON.parse(info.user1Pieces);
        for(var i = 0; i < myPieces.length; i++) {
            yPieces.push(new Piece(myPieces[i].x, myPieces[i].y, myPieces[i].pieceType));
        }   
        var enemyPieces = JSON.parse(info.user2Pieces);
        for(var i = 0; i < enemyPieces.length; i++) {
            oPieces.push(new Piece(enemyPieces[i].x, enemyPieces[i].y, enemyPieces[i].pieceType));
        }   
        
        oPieces = invertPieceLocations(oPieces);
        
    }
    else {
        yColor = 'B';
        oColor = 'W';
        
        user1Name = info.user1;
        user2Name = $.cookie('user');
        myturn = false;
        
        $('#uname').html(info.user2);
        $('#ename').html(info.user1);
        
        $('#uChessClock').html(info.user2Time);
        $('#eChessClock').html(info.user1Time);
        
        var myPieces = JSON.parse(info.user2Pieces);
        for(var i = 0; i < myPieces.length; i++) {
            yPieces.push(new Piece(myPieces[i].x, myPieces[i].y, myPieces[i].pieceType));
        }
        var enemyPieces = JSON.parse(info.user1Pieces);
        for(var i = 0; i < enemyPieces.length; i++) {
            oPieces.push(new Piece(enemyPieces[i].x, enemyPieces[i].y, enemyPieces[i].pieceType));
        } 
        
        oPieces = invertPieceLocations(oPieces);

    }
    
    
    yNumPieces = yPieces.length;
    oNumPieces = oPieces.length;
    
    selectedPieceIndex = -1;
    selectedPieceHasMoved = false;
    gGameInProgress = true;
    drawBoard();
    
    if(!myturn) {
        $('#reset').prop("disabled", true);
        $('#send').prop("disabled", true);
        $('#reset').val("Waiting for opponent's move...");
        $('#send').val("Waiting for opponent's move...");
    }
    receiveData();
}

function endGame() {
    selectedPieceIndex = -1;
    gGameInProgress = false;
}

function initGame(canvasElement) {
    if (!canvasElement) {
        canvasElement = document.createElement("canvas");
	    canvasElement.id = "chess_canvas";
	    $('#boardContainer').prepend(canvasElement);
        $('#chess_canvas').css({"margin-left":"auto", "margin-right":"auto", "display":"block","text-align":"center"});
    }

    gCanvasElement = canvasElement;
    gCanvasElement.width = kPixelWidth;
    gCanvasElement.height = kPixelHeight;
    gCanvasElement.addEventListener("click", clickOnCell, false);
    gDrawingContext = gCanvasElement.getContext("2d");
	newGame();
}

function isPieceAt(x, y) {
    for(var i = 0; i < yPieces.length; i++) {
        if(yPieces[i].x === x && yPieces[i].y === y)
            return true;
    }
    for(var i = 0; i < oPieces.length; i++) {
        if(oPieces[i].x === x && oPieces[i].y === y)
            return true;
    }
    return false;
}

function checkForCapture(cell) {
    if(isEnemyPieceAt(cell.x, cell.y)) {
        var enemyPieceIndex = -1;
        for(var i = 0; i < oPieces.length; i++) {
            if(oPieces[i].x === cell.x && oPieces[i].y === cell.y) {
                enemyPieceIndex = i;
            }
        }
        yCapturedPieces.push(new Piece(oPieces[enemyPieceIndex].x, oPieces[enemyPieceIndex].y, oPieces[enemyPieceIndex].pieceType));
        recentlyCaptured = new Piece(oPieces[enemyPieceIndex].x, oPieces[enemyPieceIndex].y, oPieces[enemyPieceIndex].pieceType);
        oPieces.splice(enemyPieceIndex, 1);
        oNumPieces--;
    }
    else recentlyCaptured = null;
}

function isEnemyPieceAt(x, y) {
    for(var i = 0; i < oPieces.length; i++) {
        if(oPieces[i].x === x && oPieces[i].y === y)
            return true;
    }
    return false;
}

function checkValidPawnMove(piece, dest) {
    if(piece.y === dest.y &&  piece.x === dest.x)
        return false;
    if(piece.y === dest.y) 
        return false;

    //check move
    var firstMove = (piece.y === 6);
    if(firstMove) {
        if(piece.y - dest.y <= 2 && dest.y < piece.y && piece.x === dest.x) {
            if(isPieceAt(dest.x, piece.y - 1))
                return false;
            return true;
        }
    }
    else {
        if (piece.y - dest.y === 1 && dest.y < piece.y && piece.x === dest.x) {
            if (isPieceAt(dest.x, piece.y - 1))
                return false;
            return true;
        }
    }

    //check attack
    if((dest.x === piece.x - 1 || dest.x === piece.x + 1) && dest.y === piece.y - 1) {
        if(isEnemyPieceAt(dest.x, dest.y)) {
            return true;
        }
    }
    return false;
}

function checkValidRookMove(piece, dest) {
    if(piece.y === dest.y &&  piece.x === dest.x)
        return false;
    if(piece.y !== dest.y && piece.x !== dest.x)
        return false;

    var xDir, yDir;

    if(piece.y === dest.y) {
        yDir = 0;

        if(piece.x > dest.x)
            xDir = -1;
        else 
            xDir = 1;

        i = piece.x + xDir;

        while(i !== dest.x) {
            if(isPieceAt(i, dest.y))
                return false;
            i += xDir;
        }
        return true;
    }
    else if(piece.x === dest.x) {
        xDir = 0;

        if(piece.y > dest.y)
            yDir = -1;
        else 
            yDir = 1;

        i = piece.y + yDir;

        while(i !== dest.y) {
            if(isPieceAt(dest.x, i))
                return false;
            i += yDir;
        }
        return true;
    }
}

function checkValidKnightMove(piece, dest) {
    if(piece.y === dest.y &&  piece.x === dest.x)
        return false;
    var xDiff = Math.abs(piece.x - dest.x);
    var yDiff = Math.abs(piece.y - dest.y);

    if(((xDiff + yDiff) === 3) 
        && (xDiff !== 0) && (yDiff !== 0)) {
        return true;
    }

    return false;
}

function checkValidBishopMove(piece, dest) {
    if(piece.y === dest.y &&  piece.x === dest.x)
        return false;
    var xDiff = Math.abs(dest.x - piece.x);
    var yDiff = Math.abs(dest.y - piece.y);

    if(xDiff - yDiff !== 0) { return false; }
    else {
        //check if pieces are in the way
        var xDir, yDir;
        if(piece.x < dest.x) 
            xDir = 1;
        else 
            xDir = -1;
        if(piece.y < dest.y) 
            yDir = 1;
        else 
            yDir = -1;

        i = piece.x + xDir;
        j = piece.y + yDir;

        while(i !== dest.x && j !== dest.y) {
            if(isPieceAt(i, j))
                return false;
            i += xDir;
            j += yDir;
        }
        return true;
    }
}

function checkValidQueenMove(piece, dest) {
    if(piece.y === dest.y &&  piece.x === dest.x)
        return false;
    if(checkValidRookMove(piece, dest) || checkValidBishopMove(piece, dest)) {
        return true;
    }
    return false;
}

function checkValidKingMove(piece, dest) {
    if(piece.y === dest.y &&  piece.x === dest.x)
        return false;

    if((piece.y === dest.y || piece.y === (dest.y + 1) || piece.y === (dest.y - 1))
     && (piece.x === dest.x || piece.x === (dest.x + 1) || piece.x === (dest.x - 1))) {
        if(isPieceAt(dest.x, dest.y) && isEnemyPieceAt(dest.x, dest.y))
            return true;
        else if(isPieceAt(dest.x, dest.y) && !isEnemyPieceAt(dest.x, dest.y))
            return false;
        else return true;
    }
    
    return false;
}

function resetMove() {
    selectedPieceHasMoved = false;
    selectedPieceIndex = -1;
    yMovedPieces = new Array();
    dest = null;
    drawBoard();
}

function resetBadMove(previousPieces) {
    selectedPieceHasMoved = false;
    selectedPieceIndex = -1;
    for(var i = 0; i < yPieces.length; i++) 
        yPieces[i] = new Piece(previousPieces[i].x, previousPieces[i].y, previousPieces[i].pieceType);
    if(recentlyCaptured !== null) {
        oPieces.push(recentlyCaptured);
        var yCap = [];
        for(var i = 0; i < yCapturedPieces.length; i++) {
            if(!(yCapturedPieces[i].x === recentlyCaptured.x && yCapturedPieces[i].y === recentlyCaptured.y && yCapturedPieces[i].pieceType === recentlyCaptured.pieceType))
                yCap.push(new Piece(previousPieces[i].x, previousPieces[i].y, previousPieces[i].pieceType));
        }
        yCapturedPieces = new Array();
        for(var i = 0; i < yCap.length; i++) {
            yCapturedPieces.push(new Piece(yCap[i].x, yCap[i].y, yCap[i].pieceType));
        }
        yCap = new Array();
    }
    dest = null;
    drawBoard();
}

function sendMove() {
    var currentPieceLocations = [];
    for(var i = 0; i < yPieces.length; i++) 
        currentPieceLocations.push(new Piece(yPieces[i].x, yPieces[i].y, yPieces[i].pieceType));
    
    //yPieces = new Array();
    for(var i = 0; i < yPieces.length; i++) 
        yPieces[i] = new Piece(yMovedPieces[i].x, yMovedPieces[i].y, yMovedPieces[i].pieceType);
    yMovedPieces = new Array();
    
    checkForCapture(dest);


    if(isKingInCheck()) {
        alert("Your move puts/leaves you in check, please make a different one");
        resetBadMove(currentPieceLocations);
        kingInCheck = true;
        return;
    }
    else kingInCheck = false;
    
    
//    console.log("Send Move");
    selectedPieceHasMoved = false;
    selectedPieceIndex = -1;
    drawBoard();
    
    var user1Pieces;
    var user2Pieces;
    var user1CapturedPieces;
    var user2CapturedPieces;
    
    var flippedOpponentPieces = invertPieceLocations(oPieces);

    var user1Time, user2Time;
    
    if(user1Name === $.cookie('user')) {
        user1Time = $('#uChessClock').html();
        user2Time = $('#eChessClock').html();

        user1Pieces = JSON.stringify(yPieces);
        user2Pieces = JSON.stringify(flippedOpponentPieces);
        user1CapturedPieces = JSON.stringify(yCapturedPieces);
        user2CapturedPieces = JSON.stringify(oCapturedPieces);
    }
    else if (user2Name === $.cookie('user')) {
        user2Time = $('#uChessClock').html();
        user1Time = $('#eChessClock').html();
        
        user1Pieces = JSON.stringify(flippedOpponentPieces);
        user2Pieces = JSON.stringify(yPieces); 
        user1CapturedPieces = JSON.stringify(oCapturedPieces);
        user2CapturedPieces = JSON.stringify(yCapturedPieces);
    }
    var userTime = '\"userTime\": [{\"user1Time\":\"' + user1Time + '\"},{\"user2Time\":\"' + user2Time + '\"}]';    
    myturn = false;
    
    clearTimeout(timer);
    sleeping = setTimeout(function () {
        receiveData();
        clearTimeout(sleeping);
    }, 3000);
    
    send(user1Name, user2Name, user1Pieces, user2Pieces, user1CapturedPieces, user2CapturedPieces, userTime);
    
    //receive poll
    

    
    $('#reset').prop("disabled", true);
    $('#send').prop("disabled", true);
    $('#reset').val("Waiting for opponent's move...");
    $('#send').val("Waiting for opponent's move...");
    drawCapturedPieces();
    
    
}

function invertPieceLocations(pieces) {
    for(var i = 0; i < pieces.length; i++) {
        pieces[i] = invertPiece(pieces[i]);
    }
    return pieces;
}

function invertPiece(piece) {
    var x = piece.x;
    var y = piece.y;

//    console.log('Uninverted: ' + x + ', ' + y);
    if(x === 0)
        piece.x = 7;
    else if (x === 7)
        piece.x = 0;
    else
        piece.x = 7 - x;
    
     if(y === 0)
        piece.y = 7;
    else if (y === 7)
        piece.y = 0;
    else
        piece.y = 7 - y;

//    console.log('Inverted: ' + piece.x + ', ' + piece.y);
    return piece;
}
function receiveData() {
    poll();
}
   
function poll(){
    
    //if(!myturn) {
        var url = 'api/receive.php?user1=' + user1Name + '&user2=' + user2Name;

        timer = setTimeout(function(){
          $.ajax({ 
              url: url, 
              success: function(data){
//                console.log(JSON.stringify(data));
                if(data.hasOwnProperty("error")) {
                    if(data.error === true) {
                        alert("The game is over.");
                        location.reload();
                    }
                }
                
                if(data.user1 === $.cookie('user')) {
                    $('#uChessClock').html(data.user1Time);
                    $('#eChessClock').html(data.user2Time);
                    if(data.whosTurn === '0' && !myturn) {
                        myturn = true;
                        $('#reset').prop("disabled", false);
                        $('#send').prop("disabled", false);
                        $('#reset').val("Reset");
                        $('#send').val("Send");
                        loadPieces(data);
                        if(isKingInCheck()) {
                            console.log("King in check");
                            if(isKingInCheckMate()) {
                                console.log("King in preliminary check-mate");
                                if(isKingReallyInCheckMate()) {
                                    alert("Your king is in check-mate, You Lose.");
                                    location.reload();
                                }
                            }
                            else {
                                alert("Your king is in check, make sure to move him.");
                                kingInCheck = true;
                            }
                        }
                        else {
                            kingInCheck = false;
                        }
                        poll();
                    }
                    else if(data.whosTurn === '0' && myturn) {
                        var chessClock = $("#uChessClock");
                        var myTime = chessClock.html();
                        var ss = myTime.split(":");
                        var dt = new Date();
                        dt.setHours(0);
                        dt.setMinutes(ss[0]);
                        dt.setSeconds(ss[1]);
                        var dt2 = new Date(dt.valueOf() - 1000);
                        var temp = dt2.toTimeString().split(" ");
                        var ts = temp[0].split(":");
                        chessClock.html(ts[1]+":"+ts[2]);
                        if(ts[1] === "00" && ts[2] === "00") {
                            alert("Your timer ran out. You lose.");
                            location.reload();
                        }
                        if(user1Name === $.cookie('user')) {
                            var user1Time = $('#uChessClock').html();
                            var user2Time = $('#eChessClock').html();
    //                        var userTimes = '{\"user1Time\":\"' + user1Time + '\"},{\"user2Time\":\"' + user2Time + '\"}';
                            sendTime($.cookie('user'), user1Time, user2Time);
                        }
                        else {
                            var user1Time = $('#eChessClock').html();
                            var user2Time = $('#uChessClock').html();
    //                        var userTimes = '{\"user1Time\":\"' + user1Time + '\"},{\"user2Time\":\"' + user2Time + '\"}';
                            sendTime($.cookie('user'), user1Time, user2Time);
                        }
                        poll();
                    }
                    else 
                        poll();
                }
                else if(data.user2 === $.cookie('user')) {
                    $('#uChessClock').html(data.user2Time);
                    $('#eChessClock').html(data.user1Time);
                    if(data.whosTurn === '1' && !myturn) {
                        myturn = true;
                        $('#reset').prop("disabled", false);
                        $('#send').prop("disabled", false);
                        $('#reset').val("Reset");
                        $('#send').val("Send");
                        loadPieces(data);
                        if(isKingInCheck()) {
                            console.log("King in check");
                            if(isKingInCheckMate()) {
                                console.log("King in preliminary check-mate");
                                if(isKingReallyInCheckMate()) {
                                    alert("Your king is in check-mate, You Lose.");
                                    location.reload();
                                }
                            }
                            alert("Your king is in check, make sure to move him.");
                            kingInCheck = true;
                        }
                        else {
                            kingInCheck = false;
                        }
                        poll();
                    }
                    else if(data.whosTurn === '1' && myturn) {
                        var chessClock = $("#uChessClock");
                        var myTime = chessClock.html();
                        var ss = myTime.split(":");
                        var dt = new Date();
                        dt.setHours(0);
                        dt.setMinutes(ss[0]);
                        dt.setSeconds(ss[1]);
                        var dt2 = new Date(dt.valueOf() - 1000);
                        var temp = dt2.toTimeString().split(" ");
                        var ts = temp[0].split(":");
                        chessClock.html(ts[1]+":"+ts[2]);
                        if(ts[1] === "00" && ts[2] === "00") {
                            alert("Your timer ran out. You lose.");
                            location.reload();
                        }
                        if(user1Name === $.cookie('user')) {
                            var user1Time = $('#uChessClock').html();
                            var user2Time = $('#eChessClock').html();
    //                        var userTimes = '{\"user1Time\":\"' + user1Time + '\"},{\"user2Time\":\"' + user2Time + '\"}';
                            sendTime($.cookie('user'), user1Time, user2Time);
                        }
                        else {
                            var user1Time = $('#eChessClock').html();
                            var user2Time = $('#uChessClock').html();
    //                        var userTimes = '{\"user1Time\":\"' + user1Time + '\"},{\"user2Time\":\"' + user2Time + '\"}';
                            sendTime($.cookie('user'), user1Time, user2Time);
                        }
                        poll();
                    }
                    else
                        poll();
                }
              }, dataType: "json"});
        }, 1000);
    }
//    else {
//        var url = 'api/gameOver.php';
//
//        setTimeout(function(){
//          $.ajax({ 
//              url: url, 
//              success: function(data){
////                console.log(data);
//                if(data === true) {
//                    alert("The game is over.");
//                    location.reload();
//                }
//                else {
//                    var chessClock = $("#uChessClock");
//                    var myTime = chessClock.html();
//                    var ss = myTime.split(":");
//                    var dt = new Date();
//                    dt.setHours(0);
//                    dt.setMinutes(ss[0]);
//                    dt.setSeconds(ss[1]);
//                    var dt2 = new Date(dt.valueOf() - 1000);
//                    var temp = dt2.toTimeString().split(" ");
//                    var ts = temp[0].split(":");
//                    chessClock.html(ts[1]+":"+ts[2]);
//                    if(user1Name === $.cookie('user')) {
//                        var user1Time = $('#uChessClock').html();
//                        var user2Time = $('#eChessClock').html();
////                        var userTimes = '{\"user1Time\":\"' + user1Time + '\"},{\"user2Time\":\"' + user2Time + '\"}';
//                        sendTime($.cookie('user'), user1Time, user2Time);
//                    }
//                    else {
//                        var user1Time = $('#eChessClock').html();
//                        var user2Time = $('#uChessClock').html();
////                        var userTimes = '{\"user1Time\":\"' + user1Time + '\"},{\"user2Time\":\"' + user2Time + '\"}';
//                        sendTime($.cookie('user'), user1Time, user2Time);
//                    }
//                    poll();
//                }
//              }, dataType: "json"});
//        }, 1000);
//    }
//}

function loadPieces(info) {
    //alert(JSON.stringify(info));   
    
    yPieces = [];
    oPieces = [];
    yCapturedPieces = [];
    oCapturedPieces = [];
    
    if(info.user1 === $.cookie('user')) {        
        var myPieces = JSON.parse(info.user1Pieces);
        for(var i = 0; i < myPieces.length; i++) {
            yPieces.push(new Piece(myPieces[i].x, myPieces[i].y, myPieces[i].pieceType));
        }   
        var enemyPieces = JSON.parse(info.user2Pieces);
        for(var i = 0; i < enemyPieces.length; i++) {
            oPieces.push(new Piece(enemyPieces[i].x, enemyPieces[i].y, enemyPieces[i].pieceType));
        }   
        
        var myCapturedPieces = JSON.parse(info.user1CapturedPieces);
        for(var i = 0; i < myCapturedPieces.length; i++) {
            yCapturedPieces.push(new Piece(myCapturedPieces[i].x, myCapturedPieces[i].y, myCapturedPieces[i].pieceType));
        } 
        
        var enemyCapturedPieces = JSON.parse(info.user2CapturedPieces);
        for(var i = 0; i < enemyCapturedPieces.length; i++) {
            oCapturedPieces.push(new Piece(enemyCapturedPieces[i].x, enemyCapturedPieces[i].y, enemyCapturedPieces[i].pieceType));
        } 
        oPieces = invertPieceLocations(oPieces);
        
    }
    else {     
        var myPieces = JSON.parse(info.user2Pieces);
        for(var i = 0; i < myPieces.length; i++) {
            yPieces.push(new Piece(myPieces[i].x, myPieces[i].y, myPieces[i].pieceType));
        }
        var enemyPieces = JSON.parse(info.user1Pieces);
        for(var i = 0; i < enemyPieces.length; i++) {
            oPieces.push(new Piece(enemyPieces[i].x, enemyPieces[i].y, enemyPieces[i].pieceType));
        } 
        var myCapturedPieces = JSON.parse(info.user2CapturedPieces);
        for(var i = 0; i < myCapturedPieces.length; i++) {
            yCapturedPieces.push(new Piece(myCapturedPieces[i].x, myCapturedPieces[i].y, myCapturedPieces[i].pieceType));
        } 
        
        var enemyCapturedPieces = JSON.parse(info.user1CapturedPieces);
        for(var i = 0; i < enemyCapturedPieces.length; i++) {
            oCapturedPieces.push(new Piece(enemyCapturedPieces[i].x, enemyCapturedPieces[i].y, enemyCapturedPieces[i].pieceType));
        } 
        
        oPieces = invertPieceLocations(oPieces);

    }
    
    yNumPieces = yPieces.length;
    oNumPieces = oPieces.length;
    
    drawCapturedPieces();
    drawBoard();
    
}

function drawCapturedPieces() {
    var eCapturedPieces = $('#eCapturedPieces');
    var uCapturedPieces = $('#uCapturedPieces');
    
    var numOfEnemyPiecesRendered = $('#eCapturedPieces img').length;
    
    for(var i = numOfEnemyPiecesRendered; i < oCapturedPieces.length; i++) {
        var imgElement = document.createElement("img");
        imgElement.id = "eCapturedPiece" + i;
        imgElement.src = "img/chesspieces/" + yColor.toLowerCase() + oCapturedPieces[i].pieceType + ".png";
//        console.log(imgElement.src);
        eCapturedPieces.prepend(imgElement);
    }
    
    var numOfPiecesRendered = $('#uCapturedPieces img').length;

    for(var i = numOfPiecesRendered; i < yCapturedPieces.length; i++) {
        var imgElement = document.createElement("img");
        imgElement.id = "uCapturedPiece" + i;
        imgElement.src = "img/chesspieces/" + oColor.toLowerCase() + yCapturedPieces[i].pieceType + ".png";
//        console.log(imgElement.src);
        uCapturedPieces.prepend(imgElement);
    }
}

function isKingInCheck() {
    var king;
    
    for(var i = 0; i < yPieces.length; i++) {
        if(yPieces[i].pieceType === 'K') {
            king = yPieces[i];
            break;
        }
    }
    return inCheck(new Cell(king.x, king.y));
}

function isKingInCheckMate() {
    var validKingMoves = [];
    var king;
    
    for(var i = 0; i < yPieces.length; i++) {
        if(yPieces[i].pieceType === 'K') {
            king = yPieces[i];
            break;
        }
    }
    
    for(var x = 0; x < kBoardWidth; x++) {
        for(var y = 0; y < kBoardHeight; y++) {
            var temp = new Cell(x, y);
            if(checkValidKingMove(king, temp)) {
                validKingMoves.push(temp); 
            }
        }
    }
    
    var allPossibleMovesInCheck = true;
    
    for(var i = 0; i < validKingMoves.length; i++) {
        if(!inCheck(validKingMoves[i])) {
            allPossibleMovesInCheck = false;
        }
    } 
    return allPossibleMovesInCheck;
}

function inCheck(dest) {
//    alert('King\'s Location: ' + JSON.stringify(dest));
//    console.log('--------------------------------------------------');
    var destInverted = invertPiece(new Cell(dest.x, dest.y));
    oPieces = invertPieceLocations(oPieces);
    yPieces = invertPieceLocations(yPieces);
//    for(var i = 0; i < oPieces.length; i++)
//        oPiecesInverted.push(new Piece(oPieces[i].x, oPieces[i].y, oPieces[i].pieceType));
//    oPiecesInverted = invertPieceLocations(oPiecesInverted);
    
    for(var i = 0; i < oPieces.length; i++) {
//        console.log('Piece location: ' + JSON.stringify(oPieces[i]));
        if(oPieces[i].pieceType === 'P') {
//            console.log("Valid pawn move: " + checkValidPawnMove(oPieces[i], destInverted));
            if(checkValidPawnMove(oPieces[i], destInverted)) { 
                oPieces = invertPieceLocations(oPieces);
                yPieces = invertPieceLocations(yPieces);
                return true;
            }
        }
        else if(oPieces[i].pieceType === 'R') {
//            console.log("Valid rook move: " + checkValidRookMove(oPieces[i], destInverted));
            if(checkValidRookMove(oPieces[i], destInverted)) {
                oPieces = invertPieceLocations(oPieces);
                yPieces = invertPieceLocations(yPieces);
                return true;
            }
        }
        else if(oPieces[i].pieceType === 'B') {
//            console.log("Valid bishop move: " + checkValidBishopMove(oPieces[i], destInverted));
            if(checkValidBishopMove(oPieces[i], destInverted)) {
                oPieces = invertPieceLocations(oPieces);
                yPieces = invertPieceLocations(yPieces);
                return true;
            }
        }
        else if(oPieces[i].pieceType === 'N') {
//            console.log("Valid kngiht move: " + checkValidKnightMove(oPieces[i], destInverted));
            if(checkValidKnightMove(oPieces[i], destInverted)) {
                oPieces = invertPieceLocations(oPieces);
                yPieces = invertPieceLocations(yPieces);
                return true;
            }
        }
        else if(oPieces[i].pieceType === 'K') {
//            console.log("Valid king move: " + checkValidKingMove(oPieces[i], destInverted));
            if(checkValidKingMove(oPieces[i], destInverted)) {
                oPieces = invertPieceLocations(oPieces);
                yPieces = invertPieceLocations(yPieces);
                return true;
            }
        }
        else if(oPieces[i].pieceType === 'Q') {
//            console.log('Your King\'s location: ' + JSON.stringify(destInverted));
//            console.log('Opponent\'s Queen location: ' + JSON.stringify(oPieces[i]));
//            console.log("Valid queen move: " + checkValidQueenMove(oPieces[i], destInverted));
            if(checkValidQueenMove(oPieces[i], destInverted)) {
                oPieces = invertPieceLocations(oPieces);
                yPieces = invertPieceLocations(yPieces);
                return true;
            }
        }
    }
    oPieces = invertPieceLocations(oPieces);
    yPieces = invertPieceLocations(yPieces);
    return false;    
}

function isKingReallyInCheckMate() {
    var theKingIsReallyInCheckMate = true;
    
    
    for(var i = 0; i < yPieces.length; i++) {
//        console.log("Piece " + i + ", type: " + yPieces[i].pieceType);
        var validMoves = [];
        
        //find all valid moves for this piece
        for(var x = 0; x < kBoardWidth; x++) {
            for(var y = 0; y < kBoardHeight; y++) {
//                console.log("x: " + x + ", y: " + y);
                var temp = new Cell(x, y);
                
                if(yPieces[i].pieceType === 'P') {
                    if(checkValidPawnMove(yPieces[i], temp)) {
                        validMoves.push(temp); 
                    }
                }
                else if(yPieces[i].pieceType === 'R') {
                    if(checkValidRookMove(yPieces[i], temp)) {
                        validMoves.push(temp); 
                    }
                }
                else if(yPieces[i].pieceType === 'N') {
                    if(checkValidKnightMove(yPieces[i], temp)) {
                        validMoves.push(temp); 
                    }
                }
                else if(yPieces[i].pieceType === 'B') {
                    if(checkValidBishopMove(yPieces[i], temp)) {
                        validMoves.push(temp); 
                    }
                }
                else if(yPieces[i].pieceType === 'Q') {
                    if(checkValidQueenMove(yPieces[i], temp)) {
                        validMoves.push(temp); 
                    }
                }
                else if(yPieces[i].pieceType === 'K') {
                    if(checkValidKingMove(yPieces[i], temp)) {
                        validMoves.push(temp); 
                    }
                }
            }
        }
        
        var actualPieceLocation = new Cell(yPieces[i].x, yPieces[i].y);
        var capturedPiece = null;
        for(var j = 0; j < validMoves.length; j++) {
//            console.log("Move -- x: " + validMoves[j].x + ", y: " + validMoves[j].y);
            yPieces[i].x = validMoves[j].x;
            yPieces[i].y = validMoves[j].y;
            
            //"capture" piece if it's at that location
            if(isEnemyPieceAt(validMoves[j].x, validMoves[j].y)) {
                var enemyPieceIndex = -1;
                for(var k = 0; k < oPieces.length; k++) {
                    if(oPieces[k].x === validMoves[j].x && oPieces[k].y === validMoves[j].y) {
                        enemyPieceIndex = k;
                        capturedPiece = new Piece(oPieces[k].x, oPieces[k].y, oPieces[k].pieceType);
                    }
                }
                oPieces.splice(enemyPieceIndex, 1); 
            }
            
            //check for check-mate
            if(isKingInCheck()) {
                if(!isKingInCheckMate()) {
                    theKingIsReallyInCheckMate = true; 
                }
                
                if(capturedPiece !== null) {
                    oPieces.push(new Piece(capturedPiece.x, capturedPiece.y, capturedPiece.pieceType));
                    capturedPiece = null;
                }
                yPieces[i].x = actualPieceLocation.x;
                yPieces[i].y = actualPieceLocation.y;
            }
        }
        actualPieceLocation = null;
    }
    return theKingIsReallyInCheckMate;
}