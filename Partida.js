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

    iniciarJuego: function(coordenadas){
        this.medidaTablero = coordenadas;
        this.iniciarTablero(coordenadas);
        this.crearRecompenses();
        this.crearZombies();
        this.crearEstrelles();
        this.generarTabla(coordenadas);
    },

    //-------RECOMPENSAS------------
    crearRecompenses: function(){
        while(this.recompensasCreadas < (this.medidaTablero * this.medidaTablero) / 4){
            this.crearDoblePunts();
            this.crearMeitatZombi();
            this.crearVidaExtra();
        }
    },

    crearDoblePunts: function(){
        try{
        var cDP = new puntsDobles(1);
            do{
            var x = Math.floor(Math.random() * this.medidaTablero) ;
            var y = Math.floor(Math.random() * this.medidaTablero) ;
        }while(this.tablero[x][y] != "g");
        cDP.x = x;
        cDP.y = y;
        this.tablero[x][y] = "dp";
        this.recompensasCreadas += 1;
        this.doblePuntos.push(cDP);
        }
        catch(e){}
        

    },

    crearMeitatZombi: function(){
        try{
        var cMZ = new meitatZombies(2);
        let orientacion = Math.floor(Mat.random() * 2);
        if(orientacion == 0){
            do{
                var x = Math.floor(Math.random() * this.medidaTablero) ;
                var y = Math.floor(Math.random() * this.medidaTablero) ; 
            }while(this.tablero[x][y] != "g" || this.tablero[x + 1][y] != "g");
            cMZ.x = x;
            cMZ.y = y;
            cMZ.orientacion = orientacion;
            this.tablero[x][y] = "Mz";
            this.tablero[x][y + 1] = "Mz";
            this.recompensasCreadas += 2;
            
        }else{
            do{
                var x = Math.floor(Math.random() * this.medidaTablero) ;
                var y = Math.floor(Math.random() * this.medidaTablero) ; 
            }while(this.tablero[x][y] != "g" || this.tablero[x][y + 1] != "g")
            cMZ.x = x;
            cMZ.y = y;
            cMZ.orientacion = orientacion;
            this.tablero[x][y] = "Mz";
            this.tablero[x][y + 1] = "Mz";
            this.recompensasCreadas += 2;
        }
        this.meitatZombie.push(cMZ);
        }
        catch(e){}


    },

    crearVidaExtra: function(){
       try{ 
        var cVE = new videsExtres(3);
        videsExtres(3);
        let orientacion = Math.floor(Math.random() * 2)
        if(orientacion == 0){
            do{
                var x = Math.floor(Math.random() * this.medidaTablero) ;
                var y = Math.floor(Math.random() * this.medidaTablero) ; 
            }while(this.tablero[x][y] != "g" || this.tablero[x - 1][y] != "g"
            || this.tablero[x + 1][y] != "g" || x >= this.medidaTablero - 1)
            cVE.x = x;
            cVE.y = y;
            cVE.orientacion = orientacion;
            this.tablero[x][y] = "Ve";
            this.tablero[x + 1][y] = "Ve"
            this.tablero[x - 1][y] = "Ve"
            this.recompensasCreadas += 3;
        }else{
            do{
                var x = Math.floor(Math.random() * this.medidaTablero) ;
                var y = Math.floor(Math.random() * this.medidaTablero) ; 
            }while(this.tablero[x][y] != "g" || this.tablero[x - 1][y] != "g"
            || this.tablero[x + 1][y] != "g" || x >= this.medidaTablero - 1)
            cVE.x = x;
            cVE.y = y;
            cVE.orientacion = orientacion;
            this.tablero[X][Y] = "Ve";
            this.tablero[x][y + 1] = "Ve"
            this.tablero[x][y - 1] = "Ve"
            this.recompensasCreadas += 3;
        }
        this.vidaExtra.push(cVE);
        }
        catch(e){}
    },

    //------ZOMBIES-----------------
    crearZombies: function(){
        var Cz = new Zombi();
         while(this.zombiesCreados < (this.medidaTablero * this.medidaTablero) / 4){
            do{
                var x = Math.floor(Math.random() * this.medidaTablero) ;
                var y = Math.floor(Math.random() * this.medidaTablero) ;
            }while(this.tablero[x][y] != "g")
            Cz.x = x;
            Cz.y = y;
            this.tablero[x][y] = "z";
            this.zombiesCreados ++;
            this.zombies.push(Cz);
        }
    },


    //-------Estrelles--------------
    crearEstrelles: function(){
        try{
        var Ce = new Estrella();
        while(this.estrellasCreadas < (this.medidaTablero * this.medidaTablero) / 4){
            do{
                var x = Math.floor(Math.random() * this.medidaTablero) ;
                var y = Math.floor(Math.random() * this.medidaTablero) ;
            }while(this.tablero[x][y] != "g")
            Ce.x = x;
            Ce.y = y;
            this.tablero[x][y] = "e";
            this.estrellasCreadas ++;
            this.estrelles.push(Ce);
        }
        }
        catch(e){}

    },

    getPosicion: function(x,y){
        return this.tablero[x][y];
    },

    getTablero: function(){
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

    generarTabla: function (coordenadas) {
        let num = 0;
        let tablero = "<br><table>";
        for (let i = 0; i < coordenadas; i++) {
            tablero += "<tr>";
            for (let j = 0; j < coordenadas; j++) {
                tablero += "<td id=" + num + "> x </td>";
                num += 1;
                //console.log(num);
            }
            tablero += "</tr>";
        }
        tablero += "</table>";
        document.getElementById("mostrarTabla").innerHTML = tablero;
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
