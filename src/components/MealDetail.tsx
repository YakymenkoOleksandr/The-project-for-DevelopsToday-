import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import css from "./MealDetail.module.css";
import { Link } from "react-router-dom";
import CategorySidebar from "./CategorySidebar";

interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
  ingredients: { ingredient: string; measure: string }[];
}

const MealDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = response.data.meals[0];

        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
          const ingredient = data[`strIngredient${i}`];
          const measure = data[`strMeasure${i}`];
          if (ingredient && ingredient.trim() !== "") {
            ingredients.push({ ingredient, measure });
          }
        }

        setMeal({
          idMeal: data.idMeal,
          strMeal: data.strMeal,
          strCategory: data.strCategory,
          strArea: data.strArea,
          strInstructions: data.strInstructions,
          strMealThumb: data.strMealThumb,
          strYoutube: data.strYoutube,
          ingredients,
        });
      } catch (error) {
        setError("Recipe loading error");
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!meal) return <p>Recipe not found</p>;

  return (
    <div className={css.wrapperForMealDetail}>
      <div>
        <img src={meal.strMealThumb} alt={meal.strMeal} className={css.img} />
        <h1 className={css.nameOfDish}>{meal.strMeal}</h1>
        <Link to={`/country/${meal.strArea}`} className={css.nativeNameAndArea}>
          Country: {meal.strArea}
        </Link>

        <h2 className={css.preparation}>Preparation:</h2>
        <p>{meal.strInstructions}</p>

        <h2 className={css.ingredients}>Ingredients:</h2>
        <ul className={css.group}>
          {meal.ingredients.map((item, index) => (
            <li key={index}>
              <Link
                to={`/ingredient/${encodeURIComponent(item.ingredient)}`}
                className={css.links}
              >
                {item.measure} {item.ingredient}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={css.sideBar}>
        {meal.strCategory && <CategorySidebar category={meal.strCategory} />}
      </div>
    </div>
  );
};

export default MealDetail;
