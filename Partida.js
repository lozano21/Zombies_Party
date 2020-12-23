var Partida = {
    zombies: [],
    estrelles: [],
    tablero: [],
    doblePuntos: [],
    recompensasCreadas: 0,
    medidaTablero: 55,


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

    iniciarTablero: function(coordenadas){
        for(let i=0;i < coordenadas; i++){
            this.tablero[i] = [];
            for(let j = 0; j < coordenadas;j++ ){
                this.tablero[i][j] = "g";
                
            }
        }
        console.log(this.tablero)
    },

    crearRecompenses: function(){
        while(this.recompensasCreadas < this.medidaTablero){
            this.crearDoblePunts();
        }
    },

    crearDoblePunts: function(cDP){
         do{
            var x = Math.floor(Math.random() * this.medidaTablero) + 1;
            var y = Math.floor(Math.random() * this.medidaTablero) + 1;
        }while(this.tablero[x][y] != "g");
        cDP.x = X;
        cDP.y = Y;
        this.tablero[X][Y] = "d";
        this.recompensasCreadas += 1;
        this.puntsDobles.push(cDP);
        

    },

    crearMeitatZombi: function(cMZ){

        let orientacion = Math.floor(Mat.random() * 2);

        if(orientacion == 0){
            do{
                var x = Math.floor(Math.random() * this.medidaTablero) + 1;
                var y = Math.floor(Math.random() * this.medidaTablero) + 1; 
            }while(this.tablero[x][y] != "g")
            cMZ.x = X;
            cMZ.y = Y;
            cMZ.orientacion = orientacion;
            this.tablero[X][Y] = "m";
            this.tablero[X][Y + 1] = "m";
            this.recompensasCreadas += 2;
            
        }else{
            do{
                var x = Math.floor(Math.random() * this.medidaTablero) + 1;
                var y = Math.floor(Math.random() * this.medidaTablero) + 1; 
            }while(this.tablero[x][y] != "g")
            cMZ.x = X;
            cMZ.y = Y;
            cMZ.orientacion = orientacion;
            this.tablero[X][Y] = "m";
            this.tablero[X][Y + 1] = "m";
            this.recompensasCreadas += 2;
        }
        this.puntsDobles.push(cMZ);

    },

    crearVidaExtra: function(){

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
