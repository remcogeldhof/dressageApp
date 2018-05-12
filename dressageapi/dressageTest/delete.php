<?php
/**
 * Created by PhpStorm.
 * User: Remco
 * Date: 2/04/2018
 * Time: 18:01
 */

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


// include database and object file
include_once '../config/Database.php';
include_once '../objects/DressageTest.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare product object
$dressageTest = new DressageTest($db);

// get product id
$data = json_decode(file_get_contents("php://input"));
$dressageTest->testId  = isset($_GET['id']) ? $_GET['id'] : die();


// set product id to be deleted
//$dressageTest->proefId = $data->id;

// delete the product
if($dressageTest->delete()){
    echo '{';
    echo '"message": "Test was deleted."';
    echo '}';
}

// if unable to delete the product
else{
    echo '{';
    echo '"message": "Unable to delete test."';
    echo '}';
}
?>