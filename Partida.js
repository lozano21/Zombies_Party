let Partida = {
    zombies: [],
    estrelles:[],
    tablero: [0],
    
    generarTabla: function(coordenadas){

        let body = document.getElementsByTagName("body")[0];

        let table = document.createElement("table");
        let tbody = document.createElement("tbody");

        for (let i = 0; i < coordenadas; i++){

            let row = document.createElement("tr");

            for (let j = 0; j < coordenadas; j++){

                let cell = document.createElement("td");
                cell.appendChild(this.tablero[i][j]);

                row.appendChild(cell);

            }

            tbody.appendChild(row);
        }

        table.appendChild(tbody);
        body.appendChild(table);

        table.setAttribute('border', 2);
        table.setAttribute('id', 'table');

    },

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