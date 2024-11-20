// Función para cargar las contraseñas desde localStorage
function loadPasswords() {
    try {
        const data = localStorage.getItem('contraseñas');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error al cargar las contraseñas:', error);
        return [];
    }
}

// Ejemplo de uso de loadPasswords (puedes ajustar según lo que necesites)
document.getElementById("loadButton").addEventListener("click", () => {
    const contraseñas = loadPasswords();
    console.log('Contraseñas cargadas:', contraseñas);

    const container = document.getElementById('passwords-container');
    container.innerHTML = ''; // Limpiar el contenedor antes de cargar

    contraseñas.forEach(password => {
        const div = document.createElement('div');
        div.className = 'password-item';
        div.innerHTML = `
            <p class="id">Contraseña: ${password.Contraseña}</p>
            <p class="password">Red: ${password.Red}</p>
        `;
        container.appendChild(div);
    });
});