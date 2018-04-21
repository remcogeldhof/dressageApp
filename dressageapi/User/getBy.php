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
include_once '../objects/User.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$user = new User($db);

// set ID property of product to be edited
$user->id = isset($_GET['id']) ? $_GET['id'] : die();

// read the details of product to be edited
$user->getBy();

$user_arr = array(
    "userId" => $user->userId,
    "firstname" => $user->firstname,
    "lastname" => $user->lastname,
    "loginId" => $user->loginId,
);

// make it json format
print_r(json_encode($user_arr));
?>

