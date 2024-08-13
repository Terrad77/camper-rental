import css from './Modal.module.css';
import BookForm from '../BookForm/BookForm';

const Modal = ({ camper, onClose }) => {
  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onClose}>
          ×
        </button>
        <div className={css.content}>
          <h2>{camper.name}</h2>
          <ul className={css.gallery}>
            {camper.gallery.map((image, index) => (
              <li key={index} className={css.containerImg}>
                <img
                  src={image}
                  alt={`Camper ${camper.name} ${index + 1}`}
                  className={css.image}
                />
              </li>
            ))}
          </ul>
        </div>

        <p>{camper.description}</p>
        <BookForm />
      </div>
    </div>
  );
};

export default Modal;
