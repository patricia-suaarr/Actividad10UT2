//crear los arrays de cada uno de los elementos de datos
var aId = new Array();
var aDireccion = new Array();
var aLatitud = new Array();
var aLongitud = new Array();
var aContenedor =new Array();

var id = document.getElementById("contenedor").value;
var direccion = document.getElementById("direccion").value;
var latitud = document.getElementById("latitud").value;
var longitud = document.getElementById("longitud").value;

var posicion=0;
var contador = 0; 
//creacion de los botones 
bGrabar.addEventListener("click", grabarRegistro,false);
bSiguiente.addEventListener("click", registroSiguiente, false); 
bAnterior.addEventListener("click", registroAnterior, false); 
bModificar.addEventListener("click", modificarRegistro, false); 
bBorrar.addEventListener("click", borrarRegistro, false);
bTabla.addEventListener("click", imprimirentabla,false); 

cargarXml();

function datosContenedor(id, direccion, latitud, longitud) {
    this.id = id;
    this.direccion = direccion;
    this.latitud = latitud;
    this.longitud = longitud;
    
    this.guarda = guardadatos;

}

function guardadatos() {
    alert(this.id);
    contenedor[contador] = this;
    contador = contador + 1;
    posicion = contador;
}

function leerdatos(c) {
    var datos = new datosContenedor();
    datos = contenedor[c];
    document.write("<tr><td>" + datos.id + "</td><td>" + datos.direccion + "</td><td>" + datos.latitud + "</td><td>" + datos.longitud + "</td><td>");

}


function cargarXml(){
//leemos los datos del fichero xml que es datos.js y lo transformamos en una coleccion de datos
var codigo=new DOMParser();
var myXml=codigo.parseFromString(datosFichero, "text/xml");

//asociamos tl id con el elemento
aId= myXml.getElementsByTagName("id");
aDireccion= myXml.getElementsByTagName("direccion");
aLatitud= myXml.getElementsByTagName("latitud");
aLongitud= myXml.getElementsByTagName("longitud");


for (var i=0; i<aId.length;i++){
    contenedor= new datosContenedor(aId.item(i).firstChild.nodeValue, aDireccion.item(i).firstChild.nodeValue, aLatitud.item(i).firstChild.nodeValue, aLongitud.item(i).firstChild.nodeValue);
    aContenedor[i]=contenedor;
   // c = i; contador = c;
}
    mostrarRegistro();
}

function grabarRegistro() {
    id = document.getElementById("contenedor").value;
    direccion = document.getElementById("direccion").value;
    latitud = document.getElementById("latitud").value;
    longitud = document.getElementById("longitud").value;
    
    contenedor = new datosContenedor(id, direccion, latitud, longitud);
    contenedor.guarda();


}

//funcion para pasar al siguiente registro 
function registroSiguiente(){
    posicion++;
    if (posicion>=aId.length){
        posicion=0;
    }
    //llamamos a la funcion de mostrar registros
    mostrarRegistro();
}

//funcion para pasar al registro anterior
function registroAnterior(){
    if (posicion>0){
        posicion--;
    }
    //llamamos a la funcion de mostrar registros
    mostrarRegistro();
}
//primero le das a modificar, cambias los datos, y le vuelves a dar a modificar 
function modificarRegistro(){
    /*aId[posicion].firstChild.nodeValue=iISBN.value;
    aDireccion[posicion].firstChild.nodeValue= Titulo.value;
    aLatitud[posicion].firstChild.nodeValue=Autor.value;
    aLongitud[posicion].firstChild.nodeValue=Editorial.value;
    */

    id = document.getElementById("idContenedor").value;
    direccion = document.getElementById("direccion").value;
    latitud = document.getElementById("latitud").value;
    longitud = document.getElementById("longitud").value;
    
    contenedor = new datosContenedor(id, direccion, latitud, longitud);
    aContenedor[posicion]=contenedor;
}
//intento de borrar registros (no funciona)
function borrarRegistro(){
    
    /*aId.splice(posicion,1);
    aDireccion.splice(posicion,1);
    aLatitud.splice(posicion,1);
    aLongitud.splice(posicion,1);
    */

    aContenedor.splice(posicion,1)
    contador--;


    posicion=0;
    mostrarRegistro(posicion);

}

//funcion para que visualicemos el registro correspondiente a la funcion 
function mostrarRegistro(){
    document.getElementById("idContenedor").value=aId[posicion].firstChild.nodeValue;
    document.getElementById("direccion").value=aDireccion[posicion].firstChild.nodeValue;
    document.getElementById("latitud").value=aLatitud[posicion].firstChild.nodeValue;
    document.getElementById("longitud").value=aLongitud[posicion].firstChild.nodeValue;
}

//funcion para crear la tabla, rellenarla e imprimirla dentro del html
function imprimirentabla(){
    var texto = '<tr>'+
    '<td>ID</td>'+
    '<td>DIRECCION</td>'+
    '<td>LATITUD</td>'+
    '<td>LONGITUD</td>'+
    '</tr>';

    for (i=0; i<aId.length;i++){
        texto=texto+
        "<tr>"+
        "<td>"+aId[i].firstChild.nodeValue+"</td>"+
        "<td>"+aDireccion[i].firstChild.nodeValue+"</td>"+
        "<td>"+aLatitud[i].firstChild.nodeValue+"</td>"+
        "<td>"+aLongitud[i].firstChild.nodeValue+"</td>"+
        "</tr>"
    }

    document.getElementById("cuerpo").innerHTML= texto;
}
