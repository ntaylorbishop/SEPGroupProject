<?php
require 'db_conn.php';
$username = $_GET['username'];

try {
    $db = dbconnect();

    $sqlUser = "UPDATE Users SET waitingToConnect = 0 WHERE username = :username";
    $stmt = $db->prepare($sqlUser);
    $stmt->bindParam("username", $username);
    $stmt->execute();

    $db = null;
} catch (PDOException $e) {
    echo '{"error":"' . $e->getMessage() . '"}';
}
?>