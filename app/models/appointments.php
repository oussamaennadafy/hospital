<?php

class appointment{
 
// db connection
private $db;
// Table
private $db_table = "appointment";
// Columns
public $id;
public $topic;
public $date_appointment;
public $start_appointment;
public $end_appointment;
public $key_user;
public $result;

//////////
public $data;

// Db dbection
public function __construct($db){
$this->db = $db;
}

// GET ALL
public function getAppointments(){
$sqlQuery = "SELECT topic, date_appointment, time_appointment, key_user FROM " . $this->db_table . "";
$this->result = $this->db->query($sqlQuery);
return $this->result;
}

// CREATE
public function createAppointment(){
 // sanitize
 $this->topic=htmlspecialchars($this->topic);
 $this->date_appointment=htmlspecialchars($this->date_appointment);
 $this->time_appointment=htmlspecialchars($this->time_appointment);
 $this->key_user=htmlspecialchars($this->key_user);

 $sqlQuery = "SELECT `id` FROM `appointment` WHERE `date_appointment` = '".$this->date_appointment."' AND
`time_appointment` = '".$this->time_appointment."'";
 $record = $this->db->query($sqlQuery);
 $this->data=$record->fetch_all();

 if($this->db->affected_rows > 0){
  return "appointment exist";
  } else {

   $sqlQuery = "INSERT INTO
   ". $this->db_table ." SET 
   topic = '".$this->topic."',
   date_appointment = '".$this->date_appointment."',
   time_appointment = '".$this->time_appointment."',
   key_user = '".$this->key_user."'";
   $this->db->query($sqlQuery);
   return "appointment created";
  }
  
 }


// read One
public function getSingleAppointment(){

$sqlQuery = "SELECT * FROM
". $this->db_table ." WHERE key_user = ".$this->key_user;

$record = $this->db->query($sqlQuery);
$this->data=$record->fetch_all();
}

// read One
public function AppointmentExist(){

$sqlQuery = "SELECT `id` FROM". $this->db_table ." WHERE date_appointment = ".$this->date_appointment ."And start_appointment = " .$this->start_appointment;

$record = $this->db->query($sqlQuery);
$this->data=$record->fetch_all();

 if($this->db->affected_rows > 0){
  return true;
 }
 return false;
}

// read One
public function getSingleAppointmentById(){

$sqlQuery = "SELECT `id`, `topic`, `date_appointment`, `time_appointment`FROM
". $this->db_table ." WHERE id = ".$this->id;

$record = $this->db->query($sqlQuery);
$this->data=$record->fetch_all();


if($this->db->affected_rows > 0){

 return $this->data[0];

 }
}

// UPDATE
public function updateAppointment(){

$this->topic=htmlspecialchars(strip_tags($this->topic));
$this->date_appointment=htmlspecialchars(strip_tags($this->date_appointment));
$this->start_appointment=htmlspecialchars(strip_tags($this->start_appointment));
$this->end_appointment=htmlspecialchars(strip_tags($this->end_appointment));

$sqlQuery = "SELECT `id` FROM `appointment` WHERE `date_appointment` = '".$this->date_appointment."' AND `start_appointment` = '".$this->start_appointment."' AND `end_appointment` = '".$this->end_appointment."'";
$record = $this->db->query($sqlQuery);
$this->data=$record->fetch_all();

if($this->db->affected_rows > 0){
 return "appointment exist";
 } else {


 $sqlQuery = "UPDATE ". $this->db_table ." SET
 topic = '".$this->topic."', 
 date_appointment = '".$this->date_appointment."',
 start_appointment = '".$this->start_appointment."',
 end_appointment = '".$this->end_appointment."'
 WHERE id = '".$this->id."' ";

 $this->db->query($sqlQuery);
 return "appointment created";
}

}

// DELETE
function deleteAppointment(){

 $sqlQuery = "DELETE FROM " . $this->db_table . " WHERE id = ".$this->id;
 $this->db->query($sqlQuery);

 if($this->db->affected_rows > 0){
 return true;
 }
 return false;
 }
}
?>