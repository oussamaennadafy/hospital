<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// header("Access-Control-Allow-Methods: POST");
// header("Access-Control-Max-Age: 3600");
// header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../config/database.php';
include_once '../../models/users.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$user->key_special = isset($_POST['key_special']) ? $_POST['key_special'] : die('please entre the key_special');

$user->getSingleuser();

if($db->affected_rows > 0){

// create array
$emp_arr = array(
"key_special" => $user->key_special,
"first_name" => $user->first_name,
"last_name" => $user->last_name,
"age" => $user->age,
"birth" => $user->birth
);

http_response_code(200);
echo'we found the user : ';
echo json_encode($emp_arr);
}
else{
http_response_code(404);
echo json_encode("user not found");
}
?>