const IMAGE_URL = "http://placehold.co/200";
const BASE_URL = "https://pokeapi.co/api/v2/";
/*
fetch(BASE_URL + "pokemon/" + 1)
  .then((res) => res.json())
  .then((data) => console.log(data));
*/

const fetchPokemon = async(pokemon) => {
  try {
    const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
   // console.log(response);
    const parsedData = await response.json();
    //console.log(parsedData);
    return parsedData;
   }catch (err) {
    console.error(err);
  }
};

const createPokemonCard = (pokemon) => {
  const cardContainer = document.getElementById('pokemon-card');

  const card = document.createElement('text');
  card.className = 'pokemon-card';

  const name = document.createElement('text');
  name.textContent =pokemon.name;

  const id = document.createElement('text');
  id.textContent = `ID: ${pokemon.id}`;

  const weight = document.createElement('text');
  weight.textContent = `Weight: ${pokemon.weight}`;

  const image = document.createElement('img');
  image.src = pokemon.sprites.front_default || IMAGE_URL;
  image.alt = pokemon.name;

  card.appendChild(name);
  card.appendChild(id);
  card.appendChild(weight);
  card.appendChild(image);

  cardContainer.appendChild(card);
};

//Obtener Pokemon
document.getElementById("get-btn").addEventListener("click" , async () => {
    const text = document.getElementById("pokemon-name").value.toLocaleLowerCase();
    const pokemon =await fetchPokemon(text);
    if(pokemon) {
      localStorage.setItem("currentPokemonId", pokemon.id);
      createPokemonCard(pokemon);
    }else {
      alert("Pokemon not found");
    }
});

document.addEventListener('DOMContentLoaded', async () => {
  const storedId = localStorage.getItem('currentPokeId');
  const initialId = storedId ? parseInt(storedId) : 1;
  const pokemon = await fetchPokemon(initialId);
  if(pokemon) {
    createPokemonCard(pokemon);
  }else {
    alert("Pokemon not found");
  }
});
//Obtener el anterior y el siguiente

document.getElementById("prev-btn").addEventListener("click" , async () => {
    const currentPokemonId = parseInt(localStorage.getItem("currentPokemonId"));
    const newId = Math.max(currentPokemonId -1, 1);
    const pokemon =await fetchPokemon(newId);
    if (pokemon) {
      localStorage.setItem("currentPokemonId",pokemon.id);
      createPokemonCard(pokemon);
    }else {
      alert("Pokemon not found");
    }
});

document.getElementById("next-btn").addEventListener("click" , async () => {
    const currentPokemonId = parseInt(localStorage.getItem("currentPokemonId"));
    const newId = currentPokemonId + 1;
    const pokemon =await fetchPokemon(newId);
    if (pokemon) {
      localStorage.setItem("currentPokemonId", pokemon.id);
      createPokemonCard(pokemon);
    } else {
      alert("Pokemon not found");
    }
});

fetch("https://jsonplaceholder.typicode.com/posts" , {
   method: 'POST' , 
   headers: {
    'Content-type': 'application/json; charset=UTF-8',
   },
   body: JSON.stringify({
    title: "title 1",
    body: "Lorem ipsum",
    userId: 1,
   }),
})
  .then(res => res.json())
  .then((data) => console.log(data));
