import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Meals from "./components/Meals";
import MealDetail from "./components/MealDetail";
import MealsByCountry from "./components/MealsByCountry";
import MealsByIngredient from "./components/MealsByIngredient";
import Header from "./components/Header";
import css from "./App.module.css";

function App() {
  return (
    <Router>
      <div className={css.mainDiv}>
        <Header />
        <Routes>
          <Route path="/" element={<Meals />} />
          <Route path="/meal/:id" element={<MealDetail />} />
          <Route path="/country/:area" element={<MealsByCountry />} />
          <Route
            path="/ingredient/:ingredient"
            element={<MealsByIngredient />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
