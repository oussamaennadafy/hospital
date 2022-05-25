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





// if(!empty($_POST['topic']) && !empty($_POST['date_appointment']) && !empty($_POST['start_appointment']) && !empty($_POST['end_appointment'])) {

 $appointment->topic = $_POST['topic'];
 $appointment->date_appointment = $_POST['date_appointment'];
 $appointment->time_appointment = $_POST['time_appointment'];
 $appointment->id = $_POST['id'];

// } else {
//  echo'enter topic, date_appointment, start_appointment, end_appointment';
// }

echo json_encode($appointment->updateAppointment());




// if($appointment->updateAppointment()){
// echo json_encode("appointment updated.");
// } else{
// echo json_encode("appointment couldn't update");
// }
?>