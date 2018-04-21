<?php
/**
 * Created by PhpStorm.
 * User: Remco
 * Date: 31/03/2018
 * Time: 14:18
 */

class Login
{
    private $conn;

    // object properties
    public $loginId;
    public $mail;
    public $password;
    public $token;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    function checkToken($login){
        $query = "SELECT token, loginId  FROM Login WHERE mail='$login->mail' AND password='$login->password'";

        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }

    function create()
    {

        // query to insert record
        $query = "INSERT INTO Login(loginId, mail, password, token) Values (:loginId, :mail, :password, :token)";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->loginId = htmlspecialchars(strip_tags($this->loginId));
        $this->mail = htmlspecialchars(strip_tags($this->mail));
        $this->password = htmlspecialchars(strip_tags($this->password));
        $this->token = htmlspecialchars(strip_tags($this->token));

        // bind values
        $stmt->bindParam(":loginId", $this->loginId);
        $stmt->bindParam(":mail", $this->mail);
        $stmt->bindParam(":password", $this->password);
        $stmt->bindParam(":token", $this->token);

        // execute query
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}