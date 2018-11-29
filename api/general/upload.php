<?php
/**
 * Created by PhpStorm.
 * User: stepanzalis
 * Date: 29/11/2018
 * Time: 19:20
 */

$response = array();

if (isset($_FILES["image"])) {

    if (is_uploaded_file($_FILES["image"]["tmp_name"])) {

        $tmp_file = $_FILES["image"]["tmp_name"];
        $image_name = $_FILES["image"]["name"];
        $upload_dir = $_SERVER['DOCUMENT_ROOT']. "/cs425_hw4/images/" .$image_name;

        if (move_uploaded_file($tmp_file, $upload_dir)) {
            header("HTTP/1.1 200 OK");
            $response["message"] = "upload successful";
        } else {
            header("HTTP/1.1 404");
            $response["message"] = "upload failed";
        }
    }
}

else {
    header("HTTP/1.1 400");
    $response["message"] = "invalid request";
}

echo json_encode($response);