import { NavLink } from 'react-router-dom';
import css from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={css.navContainer}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? css.active : '')}
      >
        Home
      </NavLink>
      <NavLink
        to="/catalog"
        className={({ isActive }) => (isActive ? css.active : '')}
      >
        Catalog
      </NavLink>
      <NavLink
        to="/favorites"
        className={({ isActive }) => (isActive ? css.active : '')}
      >
        Favorites
      </NavLink>
    </nav>
  );
};

export default Navbar;
