class ControladorCargaResultado {
    generarCsv(){
        Papa.parse(document.querySelector("#input_carga_resultados").files[0],{
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: function(results){
                global.variables_globales.csv_resultados = results.data;
                global.funciones.controlador.cargaResultado.corregirObjResultados();
            }
        });
    }
    corregirObjResultados(){

        (global.variables_globales.csv_resultados).forEach((i) => {

            if(i.ambos_marcan == "SI"){
                i.ambos_marcan = 1;
            }else{
                i.ambos_marcan = 0;
            }

            if(i.goles_ambas_partes == "SI"){
                i.goles_ambas_partes = 1;
            }else{
                i.goles_ambas_partes = 0;
            }

            i.cuota_1 = parseFloat(i.cuota_1.replace(",","."));
            i.cuota_x = parseFloat(i.cuota_x.replace(",","."));
            i.cuota_2 = parseFloat(i.cuota_2.replace(",","."));
            i.diferencia_goles_descanso_final = parseInt(i.diferencia_goles_descanso_final);
            i.local_gc_descanso = parseInt(i.local_gc_descanso);
            i.local_gc_final = parseInt(i.local_gc_final);
            i.local_gf_descanso = parseInt(i.local_gf_descanso);
            i.local_gf_final = parseInt(i.local_gf_final);
            i.visitante_gc_descanso = parseInt(i.visitante_gc_descanso);
            i.visitante_gc_final = parseInt(i.visitante_gc_final);
            i.visitante_gf_descanso = parseInt(i.visitante_gf_descanso);
            i.visitante_gf_final = parseInt(i.visitante_gf_final);

            if(i.local_gc_descanso + i.local_gf_descanso == 1){
                i.mas_05_descanso = 1;
                i.mas_05_descanso = 0;
            }else if(i.local_gc_descanso + i.local_gf_descanso > 1){
                i.mas_05_descanso = 1;
                i.mas_15_descanso = 1;
            }else{
                i.mas_05_descanso = 0;
                i.mas_05_descanso = 0;
            }
            if(i.local_gc_final + i.local_gf_final == 2){
                i.mas_15_final = 1;
                i.mas_25_final = 0;
            }else if(i.local_gc_final + i.local_gf_final > 3){
                i.mas_15_final = 1;
                i.mas_25_final = 1;
            }else{
                i.mas_15_final = 0;
                i.mas_25_final = 0;
            }
            i.id_ligas = i.id_ligas.trim();

            i.fecha_partido = global.funciones.controlador.general.formatear_fecha(i.fecha_partido);
        });

        global.funciones.modelo.cargaResultado.insertResultadosCsv(
            global.variables_globales.csv_resultados
        );
    }
}
