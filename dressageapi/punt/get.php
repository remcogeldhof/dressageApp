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
include_once '../objects/Punt.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$punt = new Punt($db);

// query products
$stmt = $punt->get();
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){

    // products array
    $punt_arr=array();
    $punt_arr["records"]=array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        extract($row);

        $punt_item=array(
            "puntId" => $puntId,
            "naam" => $naam,
            "posLeft" => $posLeft,
            "posTop" => $posTop
        );

        array_push($punt_arr["records"], $punt_item);
    }

    echo json_encode($punt_arr);
}

else{
    echo json_encode(
        array("message" => "No points found.")
    );
}