<?php 
  session_start();
  require_once("conn.php");

  if (
    empty($_POST['username']) ||
    empty($_POST['password'])
  ) {
      header("Location: login.php?errCode=1");
      die("資料有缺");
  }

  $username = $_POST['username'];
  $password = $_POST['password'];
  $sql = sprintf(
    "SELECT * FROM pcchen_board_users WHERE username='%s' AND password='%s';", 
    $username, 
    $password
  );
  $result = $conn->query($sql);

  if(!$result) {
    die($conn->error);
  }

  if ($result->num_rows === 0) {
    header("Location: login.php?errCode=2");
    die($conn->error);
  } 
  
  $_SESSION['username'] = $username;
  header("Location: index.php");

?>