<?php
/**
 * Created by PhpStorm.
 * User: Remco
 * Date: 31/03/2018
 * Time: 14:18
 */

class Comment
{
    private $conn;

    // object properties
    public $commentId;
    public $proefId;
    public $userId;
    public $comment;

    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    function getBy(){
        // query to read single record
        $query = "SELECT * from Comment p
            WHERE
                p.proefId = ?";

        // prepare query statement
        $stmt = $this->conn->prepare( $query );

        // bind id of product to be updated
        $stmt->bindParam(1, $this->proefId);

        // execute query
        $stmt->execute();

        // get retrieved row
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // set values to object properties
        $this->commentId = $row['commentId'];
        $this->proefId = $row['proefId'];
        $this->userId = $row['userId'];
        $this->comment = $row['comment'];
    }

    function create()
    {
        // query to insert record
        $query = "INSERT INTO Comment(commentId, proefId, userId, comment) Values (:commentId, :proefId, :userId, :comment)";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->commentId = htmlspecialchars(strip_tags($this->commentId));
        $this->proefId = htmlspecialchars(strip_tags($this->proefId));
        $this->userId = htmlspecialchars(strip_tags($this->userId));
        $this->comment = htmlspecialchars(strip_tags($this->comment));

        // bind values
        $stmt->bindParam(":commentId", $this->commentId);
        $stmt->bindParam(":proefId", $this->proefId);
        $stmt->bindParam(":userId", $this->userId);
        $stmt->bindParam(":comment", $this->comment);

        // execute query
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}