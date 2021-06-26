<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  if (empty($_POST['content'])) {
    header("Location: index.php?errCode=1");
    die("資料不齊全");
  }
  $username = $_SESSION['username'];
  $content = $_POST['content'];

  $sql = "INSERT INTO pcchen_board_comments(username, content) VALUES (?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ss", $username, $content);
  $result = $stmt->execute();

  /*$sql = sprintf("INSERT INTO pcchen_board_comments(username, content) VALUES ('%s', '%s')", $username, $content);
  $result = $conn->query($sql);*/

  if (!$result) {
    die($conn->error);
  } else {
    header("Location: index.php");
  }
?>