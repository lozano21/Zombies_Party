//Objecto hijo de recompensa

var vidaExtra = function() {
    recompensa.apply(this, arguments);
    var casillas = 0;
}

//Prototype = hijo

vidaExtra.prototype = Object.create(recompensa.prototype);
vidaExtra.prototype.constructor = recompensa;
vidaExtra.prototype.Draw = function(dibujar) {

    dibujar[this.x][this.y] = "ve";

}