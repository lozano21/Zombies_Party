//Objecto hijo de recompensa

var vidaExtra = function() {

    recompensa.apply(this, arguments);

}

//Prototype = hijo

vidaExtra.prototype = Object.create(recompensa.prototype);
vidaExtra.prototype.constructor = recompensa;
vidaExtra.prototype.Draw = function(dibujar) {

    dibujar[this.x][this.y] = "ve";

}
