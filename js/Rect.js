class Rect extends Figura {
    constructor(posX, posY, width, height, fill, context) {
        super(posX, posY, fill, context);
        this.width = width;
        this.height = height;
    }

    draw() {
        this.ctx.fillStyle = this.fill; //le asigno al ctx el color que voy a usar
        this.ctx.beginPath();// inicia la ruta
        this.ctx.rect(this.posX, this.posY, this.width, this.height);// hago el rectangulo
        this.ctx.fill();// lleno el ctx con el resultado
        
        if (this.selected === true) {
            this.ctx.strokeStyle = this.selectedStyle; //al ctx le agrego un trazo
            this.ctx.lineWidth = 5; //seteo el tamaño del trazo
            this.ctx.stroke();// lo dibujo
        }
    }

    isPointInside(x, y) {
        return !(x < this.posX || x > this.posX + this.width || y < this.posY || y > this.posY + this.height);
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }
}