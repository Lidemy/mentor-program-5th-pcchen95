<?php 
  session_start();
  require_once("conn.php");

  if (
    empty($_POST['username']) ||
    empty($_POST['password'])
  ) {
      header("Location: login.php?errCode=1");
      exit();
  }

  $username = $_POST['username'];
  $password = $_POST['password'];
  $sql = "SELECT * FROM pcchen_board_users WHERE username=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $username);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  $result = $stmt->get_result();

  if($result->num_rows === 0) {
    header("Location: login.php?errCode=2");
    exit();
  }

  $row = $result->fetch_assoc();

  if (!password_verify($password, $row['password'])) {
    header("Location: login.php?errCode=2");
    exit();
    
  }
  $_SESSION['username'] = $username;
  header("Location: index.php"); 

?>