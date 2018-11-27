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

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

// read products
    function read(){

        // select all query
        $query = "SELECT
                 p.id, p.name, p.description,p.address,p.latitude,p.longitude,
                 p.operator,p.date,p.description,p.photo_path
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