let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let figures = [];// arreglo para guardar las figuras
let lastClickedFigure = null;// variable para guardar la figura seleccionada, si la hay.
let isMouseDown = false;// variable boolean para guardar si se esta haciendo click en el canvas.

const CANT_FIG = 20;// constante para controlar la cantidad de figuras


function addFigure() {
    let posX = Math.round(Math.random() * canvasWidth );
    let posY = Math.round(Math.random() * canvasHeight );
    let width = Math.round(Math.random() * 80 + 4);
    let height = Math.round(Math.random() * 80 + 4)
    let color = randomRGBA();

    if (Math.random() > 0.5) {
        let rect = new Rect(posX, posY, width, height, color, ctx);//creo el rectangulo
        figures.push(rect);//lo agrego al arreglo
    }
    else {
        let ellipse = new Ellipse(posX, posY, width / 2, color, ctx);//creo el circulo
        figures.push(ellipse);//lo agrego al arreglo
    }

    drawFigure();//llamo a la funcion para dibujar la figura
}

function drawFigure() {
    drawCanvas();
    for (i = 0; i < figures.length; i++) {
        figures[i].draw();//cada figura llama a su metodo para dibujarse
    }
}

//Listeners del mouse en el canvas
canvas.addEventListener("mousedown", onMouseDown); // mientras este el click apretado
canvas.addEventListener("mouseup", onMouseUp);// cuando se suelta el click
canvas.addEventListener("mousemove", onMouseMove);// cuando muevo el mouse dentro del canvas


document.body.addEventListener("keydown", onKeyDown);// cuando aprieto una tecla en mi pagina

function onKeyDown(event){
    if (lastClickedFigure!=null) {// si hay una figura seleccionada
        let posX = lastClickedFigure.getPosX();// guardo la pos X de la figura
        let posY = lastClickedFigure.getPosY();// guardo la pos Y de la figura
    
        if(event.key == "ArrowUp"){// si aprete la tecla para arriba
            lastClickedFigure.moveTo(posX, posY - 1)// muevo la figura en la posY-1 (osea hacia arriba)
            drawFigure();//dibujo las figuras otra vez
        }
        if(event.key == "ArrowDown"){// si aprete la tecla para abajo
            lastClickedFigure.moveTo(posX, posY + 1)// muevo la figura en la posY+1 (osea hacia abajo)
            drawFigure();//dibujo las figuras otra vez
        }
        if(event.key == "ArrowLeft"){// si aprete la tecla para la izquierda
            lastClickedFigure.moveTo(posX - 1, posY )// muevo la figura en la posX-1 (osea hacia la izq)
            drawFigure();//dibujo las figuras otra vez
        }
        if(event.key == "ArrowRight"){// si aprete la tecla para la dercha
            lastClickedFigure.moveTo(posX + 1, posY)// muevo la figura en la posX+1 (osea hacia la der)
            drawFigure();//dibujo las figuras otra vez
        }
    }
}

function onMouseDown(event){
    isMouseDown = true;// la variable del click apretado se vuelve true.

    // Si hago click y ya hay una figura seleccionada  se limpia la propiedad selected de la ultima figura clickeda 
    // para asi poder buscar la nueva figura seleccionada
    if (lastClickedFigure != null) {
        lastClickedFigure.setSelected(false);
        lastClickedFigure = null;
    }

    let pos = getMousePos(event);//obtengo la posicion del mouse dentro del canvas 

    let clickedFigure = findClickedFigure(pos.x, pos.y);// busco si hay una figura seleccionada
    if (clickedFigure != null) {
        clickedFigure.setSelected(true);// si la hay, le seteo a la figura en true la variable selected
        lastClickedFigure = clickedFigure;// guardo la ultima figura seleccionada
    }
    
    drawFigure();//dibujo las figuras otra vez
};

function onMouseMove(event) {
    if (lastClickedFigure != null && isMouseDown ) {// si hay una figura seleccionada y si esta el click apretado
        let pos = getMousePos(event);// busco la posicion relativa dentro del canvas
        lastClickedFigure.moveTo(pos.x, pos.y);// a la figura clickeada le muevo a la nueva posicion
        drawFigure();//dibujo la figuras otra vez
    }
}

function onMouseUp() {
    isMouseDown = false;// cuando dejo de hacer click la variable del click apretado se vuelve false.
}


function getMousePos(evt) {
  let rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}


function findClickedFigure(x, y) {
    for (let index = 0; index < figures.length; index++) {
        let element = figures[index];
        if (element.isPointInside(x, y)) {// por cada figura de mi arreglo, busco si se hizo click dentro de la misma
            return element; // si se hizo click dentro de la figura, la retorno.
        }
    }
}

// Evento temporal para agregar figuras
function addFigures() {
    addFigure();
    if (figures.length < CANT_FIG) {
        setTimeout(addFigures, 333);
    }
}

addFigures();
// Fin Evento temporal para agregar figuras


function randomRGBA() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    let a = 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}


function drawCanvas() {
    let color = 'rgba(245, 245, 245, 255)';
    let rect = new Rect(0, 0, canvasWidth, canvasHeight, color, ctx, true);
    rect.draw();
}