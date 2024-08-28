import { useDispatch, useSelector } from 'react-redux';
// import { toggleFavorite } from '../../redux/actions/advertActions';
import { toggleFavorite } from '../../redux/slices/camperSlice';
import css from './CamperCard.module.css';
import Icon from '../Icon/Icon';

const CamperCard = ({ camper, openModal }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.campers.favorites || []);
  const isFavorite = favorites.includes(camper._id);

  // ф-ція обробник кліку "в обране"
  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(camper._id));
  };

  // основне зображення
  const mainImage = camper.gallery[0];

  // import елементів локації
  const [country = 'Unknown Country', city = 'Unknown City'] =
    camper.location?.split(', ');

  // прайс
  const price = camper.price;

  // ["key": value] усіх наявних опцій
  const details = Object.entries(camper.details);

  return (
    <div className={css.camperCard}>
      <div className={css.containerImg}>
        <img
          src={mainImage}
          alt={`Campervan ${camper.name}`}
          className={css.mainImage}
        />
      </div>
      <div className={css.cardContent}>
        <div className={css.title}>
          <h1>{camper.name}</h1>
          <div className={css.cardInfo}>
            <span className={css.cardPrice}>
              {price.toLocaleString('en-US', {
                style: 'currency',
                currency: 'EUR',
                useGrouping: false, //убрать разделитель тысяч
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
              <img src="/images/Rating.png" alt="Rating" /> {camper.rating}
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
          {details.includes('kitchen') && (
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
          {details.includes('beds') && (
            <li className={css.listItems}>
              <Icon className={css.icon} id="icon-Bed" width={20} height={20} />
              {camper.details.beds} beds
            </li>
          )}

          {details.includes('airConditioner') && (
            <li className={css.listItems}>
              <Icon className={css.icon} id="icon-AC" width={20} height={20} />
              {`AC`}
            </li>
          )}
        </ul>
        <button className={css.cardBtn} onClick={() => openModal(camper)}>
          Show more
        </button>
      </div>
    </div>
  );
};

export default CamperCard;
