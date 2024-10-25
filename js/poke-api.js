const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    pokemon.types = types;
    pokemon.type = types[0];
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    // Novas propriedades
    pokemon.abilities = pokeDetail.abilities.map(abilitySlot => abilitySlot.ability.name);
    pokemon.height = (pokeDetail.height / 10).toFixed(1);
    pokemon.weight = (pokeDetail.weight / 10).toFixed(1);

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then(response => response.json())
        .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then(response => response.json())
        .then(jsonBody => jsonBody.results)
        .then(pokemons => Promise.all(pokemons.map(pokeApi.getPokemonDetail)));
};

function convertPokemonToLi(pokemon) {
    const li = document.createElement('li');
    li.classList.add('pokemon', pokemon.type);
    li.innerHTML = `
        <span>${pokemon.name}</span>
        <img src="${pokemon.photo}" alt="${pokemon.name}">
    `;
    li.onclick = () => showPokemonDetails(pokemon); // Adiciona o evento de clique
    return li;
}
