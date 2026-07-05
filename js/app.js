// Obtener el ID del jugador desde la URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Cargar el JSON
fetch("../data/players.json")
    .then(response => response.json())
    .then(players => {

        const player = players.find(p => p.id === id);

        if (!player) {

            document.body.innerHTML = "<h1>Jugador no encontrado</h1>";
            return;

        }

        // Información principal

        document.getElementById("playerImage").src = "../" + player.foto;

        document.getElementById("playerName").textContent = player.nombre;

        document.getElementById("playerClub").textContent = player.club;

        document.getElementById("playerCountry").textContent = player.pais;

        document.getElementById("playerPosition").textContent = player.posicion;

        document.getElementById("playerAge").textContent = player.edad + " años";

        document.getElementById("playerValue").textContent = player.valor;

        // Tabla de temporadas

        const tbody = document.getElementById("seasonBody");

        if(player.temporadas){

            player.temporadas.forEach(temp=>{

                tbody.innerHTML += `

                <tr>

                    <td>${temp.temporada}</td>

                    <td>${temp.partidos}</td>

                    <td>${temp.minutos}</td>

                    <td>${temp.goles}</td>

                    <td>${temp.asistencias}</td>

                </tr>

                `;

            });

        }

    });
});

// Iniciar aplicación
cargarJugadores();
