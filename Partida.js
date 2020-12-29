var Partida = {
    zombies: [],
    estrelles: [],
    tablero: [],
    doblePuntos: [],
    recompensasCreadas: 0,
    medidaTablero: 5,
    meitatZombie: [],
    doblePuntos: [],
    vidaExtra: [],
    zombiesCreados: 0,
    estrellasCreadas: 0,
    
    iniciarTablero: function(coordenadas){
        for(let i=0;i < coordenadas; i++){
            this.tablero[i] = [];
            for(let j = 0; j < coordenadas;j++ ){
                this.tablero[i][j] = "g";
                
            }
        }
        console.log(this.tablero)
    },

    iniciarJuego: function(){
       
        this.crearRecompenses();
        this.crearZombies();
        this.crearEstrelles();
        this.iniciarTablero(); 
        this.generarTabla(coordenadas);
    },

    //-------RECOMPENSAS------------
    crearRecompenses: function(){
        while(this.recompensasCreadas < this.medidaTablero){
            this.crearDoblePunts();
            this.crearMeitatZombi();
            this.crearVidaExtra();
        }
    },

    crearDoblePunts: function(cDP){
        try{
            do{
            var x = Math.floor(Math.random() * this.medidaTablero) + 1;
            var y = Math.floor(Math.random() * this.medidaTablero) + 1;
        }while(this.tablero[x][y] != "g");
        cDP.x = X;
        cDP.y = Y;
        this.tablero[X][Y] = "d";
        this.recompensasCreadas += 1;
        this.doblePuntos.push(cDP);
        }
        catch(e){}
        

    },

    crearMeitatZombi: function(cMZ){

        try{
        let orientacion = Math.floor(Mat.random() * 2);
        if(orientacion == 0){
            do{
                var x = Math.floor(Math.random() * this.medidaTablero) + 1;
                var y = Math.floor(Math.random() * this.medidaTablero) + 1; 
            }while(this.tablero[x][y] != "g")
            cMZ.x = X;
            cMZ.y = Y;
            cMZ.orientacion = orientacion;
            this.tablero[X][Y] = "Mz";
            this.tablero[X][Y + 1] = "Mz";
            this.recompensasCreadas += 2;
            
        }else{
            do{
                var x = Math.floor(Math.random() * this.medidaTablero) + 1;
                var y = Math.floor(Math.random() * this.medidaTablero) + 1; 
            }while(this.tablero[x][y] != "g")
            cMZ.x = X;
            cMZ.y = Y;
            cMZ.orientacion = orientacion;
            this.tablero[X][Y] = "Mz";
            this.tablero[X][Y + 1] = "Mz";
            this.recompensasCreadas += 2;
        }
        this.meitatZombie.push(cMZ);
        }
        catch(e){}


    },

    crearVidaExtra: function(cVE){
       try{ 
        videsExtres(3);
        let orientacion = Math.floor(Math.random() * 2)
        if(orientacion == 0){
            do{
                var x = Math.floor(Math.random() * this.medidaTablero) + 1;
                var y = Math.floor(Math.random() * this.medidaTablero) + 1; 
            }while(this.tablero[x][y] != "g" || this.tablero[x - 1][y] != "g"
            || this.tablero[x + 1][y] != "g" || x >= this.medidaTablero - 1)
            cVE.x = X;
            cVE.y = Y;
            cVE.orientacion = orientacion;
            this.tablero[X][Y] = "Ve";
            this.tablero[x - 1][y] = "Ve"
            this.tablero[x + 1][y] = "Ve"
            this.recompensasCreadas += 3;
        }else{
            do{
                var x = Math.floor(Math.random() * this.medidaTablero) + 1;
                var y = Math.floor(Math.random() * this.medidaTablero) + 1; 
            }while(this.tablero[x][y] != "g" || this.tablero[x - 1][y] != "g"
            || this.tablero[x + 1][y] != "g" || x >= this.medidaTablero - 1)
            cVE.x = X;
            cVE.y = Y;
            cVE.orientacion = orientacion;
            this.tablero[X][Y] = "Ve";
            this.tablero[x - 1][y] = "Ve"
            this.tablero[x + 1][y] = "Ve"
            this.recompensasCreadas += 3;
        }
        this.vidaExtra.push(cVE);
        }
        catch(e){}
    },

    //------ZOMBIES-----------------
    crearZombies: function(Cz){
        while(this.zombiesCreados < (this.medidaTablero * this.medidaTablero) / 4){
            do{
                var x = Math.floor(Math.random() * this.medidaTablero) + 1;
                var y = Math.floor(Math.random() * this.medidaTablero) + 1;
            }while(this.tablero[x][y])
            Cz.x = X;
            Cz.y = Y;
            this.tablero[x][y] = "z";
            this.zombiesCreados ++;
            this.zombies.push(Cz);
        }
    },


    //-------Estrelles--------------
    crearEstrelles: function(Ce){
        try{
        while(this.estrellasCreadas < (this.medidaTablero * this.medidaTablero) / 4){
            do{
                var x = Math.floor(Math.random() * this.medidaTablero) + 1;
                var y = Math.floor(Math.random() * this.medidaTablero) + 1;
            }while(this.tablero[x][y])
            Ce.x = X;
            Ce.y = Y;
            this.tablero[x][y] = "e";
            this.estrellasCreadas ++;
            this.estrelles.push(Ce);
        }
        }
        catch(e){}

    },

    seleccionarCoordenada: function(){
        posX = document.getElementById("posX").value;
        podY = document.getElementById("posY").value;

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

    }, 

    generarTabla: function (coordenadas) {
        let num = 0;
        let tablero = "<br><table>";
        for (let i = 0; i < coordenadas; i++) {
            tablero += "<tr>";
            for (let j = 0; j < coordenadas; j++) {
                tablero += "<td id=" + num + "> g </td>";
                num += 1;
                console.log(num);
            }
            tablero += "</tr>";
        }
        tablero += "</table>";
        document.getElementById("mostrarTabla").innerHTML = tablero;
    },

    
           
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
