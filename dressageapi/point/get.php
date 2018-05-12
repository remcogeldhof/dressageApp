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
include_once '../objects/Point.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$point = new Point($db);

// query products
$stmt = $point->get();
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){

    // products array
    $point_arr=array();
    $point_arr["records"]=array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        extract($row);

        $point_item=array(
            "pointId" => $pointId,
            "name" => $name,
            "posLeft" => $posLeft,
            "posTop" => $posTop
        );

        array_push($point_arr["records"], $point_item);
    }

    echo json_encode($point_arr);
}

else{
    echo json_encode(
        array("message" => "No points found.")
    );
}