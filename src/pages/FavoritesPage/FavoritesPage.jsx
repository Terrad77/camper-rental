import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import css from './FavoritesPage.module.css';
import CamperCard from '../../components/CamperCard/CamperCard';
import Modal from '../../components/Modal/Modal';

const FavoritesPage = () => {
  const { campers, favorites } = useSelector(state => state.campers);
  const dispatch = useDispatch();

  const itemsPerPage = 4;
  const [visibleIndex, setVisibleIndex] = useState(itemsPerPage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCamper, setSelectedCamper] = useState(null);

  const loadMore = () => {
    setVisibleIndex(prevIndex => prevIndex + itemsPerPage);
  };

  const openModal = camper => {
    setSelectedCamper(camper);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCamper(null);
  };

  // Фильтрация кемперов по идентификаторам в избранном
  const displayedFavorites = campers
    .filter(camper => favorites.includes(camper._id))
    .slice(0, visibleIndex);

  return (
    <div>
      <div className={css.cardsContainer}>
        {favorites.length === 0 ? (
          <p className={css.noResultsMessage}>
            No favorite campers found. Please add your campers.
          </p>
        ) : (
          <>
            {displayedFavorites.map((camper, index) => (
              <CamperCard
                key={camper._id}
                camper={camper}
                openModal={openModal}
              />
            ))}
            {displayedFavorites.length < favorites.length && (
              <button className={css.loadMoreBtn} onClick={loadMore}>
                Load more
              </button>
            )}
          </>
        )}
        {isModalOpen && selectedCamper && (
          <Modal camper={selectedCamper} onClose={closeModal} />
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
