<?php
require 'db_conn.php';
$json = file_get_contents("php://input");
$userData = json_decode($json);
$user1 = $userData->user1;
$user2 = $userData->user2;

$sql = "SELECT * FROM Whos_Playing WHERE username = :user1";
try {
    $db = dbconnect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("username", $username);
    $stmt->execute();
    if ($stmt->rowCount() == 0) {
        echo '{"error": true}';
    } else {
    	$sqlPlaying = "DELETE FROM Whos_Playing WHERE user1 = :user1 OR user2 = :user1";
        $stmt = $db->prepare($sqlPlaying);
        $stmt->bindParam("username", $user1);
        $stmt->execute();

        $sqlUser = "UPDATE Users SET inGame = 0, waitingToConnect = 0 WHERE username = :user1 OR username = :user2";
        $stmt = $db->prepare($sqlUser);
        $stmt->bindParam("user1", $user1);
        $stmt->bindParam("user2", $user2);
        $stmt->execute();
        echo '{"error": false}';
    }

    $db = null;
} catch (PDOException $e) {
    echo '{"error":"' . $e->getMessage() . '"}';
}
?>