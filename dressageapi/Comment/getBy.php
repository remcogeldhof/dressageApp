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
include_once '../objects/Comment.php';
include_once '../objects/User.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$comment = new Comment($db);
$user = new User($db);

$comment->testId = isset($_GET['testId']) ? $_GET['testId'] : die();

// query products
$stmt = $comment->getBy($comment->testId);
$num = $stmt->rowCount();

// check if more than 0 record found


if($num>0){

    // products array
    $arr =array();
    $arr["records"]=array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);

        $stmt2 = $user->getUserById($userId);
        $num2 = $stmt2->rowCount();

        if($num2>0){
            while ($row2 = $stmt2->fetch(PDO::FETCH_ASSOC)) {
                extract($row2);
            }
        }

        $item=array(
            "commentId" => $commentId,
            "testId" => $testId,
            "userId" => $userId,
            "firstname" => $firstname,
            "lastname" => $lastname,
            "comment" => $comment,
            "date" => $date

        );

        array_push($arr["records"], $item);
    }

    echo json_encode($arr);
}

else{
    echo json_encode(
        array("message" => "No comments found.")
    );
}


/*// set ID property of product to be edited
$comment->proefId = isset($_GET['proefId']) ? $_GET['proefId'] : die();

// read the details of product to be edited
$comment->getBy();

$comment_arr = array(
"commentId" => $comment->commentId,
"proefId" => $comment->proefId,
"userId" => $comment->userId,
"comment" => $comment->comment,
);

// make it json format
print_r(json_encode($comment_arr));
*/