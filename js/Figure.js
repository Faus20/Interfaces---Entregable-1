class Figura {
    constructor(posX, posY, fill, context) {
        this.posX = posX; // posicion en x donde se va a dibujar
        this.posY = posY; // posicion en y donde se va a dibujar
        this.fill = fill; // el color que voy a usar
        this.ctx = context; // donde se va a dibujar
        this.selected = false; // la figura se crea sin seleccionar
        this.selectedStyle = 'rgba(90, 255, 140, 255)'; // color del trazo
    }

    
    moveTo(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }
    
    setSelectedStyle(value){
        return this.selectedStyle = value;
    }
    
    setSelected(value) {
        this.selected = value;
    }

    getPosX() {
        return this.posX;
    }
    getPosY() {
        return this.posY;
    }
    getFill() {
        return this.fill;
    }

    // metodos abstractos, cada figura sabe como dibujarse y como buscar si se hizo click dentro de ella
    isPointInside(x, y) { }
   
    draw() {
    }
}
