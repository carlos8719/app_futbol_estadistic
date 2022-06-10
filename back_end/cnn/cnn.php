<?php

function conectar(){
    /*conexion*/
    try {
        $conexion = new PDO("mysql:host=localhost;dbname=app_apuestas", "root", "");
        $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        // echo "Conexión realizada Satisfactoriamente";
    } catch(PDOException $e){
        echo "La conexión ha fallado: " . $e->getMessage();
    }
    return $conexion;
}


?>
