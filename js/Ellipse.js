class Ellipse extends Figura {
    constructor(posX, posY, radius, fill, context) {
        super(posX, posY, fill, context);
        this.radius = radius;
    }

    draw() {
        this.ctx.fillStyle = this.fill;//le asigno al ctx el color que voy a usar
        this.ctx.beginPath();// inicia la ruta
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);// hago el circulo
        this.ctx.fill();// lleno el ctx con el resultado

        if (this.selected === true) {
            this.ctx.strokeStyle = this.selectedStyle;//al ctx le agrego un trazo
            this.ctx.lineWidth = 5;//seteo el tamaño del trazo
            this.ctx.stroke();// lo dibujo
        }
    }

    isPointInside(x, y) {
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }

   
}