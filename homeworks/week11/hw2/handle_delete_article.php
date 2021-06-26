<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  $user = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  }

  if (!$user) {
    header("Location: no-permission.php");
    exit();
  }
  
  $id = $_GET['id'];

  $stmt = $conn->prepare("UPDATE pcchen_blog_articles SET is_deleted = 1 WHERE id = ?");
  $stmt->bind_param("i", $id);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  header("Location: admin.php");
?>