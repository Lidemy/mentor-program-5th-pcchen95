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

  $id = $_GET['id'];
  $username = getAuthorFromId($id);
  // 沒有登入、或非管理員且非作者本人，不可刪除留言
  // 有權限：$user && (($user['delete_own'] === 1 && $user['username'] === $username) || $user['delete_any'])
  if (
    !$user || (
      ($user['delete_own'] !== 1 && $user['username'] !== $username) &&
      $user['delete_any'] !== 1)
  ) {
    header("Location: index.php");
    exit();
  } 

  $stmt = $conn->prepare("UPDATE pcchen_board_comments SET is_deleted = 1 WHERE id = ? AND username = ?");
  $stmt->bind_param("is", $id, $username);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }
  
 header("Location: index.php");
  
?>