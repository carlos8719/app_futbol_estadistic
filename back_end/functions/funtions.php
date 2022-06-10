<?php


function arreglar_fecha($fecha){
    $fecha = date('o').'-'.date('m').'-'.$fecha[0].$fecha[1].' 00:00:00';
    return $fecha;
}

function calcular_apuestas($obj_partido){
    // 0.5
    // 1.5
    // 2.5
    // resultado final signo
    // resultado descanso signo
    // ambos marcan
}


function codigo($largo){
    $caracteres = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    $result ="";
    for ($i=$largo; $i>0 ; $i--) {
        $a= rand(0, (strlen($caracteres)-1) );
        $result.= substr($caracteres,$a,1);
    }
    return $result;
}
 ?>
