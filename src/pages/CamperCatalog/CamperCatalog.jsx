import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosConfig';
import CamperCard from '../../components/CamperCard/CamperCard';
import css from './CamperCatalog.module.css';
import Modal from '../../components/Modal/Modal';
import Icon from '../../components/Icon/Icon';

const CamperCatalog = () => {
  const [campers, setCampers] = useState([]);
  const [displayedCampers, setDisplayedCampers] = useState([]);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const itemsPerPage = 4;
  const [selectedCamper, setSelectedCamper] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // стани для фільтрів кемперів
  const [locationFilter, setLocationFilter] = useState('');
  const [equipmentFilter, setEquipmentFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    axiosInstance
      .get('/adverts')
      .then(response => {
        setCampers(response.data);
        setDisplayedCampers(response.data.slice(0, itemsPerPage));
      })
      .catch(error => {
        console.error('Error fetching campers:', error);
      });
  }, []);

  // Обробник кнопки "Load more"
  const loadMore = () => {
    const nextIndex = visibleIndex + itemsPerPage;
    const newVisibleCampers = campers.slice(
      nextIndex,
      nextIndex + itemsPerPage,
    );
    setDisplayedCampers(newVisibleCampers);
    setVisibleIndex(nextIndex);
  };

  const openModal = camper => {
    setSelectedCamper(camper);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCamper(null);
  };

  // Фільтрація списку кемперів
  const filteredCampers = campers.filter(camper => {
    const matchesLocation =
      locationFilter === '' ||
      camper.location.toLowerCase().includes(locationFilter.toLowerCase());

    const matchesEquipment =
      equipmentFilter.length === 0 ||
      equipmentFilter.every(eq => camper.details[eq]);

    const matchesType = typeFilter === '' || camper.type === typeFilter;

    return matchesLocation && matchesEquipment && matchesType;
  });

  const toggleEquipmentFilter = equipment => {
    setEquipmentFilter(prevState =>
      prevState.includes(equipment)
        ? prevState.filter(item => item !== equipment)
        : [...prevState, equipment],
    );
  };

  return (
    <div className={css.pageContainer}>
      <div className={css.searchSectionContainer}>
        <div className={css.locationContainer}>
          <p>Location</p>
          <div className={css.inputContainer}>
            <Icon
              id="icon-Map-pin"
              className={css.icon}
              width={18}
              height={20}
            />
            <input
              type="text"
              value={locationFilter}
              onChange={e => setLocationFilter(e.target.value)}
              placeholder="Kyiv, Ukraine"
            />
          </div>
        </div>
        {/* Equipment Filter */}
        <div className={css.equipmentContainer}>
          <div className={css.equipmentTitle}>
            <p>Filters</p>
            <h2>Vehicle equipment</h2>
          </div>
          <Icon id="icon-Vector" className={css.icon} width={360} height={2} />
          <ul className={css.equipmentList}>
            <li className={css.equipmentItem}>
              <button
                className={`${css.equipmentButton} ${
                  equipmentFilter.includes('airConditioner') ? css.active : ''
                }`}
                onClick={() => toggleEquipmentFilter('airConditioner')}
              >
                <Icon
                  id="icon-AC"
                  className={css.icon}
                  width={32}
                  height={32}
                />
                AC
              </button>
            </li>
            <li className={css.equipmentItem}>
              <button
                className={`${css.equipmentButton} ${
                  equipmentFilter.includes('automatic') ? css.active : ''
                }`}
                onClick={() => toggleEquipmentFilter('automatic')}
              >
                <Icon
                  id="icon-Transmission"
                  className={css.icon}
                  width={32}
                  height={32}
                />
                Automatic
              </button>
            </li>
            <li className={css.equipmentItem}>
              <button
                className={`${css.equipmentButton} ${
                  equipmentFilter.includes('kitchen') ? css.active : ''
                }`}
                onClick={() => toggleEquipmentFilter('kitchen')}
              >
                <Icon
                  id="icon-Kitchen"
                  className={css.icon}
                  width={32}
                  height={32}
                />
                Kitchen
              </button>
            </li>
            <li className={css.equipmentItem}>
              <button
                className={`${css.equipmentButton} ${
                  equipmentFilter.includes('TV') ? css.active : ''
                }`}
                onClick={() => toggleEquipmentFilter('TV')}
              >
                <Icon
                  id="icon-TV"
                  className={css.icon}
                  width={32}
                  height={32}
                />
                TV
              </button>
            </li>
            <li className={css.equipmentItem}>
              <button
                className={`${css.equipmentButton} ${
                  equipmentFilter.includes('shower') ? css.active : ''
                }`}
                onClick={() => toggleEquipmentFilter('shower')}
              >
                <Icon
                  id="icon-WC"
                  className={css.icon}
                  width={32}
                  height={32}
                />
                Shower/WC
              </button>
            </li>
          </ul>
        </div>

        {/* Type Filter */}
        <div className={css.typeContainer}>
          <h2>Vehicle type</h2>
          <Icon id="icon-Vector" className={css.icon} width={360} height={2} />
        </div>
      </div>
      <div className={css.cardsContainer}>
        {displayedCampers.map(camper => (
          <CamperCard key={camper._id} camper={camper} openModal={openModal} />
        ))}
        {visibleIndex + itemsPerPage < campers.length && (
          <button className={css.loadMoreBtn} onClick={loadMore}>
            Load more
          </button>
        )}
        {isModalOpen && selectedCamper && (
          <Modal camper={selectedCamper} onClose={closeModal} />
        )}
      </div>
    </div>
  );
};

export default CamperCatalog;
