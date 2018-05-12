<?php
/**
 * Created by PhpStorm.
 * User: Remco
 * Date: 31/03/2018
 * Time: 14:17
 */

class Exercise
{
    private $conn;

    // object properties
    public $exerciseId;
    public $basicExerciseId;
    public $testId;
    public $description;
    public $pace;
    public $serialNumber;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    function get(){
        // select all query
        $query = "SELECT * from Exercise";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }

    function create()
    {
        // query to insert record
        $query = "INSERT INTO Exercise(exerciseId,basicExerciseId,testId,description,pace,serialNumber) Values (:exerciseId, :basicExerciseId, :testId, :description,:pace, :serialNumber)";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->exerciseId = htmlspecialchars(strip_tags($this->exerciseId));
        $this->basicExerciseId = htmlspecialchars(strip_tags($this->basicExerciseId));
        $this->testId = htmlspecialchars(strip_tags($this->testId));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->pace = htmlspecialchars(strip_tags($this->pace));
        $this->serialNumber = htmlspecialchars(strip_tags($this->serialNumber));

        // bind values
        $stmt->bindParam(":exerciseId", $this->exerciseId);
        $stmt->bindParam(":basicExerciseId", $this->basicExerciseId);
        $stmt->bindParam(":testId", $this->testId);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":pace", $this->pace);
        $stmt->bindParam(":serialNumber", $this->serialNumber);

        // execute query
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

}