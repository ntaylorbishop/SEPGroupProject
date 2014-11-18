
var kBoardWidth = 8;
var kBoardHeight= 8;
var kPieceWidth = 60;
var kPieceHeight= 60;
var kPixelWidth = 1 + (kBoardWidth * kPieceWidth);
var kPixelHeight= 1 + (kBoardHeight * kPieceHeight);

var gCanvasElement;
var gDrawingContext;
var gPattern;

var gPieces;
var gNumPieces;
var gSelectedPieceIndex;
var gSelectedPieceHasMoved;
var gMoveCount;
var gMoveCountElem;
var gGameInProgress;

function Cell(row, column) {
    this.row = row;
    this.column = column;
}

function getCursorPosition(e) {
    /* returns Cell with .row and .column properties */
    var x;
    var y;
    if (e.pageX != undefined && e.pageY != undefined) {
	x = e.pageX;
	y = e.pageY;
    }
    else {
	x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    x -= gCanvasElement.offsetLeft;
    y -= gCanvasElement.offsetTop;
    x = Math.min(x, kBoardWidth * kPieceWidth);
    y = Math.min(y, kBoardHeight * kPieceHeight);
    var cell = new Cell(Math.floor(y/kPieceHeight), Math.floor(x/kPieceWidth));
    return cell;
}

function halmaOnClick(e) {
    var cell = getCursorPosition(e);
    for (var i = 0; i < gNumPieces; i++) {
	if ((gPieces[i].row == cell.row) && 
	    (gPieces[i].column == cell.column)) {
	    clickOnPiece(i);
	    return;
	}
    }
    clickOnEmptyCell(cell);
}

function clickOnEmptyCell(cell) {
    if (gSelectedPieceIndex == -1) { return; }
    var rowDiff = Math.abs(cell.row - gPieces[gSelectedPieceIndex].row);
    var columnDiff = Math.abs(cell.column - gPieces[gSelectedPieceIndex].column);
    if ((rowDiff <= 1) &&
	(columnDiff <= 1)) {
	/* we already know that this click was on an empty square,
	   so that must mean this was a valid single-square move */
	gPieces[gSelectedPieceIndex].row = cell.row;
	gPieces[gSelectedPieceIndex].column = cell.column;
	gMoveCount += 1;
	gSelectedPieceIndex = -1;
	gSelectedPieceHasMoved = false;
	drawBoard();
	return;
    }
    if ((((rowDiff == 2) && (columnDiff == 0)) ||
	 ((rowDiff == 0) && (columnDiff == 2)) ||
	 ((rowDiff == 2) && (columnDiff == 2))) && 
	isThereAPieceBetween(gPieces[gSelectedPieceIndex], cell)) {
	/* this was a valid jump */
	if (!gSelectedPieceHasMoved) {
	    gMoveCount += 1;
	}
	gSelectedPieceHasMoved = true;
	gPieces[gSelectedPieceIndex].row = cell.row;
	gPieces[gSelectedPieceIndex].column = cell.column;
	drawBoard();
	return;
    }
    gSelectedPieceIndex = -1;
    gSelectedPieceHasMoved = false;
    drawBoard();
}

function clickOnPiece(pieceIndex) {
    if (gSelectedPieceIndex == pieceIndex) { return; }
    gSelectedPieceIndex = pieceIndex;
    gSelectedPieceHasMoved = false;
    drawBoard();
}

function isThereAPieceBetween(cell1, cell2) {
    /* note: assumes cell1 and cell2 are 2 squares away
       either vertically, horizontally, or diagonally */
    var rowBetween = (cell1.row + cell2.row) / 2;
    var columnBetween = (cell1.column + cell2.column) / 2;
    for (var i = 0; i < gNumPieces; i++) {
	if ((gPieces[i].row == rowBetween) &&
	    (gPieces[i].column == columnBetween)) {
	    return true;
	}
    }
    return false;
}

function isTheGameOver() {
    for (var i = 0; i < gNumPieces; i++) {
	if (gPieces[i].row > 2) {
	    return false;
	}
	if (gPieces[i].column < (kBoardWidth - 3)) {
	    return false;
	}
    }
    return true;
}

function drawBoard() {
    if (gGameInProgress && isTheGameOver()) {
	   endGame();
    }

    gDrawingContext.clearRect(0, 0, kPixelWidth, kPixelHeight);
    gDrawingContext.beginPath();

    //Draw board
    for(var y = 0; y < 8; y++) {
        for(var x = 0; x < 8; x++) {
            if ((x + y) % 2 == 0) {
                gDrawingContext.fillStyle="#F0D9B5"; 
                gDrawingContext.fillRect(x*kPieceWidth,y*kPieceHeight,kPieceWidth,kPieceHeight);
            }
            else {
                gDrawingContext.fillStyle="#B58863"; 
                gDrawingContext.fillRect(x*kPieceWidth,y*kPieceHeight,kPieceWidth,kPieceHeight);
            }
        }
    }

    //Draw pieces
    for (var i = 0; i < 32; i++)
	   drawPiece(gPieces[i], i == gSelectedPieceIndex);

    gMoveCountElem.innerHTML = gMoveCount;
    saveGameState();
}

function drawPiece(p, selected) {
    var column = p.column;
    var row = p.row;
    var x = (column * kPieceWidth) + 5;
    var y = (row * kPieceHeight) + 5;
    alert(x);

    var imageObj = new Image();
    imageObj.onload = function() {
        gDrawingContext.drawImage(imageObj, x, y, 50, 50);
    };

    if(row == kBoardHeight - 2)
        imageObj.src = 'img/chesspieces/bP.png';
    else if(row == 1)
        imageObj.src = 'img/chesspieces/wP.png';
    if(row == 0) {
        if(column == 0) imageObj.src = 'img/chesspieces/wR.png';
        if(column == 1) imageObj.src = 'img/chesspieces/wN.png';
        if(column == 2) imageObj.src = 'img/chesspieces/wB.png';
        if(column == 3) imageObj.src = 'img/chesspieces/wQ.png';
        if(column == 4) imageObj.src = 'img/chesspieces/wK.png';
        if(column == 5) imageObj.src = 'img/chesspieces/wB.png';
        if(column == 6) imageObj.src = 'img/chesspieces/wN.png';
        if(column == 7) imageObj.src = 'img/chesspieces/wR.png';
    }
    if(row == kBoardHeight - 1) {
        if(column == 0) imageObj.src = 'img/chesspieces/bR.png';
        if(column == 1) imageObj.src = 'img/chesspieces/bN.png';
        if(column == 2) imageObj.src = 'img/chesspieces/bB.png';
        if(column == 3) imageObj.src = 'img/chesspieces/bK.png';
        if(column == 4) imageObj.src = 'img/chesspieces/bQ.png';
        if(column == 5) imageObj.src = 'img/chesspieces/bB.png';
        if(column == 6) imageObj.src = 'img/chesspieces/bN.png';
        if(column == 7) imageObj.src = 'img/chesspieces/bR.png';
    }


    if( x >= 325 && y <= 125) {
       gDrawingContext.fillStyle = "#00FF00";
       gDrawingContext.fill();
    }

    if (selected) {
	   gDrawingContext.fillStyle = "#000";
	   gDrawingContext.fill();
    }
}

if (typeof resumeGame != "function") {
    saveGameState = function() {
	return false;
    }
    resumeGame = function() {
	return false;
    }
}

function newGame() {
    gPieces = [new Cell(kBoardHeight - 1, 0),
	           new Cell(kBoardHeight - 1, 1),
	           new Cell(kBoardHeight - 1, 2),
	           new Cell(kBoardHeight - 1, 3),
	           new Cell(kBoardHeight - 1, 4),
	           new Cell(kBoardHeight - 1, 5),
	           new Cell(kBoardHeight - 1, 6),
	           new Cell(kBoardHeight - 1, 7),

               new Cell(kBoardHeight - 2, 0),
               new Cell(kBoardHeight - 2, 1),
               new Cell(kBoardHeight - 2, 2),
               new Cell(kBoardHeight - 2, 3),
               new Cell(kBoardHeight - 2, 4),
               new Cell(kBoardHeight - 2, 5),
               new Cell(kBoardHeight - 2, 6),
               new Cell(kBoardHeight - 2, 7),

               new Cell(0, 0),
               new Cell(0, 1),
               new Cell(0, 2),
               new Cell(0, 3),
               new Cell(0, 4),
               new Cell(0, 5),
               new Cell(0, 6),
               new Cell(0, 7),

               new Cell(1, 0),
               new Cell(1, 1),
               new Cell(1, 2),
               new Cell(1, 3),
               new Cell(1, 4),
               new Cell(1, 5),
               new Cell(1, 6),
               new Cell(1, 7)];


    gNumPieces = gPieces.length;
    gSelectedPieceIndex = -1;
    gSelectedPieceHasMoved = false;
    gMoveCount = 0;
    gGameInProgress = true;
    drawBoard();
}

function endGame() {
    gSelectedPieceIndex = -1;
    gGameInProgress = false;
}

function initGame(canvasElement, moveCountElement) {
    if (!canvasElement) {
        canvasElement = document.createElement("canvas");
	    canvasElement.id = "chess_canvas";
	    $('#boardContainer').prepend(canvasElement);
        $('#chess_canvas').css({"margin-left":"auto", "margin-right":"auto", "display":"block","text-align":"center"});
        var ename = document.createElement("p");
        ename.id = "ename";
        $('#boardContainer').prepend(ename);
        $('p#ename').css({"margin-left":"auto", "margin-right":"auto", "text-align":"center"});
        $('p#ename').text("TBGeorge");

    }

    gCanvasElement = canvasElement;
    gCanvasElement.width = kPixelWidth;
    gCanvasElement.height = kPixelHeight;
    gCanvasElement.addEventListener("click", halmaOnClick, false);
    gMoveCountElem = moveCountElement;
    gDrawingContext = gCanvasElement.getContext("2d");
    if (!resumeGame())
	    newGame();
}