<?php

$DOCUMENT_HTTP = "http".(isset($_SERVER['HTTPS'])&&$_SERVER['HTTPS']!="off"?"s":"")."://".$_SERVER["SERVER_NAME"];
$DOCUMENT_ROOT = $_SERVER["DOCUMENT_ROOT"];

$result = [];
if(
    !isset($_POST['temporada'])
){
    $result['error']=true;
    $result['error_l']=__LINE__;
    $result['error_info']="Bad post request";
    exit(json_encode($result));
}else{
    // $conexion
    include($DOCUMENT_ROOT."/back_end/cnn/cnn.php");
    $conexion = conectar();

    $temporada_fecha= json_decode($_POST['temporada'],true);

    $sql = "SELECT id ";
    $sql .= "FROM temporadas ";
    $sql .= "WHERE temporada_fecha = '".$temporada_fecha."'";
    try {

        $query = $conexion->prepare($sql);
        $query->execute();
        $res_temporada_fecha = $query->fetch(PDO::FETCH_ASSOC);
        $result = $res_temporada_fecha["id"];
    } catch (Exception $e) {
        $result['error_info']=preg_replace('/[\x00-\x1F\x7F-\xFF]/', '',$e->getMessage());
        $result['error']=true;
        $result['error_l']=__LINE__;
        exit(json_encode($result,JSON_PARTIAL_OUTPUT_ON_ERROR));
    }

    echo json_encode($result,JSON_PARTIAL_OUTPUT_ON_ERROR);
}

 ?>
