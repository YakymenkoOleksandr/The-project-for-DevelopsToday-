import { Link } from "react-router-dom";
import css from "./Header.module.css";

interface HeaderProps {
  title?: string;
}

function Header({ title = "Home Page" }: HeaderProps) {
  return (
    <header className={css.header}>
      <div>
        <nav>
          <ul>
            <li className={css.homePage}>
              <Link to="/">
                <h1>{title}</h1>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
