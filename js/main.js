const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const pokemonDetailsContainer = document.getElementById('pokemonDetails');
let offset = 0;
const limit = 10;

function loadPokemons() {
    pokeApi.getPokemons(offset, limit)
        .then(pokemons => {
            pokemons.forEach(pokemon => {
                pokemonList.appendChild(convertPokemonToLi(pokemon));
            });
        })
        .catch(error => console.error('Erro ao carregar Pokémon:', error));
    offset += limit;
}

function showPokemonDetails(pokemon) {
    pokemonDetailsContainer.innerHTML = `
        <h2>${pokemon.name}</h2>
        <img src="${pokemon.photo}" alt="${pokemon.name}">
        <p>Tipo: ${pokemon.types.join(', ')}</p>
        <p>Altura: ${pokemon.height} m</p>
        <p>Peso: ${pokemon.weight} kg</p>
        <p>Habilidades: ${pokemon.abilities.join(', ')}</p>
    `;
    pokemonDetailsContainer.style.display = 'block'; // Exibe os detalhes
}

loadMoreButton.addEventListener('click', loadPokemons);
loadPokemons(); // Carrega os primeiros Pokémon ao iniciar
