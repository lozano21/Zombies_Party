//Objecte fill recompensa
let puntsDobles = function(){
        Recompensa.apply(this, arguments);
}        
    /*Prototype = hijo*/
    puntsDobles.prototype = Object.create(Recompensa.prototype);
    puntsDobles.prototype.constructor = Recompensa;
    puntsDobles.prototype.Draw = function(dibujar){
        dibujar[this.x][this.y] = 'd'
    }

