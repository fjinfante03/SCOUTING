// =======================================
// SCOUT DATABASE
// app.js
// =======================================

let jugadores = [];
let jugadoresFiltrados = [];

// Elementos del HTML
const contenedor = document.getElementById("players");
const buscador = document.getElementById("search");

const totalPlayers = document.getElementById("totalPlayers");
const totalCountries = document.getElementById("totalCountries");
const totalClubs = document.getElementById("totalClubs");
const totalValue = document.getElementById("totalValue");

// Cargar jugadores
async function cargarJugadores() {

    try {

        const respuesta = await fetch("data/players.json");

        jugadores = await respuesta.json();

        jugadoresFiltrados = jugadores;

        mostrarJugadores(jugadoresFiltrados);

        actualizarDashboard(jugadoresFiltrados);

    } catch (error) {

        console.error("Error cargando players.json", error);

    }

}

// Mostrar tarjetas
function mostrarJugadores(lista) {

    contenedor.innerHTML = "";

    lista.forEach(jugador => {

        contenedor.innerHTML += `

        <div class="card">

            <img src="${jugador.foto}" alt="${jugador.nombre}">

            <div class="card-content">

                <h3>${jugador.nombre}</h3>

                <p>${jugador.bandera} ${jugador.pais}</p>

                <p>${jugador.club}</p>

                <p><strong>${jugador.posicion}</strong></p>

                <p>${jugador.edad} años</p>

                <p class="market">${jugador.valor}</p>

                <a href="jugadores/player.html?id=${jugador.id}">
                    Ver ficha
                </a>

            </div>

        </div>

        `;

    });

}

// Dashboard
function actualizarDashboard(lista){

    totalPlayers.textContent = lista.length;

    const paises = [...new Set(lista.map(j => j.pais))];

    totalCountries.textContent = paises.length;

    const clubes = [...new Set(lista.map(j => j.club))];

    totalClubs.textContent = clubes.length;

    let total = 0;

    lista.forEach(j=>{

        total += j.valorNumerico;

    });

    totalValue.textContent = total + " M€";

}

// Buscador
buscador.addEventListener("input", function(){

    const texto = this.value.toLowerCase();

    jugadoresFiltrados = jugadores.filter(j =>

        j.nombre.toLowerCase().includes(texto) ||

        j.club.toLowerCase().includes(texto) ||

        j.pais.toLowerCase().includes(texto)

    );

    mostrarJugadores(jugadoresFiltrados);

    actualizarDashboard(jugadoresFiltrados);

});

// Filtros
const botones = document.querySelectorAll(".filters button");

botones.forEach(boton=>{

    boton.addEventListener("click",()=>{

        const posicion = boton.dataset.position;

        if(posicion==="Todos"){

            jugadoresFiltrados = jugadores;

        }else{

            jugadoresFiltrados = jugadores.filter(j=>j.posicion===posicion);

        }

        mostrarJugadores(jugadoresFiltrados);

        actualizarDashboard(jugadoresFiltrados);

    });

});

// Iniciar aplicación
cargarJugadores();
