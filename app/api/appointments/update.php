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




$appointment->id = isset($_GET['id']) ? $_GET['id'] : die('please entre the id');


if(!empty($_GET['topic']) && !empty($_GET['date_appointment']) && !empty($_GET['start_appointment']) && !empty($_GET['end_appointment'])) {

 $appointment->topic = $_GET['topic'];
 $appointment->date_appointment = $_GET['date_appointment'];
 $appointment->start_appointment = $_GET['start_appointment'];
 $appointment->end_appointment = $_GET['end_appointment'];
 $appointment->id = $_GET['id'];

} else {
 echo'enter topic, date_appointment, start_appointment, end_appointment';
}

 




if($appointment->updateAppointment()){
echo json_encode("appointment updated.");
} else{
echo json_encode("appointment couldn't update");
}
?>