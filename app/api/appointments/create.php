<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once '../../config/database.php';
include_once '../../models/appointments.php';

$database = new Database();
$db = $database->getConnection();
$appointment = new appointment($db);

if(isset($_GET['topic']) && !empty($_GET['topic']) && isset($_GET['date_appointment']) && !empty($_GET['date_appointment']) && isset($_GET['start_appointment']) && !empty($_GET['start_appointment']) && isset($_GET['end_appointment']) && !empty($_GET['end_appointment']) && isset($_GET['key_user']) && !empty($_GET['key_user'])) {
 $appointment->topic = $_GET['topic'];
 $appointment->date_appointment = $_GET['date_appointment'];
 $appointment->start_appointment = $_GET['start_appointment'];
 $appointment->end_appointment = $_GET['end_appointment'];
 $appointment->key_user = $_GET['key_user'];
} else {
 echo json_encode('enter : topic, start_appointment, end_appointment, key_user');
}
 



if($appointment->createAppointment()){
echo json_encode('appointment created successfully');
} else{
echo json_encode('appointment could not be created');
}
?>