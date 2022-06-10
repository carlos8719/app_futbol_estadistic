<?php

$result['error_info']="todo ok!";
if(
    !isset($_POST['csvResultadoss'])
){
    $result['error']=true;
    $result['error_l']=__LINE__;
    $result['error_info']="Bad post request";
    exit(json_encode($result));
}else{
    exit(json_encode($result));
}

 ?>
