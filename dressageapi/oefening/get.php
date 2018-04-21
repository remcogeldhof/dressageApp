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
include_once '../objects/Oefening.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$oefening = new Oefening($db);

// query products
$stmt = $oefening->get();
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){

    // products array
    $oefening_arr=array();
    $oefening_arr["records"]=array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        extract($row);

        $oefening_item=array(
            "oefeningId" => $oefeningId,
            "oefeningBasisId" => $oefeningBasisId,
            "proefId" => $proefId,
            "beschrijving" => $beschrijving,
            "gang" => $gang,
            "reeksNummer" => $reeksNummer
        );

        array_push($oefening_arr["records"], $oefening_item);
    }

    echo json_encode($oefening_arr);
}

else{
    echo json_encode(
        array("message" => "No exercises found.")
    );
}
