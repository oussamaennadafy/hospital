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


 $appointment->topic = $_GET['topic'];
 $appointment->date_appointment = $_GET['date_appointment'];
 $appointment->start_appointment = $_GET['start_appointment'];
 $appointment->end_appointment = $_GET['end_appointment'];
 $appointment->key_user = $_GET['key_user'];
 



if($appointment->createAppointment()){
echo 'appointment created successfully ';
} else{
echo 'appointment could not be created ';
}
?>