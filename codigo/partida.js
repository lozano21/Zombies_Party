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
    casillasSeleccionadas: 0,


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

        this.reinicio();
        this.medidaTablero = coordenadas;
        this.iniciarTablero(coordenadas);
        this.crearRecompensas();
        this.crearZombies();
        this.crearEstrellas();
        this.generarTabla(coordenadas);
        this.Estadisticas();

        if (this.medidaTablero > 10) {
            document.getElementById("posX").maxLength = 2;
            document.getElementById("posY").maxLength = 2;
        }

        /*
        document.getElementById("posX").maxLength = this.medidaTablero >= 10 ? 2 : 1;
        document.getElementById("posY").maxLength = this.medidaTablero >= 10 ? 2 : 1;
        */

    },

    /**
     * Creación de tabla mediante divs
     * @param coordenadas - numero de filas y columnas
     */
    generarTabla: function(coordenadas) {

        let tablero = "<div id='master' class='center'>";

        for (let i = 1; i < coordenadas + 1; i++) {

            tablero += "<div id='row' class='row'>";

            for (let j = 1; j < coordenadas + 1; j++) {

                if (coordenadas >= 5 && coordenadas <= 8) {

                    tablero += "<div id='" + i + "," + j + "' class='large_cell' onclick='coordMan(this.id)'><img src='imagenes/casilla.png'></div>";

                } else if (coordenadas >= 9 && coordenadas <= 11) {

                    tablero += "<div id='" + i + "," + j + "' class='medium_cell' onclick='coordMan(this.id)'><img src='imagenes/casilla.png'></div>";

                } else if (coordenadas >= 12 && coordenadas <= 16) {

                    tablero += "<div id='" + i + "," + j + "' class='small_cell' onclick='coordMan(this.id)'><img src='imagenes/casilla.png'></div>";

                } else {

                    tablero += "<div id='" + i + "," + j + "' class='XS_cell' onclick='coordMan(this.id)'><img src='imagenes/casilla.png'></div>";

                }
            }
            tablero += "</div>";
        }
        tablero += "</div>";

        // Mete dentro del elemento createTable todo el string tablero que pasa a ser HTML de verdad
        document.getElementById('createTable').innerHTML = tablero;
    },



    //RECOMPENSAS  = Crea las recompensas llamando a las funciones
    crearRecompensas: function() {
        //25% de uso
        while (this.recompensasCreadas < ((this.medidaTablero * this.medidaTablero) * 25) / 100) {

            this.crearDoblePuntos();
            this.crearMitadZombie();
            this.crearVidaExtra();

        }
    },

    //Rellena la tabla con DoblesPuntos(DP)
    crearDoblePuntos: function() {

        try {

            var cdp = new puntosDobles(1, 0);
            var x = 0,
                y = 0;
            do {

                x = Math.floor(Math.random() * this.medidaTablero);
                y = Math.floor(Math.random() * this.medidaTablero);

            } while (this.tablero[x][y] != "g");

            cdp.x = x;
            cdp.y = y;

            this.tablero[x][y] = "dp";
            this.recompensasCreadas += 1;
            this.doblePuntos.push(cdp);

        } catch (e) {}
    },

    //Ubica los Mitad Zombies de forma horizontal o vertical dependiendo del math random
    crearMitadZombie: function() {

        try {

            let orientacion = Math.floor(Math.random() * 2);
            var cmz = new mitadZombies(2, orientacion);
            cmz.casillas = 0;
            if (orientacion == 0) {
                var x = 0,
                    y = 0;
                do {

                    x = Math.floor(Math.random() * this.medidaTablero);
                    y = Math.floor(Math.random() * this.medidaTablero);

                } while (this.tablero[x][y] != "g" || this.tablero[x + 1][y] != "g" || x <= this.medidaTablero - 2);

                cmz.x = x;
                cmz.y = y;
                cmz.orientacion = orientacion;

                this.tablero[x][y] = "mz";
                this.tablero[x + 1][y] = "mz";
                this.recompensasCreadas += 2;

            } else {
                var x = 0,
                    y = 0;
                do {
                    x = Math.floor(Math.random() * this.medidaTablero);
                    y = Math.floor(Math.random() * this.medidaTablero);

                } while (this.tablero[x][y] != "g" || this.tablero[x][y + 1] != "g" || y > this.medidaTablero - 2);

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

    //Ubíca las Vidas Extra de forma horizontal o vertical dependiendo del math random
    crearVidaExtra: function() {

        try {

            let orientacion = Math.floor(Math.random() * 2);
            var cve = new vidaExtra(3, orientacion);
            cve.casillas = 0;

            if (orientacion == 0) {
                var x = 0,
                    y = 0;
                do {
                    x = Math.floor(Math.random() * this.medidaTablero);
                    y = Math.floor(Math.random() * this.medidaTablero);

                } while (this.tablero[x][y] != "g" || this.tablero[x - 1][y] != "g" || this.tablero[x + 1][y] != "g" || x > this.medidaTablero - 2 && x <= 0);

                cve.x = x;
                cve.y = y;
                cve.orientacion = orientacion;
                this.tablero[x][y] = "ve";
                this.tablero[x + 1][y] = "ve";
                this.tablero[x - 1][y] = "ve";
                this.recompensasCreadas += 3;

            } else {
                var x = 0,
                    y = 0;
                do {
                    x = Math.floor(Math.random() * this.medidaTablero);
                    y = Math.floor(Math.random() * this.medidaTablero);

                } while (this.tablero[x][y] != "g" || this.tablero[x][y - 1] != "g" || this.tablero[x][y + 1] != "g" || y > this.medidaTablero - 2 && y <= 0);

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

        while (this.zombiesCreados < ((this.medidaTablero * this.medidaTablero) * 25) / 100) {
            var cz = new zombie();
            cz.seleccionado = false;

            var x = 0, y = 0;
            do {

                x = Math.floor(Math.random() * this.medidaTablero);
                y = Math.floor(Math.random() * this.medidaTablero);

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
    esSeleccionado: function(seleccion) {

        var sel = true;

        for (i = 0; i < seleccion.length; i++) {

            if (!seleccion[i].sel) {

                sel = false;

            }
        }

        return sel;
    },
    */
    GetImageByLetter: function(ficha) {
        switch (ficha.toUpperCase()) {

            case "DP":

                return 'imagenes/2x.png';
            case "MZ":

                return 'imagenes/mitadzombie.png';
            case "VE":

                return 'imagenes/life.png';
            case "Z":

                return 'imagenes/tyrant.png';
            case "E":

                return 'imagenes/star.png';
            case "G":

                return 'imagenes/re2c2.png';
        }
    },

    //Función para revelar el tablero si escoges la casilla en la que estaba la estrella
    RevelarTablero: function() {

        /*Primero mostrar todo el tablero (como la funcion de mostrar X pero en vez de mostrar X mostramos this.tablero[i][j]), después de 3 segundos llamar otra vez a la funcion generarTabla
        luego llamar a la estrella para dejarla descubierta*/

        //Itera todo el tablero y lo muestra
        for (let i = 1; i <= this.tablero.length; i++) {

            for (let j = 1; j <= this.tablero[0].length; j++) {

                let ficha = this.tablero[i - 1][j - 1];
                document.getElementById(i + "," + j).innerHTML = '<img src="' + this.GetImageByLetter(ficha) + '"class="L_cont_cell" />';
            }
        }

        setTimeout(function() {

            //Resetea todo el tablero a X
            for (let i = 1; i <= partida.tablero.length; i++) {

                for (let j = 1; j <= partida.tablero[0].length; j++) {
                    document.getElementById(i + "," + j).innerHTML = '<img src="imagenes/casilla.png" class="L_cont_cell" />';
                }
            }

            //Muestra los inputs guardados
            for (let it = 0; it < partida.inputs.length; it++) {

                const inp = partida.inputs[it];
                var i = inp[0] + 1;
                var j = inp[1] + 1;

                let ficha = partida.tablero[i - 1][j - 1];
                console.log(inp + " " + i + " " + j);
                document.getElementById(i + "," + j).innerHTML = '<img src="' + partida.GetImageByLetter(ficha) + '"class="L_cont_cell" />';

            }

        }, 3000); //Wait 3 sec



    },

    eliminarMitadZombies: function() {
        var zombiesDescubiertos = 0;
        for (i = 0; i != this.zombies.length; i++) {
            if (!this.zombies[i].seleccionado) {
                zombiesDescubiertos++;
            }
        }
        var mitadZombiesDescubiertos = Math.trunc(zombiesDescubiertos / 2); //División que devuelve en entero
        
        a = 0;
        while (mitadZombiesDescubiertos >= 0 && a < this.zombies.length) {
            var z = this.zombies[a];
            if (z.seleccionado == false) {
                mitadZombiesDescubiertos--;
                this.tablero[z.x][z.y] = 'g';
                this.zombies.splice(a, 1); //Elimina en la posición a un unico zombie de la lista zombies
            }
            a++;
        }
        console.log(this.zombies);
        this.Estadisticas();
    },

    comprovarLetra: function(letra, posX, posY) {

        this.iniciarTablero();
        partida.casillasSeleccionadas++;
        switch (letra.toUpperCase()) {

            case "DP":

                posX--;
                posY--;
                for (i = 0; i < partida.doblePuntos.length; i++) {

                    if (posX == partida.doblePuntos[i].x && posY == partida.doblePuntos[i].y) { //Si encuentra en esa posicion que tiene las mismas coordenadas que yo suma las estadisticas

                        partida.doblesPuntosEncontrados++;
                        partida.doblePuntos[i].seleccionado = true;

                    }
                }

                this.puntos = this.puntos * 2; //Dobla la puntuación
                this.Estadisticas();

                break;
            case "MZ":


                posX--;
                posY--;
                for (i = 0; i < partida.mitadZombie.length; i++) {
                    var vE = partida.mitadZombie[i];
                    if (posX == vE.x && posY == vE.y || //centro
                        posX - 1 == vE.x && posY == vE.y || //izquierda
                        posX + 1 == vE.x && posY == vE.y || //derecha
                        posX == vE.x && posY - 1 == vE.y || //abajo
                        posX == vE.x && posY + 1 == vE.y) { //arriba
                        vE.casillas++;
                        vE.seleccionado = true;
                        if (vE.casillas == 2) {
                            partida.mitadZombiesEncontrados++;
                            partida.eliminarMitadZombies();
                        }
                    }
                }

                this.Estadisticas();

                break;
            case "VE":
                posX--;
                posY--;
                for (i = 0; i < partida.vidaExtra.length; i++) {
                    var vE = partida.vidaExtra[i];
                    if (posX == vE.x && posY == vE.y || //centro
                        posX - 1 == vE.x && posY == vE.y || //izquierda
                        posX + 1 == vE.x && posY == vE.y || //derecha
                        posX == vE.x && posY - 1 == vE.y || //abajo
                        posX == vE.x && posY + 1 == vE.y) { //arriba
                        vE.casillas++;
                        vE.seleccionado = true;
                        if (vE.casillas == 3) {
                            partida.vidas++;
                            partida.vidasExtrasEncontradas++;
                        }
                    }
                }
                this.Estadisticas();

                break;
            case "Z":

                this.zombiesEncontrados++;
                this.puntos = this.puntos - 100 < 0 ? 0 : this.puntos - 100; // ternaria para substituir el if

                posX--;
                posY--;
                
                for (let i = 0; i < partida.zombies.length; i++) {
                    if(partida.zombies[i].x == posX && partida.zombies[i].y == posY){
                        partida.zombies[i].seleccionado = true;
                        break;
                    }
                }

                this.vidas--;
                if (this.vidas == 0) {

                    localStorage.perdidas = Number(localStorage.perdidas) + 1;
                    this.updateHighscore();

                    setTimeout(function() {

                        let ask = confirm("Los zombies te han devorado\nQuieres volver a jugar?");
                        end();

                        setTimeout(function() {

                            if (ask) {

                                inicio();

                            }

                        }, 250);

                    }, 250);

                }

                this.Estadisticas();
                break;

            case "E":

                partida.estrellasEncontradas++;
                this.puntos += 200;

                for (i = 0; i < partida.estrellas.length; i++) {

                    if (partida.estrellas[i].posX == posX && partida.estrellas[i].posY == posY) {

                        partida.estrellas[i].seleccionado = true;
                    }
                }

                if (partida.estrellasEncontradas == 5) {

                    this.updateHighscore();

                    setTimeout(function() {

                        let ask = confirm("Enhorabuena, has erradicado a los zombies!\nQuieres volver a jugar?");
                        end();

                        setTimeout(function() {


                            if (confirm) {

                                inicio();

                            }

                        }, 250);

                    }, 250);

                    localStorage.ganadas = Number(localStorage.ganadas) + 1;

                }
                if (partida.casillasSeleccionadas < 2) {
                    console.log(partida.casillasSeleccionadas);
                    this.RevelarTablero();
                }

                this.Estadisticas();

                break;
            case "G":

                this.puntos += 50;
                this.Estadisticas();

                break;

        }
    },

    Estadisticas: function() {

        let infoPartida = "";
        let hs = "";
        let infoJuego = "";


        infoPartida += "Estrellas: " + this.estrellasEncontradas + " / " + this.estrellas.length + "<br><br>";

        infoPartida += "Zombies: " + this.zombiesEncontrados + " / " + this.zombies.length + "<br><br>";

        infoPartida += "Puntos dobles: " + this.doblesPuntosEncontrados + " / " + this.doblePuntos.length + "<br><br>";

        infoPartida += "Vidas extra: " + this.vidasExtrasEncontradas + " / " + this.vidaExtra.length + "<br><br>";

        infoPartida += "Mitad zombie: " + this.mitadZombiesEncontrados + " / " + this.mitadZombie.length + "<br><br>";

        infoPartida += "Vidas: " + this.vidas;

        infoJuego += "Partidas ganadas: " + localStorage.ganadas + "<br><br>";
        infoJuego += "Partidas perdidas: " + localStorage.perdidas + "<br><br>";
        infoJuego += "Partidas abandonadas: " + localStorage.abandonadas;

        document.getElementById("sTitulo").innerHTML = "<h2>PUNTUACIONES DEL JUEGO:</h2>"
        document.getElementById("puntos").innerHTML = "Puntos totales: <br>" + this.puntos;

        document.getElementById("infoPartida").innerHTML = infoPartida;

        document.getElementById("hTitulo").innerHTML = "<h2>PUNTUACIÓN MÁXIMA</h2>";
        document.getElementById("hPuntos").innerHTML = localStorage.highscore;

        document.getElementById("gTitulo").innerHTML = "<h2>ESTADÍSTICAS</h2>";
        document.getElementById("infoJuego").innerHTML = infoJuego;

    },

    abandona: function() {

        this.updateHighscore();
        disable();
        end();

        localStorage.abandonadas = Number(localStorage.abandonadas) + 1;
        this.Estadisticas();

        setTimeout(function() {

            let ask = confirm("Los zombies te han abrumado la mente.\nQuieres crear otra partida?");

            if (ask) {

                inicio();

            }

        }, 250);

    },

    reinicio: function() {

        this.zombies = [];
        this.estrellas = [];
        this.tablero = [];
        this.inputs = [];
        this.recompensasCreadas = 0;
        this.medidaTablero = 5;
        this.mitadZombie = [];
        this.doblePuntos = [];
        this.vidaExtra = [];
        this.zombiesCreados = 0;
        this.estrellasCreadas = 0;
        this.puntos = 0;
        this.estrellasEncontradas = 0;
        this.vidasExtrasEncontradas = 0;
        this.zombiesEncontrados = 0;
        this.mitadZombiesEncontrados = 0;
        this.doblesPuntosEncontrados = 0;
        this.vidas = 3;
        this.casillasSeleccionadas = 0;

    },

    lStorage: function() {

        if (typeof(Storage) !== "undefined") {

            localStorage.ganadas = 0;
            localStorage.perdidas = 0;
            localStorage.abandonadas = 0;
            localStorage.highscore = 0;

        }

    },


    updateHighscore: function(){

        localStorage.highscore = Number(localStorage.highscore) + this.puntos;
        this.Estadisticas();

    }
}
