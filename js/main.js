'use strict'


const DomElement = function (selector, height, width, bg, frontSize, textContent) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.frontSize = frontSize;
  this.textContent = textContent;

  this.createElement = function () {
    let element;
    if (this.selector.startsWith('.')) {
      element = document.createElement('div');
    } else if (this.selector.startsWith('#')) {
      element = document.createElement('p')
    } else {
      console.log('error.#');
    }
    element.style.cssText = `
height:${this.height};
width:${this.width};
background:${this.bg};
front-size:${this.frontSize};
`;

    if (this.addStyles) {
      element.style.cssText += this.addStyles;
    };

    element.textContent = this.textContent;
    document.body.append(element); //помещаем созданный element в конец body с помощью append

    return element;
  };
};


const newDomEl = new DomElement('.block', '100px', '100px', 'lightgreen', '20px', 'первый элемент');
newDomEl.createElement();



