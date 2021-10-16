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
        <h1 class="board__title">新增使用者身份</h1>
        <a href="admin_authority.php" class="admin__submit-btn">返回</a>
      </div>
      <?php 
        if (!empty($_GET['errCode'])) {
          $errCode = $_GET['errCode'];
          $message = "error";
          if ($errCode === "1") {
            $message = "資料不齊全";
          } else if ($errCode === "2") {
            $message = "名稱重複";
          }
          echo "<h3 class='error'>錯誤：" . $message ."</h3>";
        } 
      ?>
      <section>
        <form method="POST" action="handle_add_role.php">
          <div class="board__input"> 
            名稱：<input type="text" name="role">
          </div>
          <div  class="board__input-checkbox"> 
            <div>
              權限：
            </div>
            <div class="board__chckbox">
              <div class="board__checkbox">
                <label><input type="checkbox" name="action[]" value="add_comment"><span>新增留言</span></label>
              </div>
              <div class="board__checkbox">
                <label><input type="checkbox" name="action[]" value="delete_own"><span>刪除自己文章</span></label>
              </div>
              <div class="board__checkbox">
                <label><input type="checkbox" name="action[]" value="delete_any"><span>刪除任意文章</span></label>
              </div>
              <div class="board__checkbox">
                <label><input type="checkbox" name="action[]"  value="update_own"><span>編輯自己文章</span></label>
              </div>
              <div class="board__checkbox">
                <label><input type="checkbox" name="action[]" value="update_any"><span>編輯任意文章</span></label>
              </div>
            </div>
          </div>
          <input class="board__submit-btn" type="submit" value="提交">
        </form>
      </section>   
  </main>
</body>
</html>