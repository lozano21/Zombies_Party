window.onload = function() {

    //Se piden las medidas de la tabla
    var coordenadas = parseInt(prompt("Medida del tablero entre 5 y 20"));

    while (coordenadas === "" || coordenadas == null || coordenadas < 5 || coordenadas > 20) {

        coordenadas = parseInt(prompt("La medida debe ser de 5 a 20"));
        console.log(coordenadas);
    }

    partida.iniciarJuego(coordenadas);
    //Partida.generarTabla(coordenadas);
    //Partida.iniciarTablero(coordenadas);
}

let ins = document.getElementById("insBoto");

ins.onclick = function() {

    coord();
    clear();

}

function coord() {

        let posX = document.getElementById("posX").value;
        let posY = document.getElementById("posY").value;
    max = partida.medidaTablero + 1;

    if (posX == "" || posY == "") {

        alert("No has dado bien las coordenadas");

    } else {

        if (posX >= 0 && posX < max && posY >= 0 && posY < max) {

            let ficha = partida.tablero[posX - 1][posY - 1];
            partida.inputs.push([posX - 1, posY - 1]);
            console.log("ficha: " + ficha);

            if (ficha.toString() === ficha.toLocaleLowerCase()) {
                    document.getElementById(posX + "," + posY).innerHTML = '<img src="' + partida.GetImageByLetter(ficha) + '" class="L_cont_cell" />';//futuro alt

                partida.tablero[posX - 1][posY - 1] = ficha.toUpperCase();
                document.getElementById(posX + "," + posY).style.backgroundColor = partida.comprovarLetra(ficha.toUpperCase(),posX,posY);
                //TODO funcionalidad de las letras
            } else {

                alert("Ficha descubierta");

            }

        } else {

            alert("Coordenada incorrecta");

        }

    }
}

function imagen() {

    let posX = document.getElementById("posX").value;
    let posY = document.getElementById("posY").value;

    let id = posX + "," + posY;
    let ficha = partida.tablero[posX-1][posY-1];

    switch (ficha){

        case "g":
            document.getElementById(id).innerHTML = "<image src='imagenes/grass.png'>";
        break;
        case "e":
            document.getElementById(id).innerHTML = "<image src='imagenes/star.png'>";
        break;
        case "z":
            document.getElementById(id).innerHTML = "<image src='imagenes/skull.png'>";
        break;

    }


}

function clear() {

    document.getElementById("posX").value = "";
    document.getElementById("posY").value = "";

}


