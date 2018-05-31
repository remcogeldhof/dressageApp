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
include_once '../objects/Circle.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$circle = new Circle($db);

// query products
$stmt = $circle->get();
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){

    // products array
    $circle_arr=array();
    $circle_arr["records"]=array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        extract($row);

        $circle_item=array(
            "circleId" => $circleId,
            "direction" => $direction,
            "radius" => $radius,
            "height" => $height,
            "hand" => $hand

        );

        array_push($circle_arr["records"], $circle_item);
    }

    echo json_encode($circle_arr);
}

else{
    echo json_encode(
        array("message" => "No circles found.")
    );
}