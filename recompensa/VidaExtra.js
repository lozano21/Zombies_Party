//Objecte fill recompensa
var videsExtres = function(){
    Recompensa.apply(this, arguments);
}        
    /*Prototype = hijo*/
    videsExtres.prototype = Object.create(Recompensa.prototype);
    videsExtres.prototype.constructor = Recompensa;
    videsExtres.prototype.Draw = function(dibujar){
        dibujar[this.x][this.y] = 'vE'
    }