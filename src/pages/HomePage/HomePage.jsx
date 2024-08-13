import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={css.page}>
      <h1>Welcome to Our Company site</h1>
      <p>We offer campervan rentals to help you enjoy your trip</p>
      <ul className={css.list}>
        <li>Check out our extensive selection of the best RV</li>
        <li>Make your best choice use selection by parameters</li>
        <li>Сonvenient booking</li>
        <li>Real customer reviews</li>
        <li>Create your favorite list</li>
      </ul>
    </div>
  );
};

export default HomePage;
