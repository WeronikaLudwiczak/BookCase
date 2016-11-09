<?php

require_once 'dbconfig.php';

$conn = new mysqli($host, $user, $password, $dbName);
    if ($conn->connect_error == False) {
        return $conn;
        
       
    
    }else {
         die('Unable to connect to database: ' . $conn->connect_error);
    
}