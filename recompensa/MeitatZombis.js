//Objecte fill recompensa
var meitatZombies = function(){
     Recompensa.apply(this, arguments);
}        
    /*Prototype = hijo*/
    meitatZombies.prototype = Object.create(Recompensa.prototype);
    meitatZombies.prototype.constructor = Recompensa;
  