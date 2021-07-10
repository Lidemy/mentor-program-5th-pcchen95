<?php 
  require_once("conn.php");
  header('content-type: application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  $id = $_GET['id'];
  $stmt = $conn->prepare("SELECT content FROM pcchen_todo_contents WHERE id = ?");
  $stmt->bind_param("i", $id);
  $result = $stmt->execute();
  

  if (!$result) {
    $json = array(
      "ok" => false,
      "message" => $conn->error
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  $result = $stmt->get_result();

  if($result->num_rows === 0) {
    $json = array(
      "ok" => false,
      "message" => "ID is not found."
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  $todos = array();
  $row = $result->fetch_assoc();
  
  $content =json_decode($row['content']);

  $json = array(
    "ok" => true,
    "todos" => $content 
  );

  $json = json_encode($json);
  echo $json;
?>