//main
window.onload = function(){
    
    var coordenadas = 0;
    coordenadas = parseInt(prompt("Medida del tablero "));

    while(coordenadas === "" || coordenadas == null || coordenadas < 5 || coordenadas > 20){//bucle while para el tamaño de la tabla

        alert("Por favor introduce la medida, entre 5 y 20");
        coordenadas = parseInt(prompt("Medida del tablero (5-20)"));
        console.log(coordenadas);

    }
    Partida.iniciarJuego(coordenadas);
    //Partida.generarTabla(coordenadas);
    //Partida.iniciarTablero(coordenadas);
}



