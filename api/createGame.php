<?php
require 'db_conn.php';
$json = file_get_contents("php://input");
$username = json_decode($json);
$username = $username['username'];

$sql = "SELECT * FROM Users WHERE username=:username";
try {
    $db = dbconnect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("username", $username);
    $stmt->execute();
    if ($stmt->rowCount() == 1) {
        $sqlUser = "UPDATE Users SET waitingToConnect = 1 WHERE username = :username";
        $stmt = $db->prepare($sqlUser);
        $stmt->bindParam("username", $username);
        $stmt->execute();
        echo '{"error": false}';
    } else {
        echo '{"error": true}';
    }

    $db = null;
} catch (PDOException $e) {
    echo '{"error":true}';
}
?>