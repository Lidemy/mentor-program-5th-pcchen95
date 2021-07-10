<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $page = 1;
  if (!empty($_GET['page'])) {
    $page = $_GET['page'];
  }
  $item_per_page = 5;
  $offset = ($page - 1) * $item_per_page;

  $stmt = $conn->prepare(
    "SELECT U.nickname AS nickname, U.username AS username, U.role AS role, " .
    "C.content AS content, C.created_at AS created_at, C.id AS id " .
    "FROM pcchen_board_comments AS C " .
    "LEFT JOIN pcchen_board_users AS U ON C.username = U.username " .
    "WHERE C.is_deleted IS NULL " .
    "ORDER BY C.id DESC " .
    "LIMIT ? OFFSET ?"
  );
  $stmt->bind_param("ii", $item_per_page, $offset);
  $result = $stmt->execute();
  
  if(!$result) {
    die("Error: " . $conn->error);
  }

  $result = $stmt->get_result();
  
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
  <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
  <link rel="stylesheet" href="./style.css">

</head>
<body>
  <header class="warning">
    注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼
  </header>
  
  <main>
    <nav>
      <?php if (!$username) { ?>
        <div class="board__buttons">
          <a href="register.php" class="board__btn">註冊</a>
          <a href="login.php" class="board__btn">登入</a>
        </div>
      <?php } else { ?>
        <h3>你好, <span class="nickname"><?php echo escapeHTML($user['nickname']); ?></span>！</h3>
        <div class="board__buttons">
          <a class="board__btn update-nickname">編輯暱稱</a>
          <a class="board__btn update-nickname cancel-update-nickname hide">取消編輯</a>
          <a href="handle_logout.php" class="board__btn">登出</a>
          <?php if ($user['role'] === "admin") { ?>
          <a href="admin.php" class="board__btn admin-btn">後台管理</a>
          <?php } ?>   
        </div>
          
      <?php } ?>
    </nav>
    <div class="board">
      <form class="board__new-comment-form board__update-nickname hide" method="POST" action="handle_update_nickname.php">
        <div class="board__input-nickname"> 
          新暱稱：<input type="text" name="nickname">
          <input class="board__new-name-submit-btn" type="submit" value="提交">
        </div>    
      </form>
      <h1 class="board__title">Comments</h1>
      
      <?php 
        if ($username) { 
          if ($user['role'] === "suspended") { ?>
            <h3>您已被停權，無法新增留言</h3>
      <?php } else { ?>
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
      <?php }} else { ?>
        <h3>請登入以發布內容</h3>
      <?php } ?>
      <div class="board__hr"></div>
      <?php 
        $count = getCountComment();
        $total_pages = ceil($count / $item_per_page);

        $from = $offset + 1;
        $to = $offset + $item_per_page;
        if ($page == $total_pages) {
          $to = $count;
        }
      ?>
      <section>
        <div class="paginator__count">
          共 <?php echo $count; ?> 則留言，顯示第 <?php echo $from; ?> ～ 
          <?php echo $to; ?> 則留言
        </div>
        <?php while($row = $result->fetch_assoc()) { ?>   
          <div class="card">
            <div class="card__comment">
              <div class="card__avatar"></div>
              <div class="card__body">
                <div calss="card__info">
                  <span class="card__author">
                    <?php echo escapeHTML($row['nickname']); ?>
                    (@<?php echo escapeHTML($row['username']); ?>)
                  </span>
                  <span class="card__time"><?php echo escapeHTML($row['created_at']); ?></span>        
                </div>           
                <p class="card__content"><?php echo escapeHTML($row['content']); ?></p>
              </div>
            </div>
            <div class="card__edit">
              <?php if ((!empty($user['role']) && $user['role'] === "admin") 
                      || $username === $row['username']) { ?>
                <a href="update_comment.php?id=<?php echo $row['id']; ?>"><img src="images/edit.png" title="編輯"/></a>
                <a href="handle_delete_comment.php?id=<?php echo $row['id']; ?>"><img src="images/delete.png" title="刪除" /></a>
              <?php } ?>
            </div>
          </div>
        <?php } ?>
      </section>
      <div class="board__hr"></div>
      <div class="paginator">  
        <div class="paginator__page">
          <div class="paginator__prev">
            <a class="paginator__icon <?php if ($page == 1) { echo "inactive"; } ?>" href="index.php?page=1"><<</a>
            <a class="paginator__icon <?php if ($page == 1) { echo "inactive"; } ?>" href="index.php?page=<?php echo $page - 1;?>"><</a>
          </div>
          第 <?php echo $page; ?> 頁 / 共 <?php echo $total_pages; ?> 頁
          <div class="paginator__next">
            <a class="paginator__icon <?php if ($page == $total_pages) { echo "inactive"; } ?>" href="index.php?page=<?php echo $page + 1;?>">></a>
            <a class="paginator__icon <?php if ($page == $total_pages) { echo "inactive"; } ?>" href="index.php?page=<?php echo $total_pages; ?>">>></a>
          </div>
        </div>
      </div>
    </div>
  </main>
  <script type="text/javascript">
    document.querySelector('.update-nickname').addEventListener('click', () => {
      document.querySelector('.board__update-nickname').classList.remove('hide')
      document.querySelector('.update-nickname').classList.add('hide')
      document.querySelector('.cancel-update-nickname').classList.remove('hide')
    })
    document.querySelector('.cancel-update-nickname').addEventListener('click', () => {
      document.querySelector('.board__update-nickname').classList.add('hide')
      document.querySelector('.update-nickname').classList.remove('hide')
      document.querySelector('.cancel-update-nickname').classList.add('hide')
    })
  </script>
</body>
</html>