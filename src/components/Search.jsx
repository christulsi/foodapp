import { useState, useEffect } from "react";
import styles from "./search.module.css";

const URL = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = import.meta.env.VITE_API_KEY;

export default function Search({ foodData, setFoodData }) {
  const [query, setQuery] = useState("pizza");

  useEffect(() => {
    fetchFood();
  }, [query]);

  async function fetchFood() {
    const res = await fetch(`${URL}?query=${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data.results);
    setFoodData(data.results);
  }
  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.input}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        type="text"
      />
    </div>
  );
}
