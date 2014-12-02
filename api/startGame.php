<?php
require 'db_conn.php';
$json = file_get_contents("php://input");
$userData = json_decode($json);
$user1 = $userData->user1;
$user2 = $userData->user2;

try {
    $db = dbconnect();
    user1Pieces =  '[{"pieceType":"P", "x":0, "y":6},
                     {"pieceType":"P", "x":1, "y":6},
                     {"pieceType":"P", "x":2, "y":6},
                     {"pieceType":"P", "x":3, "y":6},
                     {"pieceType":"P", "x":4, "y":6},
                     {"pieceType":"P", "x":5, "y":6},
                     {"pieceType":"P", "x":6, "y":6},
                     {"pieceType":"P", "x":7, "y":6},
                     {"pieceType":"R", "x":0, "y":7},
                     {"pieceType":"K", "x":1, "y":7},
                     {"pieceType":"B", "x":2, "y":7},
                     {"pieceType":"Q", "x":3, "y":7},
                     {"pieceType":"K", "x":4, "y":7},
                     {"pieceType":"B", "x":5, "y":7},
                     {"pieceType":"K", "x":6, "y":7},
                     {"pieceType":"R", "x":7, "y":7}]';

    user2Pieces =  '[{"pieceType":"P", "x":0, "y":6},
                     {"pieceType":"P", "x":1, "y":6},
                     {"pieceType":"P", "x":2, "y":6},
                     {"pieceType":"P", "x":3, "y":6},
                     {"pieceType":"P", "x":4, "y":6},
                     {"pieceType":"P", "x":5, "y":6},
                     {"pieceType":"P", "x":6, "y":6},
                     {"pieceType":"P", "x":7, "y":6},
                     {"pieceType":"R", "x":0, "y":7},
                     {"pieceType":"K", "x":1, "y":7},
                     {"pieceType":"B", "x":2, "y":7},
                     {"pieceType":"K", "x":3, "y":7},
                     {"pieceType":"Q", "x":4, "y":7},
                     {"pieceType":"B", "x":5, "y":7},
                     {"pieceType":"K", "x":6, "y":7},
                     {"pieceType":"R", "x":7, "y":7}]';

    $sqlUser = "INSERT INTO Whos_Playing 
                    VALUES(:user1, :user2, :user1Pieces, :user2Pieces, '{}', '{}', 00:15:00, 00:15:00, 0, 1)";
    $stmt = $db->prepare($sqlUser);
    $stmt->bindParam("user1", $user1);
    $stmt->bindParam("user2", $user2);
    $stmt->bindParam("user1Pieces", $user1Pieces);
    $stmt->bindParam("user2Pieces", $user2Pieces);
    $stmt->execute();
    echo '{"error": false}';

    $db = null;
} catch (PDOException $e) {
    echo '{"error":"' . $e->getMessage() . '"}';
}
?>