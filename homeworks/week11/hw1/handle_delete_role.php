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
  // 沒有登入、或非管理員且非作者本人，不可刪除留言
  if ( !$user || $user['role_id'] !== 1) {
    header("Location: index.php");
    exit();
  } 
  // 防止刪除管理員及一般使用者
  if ($id === '1' || $id === '2') {
    header("Location: admin_authority.php");
    exit();
  }

  $stmt = $conn->prepare("SELECT id FROM pcchen_board_users WHERE role_id = ?");
  $stmt->bind_param("i", $id);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  $result = $stmt->get_result();
  if ($result->num_rows > 0) {
    header("Location: admin_authority.php?errCode=1");
    exit();
  }
  

  $stmt = $conn->prepare("UPDATE pcchen_board_roles SET is_deleted = 1 WHERE id = ?");
  $stmt->bind_param("i", $id);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }
  
  header("Location: admin_authority.php");
  
?>