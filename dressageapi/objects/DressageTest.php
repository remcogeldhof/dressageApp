<?php
/**
 * Created by PhpStorm.
 * User: Remco
 * Date: 31/03/2018
 * Time: 13:59
 */

class DressageTest
{
    // database connection and table name
    private $conn;

    // object properties
    public $testId;
    public $discipline;
    public $country;
    public $federation;
    public $testClass;
    public $name;
    public $userId;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    // read products
    function get(){

        // select all query
        $query = "SELECT * from DressageTest";

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
        $query = "INSERT INTO DressageTest(testId, discipline, country, federation, testClass, name, userId) Values (:testId, :discipline, :country, :federation, :testClass, :name, :userId)";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->testId = htmlspecialchars(strip_tags($this->testId));
        $this->discipline = htmlspecialchars(strip_tags($this->discipline));
        $this->country = htmlspecialchars(strip_tags($this->country));
        $this->federation = htmlspecialchars(strip_tags($this->federation));
        $this->testClass = htmlspecialchars(strip_tags($this->testClass));
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->userId = htmlspecialchars(strip_tags($this->userId));

        // bind values
        $stmt->bindParam(":testId", $this->testId);
        $stmt->bindParam(":discipline", $this->discipline);
        $stmt->bindParam(":country", $this->country);
        $stmt->bindParam(":federation", $this->federation);
        $stmt->bindParam(":testClass", $this->testClass);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":userId", $this->userId);

        // execute query
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
// delete the product
    function delete(){

        // delete query
        $query = "DELETE FROM DressageTest WHERE testId = ?";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->testId=htmlspecialchars(strip_tags($this->testId));

        // bind id of record to delete
        $stmt->bindParam(1, $this->testId);

        // execute query
        if($stmt->execute()){
            return true;
        }
        return false;
    }

}
