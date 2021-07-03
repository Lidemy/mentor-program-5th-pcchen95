<?php 
  require_once("conn.php");

  header('content-type: application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if (
    empty($_POST['content']) || 
    empty($_POST['id']
  )) {
    $json = array(
      "ok" => false,
      "message" => "The content is undefined.update"
    );
    $response = json_encode($json);
    echo $response;
    die();
  }
  $id = $_POST['id'];
  $content = $_POST['content'];
  $stmt = $conn->prepare("UPDATE pcchen_todo_contents SET content = ? WHERE id = ?");
  $stmt->bind_param("si", $content, $id);
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
  );
  $response = json_encode($json);
  echo $response;
?>