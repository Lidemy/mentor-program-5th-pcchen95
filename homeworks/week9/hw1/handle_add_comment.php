<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  if (empty($_POST['content'])) {
    header("Location: index.php?errCode=1");
    die("資料不齊全");
  }
  $username = $_SESSION['username'];
  $sql_user = sprintf("SELECT nickname FROM pcchen_board_users WHERE username='%s'", $username);
  $result = $conn->query($sql_user);
  $row = $result->fetch_assoc();
  $nickname = $row['nickname'];
  $content = htmlspecialchars($_POST['content']);

  $sql = sprintf(
    "INSERT INTO pcchen_board_comments(nickname, content) VALUES ('%s', '%s')",
    $nickname,
    $content
  );

  $result = $conn->query($sql);
  if (!$result) {
    die($conn->error);
  } else {
    header("Location: index.php");
  }

?>