<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../config/database.php';
include_once '../../models/users.php';

$database = new Database();
$db = $database->getConnection();
$item = new User($db);


$item->key_special = isset($_GET['key_special']) ? $_GET['key_special'] : die('please entre the key_special');

if(!empty($_GET['first_name']) && !empty($_GET['last_name']) && !empty($_GET['age']) && !empty($_GET['birth']))
{
 
 $item->first_name = $_GET['first_name'];
 $item->last_name = $_GET['last_name'];
 $item->age = $_GET['age'];
 $item->birth = $_GET['birth'];

} else {
 echo'please enter first_name, last_name, age and birth';
}




if($item->updateuser()){
echo json_encode("user data updated.");
} else{
echo json_encode("Data could not be updated");
}
?>