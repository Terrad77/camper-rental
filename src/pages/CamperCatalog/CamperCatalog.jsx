import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../api/axiosConfig';
import CamperCard from '../../components/CamperCard/CamperCard';
import css from './CamperCatalog.module.css';
import Modal from '../../components/Modal/Modal';
import Icon from '../../components/Icon/Icon';
import { setCampers } from '../../redux/actions/advertActions';

const CamperCatalog = () => {
  // const [campers, setCampers] = useState([]);
  const [displayedCampers, setDisplayedCampers] = useState([]);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const itemsPerPage = 4;
  const [selectedCamper, setSelectedCamper] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const campers = useSelector(state => state.campers);

  // стани для фільтрів кемперів
  const [locationFilter, setLocationFilter] = useState('');
  const [equipmentFilter, setEquipmentFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    axiosInstance
      .get('/adverts')
      .then(response => {
        dispatch(setCampers(response.data)); // зберегаємо список кемперів в глобальному стані
        setDisplayedCampers(response.data.slice(0, itemsPerPage));
      })
      .catch(error => {
        console.error('Error fetching campers:', error);
      });
  }, [dispatch]);

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

  // обробники стану модалки
  const openModal = camper => {
    setSelectedCamper(camper);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCamper(null);
  };

  // Фільтрація списку кемперів за фільтрами

  const filteredCampers = campers.filter(camper => {
    const matchesLocation =
      locationFilter === '' ||
      camper.location.toLowerCase().includes(locationFilter.toLowerCase());

    const matchesEquipment =
      equipmentFilter.length === 0 ||
      equipmentFilter.every(eq => camper.details[eq]);

    const matchesType = typeFilter === '' || camper.form === typeFilter;

    return matchesLocation && matchesEquipment && matchesType;
  });

  // Toggle camper equipment filter
  const toggleEquipmentFilter = equipment => {
    setEquipmentFilter(prevState =>
      prevState.includes(equipment)
        ? prevState.filter(item => item !== equipment)
        : [...prevState, equipment],
    );
  };

  // Toggle camper type filter

  const toggleTypeFilter = type => {
    setTypeFilter(prevType => (prevType === type ? '' : type));
  };

  // Update displayed campers if filters change
  useEffect(() => {
    setIsSearchActive(
      locationFilter !== '' || equipmentFilter.length > 0 || typeFilter !== '',
    );
  }, [locationFilter, equipmentFilter, typeFilter]);

  // handler Search button
  const handleSearch = () => {
    setDisplayedCampers(filteredCampers.slice(0, itemsPerPage));
    setVisibleIndex(0);
  };

  return (
    <div className={css.pageContainer}>
      <div className={css.searchSectionContainer}>
        {/* Location Filter */}
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
        <div className={css.equipmentContainer}>
          <h2>Vehicle type</h2>
          <Icon id="icon-Vector" className={css.icon} width={360} height={2} />
          <ul className={css.equipmentList}>
            <li className={css.equipmentItem}>
              <button
                className={`${css.equipmentButton} ${
                  typeFilter === 'panelTruck' ? css.active : ''
                }`}
                onClick={() => toggleTypeFilter('panelTruck')}
              >
                <Icon
                  id="icon-Van"
                  className={css.icon}
                  width={40}
                  height={28}
                />
                Van
              </button>
            </li>
            <li className={css.equipmentItem}>
              <button
                className={`${css.equipmentButton} ${
                  typeFilter === 'fullyIntegrated' ? css.active : ''
                }`}
                onClick={() => toggleTypeFilter('fullyIntegrated')}
              >
                <Icon
                  id="icon-FullyIntegrated"
                  className={css.icon}
                  width={40}
                  height={28}
                />
                Fully Integrated
              </button>
            </li>
            <li className={css.equipmentItem}>
              <button
                className={`${css.equipmentButton} ${
                  typeFilter === 'alcove' ? css.active : ''
                }`}
                onClick={() => toggleTypeFilter('alcove')}
              >
                <Icon
                  id="icon-Alcove"
                  className={css.icon}
                  width={40}
                  height={28}
                />
                Alcove
              </button>
            </li>
          </ul>
        </div>
        {/* Search Button */}
        <button
          className={`${css.cardBtn} ${isSearchActive ? css.active : ''}`}
          onClick={handleSearch}
          disabled={!isSearchActive}
        >
          Search
        </button>
      </div>
      <div className={css.cardsContainer}>
        {displayedCampers.length === 0 ? (
          <p className={css.noResultsMessage}>
            No campers found. Please adjust your filters.
          </p>
        ) : (
          <>
            {displayedCampers.map(camper => (
              <CamperCard
                key={camper._id}
                camper={camper}
                openModal={openModal}
              />
            ))}
            {displayedCampers.length > 4 &&
              visibleIndex + itemsPerPage < campers.length && (
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

export default CamperCatalog;
