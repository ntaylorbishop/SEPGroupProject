var kBoardWidth = 9; //change to 0 to use with Initialization form
var kBoardHeight = 9; //change to 0 to use with Initialization form
var kPieceWidth = 50;
var kPieceHeight = 50;
var kPixelWidth = 1 + (kBoardWidth * kPieceWidth); // change to 0 to use with initialization form
var kPixelHeight = 1 + (kBoardHeight * kPieceHeight); // change to 0 to use with initialization form
var destinationCorner = "upperRight"; //change to "" to use with initialization form
var piecesCorner = "lowerLeft"; //change to "" to user with initialization form

var gCanvasElement;
var gDrawingContext;
var gPattern;

var gPieces;
var gNumPieces;
var gDestinations;
var gNumDests;
var gSelectedPieceIndex;
var gSelectedPieceHasMoved;
var gMoveCount;
var gMoveCountElem;
var gGameInProgress;

var url = "";

function Cell(y, x) {
    this.y = y;
    this.x = x;
}

function isThereAPieceBetween(cell1, cell2) {
    /* note: assumes cell1 and cell2 are 2 squares away
     either vertically, horizontally, or diagonally */
    var rowBetween = (cell1.y + cell2.y) / 2;
    var columnBetween = (cell1.x + cell2.x) / 2;
    for (var i = 0; i < gNumPieces; i++) {
        if ((gPieces[i].y === rowBetween) &&
                (gPieces[i].x === columnBetween)) {
            return true;
        }
    }
    return false;
}

function isTheGameOver() {
    for (var i = 0; i < gNumPieces; i++) {
        if (gPieces[i].y > 2) {
            return false;
        }
        if (gPieces[i].x < (kBoardWidth - 3)) {
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

    /* vertical lines */
    for (var x = 0; x <= kPixelWidth; x += kPieceWidth) {
        gDrawingContext.moveTo(0.5 + x, 0);
        gDrawingContext.lineTo(0.5 + x, kPixelHeight);
    }

    /* horizontal lines */
    for (var y = 0; y <= kPixelHeight; y += kPieceHeight) {
        gDrawingContext.moveTo(0, 0.5 + y);
        gDrawingContext.lineTo(kPixelWidth, 0.5 + y);
    }

    /* draw it! */
    gDrawingContext.strokeStyle = "#ccc";
    gDrawingContext.stroke();

    for (var i = 0; i < 9; i++) {
        drawPiece(gPieces[i], (i === gSelectedPieceIndex));
    }

    gMoveCountElem.innerHTML = gMoveCount;

    saveGameState();
}

function drawPiece(p, selected) {
    var column = p.x;
    var row = p.y;
    //alert("Row: " + row + ", Col: " + column);
    var x = (column * kPieceWidth) + (kPieceWidth / 2);
    var y = (row * kPieceHeight) + (kPieceHeight / 2);
    var radius = (kPieceWidth / 2) - (kPieceWidth / 10);
    gDrawingContext.beginPath();
    gDrawingContext.arc(x, y, radius, 0, Math.PI * 2, false);
    gDrawingContext.closePath();
    gDrawingContext.strokeStyle = "#000";
    gDrawingContext.stroke();
    if(selected) {
        gDrawingContext.fillStyle = "#000";
        gDrawingContext.fill();
    }
    if (destinationCorner === "lowerLeft")
        if (column < 3 && row >= kBoardHeight - 3) {
            gDrawingContext.fillStyle = "#00ff00";
            gDrawingContext.fill();
        }
    if (destinationCorner === "lowerRight")
        if (column >= kBoardWidth - 3 && row >= kBoardHeight - 3) {
            gDrawingContext.fillStyle = "#00ff00";
            gDrawingContext.fill();
        }
    if (destinationCorner === "upperLeft")
        if (column < 3 && row < 3) {
            gDrawingContext.fillStyle = "#00ff00";
            gDrawingContext.fill();
        }
    if (destinationCorner === "upperRight")
        if (column >= kBoardWidth - 3 && row < 3) {
            gDrawingContext.fillStyle = "#00ff00";
            gDrawingContext.fill();
        }
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
    if (piecesCorner === "lowerLeft") {
        gPieces = [new Cell(kBoardHeight - 3, 0),
            new Cell(kBoardHeight - 2, 0),
            new Cell(kBoardHeight - 1, 0),
            new Cell(kBoardHeight - 3, 1),
            new Cell(kBoardHeight - 2, 1),
            new Cell(kBoardHeight - 1, 1),
            new Cell(kBoardHeight - 3, 2),
            new Cell(kBoardHeight - 2, 2),
            new Cell(kBoardHeight - 1, 2)];
    }
    else if (piecesCorner === "upperLeft") {
        gPieces = [new Cell(0, 0),
            new Cell(1, 0),
            new Cell(2, 0),
            new Cell(0, 1),
            new Cell(1, 1),
            new Cell(2, 1),
            new Cell(0, 2),
            new Cell(1, 2),
            new Cell(2, 2)];
    }
    else if (piecesCorner === "upperRight") {
        gPieces = [new Cell(0, kBoardWidth - 3),
            new Cell(1, kBoardWidth - 3),
            new Cell(2, kBoardWidth - 3),
            new Cell(0, kBoardWidth - 2),
            new Cell(1, kBoardWidth - 2),
            new Cell(2, kBoardWidth - 2),
            new Cell(0, kBoardWidth - 1),
            new Cell(1, kBoardWidth - 1),
            new Cell(2, kBoardWidth - 1)];
    }
    else if (piecesCorner === "lowerRight") {
        gPieces = [new Cell(kBoardHeight - 3, kBoardWidth - 3),
            new Cell(kBoardHeight - 2, kBoardWidth - 3),
            new Cell(kBoardHeight - 1, kBoardWidth - 3),
            new Cell(kBoardHeight - 3, kBoardWidth - 2),
            new Cell(kBoardHeight - 2, kBoardWidth - 2),
            new Cell(kBoardHeight - 1, kBoardWidth - 2),
            new Cell(kBoardHeight - 3, kBoardWidth - 1),
            new Cell(kBoardHeight - 2, kBoardWidth - 1),
            new Cell(kBoardHeight - 1, kBoardWidth - 1)];
    }
    gNumPieces = gPieces.length;
    
    if (destinationCorner === "lowerLeft") {
        gDestinations = [new Cell(kBoardHeight - 1, 0),
            new Cell(kBoardHeight - 2, 0),
            new Cell(kBoardHeight - 3, 0),
            new Cell(kBoardHeight - 1, 1),
            new Cell(kBoardHeight - 2, 1),
            new Cell(kBoardHeight - 3, 1),
            new Cell(kBoardHeight - 1, 2),
            new Cell(kBoardHeight - 2, 2),
            new Cell(kBoardHeight - 3, 2)];
    }
    else if (destinationCorner === "upperLeft") {
        gDestinations = [new Cell(0, 0),
            new Cell(1, 0),
            new Cell(2, 0),
            new Cell(0, 1),
            new Cell(1, 1),
            new Cell(2, 1),
            new Cell(0, 2),
            new Cell(1, 2),
            new Cell(2, 2)];
    }
    else if (destinationCorner === "upperRight") {
        gDestinations = [new Cell(0, kBoardWidth - 1),
            new Cell(1, kBoardWidth - 1),
            new Cell(2, kBoardWidth - 1),
            new Cell(0, kBoardWidth - 2),
            new Cell(1, kBoardWidth - 2),
            new Cell(2, kBoardWidth - 2),
            new Cell(0, kBoardWidth - 3),
            new Cell(1, kBoardWidth - 3),
            new Cell(2, kBoardWidth - 3)];
    }
    else if (destinationCorner === "lowerRight") {
        gDestinations = [new Cell(kBoardHeight - 1, kBoardWidth - 1),
            new Cell(kBoardHeight - 2, kBoardWidth - 1),
            new Cell(kBoardHeight - 3, kBoardWidth - 1),
            new Cell(kBoardHeight - 1, kBoardWidth - 2),
            new Cell(kBoardHeight - 2, kBoardWidth - 2),
            new Cell(kBoardHeight - 3, kBoardWidth - 2),
            new Cell(kBoardHeight - 1, kBoardWidth - 3),
            new Cell(kBoardHeight - 2, kBoardWidth - 3),
            new Cell(kBoardHeight - 3, kBoardWidth - 3)];
    }
    gNumDests = gDestinations.length;
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
    /***************************************************
     * Uncomment following code to use initialization form
     *****************************************************/
//    var boardSize = document.getElementById("boardSize").value;
//    kBoardHeight = boardSize;
//    kBoardWidth = boardSize;
//    kPixelWidth = 1 + (kBoardWidth * kPieceWidth);
//    kPixelHeight = 1 + (kBoardHeight * kPieceHeight);
//    
//    destinationCorner = $('input:radio[name=destCorner]:checked').val();
//    piecesCorner = $('input:radio[name=pieceCorner]:checked').val();

    url = document.getElementById("url").value;
    
   
    if (!canvasElement) {
        canvasElement = document.createElement("canvas");
        canvasElement.id = "halma_canvas";
        document.body.appendChild(canvasElement);
    }
    if (!moveCountElement) {
        moveCountElement = document.createElement("p");
        document.body.appendChild(moveCountElement);
    }
    gCanvasElement = canvasElement;
    gCanvasElement.width = kPixelWidth;
    gCanvasElement.height = kPixelHeight;
    gMoveCountElem = moveCountElement;
    gDrawingContext = gCanvasElement.getContext("2d");
    if (!resumeGame()) {
        newGame();
    }
    $('#initialization').hide();
    $('#game').show();
}

function makeMove() {
    var move;
    $.ajax({
        type: 'POST',
        url: url,
        dataType: "json",
        async: false,
        data: boardToJSON(),
        success: function(msg) {
            move = msg;     
        },
        error: function(jqXHR, exception) {
            if (jqXHR.status === 0) {
                alert('Unable to connect.\n Verify Network.');
            } else if (jqXHR.status == 404) {
                alert('Requested URL of HalmaAI not found. [404]');
            } else if (jqXHR.status == 500) {
                alert('Internal Server Error [500].');
            } else if (exception === 'parsererror') {
                alert('Data from HalmaAI was not JSON :( Parse failed.');
            } else if (exception === 'timeout') {
                alert('Time out error.');
            } else if (exception === 'abort') {
                alert('Ajax request aborted.');
            } else {
                alert('Uncaught Error.\n' + jqXHR.responseText);
            }
        }
        
    });
    
    //fc: display incoming json or whatever
    document.getElementById("responseString").innerHTML = JSON.stringify(move);
    //alert("Move?? " + JSON.stringify(move));
    
    if (move.hasOwnProperty("game_over")) {
        alert("You Won! Move count: " + gMoveCount);
        location.reload();
    }
    else {
        var locPiece = move.from;
        var currPieceLoc = new Cell(locPiece.y, locPiece.x);
        
        var movePieceLocs = move.to; 

        var moves = [];
        for(var i = 0; i < movePieceLocs.length; i++) {
            moves.push(new Cell(movePieceLocs[i].y, movePieceLocs[i].x));
        }

        var foundPiece = false;
        for (var i = 0; i < gNumPieces; i++) {
            if ((gPieces[i].y === currPieceLoc.y)
                    && (gPieces[i].x === currPieceLoc.x)) {
                gSelectedPieceIndex = i;
                gPieces[i].y = moves[moves.length - 1].y;
                gPieces[i].x = moves[moves.length - 1].x;
                gMoveCount += 1;
                foundPiece = true;
                break;
            }
        }
        if (foundPiece) {
            drawBoard();
            var x = (currPieceLoc.x * kPieceWidth) + (kPieceWidth / 2);
            var y = (currPieceLoc.y * kPieceHeight) + (kPieceHeight / 2);
            var radius = (kPieceWidth / 2) - (kPieceWidth / 10);
            gDrawingContext.beginPath();
            gDrawingContext.arc(x, y, radius / 3, 0, Math.PI * 2, false);
            gDrawingContext.closePath();
            gDrawingContext.strokeStyle = "#000";
            gDrawingContext.stroke();
            gDrawingContext.fillStyle = "#f00";
            gDrawingContext.fill();
            for(var i = 0; i < moves.length - 1; i++) {
                var x = (moves[i].x * kPieceWidth) + (kPieceWidth / 2);
                var y = (moves[i].y * kPieceHeight) + (kPieceHeight / 2);
                var radius = (kPieceWidth / 2) - (kPieceWidth / 10);
                gDrawingContext.beginPath();
                gDrawingContext.arc(x, y, radius/3, 0, Math.PI * 2, false);
                gDrawingContext.closePath();
                gDrawingContext.strokeStyle = "#000";
                gDrawingContext.stroke();
                gDrawingContext.fillStyle = "#000";
                gDrawingContext.fill();
            }
        }
        else
            alert("No piece found at location: " + currPieceLoc.y
                    + ", " + currPieceLoc.x);
    }
}

function checkInputs() {
    /***************************************************
     * Uncomment following code to use initialization form
     *****************************************************/
//    if($('input:radio[name=destCorner]:checked').val() === 
//            $('input:radio[name=pieceCorner]:checked').val()) {
//        alert("Please select different corners for the pieces and the destinations.");
//        return;
//    }
    
    var $myForm = $('#initForm');
    if (!$myForm[0].checkValidity()) {
        $myForm.find(':submit').click();
        return;
    }
    else {
        initGame(null, document.getElementById('movecount'));
    }
}

$(document).ready(function() {
    $('#game').hide();
    $('#initialization').show();
});

function boardToJSON() {
    return JSON.stringify({
        "pieces" : gPieces,
        "destinations" : gDestinations,
        "boardSize" : kBoardHeight

    });
    
}