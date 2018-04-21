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
include_once '../objects/OefeningBasis.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$basisOefening = new OefeningBasis($db);

// query products
$stmt = $basisOefening->get();
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){

    // products array
    $basisOefening_arr=array();
    $basisOefening_arr["records"]=array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        extract($row);

        $basisOefening_item=array(
            "oefeningBasisId" => $oefeningBasisId,
            "naam" => $naam,
            "puntId1" => $puntId1,
            "puntId2" => $puntId2,
            "duur" => $duur,
            "cirkelId" => $cirkelId
        );

        array_push($basisOefening_arr["records"], $basisOefening_item);
    }

    echo json_encode($basisOefening_arr);
}

else{
    echo json_encode(
        array("message" => "No basic exercises found.")
    );
}
