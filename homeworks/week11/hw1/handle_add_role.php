<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  if (empty($_POST['role'])) {
    header("Location: add_role.php?errCode=1");
    die("資料不齊全");
  }
  $role = $_POST['role'];
  $action = $_POST['action'];

  /* 檢查名稱是否有重複 */
  $stmt = $conn->prepare("SELECT role FROM pcchen_board_roles WHERE role = ? AND is_deleted IS NULL");
  $stmt->bind_param('s', $role);
  $result = $stmt->execute();
  if(!$result) {
    die("Error: " . $conn->error);
  }
  $result = $stmt->get_result();
  if($result->num_rows === 1) {
    header("Location: add_role.php?errCode=2");
    die();
  }

  /* 從資料庫拉欄位名稱（動作有哪些） */
  $stmt = $conn->prepare("SHOW COLUMNS FROM pcchen_board_roles");
  $result = $stmt->execute();
  
  if(!$result) {
    die("Error: " . $conn->error);
  }

  $result = $stmt->get_result();
  $column = $result->fetch_assoc();
  
  $action_array = array();
  while($column = $result->fetch_assoc()) {
    array_push($action_array, in_array($column['Field'], $action) ? 1 : NULL);
  }

  /* 新增使用者身份與權限ㄆ */
  $sql = "INSERT INTO pcchen_board_roles(role, add_comment, delete_own, delete_any, update_own, update_any) VALUES (?, ?, ?, ?, ?, ?)";
   $stmt = $conn->prepare($sql);
   $stmt->bind_param("siiiii", $role, $action_array[1], $action_array[2], $action_array[3], $action_array[4], $action_array[5]);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }
  
  header("Location: admin_authority.php");
  
?>