<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">

  <title>留言板 - 註冊</title>
  <meta name ="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="./style.css">

</head>
<body>
  <header class="warning">
    注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼
  </header>
  <main class="board">
    <a href="index.php" class="board__btn">返回留言板</a>
    <a href="login.php" class="board__btn">登入</a>
    <h1 class="board__title">註冊</h1>
    <?php 
      if (!empty($_GET['errCode'])) { 
        $code = $_GET['errCode'];
        $msg = 'Error';
        if ($code === '1') {
          $msg = '請填入完整資料';
        } else if ($code === '2') {
          $msg = '此帳號已被註冊';
        }
        echo "<h2 class='error'>錯誤：" . $msg . "</h2>";
      }
    ?>
      <form class="board__new-comment-form" method="POST" action="handle_register.php"> 
        <div class="board__input">
          暱稱：<input type="text" name="nickname">
        </div>
        <div class="board__input">
          帳號：<input type="text" name="username">
        </div>
        <div class="board__input">
          密碼：<input type="password" name="password">
        </div>
        <input class="board__submit-btn" type="submit" value="提交">  
      </form>
  </main>
</body>
</html>