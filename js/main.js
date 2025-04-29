'use strict'


const DomElement = function (selector, height, width, bg, fontSize, textContent) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
  this.textContent = textContent;


  //определяем div или p с помощью метода startsWish
  this.createElement = function () {
    let element;
    if (this.selector.startsWith('.')) {
      element = document.createElement('div');
    } else if (this.selector.startsWith('#')) {
      element = document.createElement('p')
    } else {
      console.log('error.#');
    }

    //задаем css параметры нашему элементу
    element.style.cssText = `
height:${this.height};
width:${this.width};
background:${this.bg};
font-size:${this.fontSize};
`;

    //если в будущие в элементы, которые будут использовать DomElement как прототип, необходимо будет добвить новое свойство css, то его можно будет легко вложить в addStyles 
    if (this.addStyles) {
      element.style.cssText += this.addStyles;
    };

    element.textContent = this.textContent;
    document.body.append(element); //помещаем созданный element в конец body с помощью append

    this.element = element;//сохраняем элемент
    return element;
  };



  //создаем метод по перемещению элемента
  this.move = function (direction) {
    const step = 10;
    switch (direction) {

      case 'ArrowUp':
        this.top -= step;
        break;

      case 'ArrowDown':
        this.top += step;
        break;

      case 'ArrowLeft':
        this.left -= step;
        break;

      case 'ArrowRight':
        this.left += step;
        break;
    };

    //создаем условие, что если мы используем наш элемент, то обновляем его позицию
    if (this.element) {
      this.element.style.top = `${this.top}px`;
      this.element.style.left = `${this.left}px`;
    }
  };
};



//сначала создается элемент newDomEl
const newDomEl = new DomElement('.block', '100px', '100px', 'lightgreen', '15px', 'первый элемент');
newDomEl.createElement();//объект из первого задания

//затем moveEl после загрузки DOM
document.addEventListener('DOMContentLoaded', function () {
  const moveEl = Object.create(newDomEl);
  moveEl.textContent = 'я перемещаюсь';
  moveEl.bg = 'pink';
  moveEl.addStyles = 'position: absolute; top:150px; left:150px' //положение где находится квадрат;
  moveEl.top = 150;//положение откуда начинает движение
  moveEl.left = 150;
  moveEl.createElement();//на основе объекта из первого задания создали для второго и добавили абсолютную позицию

  document.addEventListener('keydown', function (event) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      moveEl.move(event.key);
    };
  });
});













