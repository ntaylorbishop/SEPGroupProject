<?php
require 'db_conn.php';
$username = $_GET['username'];
$user1Time = $_GET['user1Time'];
$user2Time = $_GET['user2Time'];

try {
    $db = dbconnect();
    $sql = "UPDATE Whos_Playing SET user1Time = :user1Time, user2Time = :user2Time WHERE user1 = :username OR user2 = :username";
    $stmt = $db->prepare($sql);
    $stmt->bindParam("user1Time", $user1Time);
    $stmt->bindParam("user2Time", $user2Time);
    $stmt->bindParam("username", $username);
    $stmt->execute();

    $db = null;
} catch (PDOException $e) {
    echo '{"error":"' . $e->getMessage() . '"}';
}
?>