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
include_once '../hardware/hardware.php';







// instantiate database and product object
$database = new Database();
$db = $database->connect();

// initialize object
$product = new Hardware($db);

// read products will be here
// query products
$stmt = $product->read();
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){

    // products array
    $products_arr=array();
    $products_arr["hardware"]=array();

    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);

        $product_item=array(
            "solar_panel" => $solar_panel,
            "azimuth_angle" => $azimuth_angle,
            "inclination_angle" => $inclination_angle,
            "communication" => $communication,
            "inverter" => $inverter,
            "sensors" => $sensors
        );

        array_push($products_arr["hardware"], $product_item);
    }

    // set response code - 200 OK
    http_response_code(200);

    // show products data in json format
    echo json_encode($products_arr);
}

// no products found will be here
?>