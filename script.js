
let pokemonIdAtual = 1;

document.getElementById('pokemonInput').addEventListener('keypress', function(evento) {
    if (evento.key === 'Enter') { 
        buscarPokemon(); 
    }
});

function buscarPokemon(pokemonId = null) {
    var inputPokemon = pokemonId || document.getElementById('pokemonInput').value.toLowerCase(); 
    var pokemonDiv = document.getElementById('pokemonData'); 

    fetch('https://pokeapi.co/api/v2/pokemon/' + inputPokemon)
        .then(function(resposta) {
            if (!resposta.ok) { 
                throw new Error('Pokémon não encontrado');
            }
            return resposta.json(); 
        })
        .then(function(dados) { 
            pokemonIdAtual = dados.id; 
            const htmlPokemon = `
                <h2>${dados.name.charAt(0).toUpperCase() + dados.name.slice(1)} (#${dados.id})</h2>
                <img src="${dados.sprites.front_default}" alt="${dados.name}">
                <p><strong>Altura:</strong> ${dados.height / 10} metros</p>
                <p><strong>Peso:</strong> ${dados.weight / 10} kg</p>
                <p><strong>Tipo:</strong> ${dados.types.map(function(tipo) { return tipo.type.name }).join(', ')}</p>
            `;
            pokemonDiv.innerHTML = htmlPokemon;

            corPokemon(dados.types.map(function(tipo) { return tipo.type.name }));
        })
        .catch(function(erro) { 
            pokemonDiv.innerHTML = `<p>${erro.message}</p>`; 
        });
}
function proximoPokemon() {
    pokemonIdAtual += 1; 
    buscarPokemon(pokemonIdAtual); 
}
function pokemonAnterior() {
    if (pokemonIdAtual > 1) { 
        pokemonIdAtual -= 1; 
        buscarPokemon(pokemonIdAtual); 
    }
}

function corPokemon(tipos) {
    const pokemonDiv = document.getElementById('pokemonData');
    
    pokemonDiv.classList.remove('fire', 'water', 'grass', 'electric', 'default', 'bug', 'ground', 'psychic', 'ghost', 'ice', 'dragon', 'rock', 'dark', 'fairy', 'flying', 'poison', 'fighting');

    if (tipos.includes('fire')) {
        pokemonDiv.classList.add('fire');
    } else if (tipos.includes('water')) {
        pokemonDiv.classList.add('water');
    } else if (tipos.includes('grass')) {
        pokemonDiv.classList.add('grass');
    } else if (tipos.includes('electric')) {
        pokemonDiv.classList.add('electric');
    } else if (tipos.includes('bug')) {
        pokemonDiv.classList.add('bug');
    } else if (tipos.includes('ground')) {
        pokemonDiv.classList.add('ground');
    } else if (tipos.includes('psychic')) {
        pokemonDiv.classList.add('psychic');
    } else if (tipos.includes('ghost')) {
        pokemonDiv.classList.add('ghost');
    } else if (tipos.includes('ice')) {
        pokemonDiv.classList.add('ice');
    } else if (tipos.includes('dragon')) {
        pokemonDiv.classList.add('dragon');
    } else if (tipos.includes('rock')) {
        pokemonDiv.classList.add('rock');
    } else if (tipos.includes('dark')) {
        pokemonDiv.classList.add('dark');
    } else if (tipos.includes('fairy')) {
        pokemonDiv.classList.add('fairy');
    } else if (tipos.includes('flying')) {
        pokemonDiv.classList.add('flying');
    } else if (tipos.includes('poison')) {
        pokemonDiv.classList.add('poison');
    } else if (tipos.includes('fighting')) {
        pokemonDiv.classList.add('fighting');
    } else {
        pokemonDiv.classList.add('default'); 
    }
}