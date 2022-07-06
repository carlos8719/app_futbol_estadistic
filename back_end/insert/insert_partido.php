<?php
// error_reporting(0);
$DOCUMENT_HTTP = "http".(isset($_SERVER['HTTPS'])&&$_SERVER['HTTPS']!="off"?"s":"")."://".$_SERVER["SERVER_NAME"];
$DOCUMENT_ROOT = $_SERVER["DOCUMENT_ROOT"];

$result = [];



if(
    !isset($_POST["partidos"])
){
    $result['error']=true;
    $result['error_l']=__LINE__;
    $result['error_info']="Bad post request";
    exit(json_encode($result));
}else{
    // $conexion
    include($DOCUMENT_ROOT."/back_end/cnn/cnn.php");
    $conexion = conectar();
    $partido = json_decode($_POST['partidos'],true);


    $sql = "INSERT INTO resultados(fecha_partido, id_ligas, equipo_local, equipo_visitante, resultado_descanso, resultado_final, resultado_final_signo, resultado_descanso_signo, cuota_1, cuota_x, cuota_2, mas_05_descanso, mas_15_descanso, mas_15_final, mas_25_final, ambos_marcan, temporadas_id, goles_ambas_partes, diferencia_goles_descanso_final_local,diferencia_goles_descanso_final_visitante, local_gf_descanso, local_gc_descanso, visitante_gf_descanso, visitante_gc_descanso, local_gf_final, local_gc_final, visitante_gf_final, visitante_gc_final) ";
    $sql.= " VALUES ( ";
    $sql.= "'".$partido["fecha_partido"]."'";
    $sql.=",";
    $sql.=$partido["id_ligas"];
    $sql.=" , ";
    $sql.=$partido["equipo_local"];
    $sql.=" , ";
    $sql.=$partido["equipo_visitante"];
    $sql.=" , ";
    $sql.="'".$partido["resultado_descanso"]."'";
    $sql.=" , ";
    $sql.= "'".$partido["resultado_final"]."'";
    $sql.=" , ";
    $sql.="'".$partido["resultado_final_signo"]."'";
    $sql.=" , ";
    $sql.="'".$partido["resultado_descanso_signo"]."'";
    $sql.=" , ";
    $sql.=$partido["cuota_1"];
    $sql.=" , ";
    $sql.=$partido["cuota_x"];
    $sql.=" , ";
    $sql.=$partido["cuota_2"];
    $sql.=" , ";
    $sql.=$partido["mas_05_descanso"];
    $sql.=" , ";
    $sql.=$partido["mas_15_descanso"];
    $sql.=" , ";
    $sql.=$partido["mas_15_final"];
    $sql.=" , ";
    $sql.=$partido["mas_25_final"];
    $sql.=" , ";
    $sql.=$partido["ambos_marcan"];
    $sql.=" , ";
    $sql.=$partido["temporadas_id"];
    $sql.=" , ";
    $sql.=$partido["goles_ambas_partes"];
    $sql.=" , ";
    $sql.=$partido["diferencia_goles_descanso_final_local"];
    $sql.=" , ";
    $sql.=$partido["diferencia_goles_descanso_final_visitante"];
    $sql.=" , ";
    $sql.=$partido["local_gf_descanso"];
    $sql.=" , ";
    $sql.=$partido["local_gc_descanso"];
    $sql.=" , ";
    $sql.=$partido["visitante_gf_descanso"];
    $sql.=" , ";
    $sql.=$partido["visitante_gc_descanso"];
    $sql.=" , ";
    $sql.=$partido["local_gf_final"];
    $sql.=" , ";
    $sql.=$partido["local_gc_final"];
    $sql.=" , ";
    $sql.=$partido["visitante_gf_final"];
    $sql.=" , ";
    $sql.=$partido["visitante_gc_final"];
    $sql.= " )";
    try {
        $query = $conexion->prepare($sql);
        $query->execute();
        $result =  $conexion->lastInsertId();
    } catch (Exception $e) {
        $result['error']=true;
        $result['error_l']=__LINE__;
        $result['error_info']=$e->getMessage();
        $result['error_sql']=$sql_insert;
        exit(json_encode($result));
    }
}


echo json_encode($result,JSON_PARTIAL_OUTPUT_ON_ERROR);
?>
