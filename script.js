const CLAVE = "panaderia_triga";

const pagina = document.body.dataset.pagina;

let datos = null;

try {
  datos = JSON.parse(sessionStorage.getItem(CLAVE));
} catch {
  sessionStorage.removeItem(CLAVE);
}

const form = document.querySelector("#pedido");

if (form) {

  if (datos) {
    form.elements.cliente.value = datos.cliente || "";
    form.elements.correo.value = datos.correo || "";
    form.elements.fecha.value = datos.fecha || "";

    form.elements.pan.value = datos.pan || 0;
    form.elements.alfajores.value = datos.alfajores || 0;
    form.elements.torta.value = datos.torta || 0;

    if (datos.modalidad) {
      form.elements.modalidad.value = datos.modalidad;
    }
  }

  form.addEventListener("submit", event => {

    event.preventDefault();

    const cliente = form.elements.cliente.value.trim();
    const correo = form.elements.correo.value.trim();
    const fecha = form.elements.fecha.value;

    const pan = Number(form.elements.pan.value);
    const alfajores = Number(form.elements.alfajores.value);
    const torta = Number(form.elements.torta.value);

    const modalidad = form.elements.modalidad.value;


    if (cliente.length < 3 || cliente.length > 60) {
      alert("El nombre debe tener entre 3 y 60 caracteres.");
      return;
    }

    if (!correo) {
      alert("Ingresa un correo válido.");
      return;
    }


    if (
      pan < 0 || pan > 10 ||
      alfajores < 0 || alfajores > 10 ||
      torta < 0 || torta > 10
    ) {
      alert("La cantidad debe estar entre 0 y 10.");
      return;
    }

    if (pan === 0 && alfajores === 0 && torta === 0) {
      alert("Debes elegir al menos un producto.");
      return;
    }

    const precioPan = 18;
    const precioAlfajores = 24;
    const precioTorta = 45;



    const subtotal =
      (pan * precioPan) +
      (alfajores * precioAlfajores) +
      (torta * precioTorta);


    let descuento = 0;

    if (subtotal >= 100) {
      descuento = subtotal * 0.10;
    }



    const subtotalDescuento = subtotal - descuento;


    let reparto = 0;

    if (modalidad === "reparto") {
      reparto = 8;
    }



    const total = subtotalDescuento + reparto;


    datos = {
      cliente,
      correo,
      fecha,
      pan,
      alfajores,
      torta,
      modalidad,
      subtotal,
      descuento,
      reparto,
      total
    };


    sessionStorage.setItem(
      CLAVE,
      JSON.stringify(datos)
    );
    document.querySelector("#mensaje").textContent =
      "Pedido calculado correctamente.";

    document.querySelector("#resultado").textContent = [
      "Cliente: " + cliente,
      "Correo: " + correo,
      "Fecha de entrega: " + fecha,
      "",
      "Pan de masa madre: " + pan,
      "Caja de alfajores: " + alfajores,
      "Torta pequeña: " + torta,
      "",
      "Subtotal: S/ " + subtotal.toFixed(2),
      "Descuento: S/ " + descuento.toFixed(2),
      "Reparto: S/ " + reparto.toFixed(2),
      "TOTAL: S/ " + total.toFixed(2)
    ].join("\n");

  });


  form.addEventListener("reset", () => {

    setTimeout(() => {
      document.querySelector("#mensaje").textContent = "";
      document.querySelector("#resultado").textContent = "";
    }, 0);

  });

}
