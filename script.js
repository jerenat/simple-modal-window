"use strict";

class Modal {
  constructor(config) {
    this.body = config.body;
    this.title = config.title.toString();

    // -- movimiento
    this.move = config.move || false;

    // -- tamaños
    this.size = config.size || false;
  }

  // -- Construir y mostrar modal
  show(buttonEvent, callback) {
    // -- Cuerpo del modal
    var modalBackground = document.createElement("div");
    modalBackground.setAttribute("class", "modal-background");

    // -- modal
    var modal = document.createElement("div");
    modal.setAttribute("class", "modal");
    modalBackground.appendChild(modal);

    // -- tamaño
    // -- Si el tamaño no es false
    if (this.size) {
      const mWidth = this.size.width;
      const mHeight = this.size.height;

      modal.style.width = mWidth;
      modal.style.height = mHeight;
    }

    // -- modal > modal-header
    var modalHeader = document.createElement("div");
    modalHeader.setAttribute("class", "modal-header");
    modal.appendChild(modalHeader);
    modalHeader.innerHTML = `<strong>${this.title}</strong> <div class="xmark-btn" id="close-btn"></div>`;

    // -- modal > modal-body
    var modalBody = document.createElement("div");
    modalBody.setAttribute("class", "modal-body");
    modal.appendChild(modalBody);

    // -- envíar elementos
    callback(modalBody);

    // -- al presionar el boton
    buttonEvent.addEventListener("click", (e) => {
      if (this.body.contains(modalBackground)) {
        // -- remover el atributo style
        modal.style.top = null;
        modal.style.left = null;

        this.body.removeChild(modalBackground);
      } else if (!this.body.contains(modalBackground)) {
        this.body.appendChild(modalBackground);
      }
    });

    // -- al presionar el botón de cerrado
    modalHeader.querySelector("#close-btn").addEventListener("click", (e) => {
      // -- remover el atributo style
      modal.style.top = null;
      modal.style.left = null;

      this.body.removeChild(modalBackground);
    });

    // -- Mover el modal
    // -- Fiddle from: https://jsfiddle.net/f5EMT/1/

    // -- Si la opción de movimiento está en true
    if (this.move) {
      var mousePosition,
        offset = [0, 0],
        isDown = false;

      modalHeader.addEventListener(
        "mousedown",
        (e) => {
          isDown = true;
          offset = [modal.offsetLeft - e.clientX, modal.offsetTop - e.clientY];
        },
        true
      );

      modalHeader.addEventListener(
        "mouseup",
        (e) => {
          isDown = false;
        },
        true
      );

      document.addEventListener(
        "mousemove",
        (e) => {
          e.preventDefault();

          if (isDown) {
            mousePosition = {
              x: e.clientX,
              y: e.clientY,
            };

            modal.style.left = `${mousePosition.x + offset[0]}px`;
            modal.style.top = `${mousePosition.y + offset[1]}px`;
          }
        },
        true
      );
    }
  }
}

(function () {
  const modalButton = document.querySelector("#showmodal");

  var modal = new Modal({
    body: document.body,
    title: "Bienvenidos a mi nuevo modal",
    move: true,
    size: {
      width: "500px",
      height: "100px",
    },
  });

  modal.show(modalButton, (data) => {
    data.innerHTML = `<p>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.</p>`;
  });
})();
