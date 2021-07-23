<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  $user = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  }

  $id = $_POST['id'];
  $username = getAuthorFromId($id);
  // 沒有登入、或非管理員且非作者本人，不可編輯留言  
  if (
    !$user || (
      ($user['delete_own'] !== 1 && $user['username'] !== $username) &&
      $user['delete_any'] !== 1)
  )  {
    header("Location: index.php");
    exit();
  } 

  if (empty($_POST['content'])) {
    header("Location: index.php?errCode=1&id=" . $_POST['id']);
    exit();
  }

  $content = $_POST['content'];

  $stmt = $conn->prepare("UPDATE pcchen_board_comments SET content = ? WHERE id = ? AND username = ?");
  $stmt->bind_param("sis", $content, $id, $username);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  
  header("Location: index.php");
  
?>