class VistaCargaResultado {

    FormularioCargaResultados(){
        let html ={};

        //divGeneral
        html.div = document.createElement("div");
        html.div.className = "event__header top";
        document.querySelector(".sportName ").appendChild(html.div);
        //titulo div
        html.titulo = document.createElement("div");
        html.titulo.className = "icon--flag event__title fl_6";
        html.div.appendChild(html.titulo);
        //titulo div
        html.titulo2 = document.createElement("div");
        html.titulo2.className = "event__titleBox";
        html.titulo.appendChild(html.titulo2);

        //SPAN titulo
        html.spanTitulo = document.createElement("span");
        html.spanTitulo.className = "event__title--type"
        html.spanTitulo.innerHTML = "Carga Resultados: ";
        html.titulo.appendChild(html.spanTitulo);
        //SPAN titulo
        html.spanTitulo = document.createElement("span");
        html.spanTitulo.className = "event__title--name"
        html.spanTitulo.innerHTML = " Añade el CSV";
        html.titulo.appendChild(html.spanTitulo);

        html.div2 = document.createElement("div");
        html.div2.className = "event__match event__match--scheduled event__match--twoLine";
        document.querySelector(".sportName ").appendChild(html.div2);


        //input
        html.input = document.createElement("input");
        html.input.type = "file";
        html.input.id = "input_carga_resultados";
        html.input.className = "event__participant event__participant--home";
        html.input.name = "carga_resultados";
        html.div2.appendChild(html.input);
        //boton Cargar CSV
        html.button = document.createElement("input");
        html.button.type = "button";
        html.button.value = "Carga CSV";
        html.button.className = "event__participant event__participant--away";
        html.button.addEventListener("click", ()=>{
            global.funciones.controlador.cargaResultado.generarCsv();
        });
        html.div2.appendChild(html.button);
    }
}
