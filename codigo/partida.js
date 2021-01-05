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
    //Creación de tabla mediante divs
    generarTabla: function(coordenadas) {

        let tablero = "<div id='master' class='center'>";

        for (let i = 1; i < coordenadas + 1; i++) {

            tablero += "<div class='row'>";

            for (let j = 1; j < coordenadas + 1; j++) {

                if (coordenadas >= 5 && coordenadas <= 8) {

                    tablero += "<div id='" + i + "," + j + "' class='large_cell' onclick='seleccionarCoordenadas()'>";
                    tablero += '<img src="imagenes/equis.png" class="L_cont_cell" /></div>';
                    //console.log(i + "," + j);

                } else if (coordenadas >= 9 && coordenadas <= 20) {

                    tablero += "<div id='" + i + "," + j + "' class='small_cell' onclick='seleccionarCoordenadas()'>";
                    tablero += '<img src="imagenes/equis.png" class="L_cont_cell" /></div>';
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

    //Ubica los Mitad Zombies de forma horizontal o vertical dependiendo del math random
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

    //Ubica las Vidas Extra de forma horizontal o vertical dependiendo del math random
    crearVidaExtra: function() {

        try {

            var cve = new vidaExtra(3);
            let orientacion = Math.floor(Math.random() * 2);

            if (orientacion == 0) {

                do {

                    var x = Math.floor(Math.random() * this.medidaTablero);
                    var y = Math.floor(Math.random() * this.medidaTablero);

                } while (this.tablero[x][y] != "g" || this.tablero[x - 1][y] != "g" || this.tablero[x + 1][y] != "g" || x >= this.medidaTablero - 2);

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

                } while (this.tablero[x][y] != "g" || this.tablero[x - 1][y] != "g" || this.tablero[x + 1][y] != "g" || x >= this.medidaTablero - 2);

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

    esSeleccionado: function(seleccion){

        var sel = true;

        for(i = 0; i < seleccion.length; i++){

            if(!seleccion[i].sel){

                sel = false;

            }
        }

        return sel;
    },

    GetImageByLetter: function(ficha){
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

    eliminarMitadZombies: function(){

        let zombiesDescubiertos = 0;

        for(i = 0; i != this.zombies.length; i++){

            if(this.zombies[i].seleccionado == false){

                zombiesDescubiertos ++;

            }
        }

        let mitadZombiesDescubiertos = (zombiesDescubiertos / 2);
        a = 0;

            while(mitadZombiesDescubiertos >= 0){

                if(!this.zombies[a].seleccionado){

                    this.zombies[a].seleccionado = true;
                    mitadZombiesDescubiertos --;

                    this.getTablero()[this.zombies[a].x][this.zombies[a].y] = 'g';

                }

                a++;
            }
    },

    comprovarLetra: function(letra, posX, posY) {

        this.iniciarTablero(); //Porque llamais a iniciartablero? by Dani
        //letra = partida.tablero[posX][posY].toUpper();
        switch (letra.toUpperCase()) {

            case "DP":

                for (i = 0; i < this.doblePuntos.length; i++) {

                    if (posX == this.doblePuntos[i].posX && posY == this.doblePuntos[i].posY) { //Si encuentra en esa posicion que tiene las mismas coordenadas que yo suma las estadisticas

                        this.doblesPuntosEncontrados ++;
                        this.doblePuntos[i].seleccionado = true;

                    }
                }

                this.puntos = this.puntos * 2; //Dobla la puntuación
                this.Estadisticas();

                return '#fff';
            case "MZ":

                for(i = 0; i < this.mitadZombie.length;i ++){

                    if(this.mitadZombie[i].orientacion == 1){

                        if((x - 1) == this.mitadZombie[i].x || posX == this.mitadZombie[i].x){

                            this.mitadZombie[i].medidaTablero--; //falta hacer que se reduzcan los zombies

                            if(this.mitadZombie[i].medidaTablero == 0){

                                this.mitadZombiesEncontrados++;
                                this.mitadZombie[i].seleccionado = true;
                                this.eliminarMitadZombies();
                                
                            }
                        }
                    }
                    if(this.mitadZombie[i].orientacion == 0){

                        if((posY - 1) == this.mitadZombie[i].y || posY == this.mitadZombie[i].y){

                            this.mitadZombie[i].medidaTablero--;

                            if(this.mitadZombie[i].medidaTablero == 0){

                                this.mitadZombiesEncontrados++;
                                this.mitadZombie[i].seleccionado = true;
                                this.eliminarMitadZombies();

                            }
                        }
                    }
                }

                this.Estadisticas();

                return '#e62e1b';
            case "VE":

                for (i = 0; i < partida.vidaExtra.length; i++){

                        if (posX == partida.vidaExtra[i].posX && posY == this.vidaExtra[i].posY) {
                            partida.vidasExtrasEncontradas++;
                            debug.log(partida.vidaExtra);
                            partida.vidaExtra[i].seleccionado = true;
                            if (partida.vidasExtrasEncontradas == 3) {
                                partida.vidas++;

                            }
                        }
                }
                this.Estadisticas();

                return '#7FED7E';
            case "Z":

                this.zombiesEncontrados++;
                this.puntos=this.puntos-100<0?0:this.puntos-100;

                this.vidas --;
                this.Estadisticas();

                if (this.vidas == 0) {

                    setTimeout(function() {

                        alert("HAS PERDIDO!!!");

                    }, 3000);
                }

                return '#93c572';
            case "E":

                this.estrellasEncontradas++;
                this.puntos += 200;

                for (i = 0; i < this.estrellas.length; i++) {

                    if (this.estrellas[i].posX == posX && this.estrellas[i].posY == posY) {

                        this.estrellas[i].seleccionado = true;

                    }
                }

                this.RevelarTablero();

                this.Estadisticas();

                /* if (this.esSeleccionado(this.estrellas)) {

                    setTimeout(function() {

                        alert("HAS GANADO!!!");

                    }, 2000);
                } */

                return '#57a639';
            case "G":

                this.puntos += 50;
                this.Estadisticas();

                return '#F09D61';

        }
        return '#fff';
    },

        Estadisticas: function(){

            var ver;

            ver = "<H2>PUNTUACIONES DEL JUEGO:</H2>"
            ver += "Puntos totales: "+this.puntos;
            ver += "</br>";
            ver += "</br>";
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

            document.getElementById("stats").innerHTML = ver;

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
