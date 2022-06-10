class VistaCargaResultado {

    FormularioCargaResultados(){
        let html ={};

        //divGeneral
        html.div = document.createElement("div");
        html.div.className = "divGeneral";

        //titulo
        html.titulo = document.createElement("h1");
        html.titulo.className = "tituloH1";
        html.titulo.innerHTML = "Carga Resultados CSV";
        html.div.appendChild(html.titulo);
        //label
        html.label = document.createElement("label");
        html.label.innerHTML = "Añade el CSV";
        html.div.appendChild(html.label);
        //input
        html.input = document.createElement("input");
        html.input.type = "file";
        html.input.id = "input_carga_resultados";
        html.input.name = "carga_resultados";
        html.div.appendChild(html.input);
        //boton Cargar CSV
        html.button = document.createElement("input");
        html.button.type = "button";
        html.button.value = "Carga CSV";
        html.button.addEventListener("click", ()=>{
            global.funciones.controlador.cargaResultado.generarCsv();
        });
        html.div.appendChild(html.button);
        return html;
    }
}
