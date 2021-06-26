<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  $user = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  }

  if (!$user) {
    header("Location: no-permission.php");
    exit();
  }

  $id = $_GET['id'];
  $stmt = $conn->prepare("SELECT * FROM pcchen_blog_articles WHERE id = ?");
  $stmt->bind_param("i", $id);
  $result = $stmt->execute();

  if (!$result) {
    die($conn->error);
  }

  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
?>

<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">

  <title>Who's Blog - 存放技術之地 - 編輯文章</title>
  <meta name ="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
  <link rel="stylesheet" href="./style.css">
  <script src="//cdn.ckeditor.com/4.16.1/standard/ckeditor.js">
  </script>
  <script>
    function submitContent(){
       article.submit();
      }
  </script>

</head>
<body>
  <nav>
    <div class="nav__site">
      <a class="nav__site-name" href="index.php">Who's Blog</a>
    </div>
    <div class="nav__btns">
      <div class="nav__blog-btns">
        <a class="nav__blog-btn" href="articles.php">
          文章列表
        </a>
        <a class="nav__blog-btn" href="category.php">
          分類專區
        </a>
        <a class="nav__blog-btn" href="about.php">
          關於我
        </a>
      </div>
      <div class="nav__ctrl-btn">
        <?php if($user) { ?>
        <a class="nav__blog-btn" href="admin.php">後台管理</a>
        <a class="nav__blog-btn" href="handle_logout.php">登出</a>
        <?php } else { ?>
        <a class="nav__blog-btn" href="login.php">登入</a>
        <?php } ?>
      </div>
    </div>
  </nav>
  <div class="banner">
    <h1>存放技術之地</h1>
    <h3>Welcome to my blog</h3>
  </div>
  <main>
    <div class="articles">  
      <form class="add-form" name="article" method="POST" action="handle_update_article.php">
        <div class="add-form__instruction">
          <p>編輯文章：</p>
        </div>
        <?php 
          if (!empty($_GET['errCode'])) { 
            $errMsg = 'Error.';
            if ($_GET['errCode'] === '1') {
              $errMsg = "標題及文章內容不得為空";
            }
            echo "<div class='error'>錯誤：" . $errMsg . "</div>";
          }
        ?>
        <input class="add-form__title" type="text" name="title" placeholder="請輸入文章標題..." value="<?php echo escapeHTML($row['title']); ?>">
        <select class="add-form__category">
          <option>請輸入文章分類...</option>
        </select>
        <textarea class="add-form__content" name="content" rows="12"><?php echo $row['content']; ?></textarea>
        <script>
          CKEDITOR.replace( 'content', {
            resize_maxWidth: 838,
          })
        </script>
        <input type="hidden" name="id" value="<?php echo escapeHTML($row['id']); ?>">
        <div class="add-form__submit">
          <input class="add-form__submit-btn" type="button" onclick="submitContent()" value="送出文章">
          <input class="add-form__submit-btn" type="button" onclick="window.history.back()" value="取消編輯">
        </div>
      </form>
    </div>
  </main>
  <footer>
    Copyright © 2020 Who's Blog All Rights Reserved.
  </footer>
</body>
</html>