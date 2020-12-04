//main
window.onload = function(){
    
    var coordenadas = 0;
    coordenadas = parseInt(prompt("Medida del tablero "));
    do{
        alert("Por favor introduce la medida, entre 5 y 10");
        coordenadas = parseInt(prompt("Medida del tablero (5-20)"));
    }while(coordenadas === "" || coordenadas == null || coordenadas < 5 || coordenadas > 20)//bucle do while para
    console.log(coordenadas);

    document.getElementById("mostrarTabla").innerHTML = generarTabla(coordenadas);

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
    var tablero = new generarTabla(5);
    document.write(tablero.cella)

}

