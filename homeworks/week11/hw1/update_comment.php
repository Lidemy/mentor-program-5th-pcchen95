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
  $username = getAuthorFromId($id);

  if (
    !$user || (
      ($user['update_own'] !== 1 && $user['username'] !== $username) &&
      $user['update_any'] !== 1)
  )  {
    header("Location: index.php");
    exit();
  } 

  $stmt = $conn->prepare("SELECT * FROM pcchen_board_comments WHERE id = ? AND username = ?");
  $stmt->bind_param('is', $id, $username);
  $result = $stmt->execute();
  
  if(!$result) {
    die("Error: " . $conn->error);
  }

  $result = $stmt->get_result();
  $row = $result->fetch_assoc(); 
 
?>
<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">

  <title>留言板</title>
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
      <h1 class="board__title">編輯留言</h1>
      <?php 
        $id = $_GET['id'];
      ?>
      <form class="board__new-comment-form" method="POST" action="handle_update_comment.php?id=<?php echo escapeHTML($row['id']); ?>&username=<?php echo escapeHTML($row['username']); ?>"> 
        <textarea  name="content" rows="5"><?php echo escapeHTML($row['content']); ?></textarea>
        <input type="hidden" name="id" value="<?php echo escapeHTML($row['id']); ?>">
        <input class="board__submit-btn" type="submit" value="提交">
        <button class="board__submit-btn cancel"><a>取消</a></button>
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
    </div>
  </main>
  <script>
    document.querySelector('.cancel').addEventListener('click', () => {
      window.history.back()
    })
  </script>
</body>
</html>