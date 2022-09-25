const form = document.getElementById("form");
const tabla = document.getElementById("tablaDatos");
var indexEstudianteMod;
var estudiantes = [];

document.getElementById("btn").addEventListener("click", (e) => {
    if(validarDatos()){
        
        estudiante = {
            Nombre: form["Nombre"].value,
            Materia: form["Materia"].value,
            Programa: form["Programa"].value,
            nota: []
        }  
        estudiantes.push(estudiante); 
        document.getElementById("btnRegistrar").disabled = false;
        indexEstudianteMod = estudiantes.length - 1;
        document.getElementById("lblNombre").innerText = estudiantes[indexEstudianteMod].Nombre;
        document.getElementById("lblMateria").innerText = estudiantes[indexEstudianteMod].Materia;
        document.getElementById("lblPrograma").innerText = estudiantes[indexEstudianteMod].Programa;
        tabla.getElementsByTagName("tbody")[0].innerHTML = "";
        cerrarModal()

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
        estudiantes[indexEstudianteMod].nota.push(document.getElementById("notaActividad").value);
        ultimo = ultimo[ultimo.length - 1].innerHTML = '<td>' + document.getElementById("textoActividad").value + '</td>' + '<td>' + document.getElementById("notaActividad").value + '</td>';
        document.getElementById("btnRegistrar").onclick = agregarNotas;
        
        calcularPromedio();

    }
}

function calcularPromedio(){
    var suma = 0;
    for(var i = 0; i < estudiantes[indexEstudianteMod].nota.length; i++){
        suma += parseFloat(estudiantes[indexEstudianteMod].nota[i]);
    }
    let promedio = suma / estudiantes[indexEstudianteMod].nota.length;
    document.getElementById("promedio").innerText = promedio.toFixed(2);
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
