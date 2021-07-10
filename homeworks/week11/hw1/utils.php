<?php 
  require_once("conn.php");

  function getUserFromUsername($username) {    
    global $conn;
    $stmt = $conn->prepare("SELECT * FROM pcchen_board_users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row;
  }

   function getAuthorFromId($id) {    
    global $conn;
    $stmt = $conn->prepare("SELECT username FROM pcchen_board_comments WHERE id = ?");
    $stmt->bind_param("i", $id);
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row['username'];
  }

  function escapeHTML($str) {
    return htmlspecialchars($str, ENT_QUOTES, 'UTF-8', true);
  }

  function getCountUser() {
    global $conn;
    $stmt = $conn->prepare("SELECT count(id) AS count FROM pcchen_board_users WHERE is_deleted IS NULL");
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row['count'];
  }

  function getCountComment() {
    global $conn;
    $stmt = $conn->prepare("SELECT count(id) AS count FROM pcchen_board_comments WHERE is_deleted IS NULL");
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row['count'];
  }

?>