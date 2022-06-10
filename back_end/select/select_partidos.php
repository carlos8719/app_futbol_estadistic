<?php

/*
    back_end/select/select_partidos.php
*/

$result=[];
// COMPROBAR EL POST
if(
    !isset($_POST['partidos'])
){
    $result['error']=true;
    $result['error_info']='Minimun POST required.';
    exit(json_encode($result,JSON_PARTIAL_OUTPUT_ON_ERROR));
}

// error_reporting(0);

include $_SERVER['DOCUMENT_ROOT'].'/app_apuestas/back_end/functions/funtions.php';

$conexion = conectar();
$partidos=json_decode($_POST["partidos"], true);



// select listados de partidos entre fechas
$sql= 'SELECT * ';
$sql.='from datos_01_partidos_01_datos ';
$sql.='WHERE fecha_partido = "'.$fecha_partido.'"';
try {
    $query = $conexion->prepare($sql);
    $query->execute();
    $res_partidos = $query->fetchAll(PDO::FETCH_ASSOC);

    //devolver obj en un array
    $result["lista_partidos"]=[];
    foreach ($res_partidos as $key => $value){
        array_push($result["lista_partidos"],$value);
    }
} catch (Exception $e) {
    $result['error_info']=preg_replace('/[\x00-\x1F\x7F-\xFF]/', '',$e->getMessage());
    $result['error']=true;
    $result['error_l']=__LINE__;
    exit(json_encode($result,JSON_PARTIAL_OUTPUT_ON_ERROR));
}

echo json_encode($result,JSON_PARTIAL_OUTPUT_ON_ERROR);




















?>
