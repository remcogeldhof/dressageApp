<?php
/**
 * Created by PhpStorm.
 * User: Remco
 * Date: 31/03/2018
 * Time: 14:17
 */

class BasicExercise
{
    private $conn;

    // object properties
    public $basicExerciseId;
    public $name;
    public $pointId1;
    public $pointId2;
    public $duration;
    public $circleId;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    function get(){
        // select all query
        $query = "SELECT * from BasicExercise";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }
}