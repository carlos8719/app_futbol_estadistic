class VistaGeneral{

    borrar_div(element){
        element.innerHTML = "";
    }

    menu(){

        let html = {};

        //divGeneral
        html.div = document.createElement("div");
        html.div.className = "menuTop__content menuTop__group";

        //menu
        html.menu = document.createElement("div");
        html.menu.className = "menuTop__items";
        html.div.appendChild(html.menu);

        //enlaces
        html.enlace = document.createElement("div");
        html.enlace.className = "menuTop__item--active menuTop__item";
        html.menu.appendChild(html.enlace);

        html.a = document.createElement("div");
        html.a.className = "menuTop__text";
        html.a.innerHTML = "UP Partidos";
        html.a.addEventListener("click",()=>{
            global.funciones.vista.cargaResultado.FormularioCargaResultados();
        });
        html.enlace.appendChild(html.a);

        html.enlace1 = document.createElement("div");
        html.enlace1.className = " menuTop__item";
        html.menu.appendChild(html.enlace1);

        html.a2 = document.createElement("div");
        html.a2.className = "menuTop__text";
        html.a2.innerHTML = "Partidos";
        html.enlace1.appendChild(html.a2);

        return html;
    }

}
