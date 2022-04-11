<?php
 header("Access-Control-Allow-Origin: *");
 header("Content-Type: application/json; charset=UTF-8");
 
 include_once '../../config/database.php';
 include_once '../../models/appointments.php';

 $database = new Database();
 $db = $database->getConnection();

 $items = new appointment($db);

 $records = $items->getappointments();

 $itemCount = $records->num_rows;
 
 echo json_encode($itemCount);
 if($itemCount > 0){
  $appointmentArr = array();
  $appointmentArr["body"] = array();
  $appointmentArr["itemCount"] = $itemCount;
 while ($row = $records->fetch_assoc())
 {
  array_push($appointmentArr["body"], $row);
 }
 echo json_encode($appointmentArr);
 }
 else{
  http_response_code(404);
  echo json_encode(
  array("message" => "No record found.")
 );
 }
?>