//main

//generar tabla
window.onload = function(){
    
    var coordenadas = 0;
    coordenadas = parseInt(prompt("Medida del tablero "));

    while(coordenadas === "" || coordenadas == null || coordenadas < 5 || coordenadas > 20){//bucle do while para el tamaño de la tabla

        alert("Por favor introduce la medida, entre 5 y 20");
        coordenadas = parseInt(prompt("Medida del tablero (5-20)"));
        console.log(coordenadas);

    }

    function generarTabla(){

        let body = document.getElementsByTagName("body")[0];

        let table = document.createElement("table");
        let tbody = document.createElement("tbody");

        for (let i = 0; i < coordenadas; i++){

            let row = document.createElement("tr");

            for (let j = 0; j < coordenadas; j++){

                let cell = document.createElement("td");
                let text = document.createTextNode(i + "" + j);

                cell.appendChild(text);
                row.appendChild(cell);

            }


            tbody.appendChild(row);
        }

        table.appendChild(tbody);
        body.appendChild(table);

        table.setAttribute('border', 2);
        table.setAttribute('id', 'table');

    }
<<<<<<< HEAD
  
    
=======
    generarTabla();
>>>>>>> 8ed08a199df93102b1e56affb1fba5d0fb144bb0

}

//Objecte pare elements
var Elements = function(nom){
    var nom = nom;
    this.getNom = function(){
        return nom;
    }
    this.setNom = function(_nom){
        nom = _nom;
    }
}
