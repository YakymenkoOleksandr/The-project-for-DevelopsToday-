import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import css from "./MealsByCountry.module.css";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
}

const MealsByCountry = () => {
  const { area } = useParams<{ area: string }>();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
        );
        setMeals(response.data.meals || []);
      } catch (error) {
        setError("Error loading recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [area]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className={css.header}>Recipes from {area}</h1>
      <div className={css.wrapperForRecipes}>
        {meals.map((meal) => (
          <div key={meal.idMeal} className={css.info}>
            <h2 className={css.headerForDish}>
              <Link to={`/meal/${meal.idMeal}`}>{meal.strMeal}</Link>
            </h2>
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className={css.img}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealsByCountry;
