//Objecto hijo de elementos y padre de recompensas?

var recompensa = function(tamano, orientacion) {

    elementos.apply(this, arguments);
    this.tamano = tamano;
    this.orientacion = orientacion;

}

//Prototipo = hijo
recompensa.prototype = Object.create(elementos.prototype);
recompensa.prototype.constructor = elementos;
