class ModeloCargaResultado {
    insertResultadosCsv(){
        let data = global.variables_globales.csv_resultados;
        var formData = new FormData();
        formData.append('csvResultados',data);
        fetch(window.location.origin+'/back_end/insert/insert_csv_resultados.php', {
          method: "POST",
          body:formData
        })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));
    }
}
