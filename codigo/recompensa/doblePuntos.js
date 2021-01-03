//Objeto hijo de recompensa

var puntosDobles = function() {

    recompensa.apply(this, arguments);

}

//Prototype = hijo

puntosDobles.prototype = Object.create(recompensa.prototype);
puntosDobles.prototype.constructor = recompensa;
puntosDobles.prototype.Draw = function(dibujar) {

    dibujar[this.x][this.y] = "d";

}
