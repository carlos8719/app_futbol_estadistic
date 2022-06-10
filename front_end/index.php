<?
$DOCUMENT_HTTP = "http".(isset($_SERVER['HTTPS'])&&$_SERVER['HTTPS']!="off"?"s":"")."://".$_SERVER["SERVER_NAME"];
$DOCUMENT_ROOT = $_SERVER["DOCUMENT_ROOT"];
?>

<!DOCTYPE html>
<html lang="es" dir="ltr">
    <head>
        <?php include "/vista/head.php" ?>
    </head>
    <body>
        <script type="text/javascript">
            let x = generar_estructura_login();
            document.body.appendChild(x.estructuraLogin);
        </script>
        <?php include "/vista/footer.php" ?>
    </body>
</html>
