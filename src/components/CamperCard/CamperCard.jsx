import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../redux/actions/advertActions';
import css from './CamperCard.module.css';
import Icon from '../Icon/Icon';

const CamperCard = ({ camper }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);
  const isFavorite = favorites.includes(camper._id);

  // ф-ція обробник кліку "обране"
  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(camper._id));
  };

  // Вибір основного зображення з масиву
  const mainImage = camper.gallery[0];

  return (
    <div className={css.camperCard}>
      <img
        src={mainImage}
        alt={`Camper ${camper.name}`}
        className={css.mainImage}
      />
      {/* <div className={css.gallery}>
        {camper.gallery.slice(1).map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Camper ${camper.name} ${index + 1}`}
            className={css.image}
          />
        ))}
      </div> */}
      <div className={css.cardContent}>
        <h2>{camper.name}</h2>
        <div className={css.cardInfo}>
          <span className={css.cardPrice}>
            €
            {camper.price.toLocaleString('eu-EU', { minimumFractionDigits: 2 })}
          </span>
          <button onClick={handleFavoriteClick} className={css.favoriteButton}>
            <Icon
              className={isFavorite ? css.favorite : ''}
              id="icon-Like"
              width={20}
              height={20}
            />
            {isFavorite ? '❤️' : '🖤'}
          </button>
        </div>
        <span class="card-rating">
          <img src="/public/images/Rating.png" alt="Rating" />
          {camper.rating}{' '}
        </span>
        <span class="card-reviews">({camper.reviews.length}Reviews)</span>
        <span class="card-location">Kyiv, Ukraine</span>

        <p>{camper.description}</p>
      </div>
    </div>
  );
};

export default CamperCard;
