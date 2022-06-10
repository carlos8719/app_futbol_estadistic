
<?php
$DOCUMENT_HTTP = "http".(isset($_SERVER['HTTPS'])&&$_SERVER['HTTPS']!="off"?"s":"")."://".$_SERVER["SERVER_NAME"];
$DOCUMENT_ROOT = $_SERVER["DOCUMENT_ROOT"];
?>

<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>App Estadisticas</title>
<!-- scripts -->
<script type="text/javascript" src="/front_end/instancias/varGlobal.js"></script>
<script type="text/javascript" src="/front_end/vista/general.js"></script>
<script type="text/javascript" src="/front_end/controlador/general.js"></script>
<script type="text/javascript" src="/front_end/modelo/general.js"></script>
<!-- login -->
<script type="text/javascript" src="/front_end/vista/login.js"></script>


<!-- clases -->
<!-- general -->
<?php include ($DOCUMENT_ROOT."/front_end/instancias/instancias.php"); ?>
