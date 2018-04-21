<?php
/**
 * Created by PhpStorm.
 * User: Remco
 * Date: 31/03/2018
 * Time: 14:17
 */

class OefeningBasis
{
    private $conn;

    // object properties
    public $oefeningBasisId;
    public $naam;
    public $puntId1;
    public $puntId2;
    public $duur;
    public $cirkelId;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    function get(){
        // select all query
        $query = "SELECT * from OefeningBasis";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }
}