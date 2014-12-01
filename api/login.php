<?php
require 'db_conn.php';
$json = file_get_contents("php://input");
$user = json_decode($json);
$username = $user->username;

$sql = "SELECT * FROM Users WHERE username=:username";
try {
    $db = dbconnect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("username", $username);
    $stmt->execute();
    if ($stmt->rowCount() == 1) {
        echo '{"error": true}';
    } else {
    	$sqlUser = "INSERT INTO Users VALUES(:username, 0, 0)";
    	$stmt = $db->prepare($sqlUser);
    	$stmt->bindParam("username", $username);
    	$stmt->execute();
    	setcookie("user", $username, time() + 7200, '/');
        echo '{"error": false}';
    }

    $db = null;
} catch (PDOException $e) {
    echo '{"error":"' . $e->getMessage() . '"}';
}
?>