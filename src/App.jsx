import { useState, useEffect } from 'react';
import './App.css';
import videoMob from "./cookMob.mp4";
import search from "./search.png";
import cook from "./cooking.mp4";
import MyRecipesComponent from './MyRecipesComponent';

function App() {
  const MY_ID = "5fd5fd5b";
  const MY_KEY = "a6544493d1fc6a96d3d83d96483d20d8";

  const [mySearch, setMySearch] = useState("");
  const [myRecipes, setMyRecipes] = useState([]);
  const [wordSubmitted, setWordSubmitted] = useState("pasta");

  useEffect(() => {
    const getRecipe = async() => {
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=${MY_ID}&app_key=${MY_KEY}`,
        {
          headers: {
            "Edamam-Account-User": "student_user",
          },
        }
      );
      const data = await response.json();
      setMyRecipes(data.hits);
      console.log(data.hits)
    }
    getRecipe()
  }, [wordSubmitted])

  const myRecipeSearch = (e) => {
    setMySearch(e.target.value)
  }

  const finalSearch = (e) => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  }

  return (
    <div className='App'>
      <div className='container'>
        <video autoPlay muted loop>
          <source src={videoMob} type="video/mp4" media="(max-width: 500px)"/>
          <source src={cook} type="video/mp4" media="(min-width: 501px)"/>
        </video>
        <h1>Find a recipe</h1>
      </div>

      <div className='container'>
          <form onSubmit={finalSearch}>
              <input className='inputField' onChange={myRecipeSearch} value={mySearch}/>
          </form>
      </div>

      <div className='container'>
          <button onClick={finalSearch}>
              <img src={search} alt="search" width="100px"/>
          </button>
      </div>

      {myRecipes.map((element, index) => (
        <MyRecipesComponent key={index}
        label={element.recipe.label} 
        image={element.recipe.image} 
        calories={element.recipe.calories} 
        ingredients={element.recipe.ingredientLines}/>
      ))}
    </div>
  )
}

export default App
