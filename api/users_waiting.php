<?php
require 'db_conn.php';

$sql = "SELECT * FROM Users";
try {
    $db = dbconnect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("username", $username);
    $stmt->execute();
    $usersWaiting = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode($usersWaiting);

    $db = null;
} catch (PDOException $e) {
    echo '{"error":"true"}';
}
?>