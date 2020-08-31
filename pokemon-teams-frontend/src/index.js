const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
  getTrainers() 
})

const mainSection = document.querySelector("main")

const createTrainerCard = (trainer) => {
  const trainerDiv = document.createElement('div')
  trainerDiv.className = "card"
  trainerDiv.dataset.id = trainer.id
  const trainerNameTag = document.createElement('p')
  trainerNameTag.innerText = trainer.name
  const addPokeButton = document.createElement('button')
  addPokeButton.innerText = "Add Pokemon"

  addPokeButton.addEventListener('click', (e) => {
    const trainerId = e.target.parentElement.dataset.id
    const target = e.target
    createPokemon(trainerId, target)
  })

  trainerDiv.append(trainerNameTag)
  trainerDiv.append(addPokeButton)
  mainSection.appendChild(trainerDiv)
  
  const pokeUl = document.createElement('ul')
  
  trainerDiv.appendChild(pokeUl)
  for (const pokemon of trainer.pokemons) {
    const pokeLi = document.createElement('li')
    const releaseButton = document.createElement('button')
    releaseButton.innerText = 'Release'
    releaseButton.className = "release"
    releaseButton.dataset.pokemonId = pokemon.id

    releaseButton.addEventListener('click', (e) => {
      const pokemonId = e.target.dataset.pokemonId
      releasePokemon(pokemonId)
      e.target.parentElement.remove()
    })

    pokeLi.innerText = `${pokemon.species} (${pokemon.nickname}) `
    pokeLi.append(releaseButton)
    pokeUl.append(pokeLi)
  }
}


const getTrainers = () => {
  fetch('http://localhost:3000/trainers')
  .then(res => res.json())
  .then(trainers => {
    trainers.forEach(trainer => {
      createTrainerCard(trainer)
    })
  })
}

// const getPokemon = (target) => {
//   const aPoke = []
//   fetch('http://localhost:3000/pokemons')
//   .then(res => res.json())
//   .then((pokemons) => {
//     aPoke.push(pokemons)
//     })
//     return aPoke
//   }

const createPokemon = (trainerId, target) => {
  const pokeParam = {
     pokemon: {
      trainer_id: trainerId
    }
  }

  fetch('http://localhost:3000/pokemons', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(pokeParam)
  })
  .then(res => res.json())
  .then(data => {
    if (data.message === "This pokemon was created.") {
      getPokemon(target)
    }
  })
}

const getPokemon = (target) => {

  fetch('http://localhost:3000/pokemons')
  .then(res => res.json())
  .then((pokemons) => {
    const aPoke = pokemons.slice()
    console.log(target.parentElement.dataset.id)
    aPoke.sort(function(pokemonOne, pokemonTwo) {
      return pokemonOne.id - pokemonTwo.id
    })
    console.log(aPoke[aPoke.length -1])
    newPokemon(aPoke[aPoke.length -1], target)
  })
}

const newPokemon = (newestPokemon, target) => {
  const trainerUl = target.nextSibling

  if (trainerUl.childElementCount < 6) {
    const newPokeLi = document.createElement('li')
    const releaseButton = document.createElement('button')
    releaseButton.innerText = 'Release'
    releaseButton.className = "release"
    releaseButton.dataset.pokemonId = newestPokemon.id
  
    releaseButton.addEventListener('click', (e) => {
      const pokemonId = e.target.dataset.pokemonId
      releasePokemon(pokemonId)
      e.target.parentElement.remove()
    })
    
    newPokeLi.innerText = `${newestPokemon.species} (${newestPokemon.nickname}) `
    newPokeLi.append(releaseButton)
    trainerUl.append(newPokeLi)
  }
}

const releasePokemon = (pokemonId) => {
  fetch(`http://localhost:3000/pokemons/${pokemonId}`,{
    method: "DELETE"
  })
}



  