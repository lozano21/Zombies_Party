//Objecto hijo de recompensa

var mitadZombies = function() {

    recompensa.apply(this, arguments);
    var casillas = 0;
}

//Prototype = hijo

mitadZombies.prototype = Object.create(recompensa.prototype);
mitadZombies.prototype.constructor = recompensa;
mitadZombies.prototype.Draw = function(dibujar) {

    dibujar[this.x][this.y] = "mz";

}