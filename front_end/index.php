
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
        <div class="menuTop menuTop--soccer"></div>
        <div id="container">
            <div class="container__content content">
                <div class="container__main" id="main">
                    <div class="container__mainInner" id="tc">
                        <div class="container__bannerZone" id="rc-top"></div>
                        <!-- IMPORTANT -->
                        <div class="container__liveTableWrapper sport_page" id="mc">
                            <div class="container__livetable">
                                <div class="container__fsbody" id="fsbody">
                                    <div id="live-table">
                                        <div class="filters">
                                            <!-- //FILTROS -->
                                        </div>
                                        <div class="event">
                                            <div class="leagues--live ">
                                                <div class="sportName soccer">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- IMPORTANT -->
                        <div class="container__myMenu" id="lc"></div>

                    </div>
                </div>
            </div>
        </div>
        <?php include ($DOCUMENT_ROOT."/front_end/vista/footer.php"); ?>
    </body>
</html>

<script type="text/javascript">

global.funciones.modelo.general.cargaVariablesPrincipales();
var x = global.funciones.vista.general.menu();
document.querySelector(".menuTop").appendChild(x.div);


</script>
