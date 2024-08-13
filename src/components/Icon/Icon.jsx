import sprite from '../../icons/icons.svg';

export default function Icon({ id, className, width, height }) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      id={id}
      aria-hidden="true"
    >
      <use href={`${sprite}#${id}`} />
    </svg>
  );
}
