class ControladorGeneral{

    formatear_fecha(fecha){
        if(fecha == 0){
            return;
        }
        fecha = fecha.trim();
        fecha = fecha.replace("/","-");
        let dia = fecha.slice(0,2);
        let mes = fecha.slice(3,5);
        let year = fecha.slice(6);

        if(year.length == 2){
            year = "20"+year;
        }
        return year+"-"+mes+"-"+dia; 
    }
}
