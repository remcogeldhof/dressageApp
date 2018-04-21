<?php
/**
 * Created by PhpStorm.
 * User: Remco
 * Date: 31/03/2018
 * Time: 18:30
 */


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/Comment.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$comment = new Comment($db);

// set ID property of product to be edited
$comment->proefId = isset($_GET['proefId']) ? $_GET['proefId'] : die();

// read the details of product to be edited
$comment->getBy();

$comment_arr = array(
    "commentId" => $comment->commentId,
    "proefId" => $comment->proefId,
    "userId" => $comment->userId,
    "comment" => $comment->comment,
);

// make it json format
print_r(json_encode($comment_arr));
?>

