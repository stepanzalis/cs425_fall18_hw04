<?php
/**
 * Created by PhpStorm.
 * User: loukas
 * Date: 11/27/2018
 * Time: 5:06 PM
 */


class Efficiency{

    // database connection and table name
    private $conn;
    private $table_name = "efficiency";

    // object properties
    public $system_power;
    public $annual_production;
    public $co2_avoided;
    public $reimbursement;


    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

// read products
    function read(){

        // select all query
        $query = "SELECT
                 p.	system_power, p.annual_production, p.co2_avoided,p.reimbursement
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