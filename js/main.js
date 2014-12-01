
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

var oPieces;
var yPieces;

var gNumPieces;
var gSelectedPieceIndex;
var gSelectedPieceHasMoved;
var gMoveCount;
var gMoveCountElem;
var gGameInProgress;

function Cell(column, row) {
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
    var cell = new Cell(Math.floor(x/kPieceWidth), Math.floor(y/kPieceHeight) -1);
    return cell;
}

function clickOnCell(e) {
    var cell = getCursorPosition(e);
    for (var i = 0; i < gNumPieces; i++) {
    	if ((gPieces[i].row == cell.row) && (gPieces[i].column == cell.column)) {
            gSelectedPieceIndex = i;
    	    drawBoard(cell);
    	    return;
    	}
    }

    for(var i = 0; i < oPieces.length; i++) {
        if ((oPieces[i].row == cell.row) && (oPieces[i].column == cell.column)) {
            gSelectedPieceIndex = i;
            drawBoard(cell);
            return;
        }
    }

    gPieces[gSelectedPieceIndex].row = cell.row;
    gPieces[gSelectedPieceIndex].column = cell.column;
    drawBoard(new Cell(-1, -1));
}

function getPieceFromCell(cell) {
    xPos = cell.column;
    yPos = cell.row;
}

function clickOnPiece(i, cell) {
    drawBoard(cell);
}

function isThereAPieceBetween(cell1, cell2) {
    /* note: assumes cell1 and cell2 are 2 squares away
       either vertically, horizontally, or diagonally */
    var rowBetween = (cell1.row + cell2.row) / 2;
    var columnBetween = (cell1.column + cell2.column) / 2;
    for (var i = 0; i < gNumPieces; i++) {
    	if ((gPieces[i].row == rowBetween) && (gPieces[i].column == columnBetween)) {
    	    return true;
    	}
    }
    return false;
}

function drawBoard(cell) {
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
            if(cell.row == y && cell.column == x) {
                gDrawingContext.strokeStyle = "#fffc00";
                gDrawingContext.lineWidth = 6;
                gDrawingContext.strokeRect(x*kPieceWidth + 3, y*kPieceHeight + 3, kPieceWidth - 3, kPieceHeight - 3);
            }
        }
    }

    //Draw opponent pieces
    for (var i = 0; i < oPieces.length; i++)
	   drawPiece(oPieces[i], i == gSelectedPieceIndex);

    //Draw player pieces
    for (var i = 0; i < yPieces.length; i++)
        drawPiece(yPieces[i], i == gSelectedPieceIndex);
}

function drawPiece(p, selected) {
    var column = p.column;
    var row = p.row;
    var x = (column * kPieceWidth) + 5;
    var y = (row * kPieceHeight) + 5;

    var imageObj = new Image();
    imageObj.onload = function() {
        gDrawingContext.drawImage(imageObj, x, y, 50, 50);
    };

    if(row == kBoardHeight - 2 || row == kBoardHeight - 3)
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

    oPieces = [new Cell(0, 0), new Cell(1, 0), new Cell(2, 0), new Cell(3, 0), 
               new Cell(4, 0), new Cell(5, 0), new Cell(6, 0), new Cell(7, 0), 

               new Cell(0, 1), new Cell(1, 1), new Cell(2, 1), new Cell(3, 1),
               new Cell(4, 1), new Cell(5, 1), new Cell(6, 1), new Cell(7, 1)];

    h = kBoardHeight;

    yPieces = [new Cell(0, h - 1), new Cell(1, h - 1), new Cell(2, h - 1), new Cell(3, h - 1),
               new Cell(4, h - 1), new Cell(5, h - 1), new Cell(6, h - 1), new Cell(7, h - 1),

               new Cell(0, h - 2), new Cell(1, h - 2), new Cell(2, h - 2), new Cell(3, h - 2),
               new Cell(4, h - 2), new Cell(5, h - 2), new Cell(6, h - 2), new Cell(7, h - 2)];

    gNumPieces = gPieces.length;
    gSelectedPieceIndex = -1;
    gSelectedPieceHasMoved = false;
    gMoveCount = 0;
    gGameInProgress = true;
    drawBoard(new Cell(-1, -1));
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
    gCanvasElement.addEventListener("click", clickOnCell, false);
    gMoveCountElem = moveCountElement;
    gDrawingContext = gCanvasElement.getContext("2d");
    if (!resumeGame())
	    newGame();
}