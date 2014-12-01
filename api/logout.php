<?php
require 'db_conn.php';
$json = file_get_contents("php://input");
$username = json_decode($json);
$username = $username['username'];

$sql = "SELECT * FROM Users WHERE username = :username";
try {
    $db = dbconnect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("username", $username);
    $stmt->execute();
    if ($stmt->rowCount() == 1) {
        echo '{"error": true}';
    } else {
    	$sqlUser = "DELETE FROM Users WHERE username = :username";
        $stmt = $db->prepare($sqlUser);
        $stmt->bindParam("username", $username);
        $stmt->execute();
        echo '{"error": false}';
    }

    $db = null;
} catch (PDOException $e) {
    echo '{"error":{ true}';
}
?>