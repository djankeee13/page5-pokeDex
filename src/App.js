
import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
 
  const [pokemonName, setpokemonName] = useState("");
  const [pokemonChosen, setpokemonChosen] = useState(false)
  const [pokemon,setPokemon] = useState({
    name: "" , 
    species: "", 
    img: "" , 
    hp: "" ,
    attack: "",
    defence: "",
    type: "",
    weight : ""
  })

  const searchPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response)=> {
     setPokemon({
      name: pokemonName, 
      species: response.data.species.name , 
      img: response.data.sprites.other.dream_world.front_default, 
      hp: response.data.stats[0].base_stat, 
      attack: response.data.stats[1].base_stat,
      defence: response.data.stats[2].base_stat ,
      type: response.data.types[0].type.name,
      weight : response.data.weight
    });
    setpokemonChosen(true)
    }
    )
  }

  return (
    <div className="App">
      <div className="TitleSection">
      <h2>Pokemon Stats</h2>
      <input type="text" onChange={(event) =>{
        setpokemonName(event.target.value)
        }}
         />
      <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      <div className='DisplaySectiom'>
        {!pokemonChosen ? ( <h1>Please chose a Pokemon</h1> ) 
        :
        (
          <>
         <h1> {pokemon.name}</h1>
          <img src={pokemon.img} />
          <h3> Species: { pokemon.species}</h3>
          <h2>Type : {pokemon.type} </h2>
          <h4> Hp: { pokemon.hp} </h4>
          <h4> Att: { pokemon.attack} </h4>
          <h4> Defence: { pokemon.defence} </h4>
          <h4>Weight: {pokemon.weight}</h4>
        
        </> 
        )}

      </div>
   
    </div>
  );
}

export default App;
