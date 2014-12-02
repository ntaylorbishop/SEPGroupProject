<?php
require 'db_conn.php';
$user1 = $_GET['user1'];
$user2 = $_GET['user2'];

$sql = "SELECT user1, user2,  user1Pieces, user2Pieces, user1CapturedPieces, user2CapturedPieces, user1Time, user2Time, whosTurn FROM Whos_Playing WHERE user1 = :user1, user2 = :user2";
try {
    $db = dbconnect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("user1", $username);
    $stmt->bindParam("user2", $username);
    $stmt->execute();
    if ($stmt->rowCount() != 1) {
        echo '{"error": true}';
    } else {
        echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
    }

    $db = null;
} catch (PDOException $e) {
    echo '{"error":"' . $e->getMessage() . '"}';
}
?>