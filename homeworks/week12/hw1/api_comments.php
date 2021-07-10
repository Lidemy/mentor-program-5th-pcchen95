<?php 
  require_once("conn.php");
  header('content-type: application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if(empty($_GET['site_key'])) {
    $json = array(
      "ok" => false,
      "message" => "Please add site_key in url"
    );
    $response = json_encode($json);
    echo $response;   
    die();
  }

  $site_key = $_GET['site_key']; 
  $limit = $_GET['limit'] + 1;

  if (empty($_GET['cursor'])) {
    $stmt = $conn->prepare("SELECT * FROM `pcchen_board-api_comments` WHERE site_key = ? ORDER BY id DESC LIMIT ?");
    $stmt->bind_param("si", $site_key, $limit);
  } else {
    $cursor = $_GET['cursor'];
    $stmt = $conn->prepare("SELECT * FROM `pcchen_board-api_comments` WHERE site_key = ? AND id < ? ORDER BY id DESC LIMIT ?");
    $stmt->bind_param("sii", $site_key, $cursor, $limit);
  }

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

  $result = $stmt->get_result();
  $discussions = array();
  while ($row = $result->fetch_assoc()) {
    array_push($discussions, array(
      "id" => $row['id'],
      "nickname" => $row['nickname'],
      "content" => $row['content'], 
      "created_at" => $row['created_at']
    )
  );
  }

  $json = array(
    "ok" => "true",
    "discussions" => $discussions
  );

  $json = json_encode($json);
  echo $json;

?>