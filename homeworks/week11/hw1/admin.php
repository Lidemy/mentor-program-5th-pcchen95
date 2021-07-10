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

  if ($user['role'] !== "admin") {
    header("Location: no_permission.php");
    exit();
  } 

  $page = 1;
  if (!empty($_GET['page'])) {
    $page = $_GET['page'];
  }
  $item_per_page = 10;
  $offset = ($page - 1) * $item_per_page;

  $stmt = $conn->prepare("SELECT *, date_format(created_at, '%Y-%m-%e') AS created_date FROM pcchen_board_users ORDER BY role ASC, id DESC LIMIT ? OFFSET ?");
  $stmt->bind_param("ii", $item_per_page, $offset);
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
      <a href="handle_logout.php" class="board__btn">登出</a>    
    </nav>
    <div class="admin-board">
      <?php 
        $stmt2 = $conn->prepare("SELECT count(id) AS count FROM pcchen_board_users");
        $result2 = $stmt2->execute();
        $result2 = $stmt2->get_result();
        $row2 = $result2->fetch_assoc();
        $count = $row2['count'];
        $total_pages = ceil($count / $item_per_page);
      ?>
      <h1 class="board__title">使用者管理</h1>
      <section>
        <div class="paginator__count">
         共 <?php echo $count; ?> 位使用者，顯示第 <?php echo $offset + 1; ?> ～ 
          <?php 
            if ($page == $total_pages) {
              echo $count;
            } else {
              echo $offset + $item_per_page; 
            }
          ?> 位使用者
        </div>
        <form method="POST" action="handle_update_user.php">
          <table>
            <tr>
              <th class="table__id">ID</th>
              <th class="table__username">帳號</th>
              <th class="table__nickname">暱稱</th>
              <th class="table__created-at">加入日期</th>  
              <th class="table__role">身份</th>
              <th class="table__edit">編輯權限</th>
            </tr>
            <?php while($row = $result->fetch_assoc()) {?>
             <tr>
              <td class="table__id"><?php echo escapeHTML($row['id']); ?></td> 
              <input type="hidden" name="id[]" value="<?php echo escapeHTML($row['id']); ?>">       
              <td class="table__username"><?php echo escapeHTML($row['username']); ?></td>
              <td class="table__nickname"><?php echo escapeHTML($row['nickname']); ?></td>
              <td class="table__created-at"><?php echo escapeHTML($row['created_date']); ?></td>
              <td class="table__role"><?php 
                if ($row['role'] === "admin") {
                  echo "管理員";
                } else if ($row['role'] === "normal") {
                  echo "一般使用者";
                } else if ($row['role'] === "suspended") {
                  echo "停權";
                }
              ?></td>
              <input type="hidden" name="role[]" value="<?php echo escapeHTML($row['role']); ?>">
              <td class="table__edit">
                <select name="updatedRole[]" class="board__select">
                  <option value="none" selected>---</option>
                  <?php if ($row['role'] !== "admin") { ?>
                    <option value="admin">管理員</option>
                  <?php } ?>
                  <?php if ($row['role'] !== "normal") { ?>
                  <option value="normal">一般使用者</option>
                  <?php } ?>
                  <?php if ($row['role'] !== "suspended") { ?>
                  <option value="suspended">停權</option>
                   <?php } ?>
                </select>
              </td>
            </tr>
            <?php } ?>
          </table>  
          <div class="user-update-btn">
            <input class="board__submit-btn" type="submit" value="確定">
            <button class="board__submit-btn cancel"><a>取消</a></button>
          </div> 
        </form>
      </section>   
      <div class="paginator">  
        <div class="paginator__page">
          <div class="paginator__prev">
              <a class="paginator__icon <?php if ($page == 1) { echo "inactive"; } ?>" href="admin.php?page=1"><<</a>
              <a class="paginator__icon <?php if ($page == 1) { echo "inactive"; } ?>" href="admin.php?page=<?php echo $page - 1;?>"><</a>
          </div>
          第 <?php echo $page; ?> 頁 / 共 <?php echo $total_pages; ?> 頁
          <div class="paginator__next">
            <a class="paginator__icon <?php if ($page == $total_pages) { echo "inactive"; } ?>" href="admin.php?page=<?php echo $page + 1;?>">></a>
            <a class="paginator__icon <?php if ($page == $total_pages) { echo "inactive"; } ?>" href="admin.php?page=<?php echo $total_pages; ?>">>></a>
          </div>
        </div>
      </div>
    </div>
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