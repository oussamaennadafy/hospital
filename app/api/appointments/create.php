<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// header("Access-Control-Allow-Methods: POST");
// header("Access-Control-Max-age: 3600");
// header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once '../../config/database.php';
include_once '../../models/appointments.php';

$database = new Database();
$db = $database->getConnection();
$appointment = new appointment($db);

if(!empty($_POST['topic']) && !empty($_POST['date_appointment']) && !empty($_POST['start_appointment']) && !empty($_POST['end_appointment']) && $_POST['key_user'])

  $appointment->topic = $_POST['topic'];
  $appointment->date_appointment = $_POST['date_appointment'];
  $appointment->start_appointment = $_POST['start_appointment'];
  $appointment->end_appointment = $_POST['end_appointment'];
  $appointment->end_appointment = $_POST['key_user'];


if($appointment->createAppointment()){
// create array
$appointment_arr = array(
 "topic" => $appointment->topic,
 "date_appointment" => $appointment->date_appointment,
 "start_appointment" => $appointment->start_appointment,
 "end_appointment" => $appointment->end_appointment,
 "key_user" => $appointment->key_user
 );
 echo json_encode($appointment_arr);
} else{
 echo json_encode('error');
}
?>