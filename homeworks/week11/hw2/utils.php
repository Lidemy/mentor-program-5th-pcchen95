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

  function escapeHTML($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }

  function getItemCount() {
    global $conn;
    $stmt = $conn->prepare("SELECT count(id) AS count FROM pcchen_blog_articles WHERE is_deleted IS NULL");
    $result = $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row['count'];
  }
?>