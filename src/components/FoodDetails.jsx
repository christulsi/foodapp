import { useState, useEffect } from "react";
import styles from "./foodDetails.module.css";
import ItemList from "./ItemList";

export default function FoodDetails({ foodId }) {
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [foodDetails, setFoodDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFoodDetail();
  }, [foodId]);

  async function fetchFoodDetail() {
    const res = await fetch(`${URL}?apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data.results);
    setFoodDetails(data);
    setIsLoading(false);
  }
  return (
    <div>
      <div className={styles.recipeCard}>
        <h1 className={styles.recipeName}>{foodDetails.title}</h1>
        <img
          className={styles.recipeImage}
          src={foodDetails.image}
          alt={foodDetails.title}
        />
        <div className={styles.recipe}>
          <span>
            <strong>🕒 {foodDetails.readyInMinutes} Minutes</strong>
          </span>
          <span>
            <strong>🙍🏻‍♂️ Serves {foodDetails.servings}</strong>
          </span>
          <span>
            <strong>
              {foodDetails.vegetarian ? "🥕 Vegetarian" : "🥩 Non-Vegetarian"}
            </strong>
            <strong>{foodDetails.vegan ? "🐮 Vegan" : ""}</strong>
          </span>
        </div>
        <div>
          <span>
            <strong>$ {foodDetails.pricePerServing}</strong>
          </span>
        </div>

        <div>
          <h2>Ingredients</h2>
          <ItemList isLoading={isLoading} foodDetails={foodDetails} />
          <h2>Instructions</h2>
          <div className={styles.recipeInstructions}>
            <ol>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                foodDetails.analyzedInstructions[0].steps.map((step) => (
                  <li key={step.number}>{step.step}</li>
                ))
              )}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
