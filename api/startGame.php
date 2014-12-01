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
        $sqlUser = "INSERT INTO Whos_Playing VALUES(:username, 0, 0)";
        $stmt = $db->prepare($sqlUser);
        $stmt->bindParam("username", $username);
        $stmt->execute();
        echo '{"error": false}';
    } else {
        echo '{"error": true}';
    }

    $db = null;
} catch (PDOException $e) {
    echo '{"error":"' . $e->getMessage() . '"}';
}
?>