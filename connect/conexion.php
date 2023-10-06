<?php

$servidor = "localhost"; 
$usuario = "root"; 
$password = "";
$db = "log_in";

$conexion = mysqli_connect($servidor,$usuario,$password,$db) 
or die(mysqli_error());

?>