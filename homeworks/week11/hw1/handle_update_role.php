<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  if (empty($_POST['role'])) {
    header("Location: update_role.php?id=" . $_POST['id'] . "&errCode=1");
    die("資料不齊全");
  }

  $username = NULL;
  $user = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  }

  // 沒有登入、或非管理員且非作者本人，不可編輯
  if ( !$user || $user['role_id'] !== 1) {
    header("Location: no_permission.php");
    exit();
  } 

  // 防止編輯管理員及一般使用者權限
  if ($_POST['id'] === '1' || $id === '2') {
    header("Location: admin_authority.php");
    exit();
  }

  $id = $_POST['id'];
  $role = $_POST['role'];
  $action = empty($_POST['action']) ? array() : $_POST['action'];

  /* 檢查名稱是否有重複 */
  $stmt = $conn->prepare("SELECT role FROM pcchen_board_roles WHERE role = ? AND is_deleted IS NULL AND id != ?");
  $stmt->bind_param('si', $role, $id);
  $result = $stmt->execute();
  if(!$result) {
    die("Error: " . $conn->error);
  }
  $result = $stmt->get_result();
  if($result->num_rows === 1) {
    header("Location: update_role.php?id=" . $_POST['id']. "&errCode=2");
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

  /* 新增使用者身份與權限 */
  $sql = "UPDATE pcchen_board_roles SET role = ?, add_comment = ?, delete_own = ?, delete_any = ?, update_own = ?, update_any = ? WHERE id = ?";
   $stmt = $conn->prepare($sql);
   $stmt->bind_param("siiiiii", $role, $action_array[1], $action_array[2], $action_array[3], $action_array[4], $action_array[5], $id);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }
  
  header("Location: admin_authority.php");
  
?>