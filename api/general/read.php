<?php
/**
 * Created by PhpStorm.
 * User: loukas
 * Date: 11/27/2018
 * Time: 5:10 PM
 */

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// database connection will be here
// include database and object files
include_once '../config/Database.php';
include_once 'Solar.php';

// instantiate database and product object
$database = new Database();
$db = $database->connect();

// initialize object
$solar = new Solar($db);

// read products will be here
// query products
$stmt = $solar->read();
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){

    // products array
    $solar_arr=array();

    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);

        $solar_item=array(
            "id" => $id,
            "name" => $name,
            "address" => $address,
            "latitude" => $latitude,
            "longitude" => $longitude,
            "operator" => $operator,
            "date" => $date,
            "description" => $description,
            "photo_path" => $photo_path,
            "ef_system_power"=>$ef_system_power,
            "ef_annual_production"=>$ef_annual_production,
            "ef_co2_avoided"=>$ef_co2_avoided,
            "ef_reimbursement"=>$ef_reimbursement,
            "ha_solar_panel"=>$ha_solar_panel,
            "ha_azimuth_angle"=>$ha_azimuth_angle,
            "ha_inclination_angle"=>$ha_inclination_angle,
            "ha_communication"=>$ha_communication,
            "ha_inverter"=>$ha_inverter,
            "ha_sensors"=>$ha_sensors
        );

        array_push($solar_arr, $solar_item);
    }

    // set response code - 200 OK
    http_response_code(200);

    // show products data in json format
    echo json_encode($solar_arr);
}

// no products found will be here
?>