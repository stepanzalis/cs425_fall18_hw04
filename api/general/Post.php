<?php
class Post {
    // DB Stuff
    private $conn;
    private $table = 'general';

    // Properties

    public $name;
    public $address;
    public $latitude;
    public $longitude;
    public $old_latitude;
    public $old_longitude;
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
    // Constructor with DB
    public function __construct($db) {
        $this->conn = $db;
    }





    // Create Category
    public function create() {
        // Create Query
        $query = 'INSERT INTO ' .
            $this->table . '
    SET
      name = :name,address=:address,latitude=:latitude,longitude = :longitude,
      operator=:operator,date=:date,description=:description,photo_path=:photo_path
      ,ef_system_power=:ef_system_power,ef_annual_production=:ef_annual_production,
     ef_co2_avoided=:ef_co2_avoided, ef_reimbursement=:ef_reimbursement,ha_solar_panel=:ha_solar_panel,
     ha_azimuth_angle=:ha_azimuth_angle,ha_inclination_angle=:ha_inclination_angle,ha_communication=:ha_communication
     ,ha_inverter=:ha_inverter,ha_sensors=:ha_sensors';

        // Prepare Statement
        $stmt = $this->conn->prepare($query);

        // Clean data
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->address = htmlspecialchars(strip_tags($this->address));
        $this->latitude = htmlspecialchars(strip_tags($this->latitude));
        $this->longitude = htmlspecialchars(strip_tags($this->longitude));

        $this->operator = htmlspecialchars(strip_tags($this->operator));
        $this->date = htmlspecialchars(strip_tags($this->date));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->photo_path = htmlspecialchars(strip_tags($this->photo_path));
        $this->ef_system_power = htmlspecialchars(strip_tags($this->ef_system_power));
        $this->ef_annual_production = htmlspecialchars(strip_tags($this->ef_annual_production));
        $this->ef_co2_avoided = htmlspecialchars(strip_tags($this->ef_co2_avoided));
        $this->ef_reimbursement = htmlspecialchars(strip_tags($this->ef_reimbursement));
        $this->ha_solar_panel = htmlspecialchars(strip_tags($this->ha_solar_panel));
        $this->ha_azimuth_angle = htmlspecialchars(strip_tags($this->ha_azimuth_angle));
        $this->ha_inclination_angle = htmlspecialchars(strip_tags($this->ha_inclination_angle));
        $this->ha_communication = htmlspecialchars(strip_tags($this->ha_communication));
        $this->ha_inverter = htmlspecialchars(strip_tags($this->ha_inverter));
        $this->ha_sensors = htmlspecialchars(strip_tags($this->ha_sensors));



        // Bind data
        $stmt-> bindParam(':name', $this->name);
        $stmt-> bindParam(':address', $this->address);
        $stmt-> bindParam(':latitude', $this->latitude);
        $stmt-> bindParam(':longitude', $this->longitude);
        $stmt-> bindParam(':operator', $this->operator);

        $stmt-> bindParam(':date', $this->date);
        $stmt-> bindParam(':description', $this->description);
        $stmt-> bindParam(':photo_path', $this->photo_path);
        $stmt-> bindParam(':ef_system_power', $this->ef_system_power);
        $stmt-> bindParam(':ef_annual_production', $this->ef_annual_production);
        $stmt-> bindParam(':ef_co2_avoided', $this->ef_co2_avoided);
        $stmt-> bindParam(':ef_reimbursement', $this->ef_reimbursement);
        $stmt-> bindParam(':ha_solar_panel', $this->ha_solar_panel);
        $stmt-> bindParam(':ha_azimuth_angle', $this->ha_azimuth_angle);
        $stmt-> bindParam(':ha_inclination_angle', $this->ha_inclination_angle);
        $stmt-> bindParam(':ha_communication', $this->ha_communication);
        $stmt-> bindParam(':ha_inverter', $this->ha_inverter);
        $stmt-> bindParam(':ha_sensors', $this->ha_sensors);


        // Execute query
        if($stmt->execute()) {
            return true;
        }

        // Print error if something goes wrong
      //  printf("Error: $s.\n", $stmt->error);

        return false;
    }

    // Update general
    public function update() {
        // Create Query
        $query = 'UPDATE ' .
            $this->table . '
    SET
      name = :name,address=:address,latitude=:latitude,longitude = :longitude,
      operator=:operator,date=:date,description=:description,photo_path=:photo_path
      ,ef_system_power=:ef_system_power,ef_annual_production=:ef_annual_production,
     ef_co2_avoided=:ef_co2_avoided, ef_reimbursement=:ef_reimbursement,ha_solar_panel=:ha_solar_panel,
     ha_azimuth_angle=:ha_azimuth_angle,ha_inclination_angle=:ha_inclination_angle,ha_communication=:ha_communication
     ,ha_inverter=:ha_inverter,ha_sensors=:ha_sensors
      WHERE
       latitude=:latitude';

        // Prepare Statement
        $stmt = $this->conn->prepare($query);

        // Clean data
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->address = htmlspecialchars(strip_tags($this->address));
        $this->latitude = htmlspecialchars(strip_tags($this->latitude));
        $this->longitude = htmlspecialchars(strip_tags($this->longitude));
//        $this->old_latitude = htmlspecialchars(strip_tags($this->old_latitude));
//        $this->old_longitude = htmlspecialchars(strip_tags($this->old_longitude));
        $this->operator = htmlspecialchars(strip_tags($this->operator));
        $this->date = htmlspecialchars(strip_tags($this->date));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->photo_path = htmlspecialchars(strip_tags($this->photo_path));
        $this->ef_system_power = htmlspecialchars(strip_tags($this->ef_system_power));
        $this->ef_annual_production = htmlspecialchars(strip_tags($this->ef_annual_production));
        $this->ef_co2_avoided = htmlspecialchars(strip_tags($this->ef_co2_avoided));
        $this->ef_reimbursement = htmlspecialchars(strip_tags($this->ef_reimbursement));
        $this->ha_solar_panel = htmlspecialchars(strip_tags($this->ha_solar_panel));
        $this->ha_azimuth_angle = htmlspecialchars(strip_tags($this->ha_azimuth_angle));
        $this->ha_inclination_angle = htmlspecialchars(strip_tags($this->ha_inclination_angle));
        $this->ha_communication = htmlspecialchars(strip_tags($this->ha_communication));
        $this->ha_inverter = htmlspecialchars(strip_tags($this->ha_inverter));
        $this->ha_sensors = htmlspecialchars(strip_tags($this->ha_sensors));





        // Bind data
        $stmt-> bindParam(':name', $this->name);
        $stmt-> bindParam(':address', $this->address);
        $stmt-> bindParam(':latitude', $this->latitude);
        $stmt-> bindParam(':longitude', $this->longitude);
//        $stmt-> bindParam(':old_latitude', $this->old_latitude);
//        $stmt-> bindParam(':old_longitude', $this->old_longitude);
        $stmt-> bindParam(':operator', $this->operator);

        $stmt-> bindParam(':date', $this->date);
        $stmt-> bindParam(':description', $this->description);
        $stmt-> bindParam(':photo_path', $this->photo_path);
        $stmt-> bindParam(':ef_system_power', $this->ef_system_power);
        $stmt-> bindParam(':ef_annual_production', $this->ef_annual_production);
        $stmt-> bindParam(':ef_co2_avoided', $this->ef_co2_avoided);
        $stmt-> bindParam(':ef_reimbursement', $this->ef_reimbursement);
        $stmt-> bindParam(':ha_solar_panel', $this->ha_solar_panel);
        $stmt-> bindParam(':ha_azimuth_angle', $this->ha_azimuth_angle);
        $stmt-> bindParam(':ha_inclination_angle', $this->ha_inclination_angle);
        $stmt-> bindParam(':ha_communication', $this->ha_communication);
        $stmt-> bindParam(':ha_inverter', $this->ha_inverter);
        $stmt-> bindParam(':ha_sensors', $this->ha_sensors);

        // Execute query
        if($stmt->execute()) {
            return true;
        }

        // Print error if something goes wrong
      //  printf("Error: $s.\n", $stmt->error);

        return false;
    }

    // Delete Category
    public function delete() {
        // Create query
        $query = 'DELETE FROM ' . $this->table . ' WHERE latitude =:latitude AND longitude=:longitude';

        // Prepare Statement
        $stmt = $this->conn->prepare($query);

        // clean data
        $this->latitude = htmlspecialchars(strip_tags($this->latitude));
        $this->longitude = htmlspecialchars(strip_tags($this->longitude));

        // Bind Data
        $stmt-> bindParam(':latitude', $this->latitude);
        $stmt-> bindParam(':longitude', $this->longitude);

        // Execute query
        if($stmt->execute()) {
            return true;
        }

        // Print error if something goes wrong
       // printf("Error: $s.\n", $stmt->error);

        return false;
    }
}
