<?php
/**
 * Created by PhpStorm.
 * User: Remco
 * Date: 31/05/2018
 * Time: 14:36
 */

class Circle
{
    private $conn;

    // object properties
    public $circleId;
    public $direction;
    public $radius;
    public $height;
    public $hand;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    function get(){
        // select all query
        $query = "SELECT * from Circle";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }
}