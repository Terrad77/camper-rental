import { NavLink } from 'react-router-dom';
import css from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={css.navContainer}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/catalog">Catalog</NavLink>
      <NavLink to="/favorites">Favorites</NavLink>
    </nav>
  );
};

export default Navbar;
