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

  $page = 1;
  if (!empty($_GET['page'])) {
    $page = $_GET['page'];
  }
  $item_per_page = 10;
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

  <title>Who's Blog - 存放技術之地 - 後台</title>
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
        <a class="nav__blog-btn" href="articles.php">文章列表</a>
        <a class="nav__blog-btn" href="category.php">分類專區</a>
        <a class="nav__blog-btn" href="about.php">關於我</a>
      </div>
      <div class="nav__ctrl-btn">
        <a class="nav__blog-btn" href="add_article.php">新增文章</a>
        <a class="nav__blog-btn" href="handle_logout.php">登出</a>
      </div>
    </div>
  </nav>
  <div class="banner">
    <h1>存放技術之地 - 後台</h1>
    <h3>Welcome to my blog</h3>
  </div>
  <main class="main__admin">
    <div class="articles">  
      <?php 
        $from = $offset + 1;
        $to = $offset + $item_per_page;
        if ($page == $total_pages) {
          $to = $count;
        }
      ?>
      <div class="articles__total-items">共 <?php echo $count; ?> 篇文章，顯示第 <?php echo $from; ?> ~ <?php echo $to; ?> 篇文章</div>
      <?php while ($row = $result->fetch_assoc()) {
      ?>
      <div class="admin__article">
        <a class="admin__article_title" href="blog_page.php?id=<?php echo escapeHTML($row['id']); ?>"><?php echo escapeHTML($row['title']); ?></a>
        <div class="admin__article_time">
          <span><?php echo escapeHTML($row['created_at']); ?></span>
          <a href="update_article.php?id=<?php echo escapeHTML($row['id']); ?>" class="article__edit">編輯</a>
          <a href="handle_delete_article.php?id=<?php echo escapeHTML($row['id']); ?>" class="article__edit">刪除</a>
        </div>
      </div>
      <?php } ?>
    </div>
    <div class="paginator">
      <div class="paginator__prev">
        <a class="paginator__icon <?php if ($page == 1) { echo "inactive"; } ?>" href="admin.php?page=1"><<</a>
        <a class="paginator__icon <?php if ($page == 1) { echo "inactive"; } ?>" href="admin.php?page=<?php echo $page - 1;?>"><</a>
      </div>
      第 <?php echo $page; ?> / <?php echo $total_pages; ?> 頁
      <div class="paginator__next">
        <a class="paginator__icon <?php if ($page == $total_pages) { echo "inactive"; } ?>" href="admin.php?page=<?php echo $page + 1;?>">></a>
        <a class="paginator__icon <?php if ($page == $total_pages) { echo "inactive"; } ?>" href="admin.php?page=<?php echo $total_pages; ?>">>></a>
      </div>
    </div>
  </main>
  <footer>
    Copyright © 2020 Who's Blog All Rights Reserved.
  </footer>
</body>
</html>