let Partida = {
    zombies: [],
    estrelles:[],

    generarTabla: function(coordenadas){

        let body = document.getElementsByTagName("body")[0];

        let table = document.createElement("table");
        let tbody = document.createElement("tbody");

        for (let i = 0; i < coordenadas; i++){

            let row = document.createElement("tr");

            for (let j = 0; j < coordenadas; j++){

                let cell = document.createElement("td");

                row.appendChild(cell);

            }

            tbody.appendChild(row);
        }

        table.appendChild(tbody);
        body.appendChild(table);

        table.setAttribute('border', 2);
        table.setAttribute('id', 'table');

    },

    rellenarTabla: function(){
        for(let i = 0;i<coordenadas;i++){
            for(let j = 0;j < coordenadas[i];j++){
               element.coordenadas[i][j].InnerHTML = "g";
            }
        }
    },


}