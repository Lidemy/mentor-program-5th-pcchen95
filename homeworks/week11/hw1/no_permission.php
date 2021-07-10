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
?>
<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">

  <title>留言板</title>
  <meta name ="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="./style.css">

</head>
<body>
  <header class="warning">
    注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼
  </header>
  <main>
    <nav>
      <?php if (!$username) { ?>
        <a href="index.php" class="board__btn">回到留言板</a>
        <a href="register.php" class="board__btn">註冊</a>
        <a href="login.php" class="board__btn">登入</a>
      <?php } else { ?>
        <h3>你好, <span class="nickname"><?php echo escapeHTML($user['nickname']); ?></span>！</h3>
        <a href="index.php" class="board__btn">回到留言板</a>
        <a href="handle_logout.php" class="board__btn">登出</a>
      <?php } ?>
    </nav>
    <div class="board">
      <div class="permission_warning">您沒有權限！</div>
      <?php if (!$username) { ?>
        <div>需以管理員身份登入</div>
      <?php } ?>
    </div>
  </main>
</body>
</html>