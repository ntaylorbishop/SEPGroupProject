<?php
  function dbconnect() {
    $username = "root";
    $password = "password";
    
    try {
      $conn = new PDO('mysql:host=localhost;dbname=SEP_Chess', $username, $password);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch(PDOException $e) {
      echo 'ERROR: ' . $e->getMessage();
    }

    return $conn;
  }
?>