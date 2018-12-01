<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization,X-Requested-With');

include_once '../config/Database.php';
include_once 'Solar.php';
include_once('User.php');

// Instantiate DB & connect
$database = new Database();
$db = $database->connect();

// instantiate database and product object
$database = new Database();
$db = $database->connect();

$headers = apache_request_headers();

if (isset($headers['Authorization'])) {

    $user = new User($db);

    if ($user->tokenExists($headers['Authorization'])) {
        // Instantiate blog post object
        $category = new Solar($db);

        // Get raw posted data
        $data = json_decode(file_get_contents("php://input"));

        $category->name = $data->name;
        $category->address = $data->address;
        $category->latitude = $data->latitude;
        $category->longitude = $data->longitude;
        $category->operator = $data->operator;
        $category->date = $data->date;
        $category->description = $data->description;
        $category->photo_path = $data->photo_path;
        $category->ef_system_power = $data->ef_system_power;
        $category->ef_annual_production = $data->ef_annual_production;
        $category->ef_co2_avoided = $data->ef_co2_avoided;
        $category->ef_reimbursement = $data->ef_reimbursement;
        $category->ha_solar_panel = $data->ha_solar_panel;
        $category->ha_azimuth_angle = $data->ha_azimuth_angle;
        $category->ha_inclination_angle = $data->ha_inclination_angle;
        $category->ha_communication = $data->ha_communication;
        $category->ha_inverter = $data->ha_inverter;
        $category->ha_sensors = $data->ha_sensors;

        if ($category->create()) {
            header("HTTP/1.1 200 OK");
            echo json_encode(
                array('response' => 'General Created')
            );
        }
    } else {
        header("HTTP/1.1 401 Forbidden");
        $res = array("response" => "Login first");
        echo json_encode($res);
    }
}