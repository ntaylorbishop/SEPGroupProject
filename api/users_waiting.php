<?php
require 'db_conn.php';

$sql = "SELECT * FROM Users WHERE username = " . $username;
try {
    $db = dbconnect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("username", $username);
    $stmt->execute();
    if ($stmt->rowCount() == 1) {
        echo '{"error": true}';
    } else {
    	$sqlUser = "DELETE FROM Users WHERE username = " . $username;
        echo '{"error": false}';
    }

    $db = null;
} catch (PDOException $e) {
    echo '{"error":"true"}';
}
?>