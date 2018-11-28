<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../api/config/Database.php';
include_once '../models/User.php';

$database = new Database();
$db = $database->connect();

$user = new User($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

$user->email = $data->email;
$sent_password = $data->password;

$email_exists = $user->emailExists();

if (!$email_exists) {
    header("HTTP/1.1 404");
    echo json_encode(
        array('response' => 'Not existing')
    );
    return;
}

if (password_verify($sent_password, $user->password)) {
    header("HTTP/1.1 200 OK");
    echo json_encode(
        array('response' => 'Correct')
    );
} else {
    header("HTTP/1.1 401");
    echo json_encode(
        array('response' => 'Forbidden')
    );
}


