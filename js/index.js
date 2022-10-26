const form = document.getElementById("form");
const tabla = document.getElementById("tablaDatos");
var indexEstudianteMod;
let estudiantes = [];

document.getElementById("btn").addEventListener("click", (e) => {
    
    if(validarDatos()){    
        estudiante = {
            Nombre: form["Nombre"].value,
            Materia: form["Materia"].value,
            Programa: form["Programa"].value,
            nota : []    
        }  
        estudiantes.push(estudiante); 
        document.getElementById("btnRegistrar").disabled = false;
        document.getElementById("btnEliminar").disabled = false;
        indexEstudianteMod = estudiantes.length - 1;
        document.getElementById("lblNombre").innerText = estudiantes[indexEstudianteMod].Nombre;
        document.getElementById("lblMateria").innerText = estudiantes[indexEstudianteMod].Materia;
        document.getElementById("lblPrograma").innerText = estudiantes[indexEstudianteMod].Programa;
        tabla.getElementsByTagName("tbody")[0].innerHTML = "";
        cerrarModal();
        cerrarAnuncio();

    }else{
        alert("Campos invalidos");
    }
    e.preventDefault();
}

);

function validarDatos(){
    let rango = /^[a-zA-Z]+$/;
    let Nombre = form["Nombre"].value;
    let Materia = form["Materia"].value;
    let Programa = form["Programa"].value;
    if(Nombre == "" && Materia == "" && Programa == ""){
        alert("Todos los campos son obligatorios");
        return false;
    }else if(rango.test(Nombre) && rango.test(Materia)){ 
        return true;
    }else{
        return false;
    }
    
}

function agregarNotas(){
    tabla.getElementsByTagName("tbody")[0].innerHTML += '<tr><td> <input type = "text" id = "textoActividad"></td> <td><input type = "number" id = "notaActividad" min = "0" max = "5" step="0.1"></td></tr>';
    document.getElementById("btnRegistrar").onclick = registrarNota;

}

function registrarNota(){
    if(document.getElementById("textoActividad").value == "" || document.getElementById("notaActividad").value == ""){
        alert("Campos invalidos");
    }else if(document.getElementById("notaActividad").value > 5 || document.getElementById("notaActividad").value < 0){
        alert("el rango de la nota es de 0 a 5");
        
    }else{
        var ultimo = tabla.getElementsByTagName("tbody")[0].getElementsByTagName("tr")
        let nota = {
            actividad: document.getElementById("textoActividad").value,
            nota: document.getElementById("notaActividad").value
        }
        estudiantes[indexEstudianteMod].nota.push(nota);
        ultimo = ultimo[ultimo.length - 1].innerHTML = '<td>' + document.getElementById("textoActividad").value + '</td>' + '<td>' + document.getElementById("notaActividad").value + '</td>'+ '<td style = "display: none; padding: 0px;"><button class = "eliminarRegistro" onClick = "eliminarRegistro('+(estudiantes[indexEstudianteMod].nota.length - 1) +')"> E </button> </td>';
        document.getElementById("btnRegistrar").onclick = agregarNotas;
        
        calcularPromedio();

    }
}

function calcularPromedio(){
    var suma = 0;
    for(var i = 0; i < estudiantes[indexEstudianteMod].nota.length; i++){
        suma += parseFloat(estudiantes[indexEstudianteMod].nota[i].nota);
    }
    if(estudiantes[indexEstudianteMod].nota.length > 0){
    let promedio = suma / estudiantes[indexEstudianteMod].nota.length;
    document.getElementById("promedio").innerText = promedio.toFixed(2);
    }else{
        document.getElementById("promedio").innerText = 0;
    }
}
function cerrarAnuncio(){
    document.getElementById("anuncio").style.display = "none";
}

function cerrarModal(){
    document.getElementById("modal").classList.add("modal-esconde");
}

function mostrarModal(){
    document.getElementById("modal").classList.remove("modal-esconde");
}
document.getElementById("btnEliminar").addEventListener("click", () => {
    tabla.getElementsByTagName('thead')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[2].style.display = "table-cell";

        let filas = tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        for(var i = 0; i < filas.length; i++){
            filas[i].getElementsByTagName('td')[2].style.display = "table-cell";
        }
        document.getElementById('btnOcultarEliminar').style = "block"
    });

document.getElementById("btnOcultarEliminar").addEventListener("click", ocultarBotonesEliminar);

function ocultarBotonesEliminar(){
    tabla.getElementsByTagName('thead')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[2].style.display = "none";
    let filas = tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    for(var i = 0; i < filas.length; i++){
        filas[i].getElementsByTagName('td')[2].style.display = "none";
    }
    document.getElementById('btnOcultarEliminar').style.display = "none"
}

function eliminarRegistro(notaIndex){

    if((estudiantes[indexEstudianteMod].nota.length-1) >= notaIndex){
    tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr')[notaIndex].remove();
    estudiantes[indexEstudianteMod].nota.splice(notaIndex,1);
    
    }
    calcularPromedio();
    actulizarTabla();

}

function actulizarTabla(){
    tabla.getElementsByTagName("tbody")[0].innerHTML = "";
    for(var i = 0; i < estudiantes[indexEstudianteMod].nota.length; i++){
        tabla.getElementsByTagName("tbody")[0].innerHTML += '<tr><td>' + estudiantes[indexEstudianteMod].nota[i].actividad + '</td><td>' + estudiantes[indexEstudianteMod].nota[i].nota + '</td><td style = "display: none; padding: 0px;"><button class = "eliminarRegistro" onClick = "eliminarRegistro('+i+')"> E </button> </td></tr>';
    }
    ocultarBotonesEliminar();


}
