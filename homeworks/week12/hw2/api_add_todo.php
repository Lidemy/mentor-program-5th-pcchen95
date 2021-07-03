<?php 
  require_once("conn.php");

  header('content-type: application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if (empty($_POST['content'])) {
    $json = array(
      "ok" => false,
      "message" => "The content is undefined."
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  $content = $_POST['content'];
  $stmt = $conn->prepare("INSERT INTO pcchen_todo_contents (content) VALUES (?)");
  $stmt->bind_param("s", $content);
  $result = $stmt->execute();

  if(!$result) {
    $json = array(
      "ok" => false,
      "message" => $conn->err
    );
    $response = json_encode($json);
    echo $response;
    die();
  }
  $getID = mysqli_insert_id($conn);
  $json = array(
    "ok" => true,
    "message" => "Success!",
    "id" => $getID
  );
  $response = json_encode($json);
  echo $response;
?>