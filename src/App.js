import React, { useState, useEffect } from "react";
import Recipe from "./Recipe.js";
// import "./App.css";

function App() {
  const App_id = "e3578195";
  const App_key = "70bbe1ce21e419d12584fd68b592653b";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    getR();
  }, [query]);

  const getR = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${App_id}&app_key=${App_key}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };
  return (
    <div className="App">
      <nav className="nav-wrapper">
        <h4>Recipe App</h4>
      </nav>
      <form onSubmit={getSearch} className="search-form">
        <input
          style={{ width: "500px", marginLeft: "500px" }}
          className="search-bar"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search the recepe here..."
          required
        />
        <button className="btn red" type="submit">
          <span>search</span>
          <i className="material-icons right">search</i>
        </button>
      </form>
      <div className="container" style={{ margin: "0px auto" }}>
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            tittle={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
