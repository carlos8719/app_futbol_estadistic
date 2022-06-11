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
    $result['response']=[];
    foreach($resultados as $key => $value){
        $result['resultados'][$key]=[];
        foreach($value as $key2 => $value2){


            $result['resultados'][$key][$key2]=[];

            $result['resultados'][$key][$key2]=$value2;

            if($key2 === "temporadas_id"){
                $temporada = file_get_contents(
                    $DOCUMENT_HTTP."/back_end/select/select_temporada.php"
                    ,false
                    ,stream_context_create(
                        array('http' =>
                            array(
                                'method'  => 'POST'
                                ,'header'  => 'Content-type: application/x-www-form-urlencoded'
                                ,'content' => http_build_query([
                                    'temporada' => json_encode($value2)
                                ])
                            )
                        )
                    )
                );

                $result['resultados'][$key][$key2]=$temporada;
            }
            if($key2 === "id_ligas"){
                $ligas = file_get_contents(
                    $DOCUMENT_HTTP."/back_end/select/select_ligas.php"
                    ,false
                    ,stream_context_create(
                        array('http' =>
                            array(
                                'method'  => 'POST'
                                ,'header'  => 'Content-type: application/x-www-form-urlencoded'
                                ,'content' => http_build_query([
                                    'liga' => json_encode($value2)
                                ])
                            )
                        )
                    )
                );
                $result['resultados'][$key][$key2]=$ligas;
            }
            if($key2 === "equipo_local"){
                $equipo_local = file_get_contents(
                    $DOCUMENT_HTTP."/back_end/select/select_equipo.php"
                    ,false
                    ,stream_context_create(
                        array('http' =>
                            array(
                                'method'  => 'POST'
                                ,'header'  => 'Content-type: application/x-www-form-urlencoded'
                                ,'content' => http_build_query([
                                    'equipo' => json_encode($value2)
                                ])
                            )
                        )
                    )
                );
                $result['resultados'][$key][$key2]=$equipo_local;
            }
            if($key2 === "equipo_visitante"){
                $equipo_visitante = file_get_contents(
                    $DOCUMENT_HTTP."/back_end/select/select_equipo.php"
                    ,false
                    ,stream_context_create(
                        array('http' =>
                            array(
                                'method'  => 'POST'
                                ,'header'  => 'Content-type: application/x-www-form-urlencoded'
                                ,'content' => http_build_query([
                                    'equipo' => json_encode($value2)
                                ])
                            )
                        )
                    )
                );
                $result['resultados'][$key][$key2]=$equipo_visitante;
            }
        }
    }

    foreach ($result['resultados'] as $key => $value) {

            $response = file_get_contents(
                $DOCUMENT_HTTP."/back_end/insert/insert_partido.php"
                ,false
                ,stream_context_create(
                    array('http' =>
                        array(
                            'method'  => 'POST'
                            ,'header'  => 'Content-type: application/x-www-form-urlencoded'
                            ,'content' => http_build_query([
                                'partidos' =>json_encode($value)
                            ])
                        )
                    )
                )
            );
    }
    echo json_encode($result,JSON_PARTIAL_OUTPUT_ON_ERROR);
}

 ?>
