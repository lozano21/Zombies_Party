//Objecte fill d'Elements i pare de recompenses
var Recompensa = function(tamano, orientacion){
    Elements.apply(this, arguments);
    this.tamano = tamano;
    this.orientacion = orientacion;
}
/*Prototype = hijo*/
Recompensa.prototype = Object.create(Elements.prototype);
Recompensa.prototype.constructor = Elements;