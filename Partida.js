var Partida = {
    zombies: [],
    estrelles: [],
    tablero: [],
    recompensasCreadas: 0,
    medidaTablero: 5,
    meitatZombie: [],
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

    //-------RECOMPENSAS------------
    crearRecompenses: function(){
        while(this.recompensasCreadas < (this.medidaTablero * 25) / 100){
            this.crearDoblePunts();
            this.crearMeitatZombie();
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
    crearMeitatZombie: function(){
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
            this.tablero[x + 1][y] = "Mz";
            this.recompensasCreadas += 2;
            
        }else{
            do{
                var x = Math.floor(Math.random() * this.medidaTablero) ;
                var y = Math.floor(Math.random() * this.medidaTablero) ; 
            }while(this.tablero[x][y] != "g" || this.tablero[x][y + 1] != "g");
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
        let orientacion = Math.floor(Math.random() * 2)
        if(orientacion == 0){
            do{
                var x = Math.floor(Math.random() * this.medidaTablero) ;
                var y = Math.floor(Math.random() * this.medidaTablero) ; 
            }while(this.tablero[x][y] != "g" || this.tablero[x - 1][y] != "g"
            || this.tablero[x + 1][y] != "g" || x >= this.medidaTablero - 1 || x <= 0 + 1);
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
            || this.tablero[x + 1][y] != "g" || x >= this.medidaTablero - 1 || y >= coordenadas - 1)
            cVE.x = x;
            cVE.y = y;
            cVE.orientacion = orientacion;
            this.tablero[x][Y] = "Ve";
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
         while(this.zombiesCreados < (this.medidaTablero * 25) / 1005){
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
        while(this.estrellasCreadas < (this.medidaTablero * 25) / 100){
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

    getPosicion: function(posX,posY){
        return this.tablero[posX][posY];
    },

    getTablero: function(){
        return this.tablero;
    },

    seleccionarCoordenada: function(){
        posX = document.getElementById("posX").value;
        posY = document.getElementById("posY").value;

        if(posX >= 0 && posX < Partida.medidaTablero && posY >= 0 && posY < Partida.medidaTablero  ){
            var ficha = Partida.tablero[posX][posY];
            if(ficha.toString() === ficha.toLowerCase()){
                document.getElementById(posX.toString() + posY.toString()).innerHTML = ficha.toUpperCase();
                Partida.tablero[posX][posY] =  ficha.toUpperCase();
                document.getElementById(posX.toString() + posY.toString()).style.backgroundColor = Partida.comprovarLetra(ficha.toUpperCase(),posX,posY);
            }else{
                alert('Ficha descubierta');
            }
        }else{
            alert('Posición incorrecta');
        }

    },

    

    //new function descubrir casilla pillar X y Y y comprovar q no esté descubierta y si no, q la muestre
    comprovarLetra: function(letra,posX,posY){
        this.iniciarTablero();
        switch(letra){
            case"DP":
            {
                for(i = 0; i < this.doblePuntos.length;i++){
                    if(this.doblePuntos[i].posY == posY && this.doblePuntos[i].posX == posX){
                        this.doblesPuntosEncontrados ++;
                        this.doblePuntos[i].seleccinado = true;
                    }
                }
                this.puntos *= 2;
                break;
            }
            case"MZ":
            {
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
            }
            case"VE":
            {
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
            }
            case"Z":
            {
                this.zombiesEncontrados++;
                if(this.puntos > 100){
                    this.puntos -= 100;
                }else{
                    this.puntos = 0;
                }

                this.vidas --;
                this.Puntuaciones();

                if(this.vidas == 0){
                    setTimeout(
                        function(){
                            alert("HAS PERDIDO!!!");
                        },3000
                    )
                }
                break;
            }
            case"E":
            {
                this.estrellas++;
                this.puntos += 200;
                for(i = 0; i < this.estrellas.length; i++){
                    if(this.estrellas[i].posx == posX && this.estrellas[i].posY == posY){
                        this.estrellas[i].seleccinado == true;
                    }
                }
                this.Puntuaciones();

                if(this.esSeleccionado(this.estrellas)){
                    setTimeout(
                        function(){
                        alert("HAS GANADO!!!");
                        },2000    
                    )
                }
                break;  
            }
            case"G":
            {
                this.puntos += 50;
                this.Puntuaciones(); 
                break;
            }
        }
    },


};

    document.getElementById("boton").addEventListener("click", Partida.seleccionarCoordenada);

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
