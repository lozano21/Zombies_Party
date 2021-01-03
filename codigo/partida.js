var partida = {
    zombies: [],
    estrellas: [],
    tablero: [],
    recompensasCreadas: 0,
    medidaTablero: 5,
    //totalcasillas: 25,
    mitadZombie: [],
    doblePuntos: [],
    vidaExtra: [],
    zombiesCreados: 0,
    estrellasCreadas: 0,
    puntos: 0,
    estrellasEncontradas: 0,
    vidasExtrasEncontradas: 0,
    zombiesEncontrados: 0,
    meitatZombiesEncontrados: 0,
    doblesPuntosEncontrados: 0,
    vidas: 3,

    //Rellenamos las casillas de campo (consola)
    iniciarTablero: function(coordenadas) {

        for (let i = 0; i < coordenadas; i++){

            this.tablero[i] = [];

            for (let j = 0; j < coordenadas; j++){

                this.tablero[i][j] = "g";

            }
        }
        console.log(this.tablero);
    },

    iniciarJuego: function(coordenadas){

        this.medidaTablero = coordenadas;
        this.iniciarTablero (coordenadas);
        this.crearRecompensas();
        this.crearZombies();
        this.crearEstrellas();
        this.generarTabla(coordenadas);

    },

    generarTabla: function(coordenadas){

            let tablero = "<div id='master' class='center'>";

            for (let i = 0; i < coordenadas; i++){

                tablero += "<div class='row'>";    

                for (let j = 0; j < coordenadas; j++){    

                    tablero += "<div id='" + i + "," + j + "' class='cell' onclick='seleccionarCoordenadas()'> x </div>";
                    //console.log(i + "," + j);

                }

                tablero += "</div>";

            }

            tablero += "</div>";
            document.getElementById('createTable').innerHTML = tablero;

       },
    

    //RECOMPENSAS
    crearRecompensas: function() {

        while(this.recompensasCreadas < (this.medidaTablero * 25) / 100){

            this.crearDoblePuntos();
            this.crearMitadZombie();
            this.crearVidaExtra();

        }
    },

    crearDoblePuntos: function() {

        try{

            var cdp = new puntosDobles(1);

            do {

                var x = Math.floor(Math.random() * this.medidaTablero);
                var y = Math.floor(Math.random() * this.medidaTablero);

            } while(this.tablero[x][y] != "g");

            cdp.x = x;
            cdp.y = y;

            this.tablero[x][y] = "dp";
            this.recompensasCreadas += 1;
            this.doblePuntos.push(cdp);

        } catch(e){}
    },


    crearMitadZombie: function() {

        try {

            var cmz = new mitadZombies(2);
            let orientacion = Math.floor(Math.random() * 2);

            if(orientacion == 0){

                do{

                    var x = Math.floor(Math.random() * this.medidaTablero);
                    var y = Math.floor(Math.random() * this.medidaTablero);

                } while(this.tablero[x][y] != "g" || this.tablero[x+1][y] != "g");

                cmz.x = x;
                cmz.y = y;
                cmz.orientacion = orientacion;

                this.tablero[x][y] = "mz";
                this.tablero[x][y+1] = "mz";
                this.recompensasCreadas += 2;

            } else {

                do{

                    var x = Math.floor(Math.random() * this.medidaTablero);
                    var y = Math.floor(Math.random() * this.medidaTablero);

                } while(this.tablero[x][y] != "g" || this.tablero[x][y+1] != "g");

                cmz.x = x;
                cmz.y = y;
                cmz.orientacion = orientacion;

                this.tablero[x][y] = "mz";
                this.tablero[x][y+1] = "mz";
                this.recompensasCreadas += 2;
            }

            this.mitadZombie.push(cmz);

        } catch(e){}
    },

    crearVidaExtra: function() {

        try {

            var cve = new vidaExtra(3);
            vidaExtra(3);
            let orientacion = Math.floor(Math.random() * 2);

            if (orientacion == 0){

                do{

                    var x = Math.floor(Math.random() * this.medidaTablero);
                    var y = Math.floor(Math.random() * this.medidaTablero);

                } while(this.tablero[x][y] != "g" || this.tablero[x-1][y] != "g" || this.tablero[x+1][y] != "g" || x >= this.medidaTablero-1);

                cve.x = x;
                cve.y = y;
                cve.orientacion = orientacion;

                this.tablero[x][y] = "ve";
                this.tablero[x+1][y] = "ve";
                this.tablero[x-1][y] = "ve";
                this.recompensasCreadas += 3;

            } else {

                do{

                    var x = Math.floor(Math.random() * this.medidaTablero);
                    var y = Math.floor(Math.random() * this.medidaTablero);

                } while(this.tablero[x][y] != "g" || this.tablero[x-1][y] != "g" || this.tablero[x+1][y] != "g" || x >= this.medidaTablero - 1);

                cve.x = x;
                cve.y = y;
                cve.orientacion = orientacion;

                this.tablero[x][y] = "ve";
                this.tablero[x][y + 1] = "ve"
                this.tablero[x][y - 1] = "ve"
                this.recompensasCreadas += 3;
            }

            this.vidaExtra.push(cve);

        } catch(e){}
    },

    //ZOMBIES
    crearZombies: function() {

        var cz = new zombie();

        while(this.zombiesCreados < (this.medidaTablero * 25) / 100){

            do {

                var x = Math.floor(Math.random() * this.medidaTablero);
                var y = Math.floor(Math.random() * this.medidaTablero);

            } while(this.tablero[x][y] != "g");

            cz.x = x;
            cz.y = y;

            this.tablero[x][y] = "z";
            this.zombiesCreados++;
            this.zombies.push(cz);

        }
    },

    //ESTRELLAS
    crearEstrellas: function() {

        try{

            var ce = new estrella();

            while(this.estrellasCreadas < (this.medidaTablero * 25) / 100){

                do {

                    var x = Math.floor(Math.random() * this.medidaTablero);
                    var y = Math.floor(Math.random() * this.medidaTablero);

                } while(this.tablero[x][y] != "g");

                ce.x = x;
                ce.y = y;

                this.tablero[x][y] = "e";
                this.estrellasCreadas++;
                this.estrellas.push(ce);

            }

        } catch(e){}
    },

    getPosicion: function(posX,posY){

        return this.tablero[posX][posY];

    },

    getTablero: function(){

        return this.tablero;

    },

    seleccionarCoordenada: function(){

        posX = document.getElementById("posX").value;
        posY = document.getElementById("posY").value;

        if(posX >= 0 && posX < partida.medidaTablero && posY >= 0 && posY < partida.medidaTablero){

            var ficha = partida.tablero[posX][posY];

            if(ficha.toString() === ficha.toLowerCase()){

                document.getElementById(posX + "," + posY).innerHTML = ficha.toUpperCase();
                partida.tablero[posX][posY] =  ficha.toUpperCase();
                //document.getElementById(posX.toString() + posY.toString()).style.backgroundColor = partida.comprovarLetra(ficha.toUpperCase(),posX,posY);

            }else{

                alert('Ficha descubierta');

            }

        }else{

            alert('Posición incorrecta');

        }

    },

    comprovarLetra: function(letra,posX,posY){

        this.iniciarTablero();

        switch(letra){

            case"DP":

                for(i = 0; i < this.doblePuntos.length;i++){

                    if(this.doblePuntos[i].posY == posY && this.doblePuntos[i].posX == posX){

                        this.doblesPuntosEncontrados ++;
                        this.doblePuntos[i].seleccinado = true;

                    }
                }

                this.puntos *= 2;

            break;
            case"MZ":

                for(i = 0; i < this.meitatZombie.length;i ++){

                    if(this.meitatZombie[i].orientacion == 1){

                        if((x - 1) == this.meitatZombie[i].posX || x == this.meitatZombie[i].posX){

                            this.meitatZombie[i].medidaTablero--;

                            if(this.meitatZombie[i].medidaTablero == 0){

                                this.meitatZombiesEncontrados++;
                                this.meitatZombie[i].seleccinado = true;
                                
                            }
                        }
                    }

                    if(this.meitatZombie[i].orientacion == 1){

                        if((y - 1) == this.meitatZombie[i].posX || y == this.meitatZombie[i].posX){

                            this.meitatZombie[i].medidaTablero--;

                            if(this.meitatZombie[i].medidaTablero == 0){

                                this.meitatZombiesEncontrados++;
                                this.meitatZombie[i].seleccinado = true;

                            }
                        }
                    }
                }

                this.Puntuaciones();

            break;
            case"VE":

                for(i = 0; i < this.vidaExtr.lengtha;i ++){

                    if(this.vidaExtra[i].orientacion == 1){

                        if((x - 1) == this.vidaExtra[i].posX || (x + 1) == this.vidaExtra[i].posX || x == this.vidaExtra[i].posX){

                            this.vidaExtra[i].medidaTablero--;

                            if(this.vidaExtra[i].medidaTablero == 0){

                                this.vidasExtrasEncontradas++;
                                this.vidaExtra[i].seleccinado = true;
                                this.vidas++;

                            }
                        }
                    }

                    if(this.vidaExtra[i].orientacion == 0){

                        if((y - 1) == this.vidaExtra[i].posX || (y + 1) == this.vidaExtra[i].posX || y == this.vidaExtra[i].posX){

                            this.vidaExtra[i].medidaTablero--;

                            if(this.vidaExtra[i].medidaTablero == 0){

                                this.vidasExtrasEncontradas++;
                                this.vidaExtra[i].seleccinado = true;
                                this.vidas++;
                            }
                        }
                    }
                }
                this.Puntuaciones();

            break;
            case"Z":

                this.zombiesEncontrados++;

                if(this.puntos > 100){

                    this.puntos -= 100;

                }else{

                    this.puntos = 0;

                }

                this.vidas --;
                this.Puntuaciones();

                if(this.vidas == 0){

                    setTimeout( function(){

                            alert("HAS PERDIDO!!!");

                        },3000);
                }

            break;
            case"E":

                this.estrellas++;
                this.puntos += 200;

                for(i = 0; i < this.estrellas.length; i++){

                    if(this.estrellas[i].posX == posX && this.estrellas[i].posY == posY){

                        this.estrellas[i].seleccinado == true;

                    }
                }

                this.Puntuaciones();

                if(this.esSeleccionado(this.estrellas)){

                    setTimeout( function(){

                        alert("HAS GANADO!!!");

                        },2000);
                }

            break;
            case"G":

                this.puntos += 50;
                this.Puntuaciones();

            break;

            }
        },

    //new function descubrir casilla pillar X y Y y comprovar q no esté descubierta y si no, q la muestre


}

document.getElementById("insBoto").addEventListener("click", partida.seleccionarCoordenada);
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
