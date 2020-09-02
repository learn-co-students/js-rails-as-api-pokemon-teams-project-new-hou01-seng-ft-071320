const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded",()=>{
    getTrainers()
})

const getTrainers=()=>{
    fetch(TRAINERS_URL)
    .then(res=>res.json())
    .then(data=>{loadTraCard(data)})
}
const mainCon=document.querySelector('main')

const loadTraCard=(data)=>{
    data.forEach(trai=>{
        // console.log(trai)
       const cardCon=document.createElement('div')
       const cardName=document.createElement('p')
       const cardUL=document.createElement('ul')
       const cardBtn=document.createElement('button')
        cardBtn.innerText="Add Pokemon"
        cardName.innerText=trai.name
        cardBtn.dataset.traiID=trai.id

        cardBtn.addEventListener('click',(e)=>{
            const trainer_id= e.target.dataset.traiID
            createPoke(trainer_id)
        })
        const createPoke=(trainer_id)=>{
            const newPoke={
                trainer_id: trainer_id
            }
            fetch(`${BASE_URL}/pokemons`,
            {method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
                body: JSON.stringify(newPoke)
            })
            .then(res=>res.json())
            .then(poke=>{loadPoke(poke,cardUL)
            })
        }

        cardCon.appendChild(cardName)
        cardCon.appendChild(cardBtn)
        cardCon.appendChild(cardUL)

        mainCon.appendChild(cardCon)
        trai.pokemons.forEach(poke=>{
            loadPoke(poke,cardUL)
        })
    })
}

const loadPoke=(poke,cardUL)=>{
    const pokeLi=document.createElement('li')
            pokeLi.dataset.pokeID=poke.id
            pokeLi.innerText=`${poke.nickname}(${poke.species})`
            const releaseBtn=document.createElement('button')
            releaseBtn.innerText="Release"
            pokeLi.append(releaseBtn)
            cardUL.appendChild(pokeLi)
            releaseBtn.addEventListener('click',(e)=>{
                const releaseID=e.target.parentElement.dataset.pokeID
                releasePoke(releaseID)
                e.target.parentElement.remove()
            })
}


const releasePoke=(releaseID)=>{
    fetch(`${BASE_URL}/pokemons/${releaseID}`,
        {method: "DELETE"}
        )
    .then(res=>res.json())
}

