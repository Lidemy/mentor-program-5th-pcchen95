<?php 
  require_once("conn.php");

  if (
    empty($_POST['nickname']) ||
    empty($_POST['username']) ||
    empty($_POST['password'])
  ) {
    header("Location: register.php?errCode=1");
    die($conn->error);
  }

  $nickname = $_POST['nickname'];
  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = sprintf("INSERT INTO pcchen_board_users(nickname, username, password) VALUES ('%s', '%s', '%s')",
    $nickname,
    $username,
    $password
  );
  $result = $conn->query($sql);
  if (!$result) {
    die($conn->error);
  }

  header("Location: index.php");
?>