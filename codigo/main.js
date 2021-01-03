//main

//generar tabla
window.onload = function(){

    var coordenadas = parseInt(prompt("Medida del tablero "));

    while(coordenadas === "" || coordenadas == null || coordenadas < 5 || coordenadas > 20){//bucle while para el tamaño de la tabla

        alert("Por favor introduce la medida, entre 5 y 20");
        coordenadas = parseInt(prompt("Medida del tablero (5-20)"));
        console.log(coordenadas);

    }
    partida.iniciarJuego(coordenadas);
    //Partida.generarTabla(coordenadas);
    //Partida.iniciarTablero(coordenadas);
}

let insert = document.getElementById("insBoto");

insert.onclick = function() {

    alert(document.getElementById("xBoto").value);

}
