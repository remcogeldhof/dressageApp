<?php
/**
 * Created by PhpStorm.
 * User: Remco
 * Date: 31/03/2018
 * Time: 14:01
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/DressageTest.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$dressageTest = new DressageTest($db);

// query products
$stmt = $dressageTest->get();
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){

    // products array
    $proef_arr=array();
    $proef_arr["records"]=array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        extract($row);

        $proef_item=array(
            "testId" => $testId,
            "discipline" => discipline,
            "country" => $country,
            "federation" => $federation,
            "testClass" => $testClass,
            "name" => $name
        );

        array_push($proef_arr["records"], $proef_item);
    }

    echo json_encode($proef_arr);
}

else{
    echo json_encode(
        array("message" => "No tests found.")
    );
}
