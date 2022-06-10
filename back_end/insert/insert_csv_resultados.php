<?php

$DOCUMENT_HTTP = "http".(isset($_SERVER['HTTPS'])&&$_SERVER['HTTPS']!="off"?"s":"")."://".$_SERVER["SERVER_NAME"];
$DOCUMENT_ROOT = $_SERVER["DOCUMENT_ROOT"];
$result = [];
if(
    !isset($_POST['csvResultados'])
){
    $result['error']=true;
    $result['error_l']=__LINE__;
    $result['error_info']="Bad post request";
    exit(json_encode($result));
}else{
    // $conexion
    include($DOCUMENT_ROOT."/back_end/cnn/cnn.php");
    $conexion = conectar();
    $resultados=json_decode($_POST["csvResultados"], true);
    $result['resultados']=[];
    foreach($resultados as $key => $value){
            $result['resultados'][$key]=[];
            foreach($value as $key2 => $value2){
                if($key2 === "FECHA"){
                    // var_dump("NULL");
                }else{
                    // var_dump("CACA");
                }

            }
            // temporada
            // liga
            // equipo local
            // equipo visitante
    }
    return json_encode($result);
}

 ?>
