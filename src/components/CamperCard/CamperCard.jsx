import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../redux/actions/advertActions';
import css from './CamperCard.module.css';
import Icon from '../Icon/Icon';
import List from '../LIst/List';

const CamperCard = ({ camper }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);
  const isFavorite = favorites.includes(camper._id);

  // ф-ція обробник кліку "обране"
  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(camper._id));
  };

  // Вибір основного зображення
  const mainImage = camper.gallery[0];

  // елементи локації
  const [country, city] = camper.location.split(', ');

  // Вибір наявних опцій
  const details = Object.entries(camper.details);

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
        <div className={css.title}>
          <h2>{camper.name}</h2>
          <div className={css.cardInfo}>
            <span className={css.cardPrice}>
              €
              {camper.price.toLocaleString('eu-EU', {
                minimumFractionDigits: 2,
              })}
            </span>
            <button
              onClick={handleFavoriteClick}
              className={css.favoriteButton}
            >
              <Icon
                className={isFavorite ? css.favorite : ''}
                id="icon-Like"
                width={25}
                height={22}
              />
            </button>
          </div>
        </div>
        <div className={css.containerInfo}>
          <a className={css.wraper} href="/">
            <span className={css.cardRating}>
              <img src="/public/images/Rating.png" alt="Rating" />{' '}
              {camper.rating}
            </span>
            <span className={css.cardReviews}>
              ({camper.reviews.length} Reviews)
            </span>
          </a>

          <span className={css.cardLocation}>
            <Icon
              className={isFavorite ? css.favorite : ''}
              id="icon-Map-pin"
              width={16}
              height={16}
            />
            {city || 'Unknown Location'}, {country || 'Unknown Location'}
          </span>
        </div>

        <p>{camper.description}</p>
        <ul className={css.listOptions}>
          <li className={css.listItems}>
            {/* <List items={items} /> */}{' '}
            <Icon className={css.icon} id="icon-Users" width={20} height={20} />
            {camper.adults} adults
          </li>
          <li className={css.listItems}>
            <Icon
              className={css.icon}
              id="icon-Transmission"
              width={20}
              height={20}
            />
            {camper.transmission.charAt(0).toUpperCase() +
              camper.transmission.slice(1)}
          </li>
          <li className={css.listItems}>
            <Icon className={css.icon} id="icon-Fuel" width={20} height={20} />
            {camper.engine.charAt(0).toUpperCase() + camper.engine.slice(1)}
          </li>
          {Object.keys(camper.details).includes('kitchen') && (
            <li className={css.listItems}>
              <Icon
                className={css.icon}
                id="icon-Kitchen"
                width={20}
                height={20}
              />
              {`Kitchen`}
            </li>
          )}
          {Object.keys(camper.details).includes('beds') && (
            <li className={css.listItems}>
              <Icon className={css.icon} id="icon-Bed" width={20} height={20} />
              {camper.details.beds} beds
            </li>
          )}

          {Object.keys(camper.details).includes('airConditioner') && (
            <li className={css.listItems}>
              <Icon className={css.icon} id="icon-AC" width={20} height={20} />
              {`AC`}
            </li>
          )}
        </ul>
        <button className={css.cardBtn}>Show more</button>
      </div>
    </div>
  );
};

export default CamperCard;
