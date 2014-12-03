<?php
require 'db_conn.php';
$json = file_get_contents("php://input");
$jsonInfo = json_decode($json, true);

$user1 = $jsonInfo['usernames'][0]['user1'];
$user2 = $jsonInfo['usernames'][1]['user2'];
$user1Pieces = json_encode($jsonInfo['user1Pieces']);
$user2Pieces = json_encode($jsonInfo['user2Pieces']);
$user1CapturedPieces = json_encode($jsonInfo['user1CapturedPieces']);
$user2CapturedPieces = json_encode($jsonInfo['user2CapturedPieces']);
$user1Time = $jsonInfo['userTime'][0]['user1Time'];
$user2Time = $jsonInfo['userTime'][1]['user2Time'];

error_log($user1 . "\n");
error_log($user2 . "\n");
error_log($user1Pieces . "\n");
error_log($user2Pieces . "\n");
error_log($user1CapturedPieces . "\n");
error_log($user2CapturedPieces . "\n");
error_log($user1Time . "\n");
error_log($user2Time . "\n");

try {
    $db = dbconnect();
    $sql = "UPDATE Whos_Playing
            SET user1 = :user1, 
                user2 = :user2, 
                user1Pieces = :user1Pieces, 
                user2Pieces = :user2Pieces, 
                user1CapturedPieces = :user1CapturedPieces, 
                user2CapturedPieces = :user2CapturedPieces, 
                user1Time = :user1Time, 
                user2Time = :user2Time
            WHERE user1 = :user1 OR user2 = :user1";
    $stmt = $db->prepare($sql);
    $stmt->bindParam("user1", $user1);
    $stmt->bindParam("user2", $user2);
    $stmt->bindParam("user1Pieces", $user1Pieces);
    $stmt->bindParam("user2Pieces", $user2Pieces);
    $stmt->bindParam("user1CapturedPieces", $user1CapturedPieces);
    $stmt->bindParam("user2CapturedPieces", $user2CapturedPieces);
    $stmt->bindParam("user1Time", $user1Time);
    $stmt->bindParam("user2Time", $user2Time);
    $stmt->execute();

    $sqlGetTurn = "SELECT whosTurn FROM Whos_Playing WHERE user1 = :user1 OR user2 = :user1";
    $stmt = $db->prepare($sqlGetTurn);
    $stmt->bindParam("user1", $user1);
    $stmt->execute();
    $whosTurn = $stmt->fetch(PDO::FETCH_ASSOC);
    $whosTurn = intval($whosTurn['whosTurn']);

    error_log($whosTurn);

    if($whosTurn == 0) 
        $whosTurn = 1;
    else
        $whosTurn = 0;

    error_log($whosTurn);

    $sqlChangeTurn = "UPDATE Whos_Playing SET whosTurn = :whosTurn WHERE user1 = :user1 OR user2 = :user1";
    $stmt = $db->prepare($sqlChangeTurn);
    $stmt->bindParam("whosTurn", $whosTurn);
    $stmt->bindParam("user1", $user1);
    $stmt->execute();

    echo '{"error": false}';

   $db = null;
} catch (PDOException $e) {
    echo '{"error":"' . $e->getMessage() . '"}';
}
?>