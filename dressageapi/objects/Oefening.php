<?php
/**
 * Created by PhpStorm.
 * User: Remco
 * Date: 31/03/2018
 * Time: 14:17
 */

class Oefening
{
    private $conn;

    // object properties
    public $oefeningId;
    public $oefeningBasisId;
    public $proefId;
    public $beschrijving;
    public $gang;
    public $reeksNummer;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    function get(){
        // select all query
        $query = "SELECT * from Oefening";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }

    function create()
    {
        // query to insert record
        $query = "INSERT INTO Oefening(oefeningId,oefeningBasisId,proefId,beschrijving,gang,reeksNummer) Values (:oefeningId, :oefeningBasisId, :proefId, :beschrijving,:gang, :reeksNummer)";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->oefeningId = htmlspecialchars(strip_tags($this->oefeningId));
        $this->oefeningBasisId = htmlspecialchars(strip_tags($this->oefeningBasisId));
        $this->proefId = htmlspecialchars(strip_tags($this->proefId));
        $this->beschrijving = htmlspecialchars(strip_tags($this->beschrijving));
        $this->gang = htmlspecialchars(strip_tags($this->gang));
        $this->reeksNummer = htmlspecialchars(strip_tags($this->reeksNummer));


        // bind values
        $stmt->bindParam(":oefeningId", $this->oefeningId);
        $stmt->bindParam(":oefeningBasisId", $this->oefeningBasisId);
        $stmt->bindParam(":proefId", $this->proefId);
        $stmt->bindParam(":beschrijving", $this->beschrijving);
        $stmt->bindParam(":gang", $this->gang);
        $stmt->bindParam(":reeksNummer", $this->reeksNummer);


        // execute query
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

}