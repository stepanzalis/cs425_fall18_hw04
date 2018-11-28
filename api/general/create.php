<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization,X-Requested-With');

include_once '../config/Database.php';
include_once 'Solar.php';

// Instantiate DB & connect
$database = new Database();
$db = $database->connect();

// Instantiate blog post object
$solar = new Solar($db);

// Get raw posted data
$data = json_decode(file_get_contents("php://input"));

$solar->name = $data->name;
$solar->address = $data->address;
$solar->latitude = $data->latitude;
$solar->longitude = $data->longitude;
$solar->operator = $data->operator;
$solar->date = $data->date;
$solar->description = $data->description;
$solar->photo_path = $data->photo_path;
$solar->ef_system_power = $data->ef_system_power;
$solar->ef_annual_production = $data->ef_annual_production;
$solar->ef_co2_avoided = $data->ef_co2_avoided;
$solar->ef_reimbursement = $data->ef_reimbursement;
$solar->ha_solar_panel = $data->ha_solar_panel;
$solar->ha_azimuth_angle = $data->ha_azimuth_angle;
$solar->ha_inclination_angle = $data->ha_inclination_angle;
$solar->ha_communication = $data->ha_communication;
$solar->ha_inverter = $data->ha_inverter;
$solar->ha_sensors = $data->ha_sensors;

// Create Solar
if ($solar->create()) {
    header("HTTP/1.1 201");
    echo json_encode(
        array('message' => 'Created')
    );
} else {
    header("HTTP/1.1 404");
    echo json_encode(
        array('message' => 'Not Created')
    );
}
