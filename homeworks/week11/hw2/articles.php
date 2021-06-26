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

  $page = 1;
  if (!empty($_GET['page'])) {
    $page = $_GET['page'];
  }
  $item_per_page = 6;
  $offset = ($page - 1) * $item_per_page;

  $stmt = $conn->prepare(
    "SELECT *, " . 
    "date_format(created_at, '%Y/%m/%e %h:%i') AS created_at " . 
    "FROM pcchen_blog_articles WHERE is_deleted IS NULL " .
    "ORDER BY id DESC " .
    "LIMIT ? OFFSET ?"
  );
  $stmt->bind_param("ii", $item_per_page, $offset);
  $result = $stmt->execute();
  $result = $stmt->get_result();

  $count = getItemCount();
  $total_pages = ceil($count / $item_per_page);

?>

<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">

  <title>Who's Blog - 存放技術之地</title>
  <meta name ="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
  <link rel="stylesheet" href="./style.css">

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
        <?php if($username) { ?>
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
    <?php 
      $from = $offset + 1;
      $to = $offset + $item_per_page;
      if ($page == $total_pages) {
        $to = $count;
      }
    ?>
    <div class="page-name">文章列表</div>
    <div class="articles">    
      <?php while ($row = $result->fetch_assoc()) {
      ?>
      <div class="article">
        <div class="article__title">
          <p><?php echo escapeHTML($row['title']); ?></p>
          <?php if($user) { ?>
            <a href="update_article.php?id=<?php echo escapeHTML($row['id']); ?>" class="article__edit">編輯</a>
          <?php } ?>
        </div>
        <div class="article__info">
          <div class="article__time">
            <img src="images/time.png">
            <span><?php echo escapeHTML($row['created_at']); ?></span>
          </div>
          <div class="article__category">
            <img src="images/folder.png">
            <span>歷史公告</span>
          </div>
        </div>
        <div class="article__preview show-less">
          <p><?php echo $row['content']; ?></p>
        </div>
        <a class="article__read-more-btn" href="blog_page.php?id=<?php echo $row['id']; ?>">READ MORE</a>
      </div>
      <?php } ?>
      <div class="articles__total-items">共 <?php echo $count; ?> 篇文章，顯示第 <?php echo $from; ?> ~ <?php echo $to; ?> 篇文章</div> 
      <div class="paginator">
      <div class="paginator__prev">
        <a class="paginator__icon <?php if ($page == 1) { echo "inactive"; } ?>" href="articles.php?page=1"><<</a>
        <a class="paginator__icon <?php if ($page == 1) { echo "inactive"; } ?>" href="articles.php?page=<?php echo $page - 1;?>"><</a>
      </div>
      第 <?php echo $page; ?> / <?php echo $total_pages; ?> 頁
      <div class="paginator__next">
        <a class="paginator__icon <?php if ($page == $total_pages) { echo "inactive"; } ?>" href="articles.php?page=<?php echo $page + 1;?>">></a>
        <a class="paginator__icon <?php if ($page == $total_pages) { echo "inactive"; } ?>" href="articles.php?page=<?php echo $total_pages; ?>">>></a>
      </div>
    </div>
    </div>
    <div class="page-name"></div>
    
  </main>
  <footer>
    Copyright © 2020 Who's Blog All Rights Reserved.
  </footer>
</body>
</html>