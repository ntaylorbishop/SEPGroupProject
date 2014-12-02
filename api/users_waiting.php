<?php
require 'db_conn.php';

$sql = "SELECT * FROM Users WHERE waitingToConnect = 1";

try {
    $db = dbconnect();
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $usersWaiting = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($usersWaiting);

    $db = null;
} catch (PDOException $e) {
    echo '{"error":"true"}';
}
?>