<?php

$user = "";
$password ="";
if(isset($_POST['user'])){
    $user = $_POST['user'];
}
if(isset($_POST['password'])){
    $password = $_POST['password'];
}

//conexion
include $_SERVER['DOCUMENT_ROOT'].'/app_apuestas/back_end/cnn/cnn.php';
$conexion = conectar();

$sql = "SELECT* FROM users WHERE user = '".$user."' AND password = '".$password. "' AND fecha_baja IS NULL";
$query = $conexion->prepare($sql);
$query->execute();
$res_login = $query->fetchAll(PDO::FETCH_ASSOC);
var_dump($res_login);
?>
