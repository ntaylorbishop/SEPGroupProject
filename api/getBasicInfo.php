<?php
require 'db_conn.php';
$username = $_GET['username'];

$sql = "SELECT user1, user2,  user1Pieces, user2Pieces, user1Time, user2Time FROM Whos_Playing WHERE user1 = :username OR user2 = :username";
try {
    $db = dbconnect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("username", $username);
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