import css from './Modal.module.css';

const Modal = ({ camper, onClose }) => {
  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onClose}>
          ×
        </button>
        <h2>{camper.name}</h2>
        <p>{camper.details}</p>
        <BookForm />
      </div>
    </div>
  );
};

export default Modal;
