<?php
/**
 * Created by PhpStorm.
 * User: Remco
 * Date: 31/03/2018
 * Time: 14:19
 */

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// get database connection
include_once '../config/database.php';

// instantiate product object
include_once '../objects/User.php';
include_once '../objects/Login.php';
include_once '../config/IdGenerator.php';

//generate id
$loginId = IdGenerator::generateId();

$genUserId = openssl_random_pseudo_bytes(25);
$genUserId = bin2hex($genUserId);

$database = new Database();
$db = $database->getConnection();

$user = new User($db);
$login = new Login($db);
// get posted data
$data = json_decode(file_get_contents("php://input"));

// set product property values
$user->userId = IdGenerator::generateId();
$user->firstname = $data->firstname;
$user->lastname = $data->lastname;
$user->loginId = $loginId;

$login->loginId = $loginId;
$login->mail = $data->mail;
$login->password = $data->password;
$login->token = IdGenerator::generateId();

// create the product
if($login->create()){

    if($user->create()){
        echo '{';
        echo '"message": "login & user created"';
        echo '}';
    }else{
        echo '{';
        echo '"message": "unable to create user"';
        echo '}';
    }
}
else{
    echo '{';
    echo '"message": "unable to create login & user"';
    echo '}';
}