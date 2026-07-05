const container = document.querySelector(".players");

fetch("data/players.json")
.then(response => response.json())
.then(players => {

    players.forEach(player => {

        container.innerHTML += `

        <div class="card">

            <img src="${player.foto}">

            <h3>${player.nombre}</h3>

            <p>${player.club}</p>

            <p>${player.posicion}</p>

            <p>${player.edad} años</p>

            <p class="market">${player.valor}</p>

        </div>

        `;

    });

});
