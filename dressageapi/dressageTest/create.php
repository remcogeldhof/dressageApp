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
include_once '../objects/DressageTest.php';
include_once '../config/IdGenerator.php';

$database = new Database();
$db = $database->getConnection();

$dressageTest = new DressageTest($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// set product property values
$dressageTest->testId = IdGenerator::generateId();
$dressageTest->discipline = $data->discipline;
$dressageTest->country = $data->country;
$dressageTest->federation = $data->federation;
$dressageTest->testClass = $data->testClass;
$dressageTest->name = $data->name;

// create the product
if($dressageTest->create()){
    echo '{';
    echo '"message": "DressageTest was created."';
    echo '}';
}

// if unable to create the product, tell the user
else{
    echo '{';
    echo '"message": "Unable to create dressageTest."';
    echo '}';
}