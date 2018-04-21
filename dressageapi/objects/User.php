<?php
/**
 * Created by PhpStorm.
 * User: Remco
 * Date: 31/03/2018
 * Time: 14:18
 */

class User
{
    private $conn;

    // object properties
    public $userId;
    public $firstname;
    public $lastname;
    public $loginId;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    function getUserByLoginId($loginId){
        $query = "SELECT * from User p
            WHERE
                p.loginId = '$loginId'
            LIMIT
                0,1";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }

    function getBy(){
        // query to read single record
        $query = "SELECT * from User p
            WHERE
                p.userId = ?
            LIMIT
                0,1";

        // prepare query statement
        $stmt = $this->conn->prepare( $query );

        // bind id of product to be updated
        $stmt->bindParam(1, $this->id);

        // execute query
        $stmt->execute();

        // get retrieved row
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // set values to object properties
        $this->userId = $row['userId'];
        $this->firstname = $row['firstname'];
        $this->lastname = $row['lastname'];
        $this->loginId = $row['loginId'];
    }

    function create()
    {
        // query to insert record
        $query = "INSERT INTO User(userId, firstname, lastname, loginId) Values (:userId, :firstname, :lastname, :loginId)";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->userId = htmlspecialchars(strip_tags($this->userId));
        $this->firstname = htmlspecialchars(strip_tags($this->firstname));
        $this->lastname = htmlspecialchars(strip_tags($this->lastname));
        $this->loginId = htmlspecialchars(strip_tags($this->loginId));

        // bind values
        $stmt->bindParam(":userId", $this->userId);
        $stmt->bindParam(":firstname", $this->firstname);
        $stmt->bindParam(":lastname", $this->lastname);
        $stmt->bindParam(":loginId", $this->loginId);

        // execute query
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}