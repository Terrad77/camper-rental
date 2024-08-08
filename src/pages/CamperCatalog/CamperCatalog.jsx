import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosConfig';
import CamperCard from '../../components/CamperCard/CamperCard';
import css from './CamperCatalog.module.css';

const CamperCatalog = () => {
  const [campers, setCampers] = useState([]);
  const [visible, setVisible] = useState(4);

  useEffect(() => {
    axiosInstance
      .get('/adverts')
      .then(response => {
        setCampers(response.data);
      })
      .catch(error => {
        console.error('Error fetching campers:', error);
      });
  }, []);

  const loadMore = () => {
    setVisible(prevVisible => prevVisible + 4);
  };

  return (
    <div>
      <h1>Camper Catalog</h1>
      <div className={css.camperCatalog}>
        {campers.slice(0, visible).map(camper => (
          <CamperCard key={camper._id} camper={camper} />
        ))}
      </div>
      {visible < campers.length && (
        <button onClick={loadMore}>Load more</button>
      )}
    </div>
  );
};

export default CamperCatalog;
