window.onload = function() {

    inicio();

    //Partida.generarTabla(coordenadas);
    //Partida.iniciarTablero(coordenadas);

}

function inicio(){

    //Se piden las medidas de la tabla
    let coordenadas = parseInt(prompt("Medida del tablero entre 5 y 20"));

    while (coordenadas == null || coordenadas < 5 || coordenadas > 20) {

        coordenadas = parseInt(prompt("La medida debe ser de 5 a 20"));
        console.log(coordenadas);
    }

    document.getElementById("createTable").style.display = "block";
    partida.iniciarJuego(coordenadas);

    enable();

}

let ins = document.getElementById("insBoto");
let aban = document.getElementById("abanBoto");
let help = document.getElementById("helpBoto");

ins.onclick = function() {

    coord();
    clear();

}

aban.onclick = function() {

    partida.abandona();

}

help.onclick = function(){

    hWindow = window.open(
        "help.html",
        "help",
        "width=500, height=500"
    );

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

                if (partida.medidaTablero >= 5 && partida.medidaTablero <= 8){

                    document.getElementById(posX + "," + posY).innerHTML = '<img src="' + partida.GetImageByLetter(ficha) + '" class="L_cont_cell" />'; //futuro alt

                } else if (partida.medidaTablero >= 9 && partida.medidaTablero <= 12){

                    document.getElementById(posX + "," + posY).innerHTML = '<img src="' + partida.GetImageByLetter(ficha) + '" class="M_cont_cell" />'; //futuro alt

                } else if (partida.medidaTablero >= 13 && partida.medidaTablero <= 17){

                    document.getElementById(posX + "," + posY).innerHTML = '<img src="' + partida.GetImageByLetter(ficha) + '" class="S_cont_cell" />'; //futuro alt

                } else {

                    document.getElementById(posX + "," + posY).innerHTML = '<img src="' + partida.GetImageByLetter(ficha) + '" class="XS_cont_cell" />'; //futuro alt

                }



                partida.tablero[posX - 1][posY - 1] = ficha.toUpperCase();
                document.getElementById(posX + "," + posY).style.backgroundColor = partida.comprovarLetra(ficha.toUpperCase(), posX, posY);
                //TODO funcionalidad de las letras
            } else {

                alert("Ficha descubierta");

            }

        } else {

            alert("Coordenada incorrecta");

        }

    }
}

function coordMan(clicked_id){

    var id = clicked_id.split(',');
    var posX = id[0];
    var posY = id[1];

    max = partida.medidaTablero + 1;

    if (posX >= 0 && posX < max && posY >= 0 && posY < max) {

        let ficha = partida.tablero[posX - 1][posY - 1];
        partida.inputs.push([posX - 1, posY - 1]);
        console.log("ficha: " + ficha);

        if (ficha.toString() === ficha.toLocaleLowerCase()) {

            if (partida.medidaTablero >= 5 && partida.medidaTablero <= 8){

                document.getElementById(posX + "," + posY).innerHTML = '<img src="' + partida.GetImageByLetter(ficha) + '" class="L_cont_cell" />'; //futuro alt

            } else if (partida.medidaTablero >= 9 && partida.medidaTablero <= 11){

                document.getElementById(posX + "," + posY).innerHTML = '<img src="' + partida.GetImageByLetter(ficha) + '" class="M_cont_cell" />'; //futuro alt

            } else if (partida.medidaTablero >= 12 && partida.medidaTablero <= 16){

                document.getElementById(posX + "," + posY).innerHTML = '<img src="' + partida.GetImageByLetter(ficha) + '" class="S_cont_cell" />'; //futuro alt

            } else {

                document.getElementById(posX + "," + posY).innerHTML = '<img src="' + partida.GetImageByLetter(ficha) + '" class="XS_cont_cell" />'; //futuro alt

            }

            partida.tablero[posX - 1][posY - 1] = ficha.toUpperCase();
            document.getElementById(posX + "," + posY).style.backgroundColor = partida.comprovarLetra(ficha.toUpperCase(), posX, posY);
            //TODO funcionalidad de las letras
        } else {

            alert("Ficha descubierta");

        }

    }

}

function clear() {

    document.getElementById("posX").value = "";
    document.getElementById("posY").value = "";

}

function disable(){

    document.getElementById("insBoto").disabled = true;
    document.getElementById("abanBoto").disabled = true;

}

function enable(){

    document.getElementById("insBoto").disabled = false;
    document.getElementById("abanBoto").disabled = false;

}

function end() {

    disable();

    document.getElementById("createTable").style.display = "none";


}
