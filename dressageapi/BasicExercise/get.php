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
include_once '../objects/BasicExercise.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$basicExercise = new BasicExercise($db);

// query products
$stmt = $basicExercise->get();
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){

    // products array
    $basicExercise__arr=array();
    $basicExercise__arr["records"]=array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        extract($row);

        $basicExercise__item=array(
            "basicExerciseId" => $basicExerciseId,
            "name" => $name,
            "pointId1" => $pointId1,
            "pointId2" => $pointId2,
            "duration" => $duration
        );

        array_push($basicExercise__arr["records"], $basicExercise__item);
    }

    echo json_encode($basicExercise__arr);
}

else{
    echo json_encode(
        array("message" => "No basic exercises found.")
    );
}
