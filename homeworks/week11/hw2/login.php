<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">

  <title>Who's Blog - Login</title>
  <meta name ="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">
  <link rel="stylesheet" href="./style.css">

</head>
<body>
  <section class="login">
    <h2 class="login__title">Log In</h2>
   
    <form class="login__input-form" method="POST" action="handle_login.php">
      <div class="login__field">
        <div class="login__field-name">USERNAME</div>
        <input class="login__input" type="text" name="username">
      </div>
      <div class="login__field">
        <div class="login__field-name">PASSWORD</div>
        <input class="login__input" type="password" name="password">
      </div>
       <?php       
      if (!empty($_GET['errCode'])) { 
        $errMsg = "Error";
        if ($_GET['errCode'] === '1') {
          $errMsg = '請輸入完整資料';
        } else if ($_GET['errCode'] === '2') {
          $errMsg = '帳號或密碼輸入錯誤';
        }
        echo "<h4 class='error'>錯誤：" . $errMsg . "</h4>";
      }
        ?>
      <input class="input__submit-btn" type="submit" value="SIGN IN">
    </form>
  </section>
</body>
</html>