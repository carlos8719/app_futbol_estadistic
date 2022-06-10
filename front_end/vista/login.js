
generar_estructura_login = function(){
    let obj = {};
    obj.estructuraLogin = document.createElement("form");
    obj.estructuraLogin.class ="";
    obj.estructuraLogin_titulo = document.createElement("h1");
    obj.estructuraLogin_titulo.innerHTML = "Sistema de Login";
    obj.estructuraLogin.appendChild(obj.estructuraLogin_titulo);
    obj.estructuraLogin_name_parrafo1 = document.createElement("p");
    obj.estructuraLogin.appendChild(obj.estructuraLogin_name_parrafo1);
    obj.estructuraLogin_name_input = document.createElement("input");
    obj.estructuraLogin_name_input.type = "text";
    obj.estructuraLogin_name_input.placeholder = "Ingrese su nombre";
    obj.estructuraLogin_name_input.name = "user";
    obj.estructuraLogin_name_parrafo1.appendChild(obj.estructuraLogin_name_input);
    obj.estructuraLogin_name_parrafo2 = document.createElement("p");
    obj.estructuraLogin.appendChild(obj.estructuraLogin_name_parrafo2);
    obj.estructuraLogin_name_input_pass = document.createElement("input");
    obj.estructuraLogin_name_input_pass.type = "text";
    obj.estructuraLogin_name_input_pass.placeholder = "Ingrese su contraseña";
    obj.estructuraLogin_name_input_pass.name = "password";
    obj.estructuraLogin_name_parrafo2.appendChild(obj.estructuraLogin_name_input_pass);
    obj.estructuraLogin_name_input_boton = document.createElement("input");
    obj.estructuraLogin_name_input_boton.type = "submit";
    obj.estructuraLogin_name_input_boton.value = "Ingresar";
    obj.estructuraLogin.appendChild(obj.estructuraLogin_name_input_boton);
    return obj;
}
