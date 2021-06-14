<?php 
  require_once("conn.php");

  function getUserFromUsername($username) {    
    global $conn;
    $result = $conn->query("SELECT * FROM pcchen_board_users WHERE username='$username';");
    $row = $result->fetch_assoc();
    return $row;
  }
?>