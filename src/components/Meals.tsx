import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import css from "./Meals.module.css";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
}

const Meals = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/search.php?s="
        );
        setMeals(response.data.meals || []);
      } catch (error) {
        setError("Error loading recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={css.wrapperForDish}>
      <h1 className={css.allRecipes}> All recipes</h1>
      {meals.map((meal) => (
        <div key={meal.idMeal} className={css.info}>
          <h2 className={css.header}>
            <Link to={`/meal/${meal.idMeal}`}>{meal.strMeal}</Link>
          </h2>
          <img src={meal.strMealThumb} alt={meal.strMeal} className={css.img} />
          <p className={css.text}>
            {meal.strInstructions?.substring(0, 100)}...
          </p>
        </div>
      ))}
    </div>
  );
};

export default Meals;
