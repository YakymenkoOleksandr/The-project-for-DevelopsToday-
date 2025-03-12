import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import css from "./MealsByIngredient.module.css";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const MealsByIngredient = () => {
  const { ingredient } = useParams<{ ingredient: string }>();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
        );
        setMeals(response.data.meals || []);
      } catch (error) {
        setError("Error loading dishes by ingredient");
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [ingredient]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (meals.length === 0) return <p>No dishes found</p>;

  return (
    <div>
      <h1 className={css.header}>Страви з {ingredient}</h1>
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

export default MealsByIngredient;
