<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// header("Access-Control-Allow-Methods: POST");
// header("Access-Control-Max-Age: 3600");
// header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once '../../config/database.php';
include_once '../../models/appointments.php';

$database = new Database();
$db = $database->getConnection();

$appointment = new appointment($db);
$appointment->id = isset($_POST['id']) ? $_POST['id'] : die(json_encode('id_empty'));

$appointment->getSingleAppointment();

if($db->affected_rows > 0){

// create array
// print_r($appointment->arrAppointments);

// http_response_code(200);
echo json_encode($appointment->data);
} else{
// http_response_code(404);
echo json_encode("not found");
}
?>