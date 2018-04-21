<?php
/**
 * Created by PhpStorm.
 * User: Remco
 * Date: 31/03/2018
 * Time: 13:59
 */

class Proef
{
    // database connection and table name
    private $conn;

    // object properties
    public $proefId;
    public $naam;
    public $reeks;
    public $federatie;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // read products
    function get(){

        // select all query
        $query = "SELECT * from Proef";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }

    // create product
    function create()
    {

        // query to insert record
        $query = "INSERT INTO Proef(proefId, naam, reeks, federatie) Values (:proefId, :naam, :reeks, :federatie)";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->proefId = htmlspecialchars(strip_tags($this->proefId));
        $this->naam = htmlspecialchars(strip_tags($this->naam));
        $this->reeks = htmlspecialchars(strip_tags($this->reeks));
        $this->federatie = htmlspecialchars(strip_tags($this->federatie));

        // bind values
        $stmt->bindParam(":proefId", $this->proefId);
        $stmt->bindParam(":naam", $this->naam);
        $stmt->bindParam(":reeks", $this->reeks);
        $stmt->bindParam(":federatie", $this->federatie);

        // execute query
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
// delete the product
    function delete(){

        // delete query
        $query = "DELETE FROM Proef WHERE proefId = ?";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->proefId=htmlspecialchars(strip_tags($this->proefId));

        // bind id of record to delete
        $stmt->bindParam(1, $this->proefId);

        // execute query
        if($stmt->execute()){
            return true;
        }
        return false;
    }

}
