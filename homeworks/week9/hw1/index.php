<?php 
  session_start();
  require_once("conn.php");
  $result = $conn->query("SELECT * FROM pcchen_board_comments ORDER BY id DESC");
  
  $username = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
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
  <main class="board">
    <?php if (!$username) { ?>
      <a href="register.php" class="board__btn">註冊</a>
      <a href="login.php" class="board__btn">登入</a>
    <?php } else { ?>
      <a href="handle_logout.php" class="board__btn">登出</a>
      <h3>你好！<?php echo $username; ?></h3>
    <?php } ?>
    <h1 class="board__title">Comments</h1>
    
    <?php if ($username) { ?>
      <form class="board__new-comment-form" method="POST" action="handle_add_comment.php"> 
        <textarea  name="content" rows="5"></textarea>
        <input class="board__submit-btn" type="submit" value="提交">
        <?php 
          if (!empty($_GET['errCode'])) { 
            $code = $_GET['errCode'];
            $msg = 'Error';
            if ($code === '1') {
              $msg = '請輸入內容';
            }
            echo "<span class='error'> 錯誤：" . $msg . "</span>";
          }
        ?>
      </form>
    <?php } else { ?>
      <h3>請登入以發布內容</h3>
    <?php } ?>
    <div class="board__hr"></div>
    <section>  
      <?php while($row = $result->fetch_assoc()) { ?>   
        <div class="card">
          <div class="card__avatar"></div>
          <div class="card__body">
            <div calss="card__info">
              <span class="card__author"><?php echo $row['nickname']; ?></span>
              <span class="card__time"><?php echo $row['created_at']; ?></span> 
            </div>
            <p class="card__content"><?php echo $row['content']; ?></p>
          </div>
        </div>
      <?php } ?>
    </section>
  </main>
</body>
</html>