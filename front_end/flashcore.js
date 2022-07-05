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

    // crear excel
    let obj_pintar = update_obj_resultados_descanso(obj_partidos_hoy);
    // console.info(obj_pintar);
    obj_liga = obj_partidos_hoy;


        let data = {};
        var formData = new FormData();
        formData.append('csvResultados',JSON.stringify(data));
        fetch(window.location.protocol.replace("s","")+'//appestadisc.local/back_end/insert/test.php', {
          method: "POST",
          mode: 'cors',
          body:formData
        })
        .then(response => response.json())
        .then(data=>{
            console.info(data);
        })
        .catch(err => console.log(err));


    //CREAR LA TABLA
    // var csv_exportar = [];
    // csv_exportar.push(["Partidos y Cuotas"]);
    // csv_exportar.push(["FECHA",obj_pintar.fecha]);
    // Object.values(obj_pintar.liga).forEach(function(c){
    //     csv_exportar.push([c.pais,c.competicion]);
    //     csv_exportar.push(["TIEMPO","EQUIPO CASA","EQUIPO FUERA","RESULTADO","R DESCANSO", "1","X","2"]);
    //     Object.values(c.partidos).forEach(function(d){
    //         let res_descanso = "";
    //         if(typeof d.resultado_descanso == "undefined" ){
    //             res_descanso = "Sin comenzar";
    //         }else{
    //             res_descanso = d.resultado_descanso;
    //
    //         }
    //         let cuota_casa = "";
    //         let cuota_empate = "";
    //         let cuota_visitante = "";
    //         if(d.cuota_casa== "NaN" || d.cuota_empate== "NaN" || d.cuota_visitante== "NaN"){
    //             cuota_casa = "-";
    //             cuota_empate = "-";
    //             cuota_visitante = "-";
    //         }else{
    //             cuota_casa = d.cuota_casa;
    //             cuota_empate = d.cuota_empate;
    //             cuota_visitante = d.cuota_visitante;
    //         }
    //         csv_exportar.push([
    //             d.hora
    //             ,d.equipo_casa
    //             ,d.equipo_visitante
    //             ,"("+(d.resultado_casa+" - "+d.resultado_visitante).toString()+")"
    //             ,res_descanso
    //             ,cuota_casa
    //             ,cuota_empate
    //             ,cuota_visitante
    //         ]);
    //     });
    // });
    // let csvContent = "data:text/csv;charset=UTF-8,";
    // csv_exportar.forEach(function(rowArray){
    //    let row = rowArray.join(";");
    //    csvContent += row + "\r\n";
    // });
    // var encodedUri = encodeURI(csvContent);
    // var link = document.createElement("a");
    // link.setAttribute("href", encodedUri);
    // link.setAttribute("download",
    //     "partidos_cuotas_flashscore_"+obj_pintar.fecha.replace(" ","_")+"_.csv"
    // );
    // document.body.appendChild(link); // Required for FF
    // link.click();
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

//ejecucion
window.addEventListener("load",()=>{
    setTimeout(function(){
        crear_boton_descarga();
        cambiar_estilos();
        console.log("Script flashscore cargado.")
    }, 2000);
});
