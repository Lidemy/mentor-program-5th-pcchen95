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

  if ($user['role'] !== "admin") {
    header("Location: no_permission.php");
    exit();
  }

  if (!isUpdateValid($_POST['id'], $_POST['role'], $_POST['updatedRole'])) {
    die("Error: 不可移除所有管理員身份");
  }

  for($i = 0; $i < count($_POST['updatedRole']); $i++) {
    if ($_POST['updatedRole'][$i] !== "none") {
      $stmt = $conn->prepare("UPDATE pcchen_board_users SET role = ? WHERE id = ?");
      $stmt->bind_param("si",$_POST['updatedRole'][$i], $_POST['id'][$i]);
      $result = $stmt->execute();
      if (!$result) {
        die($conn->error);
      }
    }
  }
  header("Location: admin.php");

  // 判斷是否移除了所有管理員權限
  function isUpdateValid($arrayId, $arrayRole, $arrayUpdatedRole) {
    global $conn;
    
    $stmt = $conn->prepare("SELECT id FROM pcchen_board_users WHERE role = 'admin'");
    $result = $stmt->execute();
    $result = $stmt->get_result();

    $adminDB = array(); // 目前資料庫中所有 admin 的 id
    while ($row = $result->fetch_assoc()) {
      array_push($adminDB, $row['id']);
    }

    $countAdminUpdated = 0;
    for ($i = 0; $i < count($arrayId); $i++) {
      // 判斷 POST 的資料中，原身份為 admin 且有被更動的 ID，是否包含在資料庫的 admin 身份
      if ($arrayRole[$i] === 'admin' && $arrayUpdatedRole[$i] !== 'none') {
        if (in_array($arrayId[$i], $adminDB)) {
          $countAdminUpdated++; // 是 admin 且被變更身份的數量
        }
      }
    }
    //若資料庫裡的 admin 數量和被變更的 admin 數量相同，則不允許系統變更
    if ($countAdminUpdated === count($adminDB)) {
      return false;
    }
    return true;

  }
?>