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

  if ($user['role_id'] !== 1) {
    header("Location: no_permission.php");
    exit();
  } 

  $page = 1;
  if (!empty($_GET['page'])) {
    $page = $_GET['page'];
  }
  $item_per_page = 10;
  $offset = ($page - 1) * $item_per_page;

  $stmt = $conn->prepare("SELECT * FROM pcchen_board_roles WHERE is_deleted IS NULL ORDER BY id ASC");
  $result = $stmt->execute();
  
  if(!$result) {
    die("Error: " . $conn->error);
  }

  $result = $stmt->get_result();
 
?>
<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">

  <title>留言板 - 後台管理</title>
  <meta name ="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
  <link rel="stylesheet" href="./style.css">

</head>
<body>
  <header class="warning">
    注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼
  </header>
  
  <main class="admin">
    <nav>
      <h3>你好, <span class="nickname"><?php echo escapeHTML($user['nickname']); ?></span>！</h3>
      <a href="index.php" class="board__btn">回到留言板</a>
      <a href="admin.php" class="board__btn">使用者管理</a>
      <a href="handle_logout.php" class="board__btn">登出</a>    
    </nav>
    <div class="admin-board">
      <div class="admin-board__top">
        <h1 class="board__title">權限管理</h1>
        <a href="add_role.php" class="admin__submit-btn">新增使用者身份</a>
      </div>
      <?php 
        if (!empty($_GET['errCode'])) {
          $errCode = $_GET['errCode'];
          $message = "error";
          if ($errCode === "1") {
            $message = "此分類有使用者，無法刪除";
          }
          echo "<h3 class='error'>錯誤：" . $message ."</h3>";
        } 
      ?>
      <section>
        <form method="POST" action="handle_update_user.php">
          <table>
            <tr>
              <th class="table__username">身份</th> 
              <th class="table__action">新增文章</th>
              <th class="table__action">刪除自己文章</th>
              <th class="table__action">刪除任意文章</th>
              <th class="table__action">編輯自己文章</th>
              <th class="table__action">編輯任意文章</th>
              <th class="table__edit">編輯權限</th>
            </tr>
            <?php while($row = $result->fetch_assoc()) {?>
             <tr>     
              <td class="table__username"><?php echo escapeHTML($row['role']); ?></td>
              <td class="table__action"><?php echo empty($row['add_comment']) ? '' : '○'; ?></td>
              <td class="table__action"><?php echo empty($row['delete_own']) ? '' : '○'; ?></td>
              <td class="table__action"><?php echo empty($row['delete_any']) ? '' : '○'; ?></td>
              <td class="table__action"><?php echo empty($row['update_own']) ? '' : '○'; ?></td>
              <td class="table__action"><?php echo empty($row['update_any']) ? '' : '○'; ?></td>
              <input type="hidden" name="role[]" value="<?php echo escapeHTML($row['role']); ?>">
              <td class="table__edit">
                <?php if ($row['id'] !== 1 && $row['id'] !== 2) { ?>
                <a href="update_role.php?id=<?php echo escapeHTML($row['id']); ?>">編輯</a>
                <a href="handle_delete_role.php?id=<?php echo escapeHTML($row['id']); ?>">刪除</a>
                <?php } ?>
              </td>
            </tr>
            <?php } ?>
          </table>  
        </form>
      </section>   
  </main>
  <script>

    document.querySelector('.cancel').addEventListener('click', (e) => {
      e.preventDefault()
      const roles = document.querySelectorAll('option[value=none]')
      for (role of roles) {
        role.setAttribute("selected", "")
        role.parentElement.value = "none";
      }
    })

  </script>
  
</body>
</html>