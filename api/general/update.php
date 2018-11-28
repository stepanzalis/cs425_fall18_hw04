<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization,X-Requested-With');

include_once '../config/Database.php';
include_once 'Solar.php';
// Instantiate DB & connect
$database = new Database();
$db = $database->connect();

// Instantiate blog post object
$category = new Solar($db);

// Get raw posted data
$data = json_decode(file_get_contents("php://input"));

// Set ID to UPDATE


$category->id = $data->id;
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

// Update post
if ($category->update()) {
    echo json_encode(
        array('message' => 'General Updated')
    );
} else {
    echo json_encode(
        array('message' => 'General not updated')
    );
}
