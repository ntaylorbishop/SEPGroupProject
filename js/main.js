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

var oPieces;
var oColor = 'B';
var oNumPieces;

var yPieces;
var yMovedPieces = new Array();
var yColor = 'W';
var yNumPieces;
var selectedPieceIndex;
var selectedPieceHasMoved;

var gGameInProgress;

function Cell(column, row) {
    this.row = row;
    this.column = column;
}

function Piece(column, row, pieceType) {
    this.row = row;
    this.column = column;
    this.pieceType = pieceType;
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
    y -= gCanvasElement.offsetTop + 80;
    x = Math.min(x, kBoardWidth * kPieceWidth);
    y = Math.min(y, kBoardHeight * kPieceHeight);
    var cell = new Cell(Math.floor(x/kPieceWidth), Math.floor(y/kPieceHeight));
    return cell;
}

function clickOnCell(e) {
    if(selectedPieceHasMoved) { return; }
    var cell = getCursorPosition(e);
    // alert(cell.column + ", " + cell.row);
    for (var i = 0; i < yNumPieces; i++) {
    	if ((yPieces[i].row == cell.row) && (yPieces[i].column == cell.column)) {
            selectedPieceIndex = i;
    	    drawBoard();
    	    return;
    	}
    }

    clickOnEmptyCell(cell);
}

function clickOnEmptyCell(cell) {
    if(selectedPieceIndex == -1) { return; }
    if(selectedPieceHasMoved) { return; }
    var piece = yPieces[selectedPieceIndex];
    var validMove = false;
    if(piece.pieceType == 'P')
        validMove = checkValidPawnMove(piece, cell);
    else if(piece.pieceType == 'R') 
        validMove = checkValidRookMove(piece, cell);
    else if(piece.pieceType == 'K') 
        validMove = checkValidKingMove(piece, cell);
    else if(piece.pieceType == 'Q') 
        validMove = checkValidQueenMove(piece, cell);
    else if(piece.pieceType == 'B') 
        validMove = checkValidBishopMove(piece, cell);
    else if(piece.pieceType == 'N') 
        validMove = checkValidKnightMove(piece, cell);

    alert(validMove);
    if(validMove) {
        selectedPieceHasMoved = true;
        for(var i = 0; i < yPieces.length; i++) {
            yMovedPieces.push(new Piece(yPieces[i].column, yPieces[i].row, yPieces[i].pieceType));
        }
        yMovedPieces[selectedPieceIndex].row = cell.row;
        yMovedPieces[selectedPieceIndex].column = cell.column;
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


    //Draw opponent pieces
    for (var i = 0; i < oPieces.length; i++)
	   drawPiece(oPieces[i], false, oColor);

    //Draw player pieces
    if (selectedPieceHasMoved) {
        for (var i = 0; i < yMovedPieces.length; i++)
            drawPiece(yMovedPieces[i], i == selectedPieceIndex, yColor);
    }
    else if(!selectedPieceHasMoved) {
        for (var i = 0; i < yPieces.length; i++)
            drawPiece(yPieces[i], i == selectedPieceIndex, yColor);
    }
}

function drawPiece(p, selected, color) {
    var column = p.column;
    var row = p.row;
    var x = (column * kPieceWidth) + 5;
    var y = (row * kPieceHeight) + 5;

    if(selected) {
        gDrawingContext.beginPath();
        gDrawingContext.rect(x - 5, y - 5, kPieceWidth, kPieceHeight)
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

    if (p.pieceType == 'P' && color == 'B')
        imageObj.src = 'img/chesspieces/bP.png';
    else if (p.pieceType == 'P' && color == 'W')
        imageObj.src = 'img/chesspieces/wP.png';
    if (p.pieceType == 'Q' && color == 'B')
        imageObj.src = 'img/chesspieces/bQ.png';
    else if (p.pieceType == 'Q' && color =='W')
        imageObj.src = 'img/chesspieces/wQ.png';
    if (p.pieceType == 'K' && color == 'B')
        imageObj.src = 'img/chesspieces/bK.png';
    else if (p.pieceType == 'K' && color == 'W')
        imageObj.src = 'img/chesspieces/wK.png';
    if (p.pieceType == 'R' && color == 'B')
        imageObj.src = 'img/chesspieces/bR.png';
    else if (p.pieceType == 'R' && color == 'W')
        imageObj.src = 'img/chesspieces/wR.png';
    if (p.pieceType == 'B' && color == 'B')
        imageObj.src = 'img/chesspieces/bB.png';
    else if (p.pieceType == 'B' && color == 'W')
        imageObj.src = 'img/chesspieces/wB.png';
    if (p.pieceType == 'N' && color == 'B')
        imageObj.src = 'img/chesspieces/bN.png';
    else if (p.pieceType == 'N' && color == 'W')
        imageObj.src = 'img/chesspieces/wN.png';

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
    oPieces = [new Piece(0, 0, 'R'), new Piece(1, 0, 'N'), new Piece(2, 0, 'B'), new Piece(3, 0, 'K'), 
               new Piece(4, 0, 'Q'), new Piece(5, 0, 'B'), new Piece(6, 0, 'N'), new Piece(7, 0, 'R'), 

               new Piece(0, 1, 'P'), new Piece(1, 1, 'P'), new Piece(2, 1, 'P'), new Piece(3, 1, 'P'),
               new Piece(4, 1, 'P'), new Piece(5, 1, 'P'), new Piece(6, 1, 'P'), new Piece(7, 1, 'P')];

    h = kBoardHeight;
    oNumPieces = 16;

    yPieces = [new Piece(0, h - 1, 'R'), new Piece(1, h - 1, 'N'), new Piece(2, h - 1, 'B'), new Piece(3, h - 1, 'Q'),
               new Piece(4, h - 1, 'K'), new Piece(5, h - 1, 'B'), new Piece(6, h - 1, 'N'), new Piece(7, h - 1, 'R'),

               new Piece(0, h - 2, 'P'), new Piece(1, h - 2, 'P'), new Piece(2, h - 2, 'P'), new Piece(3, h - 2, 'P'),
               new Piece(4, h - 2, 'P'), new Piece(5, h - 2, 'P'), new Piece(6, h - 2, 'P'), new Piece(7, h - 2, 'P')];

    yNumPieces = 16;
    selectedPieceIndex = -1;
    selectedPieceHasMoved = false;
    gGameInProgress = true;
    drawBoard();
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
    gDrawingContext = gCanvasElement.getContext("2d");
	newGame();
}

function isMyPieceAt(x, y) {
    for(var i = 0; i < yNumPieces.length; i++) {
        if(yPieces[i].column == x && yPieces[i].row == y)
            return true;
    }
    return false;
}

function checkValidPawnMove(piece, dest) {
    if(piece.row == dest.row) 
        return false;

    //check move
    var firstMove = (piece.row == 6);
    if(firstMove) {
        if(piece.row - dest.row <= 2 && dest.row < piece.row && piece.column == dest.column) {
            if(isMyPieceAt(dest.column, piece.row - 1))
                return false;
            return true;
        }
    }
    else {
        if (piece.row - dest.row == 1 && dest.row < piece.row && piece.column == dest.column)
            return true;
    }

    //check attack

    return false;
}

function checkValidRookMove(piece, dest) {
    if(piece.row != dest.row && piece.column != dest.column)
        return false;

    else if(piece.row == dest.row) {
        var lowerCol, higherCol;
        if(piece.column > dest.column) {
            lowerCol = dest.column;
            higherCol = piece.column;
        }
        else {
            lowerCol = piece.column;
            higherCol = dest.column;
        }

        for(var i = 0; i < yPieces.length; i++) {
            if(yPieces[i].row == piece.row && (yPieces[i].column < higherCol && yPieces[i].column > lowerCol)) 
                    return false;    
            }
        
        return true;
    }
    else if(piece.column == dest.column) {
        var lowerRow, higherRow;
        if(piece.row > dest.row) {
            lowerRow = dest.row;
            higherRow = piece.row;
        }
        else {
            lowerRow = piece.row;
            higherRow = dest.row;
        }

        for(var i = 0; i < yPieces.length; i++) {
            if(yPieces[i].column == piece.column && (yPieces[i].row < higherRow && yPieces[i].row > lowerRow)) 
                    return false;
        }
        return true;
    }
}

function checkValidKnightMove(piece, dest) {
    
    return false;
}

function checkValidBishopMove(piece, dest) {

return false;
}

function checkValidQueenMove(piece, dest) {

return false;
}

function checkValidKingMove(piece, dest) {

    if((piece.row == dest.row || piece.row == (dest.row + 1) || piece.row == (dest.row - 1))
     && (piece.column == dest.column || piece.column == (dest.column + 1) || piece.column == (dest.column - 1))) {
        return true;
    }
    
    return false;
}

function reset() {
    selectedPieceHasMoved = false;
    selectedPieceIndex = -1;
    yMovedPieces = new Array();
    drawBoard();
}

function send() {
    for(var i = 0; i < yPieces.length; i++) 
        yPieces[i] = new Piece(yMovedPieces[i].column, yMovedPieces[i].row, yMovedPieces[i].pieceType);
    yMovedPieces = new Array();
    selectedPieceHasMoved = false;
    selectedPieceIndex = -1;
    drawBoard();
}