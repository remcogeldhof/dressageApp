<?php
/**
 * Created by PhpStorm.
 * User: Remco
 * Date: 31/03/2018
 * Time: 14:18
 */

class Point
{
    private $conn;

    // object properties
    public $pointId;
    public $name;
    public $posLeft;
    public $posTop;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    function get(){
        // select all query
        $query = "SELECT * from Point";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }
}