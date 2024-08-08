import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../../redux/actions/advertActions';
import css from './FavoritesPage.module.css';

const FavoritesPage = () => {
  const favorites = useSelector(state => state.favorites);
  const dispatch = useDispatch();

  const handleToggleFavorite = id => {
    dispatch(toggleFavorite(id));
  };

  return (
    <div>
      <h1>Favorites</h1>
      <ul>
        {favorites.map(id => (
          <li key={id}>
            Camper ID: {id}
            <button onClick={() => handleToggleFavorite(id)}>
              Toggle Favorite
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
