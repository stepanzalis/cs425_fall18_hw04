<?php
/**
 * Created by PhpStorm.
 * User: loukas
 * Date: 11/27/2018
 * Time: 5:06 PM
 */


class Hardware{

    // database connection and table name
    private $conn;
    private $table_name = "hardware";

    // object properties
    public $solar_panel;
    public $azimuth_angle;
    public $inclination_angle;
    public $communication;
    public $inverter;
    public $sensors;


    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

// read products
    function read(){

        // select all query
        $query = "SELECT
                 p.solar_panel, p.azimuth_angle, p.inclination_angle,p.communication,
                 p.inverter,p.sensors
            FROM
                " . $this->table_name . " p";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }

}




?>