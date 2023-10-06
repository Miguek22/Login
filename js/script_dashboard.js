function editarFila(btn) {
    const fila = btn.closest("tr");
    const elementosEditables = fila.querySelectorAll(".editable");

    const valoresOriginales = [];
    elementosEditables.forEach((elemento) => {
        const valor = elemento.textContent;
        const input = document.createElement("input");
        input.type = "text";
        input.value = valor;
        elemento.textContent = "";
        elemento.appendChild(input);
        valoresOriginales.push(valor);
    });
    
    const editarBtn = fila.querySelector(".editar-btn");
    const guardarBtn = fila.querySelector(".guardar-btn");
    const descartarBtn = fila.querySelector(".descartar-btn");
    const eliminarBtn = fila.querySelector(".eliminar-btn");

    editarBtn.style.display = "none";
    guardarBtn.style.display = "inline-block";
    descartarBtn.style.display = "inline-block";
    eliminarBtn.style.display = "none";

    fila.dataset.valoresOriginales = JSON.stringify(valoresOriginales);
}

function descartarFila(btn) {
    const fila = btn.closest("tr");
    const elementosEditables = fila.querySelectorAll(".editable");
    const valoresOriginales = JSON.parse(fila.dataset.valoresOriginales);

    elementosEditables.forEach((elemento, index) => {
        elemento.textContent = valoresOriginales[index];
    });

    const editarBtn = fila.querySelector(".editar-btn");
    const guardarBtn = fila.querySelector(".guardar-btn");
    const descartarBtn = fila.querySelector(".descartar-btn");
    const eliminarBtn = fila.querySelector(".eliminar-btn");

    editarBtn.style.display = "inline-block";
    guardarBtn.style.display = "none";
    descartarBtn.style.display = "none";
    eliminarBtn.style.display = "inline-block";
}

function eliminarFila(btn, idPersona) {
    const fila = btn.closest("tr");
    console.log("ID DELETE: ", idPersona);

    const data = { id_persona: idPersona };
    fetch("delete_people.php", {
        method: "POST",
        body: JSON.stringify(data), 
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            fila.remove();
            alert("Registro eliminado correctamente");
        } else {
            alert("Error al eliminar el registro");
        }
    })
    .catch(error => {
        console.error("Error en la solicitud AJAX: " + error);
    });
}



function guardarFila(btn) {
    console.log("DATOS 1", btn);
    const fila = btn.closest("tr");
    console.log("DATOS 2", fila);
    const id_persona_btn = fila.querySelector("td:first-child").textContent;
    const nombreInput = fila.querySelector("td:nth-child(2) input");
    const apellidoInput = fila.querySelector("td:nth-child(3) input");
    const sexoInput = fila.querySelector("td:nth-child(4) input");
    const nombre_btn = nombreInput.value;
    const apellido_btn = apellidoInput.value;
    const sexo_btn = sexoInput.value;
    console.log("DATOS 3", nombre_btn);
    console.log("DATOS 4", apellido_btn);
    console.log("DATOS 5", sexo_btn);

    const formData = new FormData();
    formData.append("id_persona", id_persona_btn);
    formData.append("nombre", nombre_btn);
    formData.append("apellido", apellido_btn);
    formData.append("sexo", sexo_btn);
    console.log("DATOS 6", formData);
    fetch("dashboard_logistic.php", {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
          
            nombreInput.style.display = "none";
            apellidoInput.style.display = "none";
            sexoInput.style.display = "none";
            fila.querySelector("td:nth-child(2) .editable").textContent = nombre_btn;
            fila.querySelector("td:nth-child(3) .editable").textContent = apellido_btn;
            fila.querySelector("td:nth-child(4) .editable").textContent = sexo_btn;

            const editarBtn = fila.querySelector(".editar-btn");
            const guardarBtn = fila.querySelector(".guardar-btn");
            const descartarBtn = fila.querySelector(".descartar-btn");
            const eliminarBtn = fila.querySelector(".eliminar-btn");

            editarBtn.style.display = "inline-block";
            guardarBtn.style.display = "none";
            descartarBtn.style.display = "none";
            eliminarBtn.style.display = "inline-block";

            alert("Cambios guardados correctamente");
        } else {
            alert("Error al guardar los cambios");
        }
    })
    .catch(error => {
        console.error("Error en la solicitud AJAX: " + error);
    });
}

function agregarFila() {
    console.log("HACE CASO")
    const tabla = document.querySelector("table tbody");
    const nuevaFila = document.createElement("tr");
    nuevaFila.innerHTML = `
        <td></td>
        <td><input type="text" class="nuevo-nombre" placeholder="Nombre"></td>
        <td><input type="text" class="nuevo-apellido" placeholder="Apellido"></td>
        <td><input type="text" class="nuevo-sexo" placeholder="Sexo"></td>
        <td>
            <button class='guardar-nuevo-btn' onclick='guardarNuevaFila(this)'>Guardar</button>
            <button class='descartar-nuevo-btn' onclick='descartarNuevaFila(this)'>Descartar</button>
        </td>
    `;
    tabla.appendChild(nuevaFila);
}

function guardarNuevaFila(btn) {
    const fila = btn.closest("tr");
    const nombreInput = fila.querySelector(".nuevo-nombre");
    const apellidoInput = fila.querySelector(".nuevo-apellido");
    const sexoInput = fila.querySelector(".nuevo-sexo");

    const nombre = nombreInput.value;
    const apellido = apellidoInput.value;
    const sexo = sexoInput.value;

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("apellido", apellido);
    formData.append("sexo", sexo);
    console.log("DATOS", formData)
    fetch("insert_people.php", {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const tabla = document.querySelector("table tbody");
            const nuevaFila = document.createElement("tr");
            nuevaFila.innerHTML = `
                <td>${data.id_persona}</td>
                <td><span class='editable'>${nombre}</span></td>
                <td><span class='editable'>${apellido}</span></td>
                <td><span class='editable'>${sexo}</span></td>
                <td>
                    <button class='editar-btn' onclick='editarFila(this)'>Editar</button>
                    <button class='guardar-btn' onclick='guardarFila(this)' style='display:none'>Guardar</button>
                    <button class='descartar-btn' onclick='descartarFila(this)' style='display:none'>Descartar</button>
                </td>
                <td>
                    <button class='eliminar-btn' onclick='eliminarFila(this, ${data.id_persona})' style='display:inline-block'>Eliminar</button>
                </td>
            `;

            tabla.appendChild(nuevaFila);
            fila.style.display = "none";
            nombreInput.style.display = "none";
            apellidoInput.style.display = "none";
            sexoInput.style.display = "none";
            nuevaFila.querySelector("td:nth-child(2) .editable").textContent = nombre;
            nuevaFila.querySelector("td:nth-child(3) .editable").textContent = apellido;
            nuevaFila.querySelector("td:nth-child(4) .editable").textContent = sexo;

            nombreInput.value = "";
            apellidoInput.value = "";
            sexoInput.value = "";
    
            const guardarBtn = fila.querySelector(".guardar-nuevo-btn");
            const descartarBtn = fila.querySelector(".descartar-nuevo-btn");
            guardarBtn.style.display = "none";
            descartarBtn.style.display = "none";
    
            alert("Nueva persona agregada correctamente");
        } else {
            alert("Error al agregar la nueva persona");
        }
    })
    .catch(error => {
        console.error("Error en la solicitud AJAX: " + error);
    });
}

function descartarNuevaFila(btn) {
    const fila = btn.closest("tr");
    fila.remove();
}

const agregarBtn = document.querySelector("#agregar-btn");
agregarBtn.addEventListener("click", agregarFila);
