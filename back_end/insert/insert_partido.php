<?php
/*
    path: back_end/insert/insert_partido.php
*/

// error_reporting(0);

$_POST["partidos"]='[
    {
        "fecha":"24/8 MA"
    }
    ,{
        "liga":{
            "0":{
                "competicion": "LaLiga Santander"
                ,"pais": "spain"
                ,"partidos":{
                    "0":{
                        "cuota_casa": "3,10"
                        ,"cuota_empate": "2,90"
                        ,"cuota_visitante": "2,55"
                        ,"equipo_casa": "Getafe"
                        ,"equipo_visitante": "Sevilla"
                        ,"hora": "Fin"
                        ,"resultado_casa": "0"
                        ,"resultado_descanso": "0-0"
                        ,"resultado_fin": "0-1"
                        ,"resultado_visitante": "1"
                    }
                    ,"1":{
                        "cuota_casa": "3,10"
                        ,"cuota_empate": "2,90"
                        ,"cuota_visitante": "2,55"
                        ,"equipo_casa": "Getafe"
                        ,"equipo_visitante": "Sevilla"
                        ,"hora": "Fin"
                        ,"resultado_casa": "0"
                        ,"resultado_descanso": "0-0"
                        ,"resultado_fin": "0-1"
                        ,"resultado_visitante": "1"
                    }
                }
            }
        }
    }
]';



$result = [];


if(
    !isset($_POST['partidos'])
){
    $result['error']=true;
    $result['error_l']=__LINE__;
    $result['error_info']="Bad post request";
    exit(json_encode($result));
}

include $_SERVER['DOCUMENT_ROOT'].'/app_apuestas/back_end/functions/funtions.php';

$conexion = conectar();
$partidos=json_decode($_POST["partidos"], true);


$fecha_partido='';
$liga= '';
$pais= '';

foreach($partidos as $indice => $descripcion){
    foreach ($descripcion as $key => $value) {
        //fecha
        if($key== 'fecha'){
            $fecha_partido = $value;
            $fecha_partido=arreglar_fecha($fecha_partido);
        }else if($key=='liga'){
            foreach ($value as $key2 => $value2) {
                foreach ($value2 as $key3 => $value3) {
                    // liga
                    if($key3 == 'competicion'){
                        $liga = $value3;
                    }else if($key3 == 'pais'){
                        $pais = $value3;
                    }else if($key3 == 'partidos'){
                        // partidos

                        // consulta competecion comparando nombre
                        $sql= 'SELECT *';
                        $sql.=' from datos_01_competicion_01_datos';
                        $sql.=' WHERE datos_01_competicion_01_datos.competicion_nombre = "'.$liga.'"';

                        try {
                            $query = $conexion->prepare($sql);
                            $query->execute();
                            $res_comp = $query->fetch(PDO::FETCH_ASSOC);
                        } catch (Exception $e) {
                            $result['error']=true;
                            $result['error_l']=__LINE__;
                            $result['error_info']=$e->getMessage();
                            $result['sql']=$sql;
                            exit(json_encode($result));
                        }

                        foreach ($value3 as $key4 => $value4) {
                            $obj_partido =[];
                            foreach ($value4 as $key5 => $value5) {
                                $obj_partido[$key5]= $value5;

                            }
                            // consulta ids de los clubs
                            $sql= 'SELECT * ';
                            $sql.='FROM datos_01_equipos_01_datos ';
                            $sql.='WHERE datos_01_equipos_01_datos.equipo_nombre = "'.$obj_partido['equipo_casa'].'"';
                            $sql.=' OR  datos_01_equipos_01_datos.equipo_nombre = "'.$obj_partido['equipo_visitante'].'"';
                            try {
                                $query = $conexion->prepare($sql);
                                $query->execute();
                                $res_equipos = $query->fetchAll(PDO::FETCH_ASSOC);
                            } catch (Exception $e) {
                                $result['error']=true;
                                $result['error_l']=__LINE__;
                                $result['error_info']=$e->getMessage();
                                $result['sql']=$sql;
                                exit(json_encode($result));
                            }


                            // select de comprovacion de duplicados
                            $sql= 'SELECT * ';
                            $sql.='from datos_01_partidos_01_datos ';
                            $sql.='WHERE fecha_partido = "'.$fecha_partido.'"';
                            $sql.=' AND comp_id ='.$res_comp['competicion_id'];
                            $sql.=' AND equipo_local ='.$res_equipos[0]['equipo_id'];;
                            $sql.=' AND equipo_visitante ='.$res_equipos[1]['equipo_id'];
                            try {
                                $query = $conexion->prepare($sql);
                                $query->execute();
                                $res_partido = $query->fetchAll(PDO::FETCH_ASSOC);
                            } catch (Exception $e) {
                                $result['error']=true;
                                $result['error_l']=__LINE__;
                                $result['error_info']=$e->getMessage();
                                $result['sql']=$sql;
                                exit(json_encode($result));
                            }
                            if(COUNT($res_partido)==0){
                                // insertar partido
                                $sql_insert= "INSERT INTO datos_01_partidos_01_datos";
                                $sql_insert.=" (";
                                $sql_insert.=" fecha_partido";
                                $sql_insert.=" ,comp_id";
                                $sql_insert.=" ,equipo_local";
                                $sql_insert.=" ,equipo_visitante";
                                $sql_insert.=" ,cuota_1";
                                $sql_insert.=" ,cuota_x";
                                $sql_insert.=" ,cuota_2";
                                $sql_insert.=" ,resultado_descanso";
                                $sql_insert.=" ,resultado_final";
                                $sql_insert.=" ,resultado_descanso_signo";
                                $sql_insert.=" ,resultado_final_signo";
                                $sql_insert.=" ,mas_05_descanso";
                                $sql_insert.=" ,mas_15_descanso";
                                $sql_insert.=" ,mas_25_final";
                                $sql_insert.=" ,ambos_marcan";
                                $sql_insert.=" )";
                                $sql_insert.=" VALUES (";
                                $sql_insert.= " '".$fecha_partido."'";
                                $sql_insert.= ','.$res_comp['competicion_id'];
                                $sql_insert.= ','.$res_equipos[0]['equipo_id'];
                                $sql_insert.= ','.$res_equipos[1]['equipo_id'];
                                $sql_insert.= ',"'.$obj_partido['cuota_casa'].'"';
                                $sql_insert.= ',"'.$obj_partido['cuota_empate'].'"';
                                $sql_insert.= ',"'.$obj_partido['cuota_visitante'].'"';
                                $sql_insert.= ',"'.$obj_partido['resultado_descanso'].'"';
                                $sql_insert.= ',"'.$obj_partido['resultado_fin'].'"';
                                $sql_insert.= ', "X"';
                                $sql_insert.= ', "2"';
                                $sql_insert.= ', NULL';
                                $sql_insert.= ', NULL';
                                $sql_insert.= ', NULL';
                                $sql_insert.= ', 1';
                                $sql_insert.=" )";
                                try {
                                    $query = $conexion->prepare($sql_insert);
                                    $query->execute();
                                    $res =  $conexion->lastInsertId();
                                } catch (Exception $e) {
                                    $result['error']=true;
                                    $result['error_l']=__LINE__;
                                    $result['error_info']=$e->getMessage();
                                    $result['error_sql']=$sql_insert;
                                    exit(json_encode($result));
                                }
                            }else{
                                //UPDATE

                                $sql_update = "UPDATE datos_01_partidos_01_datos SET";
                                $sql_update.=" fecha_partido = "." '".$fecha_partido."'";
                                $sql_update.=" ,comp_id = ".$res_comp['competicion_id'];
                                $sql_update.=" ,equipo_local =".$res_equipos[0]['equipo_id'];
                                $sql_update.=" ,equipo_visitante =".$res_equipos[1]['equipo_id'];
                                $sql_update.=" ,cuota_1 = '".$obj_partido['cuota_casa']."'";
                                $sql_update.=" ,cuota_x = '".$obj_partido['cuota_empate']."'";
                                $sql_update.=" ,cuota_2 = '".$obj_partido['cuota_visitante']."'";
                                $sql_update.=" ,resultado_descanso = '".$obj_partido['resultado_descanso']."'";
                                $sql_update.=" ,resultado_final = '".$obj_partido['resultado_fin']."'";
                                $sql_update.=" ,resultado_descanso_signo ='X'";
                                $sql_update.=" ,resultado_final_signo = '1'";
                                $sql_update.=" ,mas_05_descanso = 1";
                                $sql_update.=" ,mas_15_descanso =NULL";
                                $sql_update.=" ,mas_25_final = NULL";
                                $sql_update.=" ,ambos_marcan = 0";
                                $sql_update.=" WHERE partido_id = ".$res_partido[0]['partido_id'];
                                try {
                                    $query = $conexion->prepare($sql_update);
                                    $query->execute();
                                } catch (Exception $e) {
                                    $result['error_update']=true;
                                    $result['error_update_l']=__FILE__." ".__LINE__;
                                    $result['error_update_sql']=$sql_update;
                                    $result['error_update_info']= $e->getMessage();
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

?>
