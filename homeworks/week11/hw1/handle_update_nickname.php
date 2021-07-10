<?php 
  session_start();
  require_once("conn.php");

  if (empty($_POST['nickname'])) {
      header("Location: login.php?errCode=1");
      die("資料有缺");
  }

  $nickname = $_POST['nickname'];
  $username = $_SESSION['username'];
  $stmt = $conn->prepare("UPDATE pcchen_board_users SET nickname=? WHERE username=?");
  $stmt->bind_param('ss', $nickname, $username);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  header("Location: index.php");

?>