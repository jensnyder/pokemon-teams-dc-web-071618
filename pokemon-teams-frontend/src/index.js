const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

// 1. When a user loads the page, they should see all trainers, with their current team of Pokemon. (get request)
document.addEventListener('DOMContentLoaded', function() {
  fetchTrainers()
})

function fetchTrainers() {
  fetch(TRAINERS_URL)
  .then(response => response.json())
  .then(trainersData => {
    trainersData.forEach(trainer => renderTrainer(trainer))
  })
}

function renderTrainer(trainer) {
  let main = document.querySelector('main')
  let trainerCard = document.createElement('div')
  let trainerNameElement = document.createElement('p')
  let addPokemonButton = document.createElement('button')
  let pokemonList = document.createElement('ul')

  trainerCard.className = "card"
  trainerCard.id = `trainer ${trainer.id}`
  trainerNameElement.innerText = trainer.name
  addPokemonButton.id = `trainer ${trainer.id}`
  addPokemonButton.innerText = "Add Pokemon"
  addPokemonButton.addEventListener('click', addPokemonFetch)
  pokemonList.id = `trainer ${trainer.id} pokemons`

  trainerCard.appendChild(trainerNameElement)
  trainerCard.appendChild(addPokemonButton)
  trainerCard.appendChild(pokemonList)
  main.appendChild(trainerCard)

  trainer.pokemons.forEach(pokemon => renderPokemon(pokemon))
}

function renderPokemon(pokemon) {
  let trainerPokemonList = document.getElementById(`trainer ${pokemon.trainer_id}`).querySelector('ul')
  let pokemonListItem = document.createElement('li')
  let releasePokemonButton = document.createElement('button')

  pokemonListItem.innerHTML = `${pokemon.nickname} (${pokemon.species})`
  pokemonListItem.id = `pokemon ${pokemon.id}`
  releasePokemonButton.className = 'release'
  releasePokemonButton.id = `pokemon ${pokemon.id}`
  releasePokemonButton.innerText = 'release'
  releasePokemonButton.addEventListener('click', releasePokemonFetch)

  pokemonListItem.appendChild(releasePokemonButton)
  trainerPokemonList.appendChild(pokemonListItem)
}

// Whenever a user hits Add Pokemon and they have space on their team, they should get a new Pokemon. (post request)
function addPokemonFetch(event) {
  fetch(POKEMONS_URL, {
    method: 'POST',
    body: JSON.stringify({trainer_id: `${event.target.id.split(" ")[1]}`}),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
  .then(response => response.json())
  .then(pokemonData => renderPokemon(pokemonData))
}

// Whenever a user hits Release Pokemon on a specific Pokemon team, that specific Pokemon should be released from the team.(delete request)
function releasePokemonFetch() {
  let pokemonId = parseInt(event.target.id.split(" ")[1])
  fetch(`${POKEMONS_URL}/${pokemonId}`, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(jsonData => {
    console.log(jsonData)
    trainerList = document.getElementById(`trainer ${jsonData.trainer_id} pokemons`)
    pokemonElement = document.getElementById(`pokemon ${jsonData.id}`)
    trainerList.removeChild(pokemonElement)
  })
}
