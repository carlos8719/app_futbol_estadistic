
<?php
$DOCUMENT_HTTP = "http".(isset($_SERVER['HTTPS'])&&$_SERVER['HTTPS']!="off"?"s":"")."://".$_SERVER["SERVER_NAME"];
$DOCUMENT_ROOT = $_SERVER["DOCUMENT_ROOT"];
?>

<!DOCTYPE html>
<html lang="es" dir="ltr">
    <head>
        <?php include ($DOCUMENT_ROOT."/front_end/vista/head.php"); ?>
    </head>
    <body>
        <?php include ($DOCUMENT_ROOT."/front_end/vista/header.php"); ?>
        <div id="printImport">test <!-- contenido de la página --> </div>
        <?php include ($DOCUMENT_ROOT."/front_end/vista/footer.php"); ?>
    </body>
</html>
