<?php
/**
 * Created by PhpStorm.
 * User: loukas
 * Date: 11/27/2018
 * Time: 5:06 PM
 */


class General{

    // database connection and table name
    private $conn;
    private $table_name = "general";

    // object properties
    public $id;
    public $name;
    public $address;
    public $latitude;
    public $longitude;
    public $operator;
    public $date;
    public $description;
    public $photo_path;

    public  $ef_system_power;
    public  $ef_annual_production;
    public  $ef_co2_avoided;
    public  $ef_reimbursement;
    public  $ha_solar_panel;
    public  $ha_azimuth_angle;
    public  $ha_inclination_angle;
    public  $ha_communication;
    public  $ha_inverter;
    public  $ha_sensors;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

// read products
    function read(){

        // select all query
        $query = "SELECT
                 p.id, p.name, p.description,p.address,p.latitude,p.longitude,
                 p.operator,p.date,p.description,p.photo_path,p.ef_system_power,
                 p.ef_annual_production,p.ef_co2_avoided,p.ef_reimbursement,
                 p.ha_solar_panel,p.ha_azimuth_angle,p.ha_inclination_angle,
                 p.ha_communication,p.ha_inverter,p.ha_sensors
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