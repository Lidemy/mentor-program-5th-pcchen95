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

  if (empty($_POST['title']) || empty($_POST['content'])) {
    header("Location: update_article.php?id=" . $_POST['id'] . "&errCode=1");
    exit();
  } 

  $id = $_POST['id'];
  $title = $_POST['title'];
  $content = $_POST['content'];

  $stmt = $conn->prepare("UPDATE pcchen_blog_articles SET title = ?, content = ? WHERE id = ?");
  $stmt->bind_param("ssi", $title, $content, $id);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  header("Location: blog_page.php?id=" . $id);
?>