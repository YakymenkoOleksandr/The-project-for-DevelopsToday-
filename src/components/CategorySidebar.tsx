import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import css from "./CategorySidebar.module.css";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface CategorySidebarProps {
  category: string;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({ category }) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryMeals = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        setMeals(response.data.meals || []);
      } catch (error) {
        setError("Unable to load dishes in this category");
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchCategoryMeals();
    }
  }, [category]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <aside className={css.sidebar}>
      <h2 className={css.title}>Similar dishes</h2>
      <ul className={css.list}>
        {meals.slice(0, 5).map((meal) => (
          <li key={meal.idMeal} className={css.listItem}>
            <Link to={`/meal/${meal.idMeal}`} className={css.link}>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className={css.img}
              />
              <p className={css.nameOfDish}>{meal.strMeal}</p>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default CategorySidebar;
