<?php
date_default_timezone_set('africa/casablanca');

 class Database {
  public $db;
  public function getConnection()
  {
  $this->db = null;
  try
   {
    $this->db = new mysqli('localhost','root','','dental_clinic');
   } catch(Exception $e) {

   echo "Database could not be connected: " . $e->getMessage();

   }
   
    return $this->db;
  }
  }
?>