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

    function generarTabla(tabla){
        var cella = "<table>";
        for(let i = 0; i < tabla.length;i++){
            cella += "<tr>";
            for(let j = 0; i < tabla[i].length;j++){
                cella += "<td>" + tabla[i][j]+"</td>"
            }
            cella += "</tr>";
        }
        cella += "</table>";

        return tabla;
    }
  
    

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
