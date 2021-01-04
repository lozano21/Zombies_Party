var partida = {
    zombies: [],
    estrellas: [],
    tablero: [],
    inputs: [],
    recompensasCreadas: 0,
    medidaTablero: 5,
    mitadZombie: [],
    doblePuntos: [],
    vidaExtra: [],
    zombiesCreados: 0,
    estrellasCreadas: 0,
    puntos: 0,
    estrellasEncontradas: 0,
    vidasExtrasEncontradas: 0,
    zombiesEncontrados: 0,
    mitadZombiesEncontrados: 0,
    doblesPuntosEncontrados: 0,
    vidas: 3,

    //Rellenamos las casillas de campo (consola), e iniciamos tablero del tamaño escogido con G's
    iniciarTablero: function(coordenadas) {

        for (let i = 0; i < coordenadas; i++) {

            this.tablero[i] = [];

            for (let j = 0; j < coordenadas; j++) {

                this.tablero[i][j] = "g";

            }
        }
        console.log(this.tablero);
    },

    //Core, inicia todas las funciones por orden
    iniciarJuego: function(coordenadas) {

        this.medidaTablero = coordenadas;
        this.iniciarTablero(coordenadas);
        this.crearRecompensas();
        this.crearZombies();
        this.crearEstrellas();
        this.generarTabla(coordenadas);
        this.Estadisticas();

    },
    //Genera la tabla en los divs del html
    generarTabla: function(coordenadas) {

        let tablero = "<div id='master' class='center'>";

        for (let i = 1; i < coordenadas + 1; i++) {

            tablero += "<div class='row'>";

            for (let j = 1; j < coordenadas + 1; j++) {

                if (coordenadas >= 5 && coordenadas <= 8) {

                    tablero += "<div id='" + i + "," + j + "' class='large_cell' onclick='seleccionarCoordenadas()'>";
                    tablero += "<p class='L_cont_cell'> X </p></div>";
                    //console.log(i + "," + j);

                } else if (coordenadas >= 9 && coordenadas <= 20) {

                    tablero += "<div id='" + i + "," + j + "' class='small_cell' onclick='seleccionarCoordenadas()'>";
                    tablero += "<p class='S_cont_cell'> X </p></div>";
                    //console.log(i + "," + j);

                }


            }

            tablero += "</div>";

        }

        tablero += "</div>";
        document.getElementById('createTable').innerHTML = tablero;

    },


    //RECOMPENSAS  = Crea las recompensas llamando a las funciones
    crearRecompensas: function() {
    //25% de uso
        while(this.recompensasCreadas < ((this.medidaTablero * this.medidaTablero) * 25) / 100){

            this.crearDoblePuntos();
            this.crearMitadZombie();
            this.crearVidaExtra();

        }
    },
    //Rellena la tabla con DoblesPuntos(DP)
    crearDoblePuntos: function() {

        try {

            var cdp = new puntosDobles(1);

            do {

                var x = Math.floor(Math.random() * this.medidaTablero);
                var y = Math.floor(Math.random() * this.medidaTablero);

            } while (this.tablero[x][y] != "g");

            cdp.x = x;
            cdp.y = y;

            this.tablero[x][y] = "dp";
            this.recompensasCreadas += 1;
            this.doblePuntos.push(cdp);

        } catch (e) {}
    },

    //Ubica MT de forma horizontal o vertical dependiendo del math random
    crearMitadZombie: function() {

        try {

            var cmz = new mitadZombies(2);
            let orientacion = Math.floor(Math.random() * 2);

            if (orientacion == 0) {

                do {

                    var x = Math.floor(Math.random() * this.medidaTablero);
                    var y = Math.floor(Math.random() * this.medidaTablero);

                } while (this.tablero[x][y] != "g" || this.tablero[x + 1][y] != "g");

                cmz.x = x;
                cmz.y = y;
                cmz.orientacion = orientacion;

                this.tablero[x][y] = "mz";
                this.tablero[x + 1][y] = "mz";
                this.recompensasCreadas += 2;

            } else {

                do {

                    var x = Math.floor(Math.random() * this.medidaTablero);
                    var y = Math.floor(Math.random() * this.medidaTablero);

                } while (this.tablero[x][y] != "g" || this.tablero[x][y + 1] != "g");

                cmz.x = x;
                cmz.y = y;
                cmz.orientacion = orientacion;

                this.tablero[x][y] = "mz";
                this.tablero[x][y + 1] = "mz";
                this.recompensasCreadas += 2;
            }

            this.mitadZombie.push(cmz);

        } catch (e) {}
    },

    //Ubica VD de forma horizontal o vertical dependiendo del math random
    crearVidaExtra: function() {

        try {

            var cve = new vidaExtra(3);
            vidaExtra(3);
            let orientacion = Math.floor(Math.random() * 2);

            if (orientacion == 0) {

                do {

                    var x = Math.floor(Math.random() * this.medidaTablero);
                    var y = Math.floor(Math.random() * this.medidaTablero);

                } while (this.tablero[x][y] != "g" || this.tablero[x - 1][y] != "g" || this.tablero[x + 1][y] != "g" || x >= this.medidaTablero - 1);

                cve.x = x;
                cve.y = y;
                cve.orientacion = orientacion;

                this.tablero[x][y] = "ve";
                this.tablero[x + 1][y] = "ve";
                this.tablero[x - 1][y] = "ve";
                this.recompensasCreadas += 3;

            } else {

                do {

                    var x = Math.floor(Math.random() * this.medidaTablero);
                    var y = Math.floor(Math.random() * this.medidaTablero);

                } while (this.tablero[x][y] != "g" || this.tablero[x - 1][y] != "g" || this.tablero[x + 1][y] != "g" || x >= this.medidaTablero - 1);

                cve.x = x;
                cve.y = y;
                cve.orientacion = orientacion;

                this.tablero[x][y] = "ve";
                this.tablero[x][y + 1] = "ve"
                this.tablero[x][y - 1] = "ve"
                this.recompensasCreadas += 3;
            }

            this.vidaExtra.push(cve);

        } catch (e) {}
    },

    //ZOMBIES = Crea Z en el tablero ocupando un 25%
    crearZombies: function() {

        var cz = new zombie();

        while(this.zombiesCreados < ((this.medidaTablero * this.medidaTablero)* 25) / 100){

            do {

                var x = Math.floor(Math.random() * this.medidaTablero);
                var y = Math.floor(Math.random() * this.medidaTablero);

            } while (this.tablero[x][y] != "g");

            cz.x = x;
            cz.y = y;

            this.tablero[x][y] = "z";
            this.zombiesCreados++;
            this.zombies.push(cz);

        }
    },

    //ESTRELLAS = Crea 
    crearEstrellas: function() {

        try {

            var ce = new estrella();

            while (this.estrellasCreadas < (this.medidaTablero)) {

                do {

                    var x = Math.floor(Math.random() * this.medidaTablero);
                    var y = Math.floor(Math.random() * this.medidaTablero);

                } while (this.tablero[x][y] != "g");

                ce.x = x;
                ce.y = y;

                this.tablero[x][y] = "e";
                this.estrellasCreadas++;
                this.estrellas.push(ce);

            }

        } catch (e) {}
    },

    getPosicion: function(posX, posY) {

        return this.tablero[posX][posY];

    },

    getTablero: function() {

        return this.tablero;

    },
    /*
    seleccionarCoordenada: function(){

        posX = document.getElementById("posX").value;
        posY = document.getElementById("posY").value;

        if(posX >= 0 && posX < partida.medidaTablero && posY >= 0 && posY < partida.medidaTablero){

            var ficha = partida.tablero[posX][posY];

            if(ficha.toString() === ficha.toLowerCase()){



                document.getElementById(posX + "," + posY).innerHTML = "<p class='L_cont_cell'>" + ficha.toUpperCase() + "</p>";
                partida.tablero[posX][posY] =  ficha.toUpperCase();
                //document.getElementById(posX.toString() + posY.toString()).style.backgroundColor = partida.comprovarLetra(ficha.toUpperCase(),posX,posY);

            }else{

                alert('Ficha descubierta');

            }

        }else{

            alert('Posición incorrecta');

        }



    },
    */
    //Función para revelar el tablero si escoges la casilla en la que estaba la estrella
    esSeleccionado: function(seleccion){
        var sel = true;
        for(i = 0; i < seleccion.length; i++){
            if(seleccion[i].sel != null){
                sel = false;
            }
        }
        return sel;
    },
    RevelarTablero: function() {
        /*Primero mostrar todo el tablero (como la funcion de mostrar X pero en vez de mostrar X mostramos this.tablero[i][j]), después de 3 segundos llamar otra vez a la funcion generarTabla
        luego llamar a la estrella para dejarla descubierta*/

        //Itera todo el tablero y lo muestra
        for (let i = 1; i <= this.tablero.length; i++) {
            for (let j = 1; j <= this.tablero[0].length; j++) {
                let ficha = this.tablero[i - 1][j - 1];

                if (this.medidaTablero >= 5 && this.medidaTablero <= 8) {
                    document.getElementById(i + "," + j).innerHTML = "<p class='L_cont_cell'>" + ficha.toUpperCase() + "</p>";
                } else {
                    document.getElementById(i + "," + j).innerHTML = "<p class='S_cont_cell'>" + ficha.toUpperCase() + "</p>";
                }
            }
        }

        setTimeout(function() {
            //Resetea todo el tablero a X
            for (let i = 1; i <= partida.tablero.length; i++) {
                for (let j = 1; j <= partida.tablero[0].length; j++) {
                    if (partida.medidaTablero >= 5 && partida.medidaTablero <= 8) {
                        document.getElementById(i + "," + j).innerHTML = "<p class='L_cont_cell'>X</p>";
                    } else {
                        document.getElementById(i + "," + j).innerHTML = "<p class='S_cont_cell'>X</p>";
                    }
                }
            }
            //Muestra los inputs guardados
            for (let it = 0; it < partida.inputs.length; it++) {
                const inp = partida.inputs[it];
                var i = inp[0] + 1;
                var j = inp[1] + 1;

                let ficha = partida.tablero[i - 1][j - 1];
                console.log(inp + " " + i + " " + j);

                if (partida.medidaTablero >= 5 && partida.medidaTablero <= 8) {
                    document.getElementById(i + "," + j).innerHTML = "<p class='L_cont_cell'>" + ficha.toUpperCase() + "</p>";
                } else {
                    document.getElementById(i + "," + j).innerHTML = "<p class='S_cont_cell'>" + ficha.toUpperCase() + "</p>";
                }
            }
        }, 3000); //Wait 3 sec


    },
    comprovarLetra: function(letra, posX, posY) {

        this.iniciarTablero(); //Porque llamais a iniciartablero? by Dani
        //letra = partida.tablero[posX][posY].toUpper();
        switch (letra.toUpperCase()) {

            case "DP":

                for (i = 0; i < this.doblePuntos.length; i++) {

                    if (this.doblePuntos[i].posY == posY && this.doblePuntos[i].posX == posX) { //Si encuentra en esa posicion que tiene las mismas coordenadas que yo suma las estadisticas

                        this.doblesPuntosEncontrados++;
                        this.doblePuntos[i].seleccinado = true;

                    }
                }

                this.puntos *= 2; //Dobla la puntuación
                this.Estadisticas();

                break;
            case "MZ":

                for(i = 0; i < this.mitadZombie.length;i++){

                    if(this.mitadZombie[i].orientacion == 1){

                        if((x - 1) == this.mitadZombie[i].posX || x == this.mitadZombie[i].posX){

                            this.mitadZombie[i].medidaTablero--; //falta hacer que se reduzcan los zombies

                            if(this.mitadZombie[i].medidaTablero == 0){

                                this.mitadZombiesEncontrados++;
                                this.mitadZombie[i].seleccinado = true;
                                
                            }
                        }
                    }

                    if(this.mitadZombie[i].orientacion == 0){

                        if((y - 1) == this.mitadZombie[i].posX || y == this.mitadZombie[i].posX){

                            this.mitadZombie[i].medidaTablero--;

                            if(this.mitadZombie[i].medidaTablero == 0){

                                this.mitadZombiesEncontrados++;
                                this.mitadZombie[i].seleccinado = true;

                            }
                        }
                    }
                }

                this.Estadisticas();

                break;
            case "VE":

                for(i = 0; i < this.vidaExtra.length;i++){

                    if (this.vidaExtra[i].orientacion == 1) {

                        if ((x - 1) == this.vidaExtra[i].posX || (x + 1) == this.vidaExtra[i].posX || x == this.vidaExtra[i].posX) {

                            this.vidaExtra[i].medidaTablero--;

                            if (this.vidaExtra[i].medidaTablero == 0) {

                                this.vidasExtrasEncontradas++;
                                this.vidaExtra[i].seleccinado = true;
                                this.vidas++;

                            }
                        }
                    }

                    if (this.vidaExtra[i].orientacion == 0) {

                        if ((y - 1) == this.vidaExtra[i].posX || (y + 1) == this.vidaExtra[i].posX || y == this.vidaExtra[i].posX) {

                            this.vidaExtra[i].medidaTablero--;

                            if (this.vidaExtra[i].medidaTablero == 0) {

                                this.vidasExtrasEncontradas++;
                                this.vidaExtra[i].seleccinado = true;
                                this.vidas++;
                            }
                        }
                    }
                }
                this.Estadisticas();

                break;
            case "Z":

                this.zombiesEncontrados++;

                if (this.puntos > 100) {

                    this.puntos -= 100;

                } else {

                    this.puntos = 0;

                }

                this.vidas --;
                this.Estadisticas();

                if (this.vidas == 0) {

                    setTimeout(function() {

                        alert("HAS PERDIDO!!!");

                    }, 3000);
                }

                break;
            case "E":

                this.estrellas++;
                this.puntos += 200;

                for (i = 0; i < this.estrellas.length; i++) {
                    if (this.estrellas[i].posX == posX && this.estrellas[i].posY == posY) {
                        this.estrellas[i].seleccinado = true;
                    }
                }

                this.RevelarTablero();

                this.Estadisticas();

                if (this.esSeleccionado(this.estrellas)) {

                    setTimeout(function() {

                        alert("HAS GANADO!!!");

                    }, 2000);
                }

                break;
            case "G":

                this.puntos += 50;
                this.Estadisticas();

                break;

        }
    }


        Estadisticas: function(){
            var estadisticas
            var ver;
            ver = "<H2>PUNTUACIONES DEL JUEGO:</H2>"
            ver += "Estrellas: " + this.estrellas.length;
            ver += "</br>";
            ver += "Estrellas encontradas: "+this.estrellasEncontradas;
            ver += "</br>";
            ver += "Zombies: "+this.zombies.length;
            ver += "</br>";
            ver += "Zombies encontrados: "+this.zombiesEncontrados;
            ver += "</br>";
            ver += "Puntos dobles: "+this.doblePuntos.length;
            ver += "</br>";
            ver += "Puntos dobles encontrados: "+this.doblesPuntosEncontrados;
            ver += "</br>";
            ver += "Vidas extra: "+this.vidaExtra.length;
            ver += "</br>";
            ver += "Vidas extra encontradas: "+this.vidasExtrasEncontradas;
            ver += "</br>";
            ver += "Mitad zombie: "+this.mitadZombie.length;
            ver += "</br>";
            ver += "Mitad zombie encontrados: "+this.mitadZombiesEncontrados;
            ver += "</br>";
            ver += "Vidas: "+this.vidas;
            ver += "</br>";
            ver += "</br>";
            ver += "</br>";
            ver += "</br>";
            ver += "ESTADISTICAS:";
            ver += "</br>";
            ver += "Partidas ganadas: ";
            ver += "</br>";
            ver += "Partidas perdidas: ";
            ver += "</br>";
            ver += "partidas abandonadas: ";
            

            estadisticas = document.getElementById("stats").innerHTML = ver;

        }

    //new function descubrir casilla pillar X y Y y comprovar q no esté descubierta y si no, q la muestre



}

//document.getElementById("insBoto").addEventListener("click", partida.seleccionarCoordenada);
/*

    rellenarTabla: function(coordenadas){
        for(let i = 0;i<coordenadas;i++){
            this.tablero[i]= [];
            for(let j = 0;j < coordenadas[i];j++){
               this.tablero[i][j] = "g";
            }
        }
        this.generarTabla();
    },
}
*/