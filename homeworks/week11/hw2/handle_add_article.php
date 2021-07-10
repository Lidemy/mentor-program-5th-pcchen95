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

  if (
    empty($_POST['title']) ||
    empty($_POST['content'])
  ) {
    header("Location: add_article.php?errCode=1");
    exit();
  } 

  $title = $_POST['title'];
  $content = $_POST['content'];

  $stmt = $conn->prepare("INSERT INTO pcchen_blog_articles(title, content) VALUES (?, ?)");
  $stmt->bind_param("ss", $title, $content);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  $stmt = $conn->prepare("SELECT id FROM pcchen_blog_articles ORDER BY id DESC");
  $result = $stmt->execute();
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();


  header("Location: blog_page.php?id=" . $row['id']);
?>