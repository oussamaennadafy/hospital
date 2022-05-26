<?php
header("Access-Control-Allow-Origin: *");
// header("Content-Type: application/json; charset=UTF-8");
// header("Access-Control-Allow-Methods: POST");
// header("Access-Control-Max-age: 3600");
// header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once '../../config/database.php';
include_once '../../models/appointments.php';

$database = new Database();
$db = $database->getConnection();
$appointment = new appointment($db);


// echo json_encode([$_POST['topic'],$_POST['date_appointment'],$_POST['time_appointment'],$_POST['key_user']]);

if($_GET['date_appointment'] >= date('Y-m-d')) {
  if($_GET['date_appointment'] != date('Y-m-d')) {
  //fill appointment object
  $appointment->topic = $_GET['topic'];
  $appointment->time_appointment = $_GET['time_appointment'];
  $appointment->date_appointment = $_GET['date_appointment'];
  $appointment->key_user = $_GET['key_user'];
  //craeteAppintment
  echo json_encode($appointment->createAppointment()); 
  } else {
    if(explode('-',$_GET['time_appointment'])[0] <= date('H:i')) {
      echo json_encode('invalid_time');
    }
  }
} else {
 echo json_encode(['invalid_date']);
}



// if($appointment->createAppointment()){
// // create array
// $appointment_arr = array(
//  "topic" => $appointment->topic,
//  "date_appointment" => $appointment->date_appointment,
//  "start_appointment" => $appointment->start_appointment,
//  "end_appointment" => $appointment->end_appointment,
//  "key_user" => $appointment->key_user
//  );
// }
?>