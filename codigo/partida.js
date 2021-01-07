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

        this.medidaTablero = coordenadas;
        this.iniciarTablero(coordenadas);
        this.crearRecompensas();
        this.crearZombies();
        this.crearEstrellas();
        this.generarTabla(coordenadas);
        this.Estadisticas();

        document.getElementById("posX").maxLength = this.medidaTablero >= 10 ? 2 : 1;
        document.getElementById("posY").maxLength = this.medidaTablero >= 10 ? 2 : 1;


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

                if (coordenadas >= 5 && coordenadas <= 8){

                    tablero += "<div id='" + i + "," + j + "' class='large_cell' onclick='coordMan(this.id)'><img src='imagenes/equis.png'></div>";

                } else if (coordenadas >= 9 && coordenadas <= 12) {

                    tablero += "<div id='" + i + "," + j + "' class='medium_cell'><img src='imagenes/equis.png'></div>";

                } else if (coordenadas >= 13 && coordenadas <= 17) {

                    tablero += "<div id='" + i + "," + j + "' class='small_cell'><img src='imagenes/equis.png'></div>";

                } else {

                    tablero += "<div id='" + i + "," + j + "' class='XS_cell'><img src='imagenes/equis.png'></div>";

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

        var cz = new zombie();

        while (this.zombiesCreados < ((this.medidaTablero * this.medidaTablero) * 25) / 100) {

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

    esSeleccionado: function(seleccion) {

        var sel = true;

        for (i = 0; i < seleccion.length; i++) {

            if (!seleccion[i].sel) {

                sel = false;

            }
        }

        return sel;
    },

    GetImageByLetter: function(ficha) {
        switch (ficha.toUpperCase()) {

            case "DP":

                return 'imagenes/2x.png';
            case "MZ":

                return 'imagenes/meitatzombie.jpg';
            case "VE":

                return 'imagenes/life.png';
            case "Z":

                return 'imagenes/zombie.gif';
            case "E":

                return 'imagenes/star.png';
            case "G":

                return 'imagenes/grass.png';
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
                    document.getElementById(i + "," + j).innerHTML = '<img src="imagenes/equis.png" class="L_cont_cell" />';
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

        let zombiesDescubiertos = 0;

        for (i = 0; i != this.zombies.length; i++) {

            if (this.zombies[i].seleccionado == false) {

                zombiesDescubiertos++;

            }
        }

        let mitadZombiesDescubiertos = (zombiesDescubiertos / 2);
        a = 0;

        while (mitadZombiesDescubiertos >= 0) {

            if (!this.zombies[a].seleccionado) {

                this.zombies[a].seleccionado = true;
                mitadZombiesDescubiertos--;

                this.getTablero()[this.zombies[a].x][this.zombies[a].y] = 'g';

            }

            a++;
        }
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

                return '#fff';
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

                return '#e62e1b';
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

                return '#7FED7E';
            case "Z":

                this.zombiesEncontrados++;
                this.puntos = this.puntos - 100 < 0 ? 0 : this.puntos - 100; // ternaria para substituir el if

                this.vidas--;
                this.Estadisticas();

                if (this.vidas == 0) {

                    setTimeout(function() {

                        alert("HAS PERDIDO!!!");
                        end();

                    }, 250);


                }

                return '#93c572';
            case "E":

                partida.estrellasEncontradas++;
                this.puntos += 200;

                for (i = 0; i < partida.estrellas.length; i++) {

                    if (partida.estrellas[i].posX == posX && partida.estrellas[i].posY == posY) {

                        partida.estrellas[i].seleccionado = true;
                    }
                }
                
                if(partida.estrellasEncontradas==5){
                    setTimeout(function() {

                        alert("HAS GANADO!!!");
                        end();

                    }, 250);
                }
                if (partida.casillasSeleccionadas<2){
                    console.log(partida.casillasSeleccionadas);
                    this.RevelarTablero();
                }

                this.Estadisticas();

                return '#57a639';
            case "G":

                this.puntos += 50;
                this.Estadisticas();

                return '#F09D61';

        }
        return '#fff';
    },

    Estadisticas: function() {

        var ver;

        ver = "<H2>PUNTUACIONES DEL JUEGO:</H2>"
        ver += "Puntos totales: " + this.puntos;
        ver += "</br>";
        ver += "</br>";
        ver += "Estrellas: " + this.estrellas.length;
        ver += "</br>";
        ver += "Estrellas encontradas: " + this.estrellasEncontradas;
        ver += "</br>";
        ver += "Zombies: " + this.zombies.length;
        ver += "</br>";
        ver += "Zombies encontrados: " + this.zombiesEncontrados;
        ver += "</br>";
        ver += "Puntos dobles: " + this.doblePuntos.length;
        ver += "</br>";
        ver += "Puntos dobles encontrados: " + this.doblesPuntosEncontrados;
        ver += "</br>";
        ver += "Vidas extra: " + this.vidaExtra.length;
        ver += "</br>";
        ver += "Vidas extra encontradas: " + this.vidasExtrasEncontradas;
        ver += "</br>";
        ver += "Mitad zombie: " + this.mitadZombie.length;
        ver += "</br>";
        ver += "Mitad zombie encontrados: " + this.mitadZombiesEncontrados;
        ver += "</br>";
        ver += "Vidas: " + this.vidas;
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

        document.getElementById("centerStats").innerHTML = ver;

    }
}
