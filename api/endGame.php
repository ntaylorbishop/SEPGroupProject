<?php
require 'db_conn.php';
$user1 = $_GET['user1'];
$user2 = $_GET['user2'];
echo $user1 . " " . $user2;
$sql = "SELECT * FROM Whos_Playing WHERE user1 = :user1 OR user2 = :user1";
try {
    $db = dbconnect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("user1", $user1);
    $stmt->execute();

    $sqlPlaying = "DELETE FROM Whos_Playing WHERE user1 = :user1 OR user2 = :user1";
    $stmt = $db->prepare($sqlPlaying);
    $stmt->bindParam("user1", $user1);
    $stmt->execute();

    $sqlUser1 = "UPDATE Users SET inGame = 0, waitingToConnect = 0 WHERE username = :user1";
    $stmt = $db->prepare($sqlUser1);
    $stmt->bindParam("user1", $user1);
    $stmt->execute();

    $sqlUser2 = "UPDATE Users SET inGame = 0, waitingToConnect = 0 WHERE username = :user2";
    $stmt = $db->prepare($sqlUser2);
    $stmt->bindParam("user2", $user2);
    $stmt->execute();
    echo '{"error": false}';

    $db = null;
} catch (PDOException $e) {
    echo '{"error":"' . $e->getMessage() . '"}';
}
?>