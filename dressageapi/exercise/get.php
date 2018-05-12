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
include_once '../objects/Exercise.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$exercise = new Exercise($db);

// query products
$stmt = $exercise->get();
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){

    // products array
    $exercise_arr=array();
    $exercise_arr["records"]=array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        extract($row);

        $exercise_item=array(
            "exerciseId" => $exerciseId,
            "basicExerciseId" => $basicExerciseId,
            "testId" => $testId,
            "description" => $description,
            "pace" => $pace,
            "serialNumber" => $serialNumber
        );

        array_push($exercise_arr["records"], $exercise_item);
    }

    echo json_encode($exercise_arr);
}

else{
    echo json_encode(
        array("message" => "No exercises found.")
    );
}
