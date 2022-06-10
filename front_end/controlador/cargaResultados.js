class ControladorCargaResultado {
    generarCsv(){
        Papa.parse(document.querySelector("#input_carga_resultados").files[0],{
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: function(results){
                global.variables_globales.csv_resultados = results.data;
                global.funciones.modelo.cargaResultado.insertResultadosCsv(
                    global.variables_globales.csv_resultados
                );
            }
        });
    }
}
