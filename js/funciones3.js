var datos = new Array();
var contador = 0;
var posicion = 0;
var contenedor = new Object();
//creacion de los botones 
bGrabar.addEventListener("click", grabarRegistro,false);
bSiguiente.addEventListener("click", registroSiguiente, false); 
bAnterior.addEventListener("click", registroAnterior, false); 
bModificar.addEventListener("click", modificarRegistro, false); 
bBorrar.addEventListener("click", borrarRegistro, false);
bTabla.addEventListener("click", imprimirentabla,false); 

cargarXml();

function datosContenedor(id, direccion, latitud, longitud, tipo) {
    this.id = id;
    this.direccion = direccion;
    this.latitud = latitud;
    this.longitud = longitud;
    this.tipo=tipo;
    this.guarda = guardadatos;

}

function guardadatos() {
    alert(this.id);
    datos[contador] = this;
    contador = contador + 1; 
    posicion = contador;
}

function leerdatos(c) {
    var datos2 = new datoslibro();
    datos2 = datos[c];
    document.write("<tr><td>" + datos2.id + "</td><td>" + datos2.direccion + "</td><td>" + datos2.latitud + "</td><td>" + datos2.longitud+ "</td><td>" + datos2.tipo);
}

function cargarXml(){
    //leemos los datos del fichero xml que es datos.js y lo transformamos en una coleccion de datos
    var codigo=new DOMParser();
    var myXml=codigo.parseFromString(datosFichero, "text/xml");
    
    var aId = new Array();
    var aDireccion = new Array();
    var aLatitud = new Array();
    var aLongitud = new Array();
    var aTipo=new Array();

    //asociamos tl id con el elemento
    aId= myXml.getElementsByTagName("id");
    aDireccion= myXml.getElementsByTagName("direccion");
    aLatitud= myXml.getElementsByTagName("latitud");
    aLongitud= myXml.getElementsByTagName("longitud");
    aTipo= myXml.getElementsByTagName("tipo");
    
    
    for (var i=0; i<aId.length;i++){
        contenedor= new datosContenedor(aId.item(i).firstChild.nodeValue, aDireccion.item(i).firstChild.nodeValue, aLatitud.item(i).firstChild.nodeValue, aLongitud.item(i).firstChild.nodeValue, aTipo.item(i).firstChild.nodeValue);
        datos[i]=contenedor;
    }
    c = i; contador = c;
    mostrarRegistro();
}

function grabarRegistro() {
    var id = document.getElementById("id").value;
    var direccion = document.getElementById("direccion").value;
    var latitud = document.getElementById("latitud").value;
    var longitud = document.getElementById("longitud").value;
    var tipo = document.getElementById("tipo").value;
    
    contenedor = new datosContenedor(id, direccion, latitud, longitud, tipo);
    contenedor.guarda();


}

//funcion para pasar al siguiente registro 
function registroSiguiente(){
    posicion++;
    if (posicion>=datos.length){
        posicion=0;
    }
    //llamamos a la funcion de mostrar registros
    mostrarRegistro();
}

//funcion para pasar al registro anterior
function registroAnterior(){
    /*
    if (posicion>0){
        posicion--;
    }
    */

    if(posicion-1>=0){
        posicion = posicion - 1; 
    }
    //llamamos a la funcion de mostrar registros
    mostrarRegistro();
}

//primero le das a modificar, cambias los datos, y le vuelves a dar a modificar 
function modificarRegistro(){
    
    var id = document.getElementById("id").value;
    var direccion = document.getElementById("direccion").value;
    var latitud = document.getElementById("latitud").value;
    var longitud = document.getElementById("longitud").value;
    var tipo = document.getElementById("tipo").value;
    
    contenedor = new datosContenedor(id, direccion, latitud, longitud, tipo);
    datos[posicion]=contenedor;
}

//intento de borrar registros (no funciona)
function borrarRegistro(){

    datos.splice(posicion,1)
    contador--;

    posicion=0;
    mostrarRegistro(posicion);
}

//funcion para que visualicemos el registro correspondiente a la funcion 
function mostrarRegistro(){
    contenedor = new datosContenedor();
    contenedor = datos[posicion];
    if(contenedor==undefined){return;}
        
    document.getElementById("id").value=contenedor.id;
    document.getElementById("direccion").value=contenedor.direccion;
    document.getElementById("latitud").value=contenedor.latitud;
    document.getElementById("longitud").value=contenedor.longitud;
    document.getElementById("tipo").value=contenedor.tipo;
}

//funcion para crear la tabla, rellenarla e imprimirla dentro del html
function imprimirentabla(){
    var texto = '<tr>'+
    '<th>ID</th>'+
    '<th>DIRECCION</th>'+
    '<th>LATITUD</th>'+
    '<th>LONGITUD</th>'+
    '<th>TIPO</th>'+
    '</tr>';

    for (i=0; i<contador;i++){
        var datos2 = new datosContenedor();
        datos2=datos[i];

        texto=texto+
        "<tr>"+
        "<td>"+datos2.id+"</td>"+
        "<td>"+datos2.direccion+"</td>"+
        "<td>"+datos2.latitud+"</td>"+
        "<td>"+datos2.longitud+"</td>"+
        "<td>"+datos2.tipo+"</td>"+
        "</tr>"
    }

    document.getElementById("cuerpo").innerHTML= texto;
}