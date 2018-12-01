<?php
/**
 * Created by PhpStorm.
 * User: loukas
 * Date: 11/27/2018
 * Time: 5:10 PM
 */

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization,X-Requested-With');

// database connection will be here
// include database and object files
include_once '../config/Database.php';
include_once 'Solar.php';
include_once('User.php');

// instantiate database and product object
$database = new Database();
$db = $database->connect();

$headers = apache_request_headers();

if (isset($headers['Authorization'])) {

    $user = new User($db);

    if ($user->tokenExists($headers['Authorization'])) {

        $solar = new Solar($db);

        // Get raw posted data
        $data = json_decode(file_get_contents("php://input"));

        // Set ID to UPDATE
        $solar->id = $data->id;

        if ($solar->delete()) {
            echo json_encode(
                array('message' => 'General deleted')
            );
        }
    } else {
        header("HTTP/1.1 401 Forbidden");
        $res = array("response" => "Login first");
        echo json_encode($res);
    }
}

