// Variables globales para almacenar la contraseña y la red social
let contraseñaGlobal = '';
let redSocialGlobal = '';

// Función para aplanar el array
function flatten(arr) {
    return arr.reduce((flat, toFlatten) => {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}

// Función para convertir algunas palabras a mayúsculas de forma aleatoria
function upper(arr) {
    return arr.map(word => Math.floor(Math.random() * 3) + 1 === 2 ? word.toUpperCase() : word);
}

// Función para agregar campos de texto según la cantidad ingresada
function agregarCampos() {
    let cantidad = parseInt(document.getElementById("cantidad").value);
    let container = document.getElementById("palabras-clave");
    container.innerHTML = "";  // Limpiar los campos previos

    for (let i = 0; i < cantidad; i++) {
        let input = document.createElement("input");
        input.type = "text";
        input.id = `palabra${i}`;
        input.placeholder = `Palabra clave ${i + 1}`;
        container.appendChild(input);
        container.appendChild(document.createElement("br"));
    }
}

// Función para generar la contraseña
function generarContraseña() {
    let cantidadElement = document.getElementById("cantidad");
    let maxLengthElement = document.getElementById("max-length");
    let datosRed = document.getElementById("red-social");
    redSocialGlobal = datosRed.value;

    // Validar si los elementos existen
    if (!cantidadElement || !maxLengthElement) {
        console.error("Elementos del formulario no encontrados.");
        return;
    }

    let cantidad = parseInt(cantidadElement.value);
    let palabras_clave = [];

    // Recolectar los valores de los campos de texto y eliminar espacios en blanco
    for (let i = 0; i < cantidad; i++) {
        let input = document.getElementById(`palabra${i}`);
        if (input) {
            palabras_clave.push(input.value.replace(/\s+/g, '').split(''));  // Eliminar espacios en blanco
        }
    }

    // Obtener la longitud máxima de la contraseña (si se proporciona)
    let maxLength = maxLengthElement.value ? parseInt(maxLengthElement.value) : null;

    // Asegurarse de que se haya ingresado alguna palabra clave
    if (palabras_clave.length === 0) {
        document.getElementById("resultado").innerText = "No se han ingresado palabras clave.";
        return;
    }

    // Aplanar la lista de palabras clave
    let lista_completa = flatten(palabras_clave);

    // Convertir algunas letras a mayúsculas aleatoriamente
    let password = upper(lista_completa);

    // Mezclar la lista
    password.sort(() => Math.random() - 0.5);

    // Unir la contraseña en un string
    contraseñaGlobal = password.join('');

    // Recortar si hay longitud máxima
    if (maxLength && contraseñaGlobal.length > maxLength) {
        contraseñaGlobal = contraseñaGlobal.slice(0, maxLength);
    }

    // Mostrar la contraseña generada en el párrafo
    document.getElementById("resultado").innerText = "Contraseña generada: " + contraseñaGlobal + "\nRed social: " + redSocialGlobal;
}

// Asigna la función al botón
document.getElementById("saveButton").addEventListener("click", handleSaveButtonClick);

// Función para manejar el clic del botón
function handleSaveButtonClick() {
    // Llama a savePasswords usando las variables globales
    savePasswords([{ Contraseña: contraseñaGlobal, Red: redSocialGlobal }]);
}


// Función para guardar las contraseñas en localStorage
function savePasswords(contraseña) {
    let contraseñasGuardadas = localStorage.getItem('contraseñas');
    if (contraseñasGuardadas != null) {
        contraseñasGuardadas = JSON.parse(contraseñasGuardadas); // Parsear las contraseñas existentes
        contraseñasGuardadas.push(...contraseña); // Agregar nuevas contraseñas
    } else {
        contraseñasGuardadas = contraseña; // Si no hay contraseñas, usar la nueva
    }
    try {
        localStorage.setItem("contraseñas", JSON.stringify(contraseñasGuardadas)); // Guardar de nuevo
        console.log('Contraseñas guardadas con éxito');
    } catch (error) {
        console.error('Error al guardar las contraseñas:', error);
    }
}