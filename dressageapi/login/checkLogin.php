<?php
/**
 * Created by PhpStorm.
 * User: Remco
 * Date: 31/03/2018
 * Time: 18:30
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object files
include_once '../config/Database.php';
include_once '../objects/Login.php';
include_once '../objects/User.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$login = new Login($db);
$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

$login->mail = $data->mail;
$login->password = $data->password;

$stmt = $login->checkToken($login);
$num = $stmt->rowCount();



// check if more than 0 record found
if($num>0) {

    // products array
    $punt_arr = array();
    $punt_arr["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);


        $stmt2 = $user->getUserByLoginId($loginId);
        $num2 = $stmt2->rowCount();

        if($num2>0){
            while ($row2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
                extract($row2);
                $user_item=array(
                    "userId" => $userId,
                    "firstname" => $firstname,
                    "lastname" => $lastname,
                    "loginId" => $loginId,
                    "token" => $token
                );

            }
        }

        array_push($punt_arr["records"], $user_item);

//        $item = array(
//            "token" => $token,
//        );

    //    array_push($punt_arr["records"], $item);
    }

    echo json_encode($punt_arr);


}else{
    echo json_encode(0);
}


