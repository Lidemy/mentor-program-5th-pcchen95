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

  if (!$user) {
    header("Location: no_permission.php");
    exit();
  } 
?>
<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">

  <title>留言板 - 個人資料</title>
  <meta name ="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
  <link rel="stylesheet" href="./style.css">

</head>
<body>
  <header class="warning">
    注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼
  </header>
  
  <main>
    <nav>
      <h3>你好, <span class="nickname"><?php echo escapeHTML($user['nickname']); ?></span>！</h3>
      <a href="index.php" class="board__btn">回到留言板</a>
      <a href="handle_logout.php" class="board__btn">登出</a>    
    </nav>
    <div class="board">
      <h1 class="board__title">個人資料</h1>
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
        <div class="user-role">帳號：<?php echo escapeHTML($user['username']); ?></div>
        <div class="user-role">暱稱：<?php echo escapeHTML($user['nickname']); ?></div>
        <div class="user-role">權限身份：<?php echo escapeHTML($user['role']); ?></div>
        <form method="POST" action="handle_update_user.php">
          <table class="auth__table">
            <tr>
              <th class="table__username">項目</th> 
              <th class="table__action">權限</th>
            </tr>      
            <tr>     
              <td class="table__username">新增留言</td>
              <td class="table__action"><?php echo empty($user['add_comment']) ? '×' : '○'; ?></td>
            </tr>
            <tr>     
              <td class="table__username">刪除自己留言</td>
              <td class="table__action"><?php echo empty($user['delete_own']) ? '×' : '○'; ?></td>
            </tr>
            <tr>     
              <td class="table__username">刪除任意留言</td>
              <td class="table__action"><?php echo empty($user['delete_any']) ? '×' : '○'; ?></td>
            </tr>
            <tr>     
              <td class="table__username">編輯自己留言</td>
              <td class="table__action"><?php echo empty($user['update_own']) ? '×' : '○'; ?></td>
            </tr>
            <tr>     
              <td class="table__username">編輯任意留言</td>
              <td class="table__action"><?php echo empty($user['update_any']) ? '×' : '○'; ?></td>
            </tr>
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