<?php
  // Headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: DELETE');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization,X-Requested-With');

include_once '../config/Database.php';
include_once 'Post.php';
  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate blog post object
  $category = new Post($db);

  // Get raw posted data
  $data = json_decode(file_get_contents("php://input"));

  // Set ID to UPDATE
$category->latitude =  $data->latitude;
$category->longitude = $data->longitude;

  // Delete post
  if($category->delete()) {
    echo json_encode(
      array('message' => 'General deleted')
    );
  } else {
    echo json_encode(
      array('message' => 'General not deleted')
    );
  }
