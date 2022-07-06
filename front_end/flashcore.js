/*
https://www.flashscore.es/
*/


var obj_liga = {};

function cambiar_estilos(){
    // quitar publi
    document.querySelector("#rc-top").style.visibility="hidden";
    //ancho
    document.querySelector("#fsbody").style.width = "840px";
    // centrar titulos
    document.querySelector(".filters__group").style.paddingLeft = "55px";
}
function crear_boton_descarga(){
    let boton_descargar = document.createElement("div");
    boton_descargar.className = "filters__tab";
    boton_descargar.id = "luna_boton_descargar";
    boton_descargar.style.background = "#05c905";
    boton_descargar.style.color = "black";
    boton_descargar.addEventListener("click",()=>{
        // lanzar_funcion();
        obj_liga = crear_obj();
        document.querySelector("#luna_cargar_cuotas").style="";
        document.querySelector("#luna_cargar_cuotas").style.background = "#05c905";
        document.querySelector("#luna_cargar_cuotas").style.color = "black";
        document.querySelector("#luna_boton_descargar").style.display = "none";
        document.querySelectorAll(".filters__tab")[2].click();
        window.alert("Objeto cargado!");

    });
    document.querySelector(".filters__group").appendChild(boton_descargar);

    let texto =  document.createElement("div");
    texto.className = "filters__text filters__text--default";
    texto.innerHTML = "C.Obj";
    boton_descargar.appendChild(texto);

    let cargar_cuotas = document.createElement("div");
    cargar_cuotas.className = "filters__tab";
    cargar_cuotas.id = "luna_cargar_cuotas";
    cargar_cuotas.style.background = "#05c905";
    cargar_cuotas.style.color = "black";
    cargar_cuotas.style.display = "none";
    cargar_cuotas.addEventListener("click",()=>{
        obj_liga=update_obj_resultados_cuotas(obj_liga);
        document.querySelector("#luna_dowload").style="";
        document.querySelector("#luna_dowload").style.background = "#05c905";
        document.querySelector("#luna_dowload").style.color = "black";
        document.querySelector("#luna_cargar_cuotas").style.display = "none";
        document.querySelectorAll(".filters__tab")[0].click();
        window.alert("Cuotas Cargadas!");
    });
    document.querySelector(".filters__group").appendChild(cargar_cuotas);

    let texto2 =  document.createElement("div");
    texto2.className = "filters__text filters__text--default";
    texto2.innerHTML = "C.Cuotas";
    cargar_cuotas.appendChild(texto2);

    let dowload = document.createElement("div");
    dowload.className = "filters__tab";
    dowload.id = "luna_dowload";
    dowload.style.display= "none";
    dowload.style.background = "#05c905";
    dowload.style.color = "black";
    dowload.addEventListener("click",()=>{
        crear_tabla(obj_liga);
        document.querySelector("#luna_boton_descargar").style="";
        document.querySelector("#luna_boton_descargar").style.background = "#05c905";
        document.querySelector("#luna_boton_descargar").style.color = "black";
        document.querySelector("#luna_dowload").style.display = "none";
        document.querySelectorAll(".filters__tab")[0].click();
    });
    document.querySelector(".filters__group").appendChild(dowload);

    let texto3 =  document.createElement("div");
    texto3.className = "filters__text filters__text--default";
    texto3.innerHTML = "Excel";
    dowload.appendChild(texto3);
}
function crear_tabla(obj_partidos_hoy){

    //filtrar el obj solo con las ligas que usamos!
    filtrar_ligas(obj_partidos_hoy);
    // crear excel
    let obj_pintar = update_obj_resultados_descanso(obj_partidos_hoy);

    console.info(obj_pintar);

    //CREAR LA TABLA

    var csv_exportar = [];
    csv_exportar.push([
        "fecha_partido"
        ,"id_ligas"
        ,"equipo_local"
        ,"equipo_visitante"
        ,"resultado_final"
        ,"resultado_descanso"
        ,"cuota_1"
        ,"cuota_x"
        ,"cuota_2"
        ,"resultado_final_signo"
        ,"resultado_descanso_signo"
        ,"mas_05_descanso"
        ,"mas_15_descanso"
        ,"mas_25_final"
        ,"ambos_marcan"
        ,"temporadas_id"
        ,"goles_ambas_partes"
        ,"diferencia_goles_descanso_final_local"
        ,"diferencia_goles_descanso_final_visitante"
        ,"mas_15_final"
        ,"local_gf_final"
        ,"local_gc_final"
        ,"visitante_gf_final"
        ,"visitante_gc_final"
        ,"local_gf_descanso"
        ,"local_gc_descanso"
        ,"visitante_gf_descanso"
        ,"visitante_gc_descanso"
    ]);

    let fecha = obj_pintar.fecha;

    Object.values(obj_pintar.liga).forEach(function(c){
        let liga = c.competicion;
        let pais = c.pais;
        if(typeof  fecha == "undefined"){
            fecha = false;
        }
        let ano = new Date().getFullYear();
        if(fecha != false){
            fecha = fecha.slice(0,5).replace("/","-")+"-"+ano;
        }
        let temporada = temporada_fun(ano);
        Object.values(c.partidos).forEach(function(d){

            //restultado descanso
            let res_descanso = "";
            if(typeof d.resultado_descanso == "undefined" ){
                res_descanso = "Sin comenzar";
            }else{
                res_descanso = d.resultado_descanso;

            }
            //Resultado final
            let res_final = "";
            res_final = "("+d.resultado_casa+" - "+d.resultado_visitante+")";

            // Resultado final signo
            let res_final_signo = resultado_signo(res_final);
            // Resultado descanso signo
            let res_descanso_signo = resultado_signo(res_descanso);
            // Mas de 05 descanso
            let mas_05_descanso = mas05(res_descanso);
            // Mas de 15 descanso
            let mas_15_descanso = mas15(res_descanso);
            // Mas de 15 final
            let mas_15_final = mas15(res_final);
            // Mas de 25 final
            let mas_25_final = mas25(res_final);
            // ambos marcan
            let ambos_marcan = ambos_marcan_fun(res_final);
            //goles ambas partes
            let goles_ambas_partes = goles_ambas_partes_fun(res_descanso,res_final);
            //goles favor local descanso
            let goles_favor_descanso_local = goles_favor_descanso_local_fun(res_descanso);
            //goles encontra local descanso
            let goles_contra_descanso_local = goles_contra_descanso_local_fun(res_descanso);

            let diferencia_goles_descanso_final_local = diferencia_goles_descanso_final_local_fun(res_descanso,res_final);
            let diferencia_goles_descanso_final_visitante = diferencia_goles_descanso_final_visitante_fun(res_descanso,res_final);

            //CUOTAS
            let cuota_casa = "";
            let cuota_empate = "";
            let cuota_visitante = "";
            if(d.cuota_casa== "NaN" || d.cuota_empate== "NaN" || d.cuota_visitante== "NaN"){
                cuota_casa = "-";
                cuota_empate = "-";
                cuota_visitante = "-";
            }else{
                cuota_casa = d.cuota_casa;
                cuota_empate = d.cuota_empate;
                cuota_visitante = d.cuota_visitante;
            }
            csv_exportar.push([
                    fecha
                    ,liga
                    ,d.equipo_casa
                    ,d.equipo_visitante
                    ,res_final
                    ,res_descanso
                    ,cuota_casa
                    ,cuota_empate
                    ,cuota_visitante
                    ,res_final_signo
                    ,res_descanso_signo
                    ,mas_05_descanso
                    ,mas_15_descanso
                    ,mas_25_final
                    ,ambos_marcan
                    ,temporada
                    ,goles_ambas_partes
                    ,diferencia_goles_descanso_final_local
                    ,diferencia_goles_descanso_final_visitante
                    ,mas_15_final
                    ,d.resultado_casa
                    ,d.resultado_visitante
                    ,d.resultado_visitante
                    ,d.resultado_casa
                    ,goles_favor_descanso_local
                    ,goles_contra_descanso_local
                    ,goles_contra_descanso_local
                    ,goles_favor_descanso_local
            ]);
        });
    });

    let csvContent = "data:text/csv;charset=UTF-8,";
    csv_exportar.forEach(function(rowArray){
       let row = rowArray.join(";");
       csvContent += row + "\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download",
        "partidos_cuotas_flashscore_"+obj_pintar.fecha.replace(" ","_")+"_.csv"
    );
    document.body.appendChild(link); // Required for FF
    link.click();
}
function crear_obj(){
    let liga = -1;
    let partidos = 0;
    let result_obj= {};
    result_obj.fecha = document.querySelector(".calendar__datepicker").innerText;
    result_obj.liga = {};
    // recorremos el div
    let div_padre = document.querySelector(".sportName");

    Object.values(div_padre.childNodes).forEach(a=>{
        if(a.className.substr(0,13) == "event__header"){
            liga ++;
            if(typeof result_obj.liga[liga] == "undefined"){
                result_obj.liga[liga] = {};
            }
            result_obj.liga[liga].pais = a.querySelector(".event__title--type").innerHTML;
            result_obj.liga[liga].competicion = a.querySelector(".event__title--name").innerHTML;
            result_obj.liga[liga].partidos = {};
            partidos = 0;
        }
        if(a.className.substr(0,12) == "event__match"){
            //creamos partido
            if(typeof result_obj.liga[liga].partidos[partidos] == "undefined"){
                result_obj.liga[liga].partidos[partidos] = {};
            }
            //hora
            if(a.querySelector(".event__stage--block")){
                if(a.querySelector(".event__stage--block").innerText.trim() == "finalizado"){
                    result_obj.liga[liga].partidos[partidos].hora = a.querySelector(".event__stage--block").innerText.trim();
                }else{
                    result_obj.liga[liga].partidos[partidos].hora = a.querySelector(".event__stage--block").innerText.trim()+"'";
                }
            }else{
                if(a.querySelector(".event__time" )== null){
                    result_obj.liga[liga].partidos[partidos].hora = "";
                }else{
                    (result_obj.liga[liga].partidos[partidos].hora = a.querySelector(".event__time" ).innerText.replace("\n","")).replace("SRF","");
                }
            }
            //equipos
            result_obj.liga[liga].partidos[partidos].equipo_casa = a.querySelector(".event__participant--home" ).innerText;
            result_obj.liga[liga].partidos[partidos].equipo_visitante = a.querySelector(".event__participant--away" ).innerText;

            //resultados
            if(a.querySelector(".event__score--home ")== null){
                result_obj.liga[liga].partidos[partidos].resultado_casa = 0;
                result_obj.liga[liga].partidos[partidos].resultado_visitante = 0;
            }
            else if(a.querySelectorAll(".event__score--home ")[0].innerHTML == ""){
                result_obj.liga[liga].partidos[partidos].resultado_casa = 0;
                result_obj.liga[liga].partidos[partidos].resultado_visitante = 0;

            }else{
                result_obj.liga[liga].partidos[partidos].resultado_casa = a.querySelectorAll(".event__score--home")[0].innerHTML;
                result_obj.liga[liga].partidos[partidos].resultado_visitante = a.querySelectorAll(".event__score--away")[0].innerHTML;
            }
            //resultado al descanso
            if(a.querySelector(".event__part--home") == null){
                result_obj.liga[liga].partidos[partidos].resultado_descanso = " - ";
            }else{
                result_obj.liga[liga].partidos[partidos].resultado_descanso = "--"
                //(a.querySelector(".event__part--home").innerText)+'-'+(a.querySelector(".event__part--away").innerText);
            }



            partidos++;
        }
    });

    //Filtramos el obj con las ligas que tienen partidos
    result_obj.liga = Object.values(result_obj.liga).filter((a)=>{return Object.keys(a.partidos).length > 0});

    return result_obj;
}
function update_obj_resultados_cuotas(obj){

    // recorrer el obj liga
    let div_padre = document.querySelector(".sportName");
    var competecion = "";
    var pais = "";
    Object.values(div_padre.childNodes).forEach((a)=>{
        if(a.className.substr(0,13) == "event__header"){
            competecion =  a.querySelector(".event__title--name").innerHTML;
            pais = a.querySelector(".event__title--type").innerHTML;
        };

        if(a.className.substr(0,12) == "event__match"){
            var equipo_casa = ((a.querySelectorAll(".event__participant--home" )[0].innerText).replace("\n",""))
            equipo_casa.replace("GOL","");
            var equipo_fuera = ((a.querySelectorAll(".event__participant--away" )[0].innerText).replace("\n",""))
            equipo_fuera.replace("GOL","");
            var cuota_casa =  parseFloat(a.querySelector(".event__odd--odd1").innerText).toLocaleString('de-DE', { minimumFractionDigits: 2});
            var cuota_empate =  parseFloat(a.querySelector(".event__odd--odd2").innerText).toLocaleString('de-DE', { minimumFractionDigits: 2});
            var cuota_visitante =  parseFloat(a.querySelector(".event__odd--odd3").innerText).toLocaleString('de-DE', { minimumFractionDigits: 2});

            Object.values(obj.liga).forEach((b)=>{
                if(
                    b.competicion == competecion
                    && b.pais == pais
                ){
                    Object.values(b.partidos).forEach((d)=>{
                        if(
                            equipo_casa == d.equipo_casa
                            && equipo_fuera == d.equipo_visitante
                        ){
                            d.cuota_casa  = cuota_casa;
                            d.cuota_empate = cuota_empate;
                            d.cuota_visitante = cuota_visitante;
                        }
                    });
                }
            });
        }
    });

    return obj;
}
function update_obj_resultados_descanso(obj){
    let div_padre = document.querySelector(".sportName");
    var competecion = "";
    var pais = "";
    Object.values(div_padre.childNodes).forEach((a)=>{
        if(a.className.substr(0,13) == "event__header"){
            competecion =  a.querySelector(".event__title--name").innerHTML;
            pais = a.querySelector(".event__title--type").innerHTML;
        };
        var obj_competicion = Object.values(obj.liga).filter((b)=>{
            return(
                b.competicion == competecion
                && b.pais == pais
            );
        });
        if(typeof obj_competicion[0] != "undefined"){
            var obj_partidos = obj_competicion[0].partidos;

            if(a.className.substr(0,12) == "event__match"){
                var obj_competicion = Object.values(obj_partidos).filter((c)=>{
                    var equipo_casa = ((a.querySelectorAll(".event__participant--home" )[0].innerText).replace("\n",""))
                    equipo_casa.replace("GOL","");
                    var equipo_fuera = ((a.querySelectorAll(".event__participant--away" )[0].innerText).replace("\n",""))
                    equipo_fuera.replace("GOL","");
                    if(
                        c.equipo_casa ==  equipo_casa
                        && c.equipo_visitante == equipo_fuera
                    ){
                        return c;
                    }
                });
                if(obj_competicion.length>0){
                    //cambiar el resultado del descanso en el obj
                    let evento_descanso = "";
                    if(typeof a.querySelectorAll(".event__part--1" )[0] == "undefined"){
                        evento_descanso = "Aplazado";
                    }else{
                        evento_descanso = ((a.querySelectorAll(".event__part--1" )[0].innerText).replace(")",""))
                        + " - "
                        + ((a.querySelectorAll(".event__part--1" )[1].innerText).replace("(",""));
                    }
                    obj_competicion[0].resultado_descanso = evento_descanso;
                }
            }
        }
    });
    return obj;
}
function lanzar_funcion(){

    // 1rpaso
    obj_liga = crear_obj();
    document.querySelector("#luna_cargar_cuotas").style="";
    document.querySelector("#luna_cargar_cuotas").style.background = "#05c905";
    document.querySelector("#luna_cargar_cuotas").style.color = "black";
    document.querySelector("#luna_boton_descargar").style.display = "none";
    document.querySelectorAll(".filters__tab")[2].click();
    console.info("Objeto cargado!");

    //2rpaso
    obj_liga=update_obj_resultados_cuotas(obj_liga);
    document.querySelector("#luna_dowload").style="";
    document.querySelector("#luna_dowload").style.background = "#05c905";
    document.querySelector("#luna_dowload").style.color = "black";
    document.querySelector("#luna_cargar_cuotas").style.display = "none";
    document.querySelectorAll(".filters__tab")[0].click();
    console.info("Cuotas Cargadas!");

    //3rpaso
    crear_tabla(obj_liga);
    document.querySelector("#luna_boton_descargar").style="";
    document.querySelector("#luna_boton_descargar").style.background = "#05c905";
    document.querySelector("#luna_boton_descargar").style.color = "black";
    document.querySelector("#luna_dowload").style.display = "none";
    document.querySelectorAll(".filters__tab")[0].click();
    console.info("Excel descargado!");
}

function filtrar_ligas(obj_ligas){
    let obj_filtrado = {};
    let contador = 0;
    Object.values(obj_ligas.liga).forEach(function(a){
        if(
            a.competicion == "La Liga"
            || a.competicion == "Segunda España"
            || a.competicion == "Premier League"
            || a.competicion == "Championschip"
            || a.competicion == "Portugal Liga"
            || a.competicion == "Ligue 1"
            || a.competicion == "Ligue 2"
            || a.competicion == "Bundesliga"
            || a.competicion == "Serie A"
            || a.competicion == "Eridivisie"
        ){
            contador++;
            obj_filtrado[contador] = a;
        }
    });
    obj_ligas.liga = obj_filtrado;
    return obj_ligas;
}
function resultado_signo(res_partido){
    let signo = false;
    let res_local = res_partido.slice(1,2);
    let res_visitante = res_partido.slice(5,6);
    if(parseInt(res_local) == parseInt(res_local)){
        signo = "X";
    }else if(parseInt(res_local) > parseInt(res_local)){
        signo = "1";
    }else{
        signo = "2";
    }
    return signo;
}
function mas05(res_partido){
    let res = 0;
    let res_local = res_partido.slice(1,2);
    let res_visitante = res_partido.slice(5,6);
    let mas05 = parseInt(res_local) + parseInt(res_local);
    if(mas05 > 0.5){
        res = 1 ;
    }
    return res;
}
function mas15(res_partido){
    let res = 0;
    let res_local = res_partido.slice(1,2);
    let res_visitante = res_partido.slice(5,6);
    let mas05 = parseInt(res_local) + parseInt(res_local);
    if(mas05 > 1.5){
        res = 1 ;
    }
    return res;
}
function mas25(res_partido){
    let res = 0;
    let res_local = res_partido.slice(1,2);
    let res_visitante = res_partido.slice(5,6);
    let mas05 = parseInt(res_local) + parseInt(res_local);
    if(mas05 > 2.5){
        res = 1 ;
    }
    return res;
}
function ambos_marcan_fun(res_partido){
    let res = 0;
    let res_local = res_partido.slice(1,2);
    let res_visitante = res_partido.slice(5,6);
    let res_sum_ambos = parseInt(res_local) + parseInt(res_local);
    if(res_sum_ambos > 0){
        res = 1 ;
    }
    return res;
}
function goles_ambas_partes_fun(res_descanso,res_final){
    let res = 0;
    let res_local_des = res_descanso.slice(1,2);
    let res_visitante_des = res_descanso.slice(5,6);
    let res_local_fin = res_final.slice(1,2);
    let res_visitante_fin = res_final.slice(5,6);
    let sum_des = parseInt(res_local_des)+parseInt(res_visitante_des);
    let sum_fin = parseInt(res_local_fin)+parseInt(res_visitante_fin);
    if(sum_des>0 && sum_fin>0 ){
        res = 1;
    }
    return res ;
}
function temporada_fun(ano){
    let temporada = "";
    let ano_1 = parseInt(ano.toString().slice(2,4));
    let ano_2 = parseInt(ano.toString().slice(2,4))+1;
    let mes = new Date().getMonth()+1;
    if(mes >=7){
        temporada = ano_1+"/"+ano_2;
    }else{
        temporada = ano_2+"/"+ano_1;
    }
    return temporada;
}
function goles_favor_descanso_local_fun(res_descanso){
    let res = 0;
    res = res_descanso.slice(1,2);
    return res;
}
function goles_contra_descanso_local_fun(res_descanso){
    let res = 0;
    res = res_descanso.slice(5,6);
    return res;
}
function diferencia_goles_descanso_final_local_fun(res_descanso,res_final){
    let diferencia = 0;
    res_descanso = parseInt(res_descanso.slice(1,2));
    res_final = parseInt(res_final.slice(1,2));
    diferencia = res_final - res_descanso;
    return diferencia;
}
function diferencia_goles_descanso_final_visitante_fun(res_descanso,res_final){
    let diferencia = 0;
    res_descanso = parseInt(res_descanso.slice(5,6));
    res_final = parseInt(res_final.slice(5,6));
    diferencia = res_final - res_descanso;
    return diferencia;
}

//ejecucion
window.addEventListener("load",()=>{
    setTimeout(function(){
        crear_boton_descarga();
        cambiar_estilos();
        console.log("Script flashscore cargado.")
    }, 2000);
});
