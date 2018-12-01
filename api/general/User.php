<?php
/**
 * Created by PhpStorm.
 * User: stepanzalis
 * Date: 01/12/2018
 * Time: 17:05
 */


class User
{
    private $conn;
    private $table = 'users';

    public $id;
    public $first_name;
    public $last_name;
    public $email;
    public $password;

    // Constructor with DB
    public function __construct($db)
    {
        $this->conn = $db;
    }


    function tokenExists($password)
    {
        // query to check if email exists
        $query = "SELECT id
            FROM " . $this->table . "
            WHERE password = ?";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // bind given email value
        $stmt->bindParam(1, $password);

        // execute the query
        $stmt->execute();

        // get number of rows
        $num = $stmt->rowCount();

        // if email exists, assign values to object properties for easy access and use for php sessions
        if ($num > 0) {
            return true;
        }

        // return false if email does not exist in the database
        return false;
    }

    function emailExists()
    {
        // query to check if email exists
        $query = "SELECT id, first_name, last_name, password
            FROM " . $this->table . "
            WHERE email = ?
            LIMIT 0,1";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->email = htmlspecialchars(strip_tags($this->email));

        // bind given email value
        $stmt->bindParam(1, $this->email);

        // execute the query
        $stmt->execute();

        // get number of rows
        $num = $stmt->rowCount();

        // if email exists, assign values to object properties for easy access and use for php sessions
        if ($num > 0) {

            // get record details / values
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            // assign values to object properties
            $this->id = $row['id'];
            $this->first_name = $row['first_name'];
            $this->last_name = $row['last_name'];
            $this->password = $row['password'];

            // return true because email exists in the database
            return true;
        }

        // return false if email does not exist in the database
        return false;
    }

}