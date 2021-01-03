var partida = {

    zombies: [],
    estrellas: [],
    tablero: [],
    doblePuntos: [],
    recompensasCreadas: 0,
    medidaTablero: 5,
    mitadZombie: [],
    vidaExtra: [],
    zombiesCreados: 0,
    estrellasCreadas: 0,

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

    //RECOMPENSAS

    crearRecompensas: function() {

        while(this.recompensasCreadas < parseInt((this.medidaTablero * this.medidaTablero) / 4)){

            this.crearDoblePuntos();
            this.crearMitadZombie();
            this.crearVidaExtra();

        }

    },

    crearDoblePuntos: function() {

        try{

            var cdp = new puntosDobles(1);

            do {

                random();

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

                } while(this.tablero[x][y] != "g" || this.tablero[x-1][y] != "g"
                || this.tablero[x+1][y] != "g" || x >= this.medidaTablero-1);

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

                } while(this.tablero[x][y] != "g" || this.tablero[x-1][y] != "g"
                || this.tablero[x+1][y] != "g" || x >= this.medidaTablero - 1);

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

        while(this.zombiesCreados < parseInt((this.medidaTablero * this.medidaTablero) / 4)){

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

            while(this.estrellasCreadas < parseInt((this.medidaTablero * this.medidaTablero) / 4)){

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

    getPosicion: function(x,y){

        return this.tablero[x][y];

    },

    getTablero: function() {

        return this.tablero;

    },

    /* seleccionarCoordenada: function(){
        posX = document.getElementById("posX").value;
        posY = document.getElementById("posY").value;

        if(posX >= 0 && posX < Partida.medidaTablero && posY >= 0 && posY < Partida.medidaTablero  ){
            var ficha = Partida.tablero[posX][posY];
            if(ficha.toString() === ficha.toLoweCase()){
                document.getElementById(x.toString() + y.toString()).innerHTML = ficha.toUpperCase();
                Partida.tablero[posX][posY] =  ficha.toUpperCase();
            }else{
                alert('Ficha descubierta');
            }
        }else{
            alert('Posición incorrecta');
        }

    },  */

    generarTabla: function(coordenadas){

        let num = 0;
        let tablero = "<div id='master' class='center'>";

        for (let i = 0; i < coordenadas; i++){

            tablero += "<div class='row'>";

            for (let j = 0; j < coordenadas; j++){

                tablero += "<div id='" + i + "," + j + "' class='cell'></div>";
                //console.log(i + "," + j);

            }

            tablero += "</div>";

        }

        tablero += "</div>";
        document.getElementById('createTable').innerHTML = tablero;

    },

    //new function descubrir casilla pillar X y Y y comprovar q no esté descubierta y si no, q la muestre


}

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
