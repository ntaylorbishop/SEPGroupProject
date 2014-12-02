<?php
require 'db_conn.php';
$json = file_get_contents("php://input");
$user = json_decode($json);
$username = $user->username;

$sql = "SELECT user1, user2 FROM Whos_Playing WHERE username = :username";
try {
    $db = dbconnect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam("username", $username);
    $stmt->execute();
    if ($stmt->rowCount() != 1) {
        echo '{"error": true}';
    } else {
        echo $stmt->fetch(PDO::FETCH_ASSOC);
    }

    $db = null;
} catch (PDOException $e) {
    echo '{"error":"' . $e->getMessage() . '"}';
}
?>