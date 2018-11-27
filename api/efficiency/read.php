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
include_once '../efficiency/efficiency.php';







// instantiate database and product object
$database = new Database();
$db = $database->connect();

// initialize object
$product = new Efficiency($db);

// read products will be here
// query products
$stmt = $product->read();
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){

    // products array
    $products_arr=array();
    $products_arr["efficiency"]=array();

    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);

        $product_item=array(
            "system_power" => $system_power,
            "annual_production" => $annual_production,
            "co2_avoided" => $co2_avoided,
            "reimbursement" => $reimbursement
        );

        array_push($products_arr["efficiency"], $product_item);
    }

    // set response code - 200 OK
    http_response_code(200);

    // show products data in json format
    echo json_encode($products_arr);
}

// no products found will be here
?>