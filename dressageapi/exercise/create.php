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
include_once '../objects/Exercise.php';
include_once '../config/IdGenerator.php';

$database = new Database();
$db = $database->getConnection();

$exercise = new Exercise($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// set product property values
$exercise->exerciseId = IdGenerator::generateId();
$exercise->basicExerciseId = $data->basicExerciseId;
$exercise->testId = $data->testId;
$exercise->description = $data->description;
$exercise->pace = $data->pace;
$exercise->serialNumber = $data->serialNumber;
$exercise->circleId = $data->circleId;

// create the product
if($exercise->create()){
    echo '{';
    echo '"message": "Exercise was created."';
    echo '}';
}

// if unable to create the product, tell the user
else{
    echo '{';
    echo '"message": "Unable to create exercise."';
    echo '}';
}