import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      bookingDate: '',
      comment: '',
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('Обязательное поле'),
      email: yup
        .string()
        .email('Некорректный email')
        .required('Обязательное поле'),
      bookingDate: yup.date().required('Обязательное поле'),
    }),
  });

  const onSubmit = data => {
    console.log(data); // Отправка данных на сервер
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name</label>
      <input type="text" {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}

      <label htmlFor="email">Email</label>
      <input type="email" {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <label htmlFor="bookingDate">Booking date</label>
      <input type="date" {...register('bookingDate')} />
      <DatePicker
        selected={register('bookingDate').value} // Связываем поле с состоянием формы
        onChange={date => {
          register('bookingDate').onChange(date);
        }}
        dateFormat="dd.MM.yyyy" // Формат отображения даты
      />
      {errors.bookingDate && <span>{errors.bookingDate.message}</span>}

      <label htmlFor="comment">Email</label>
      <input type="textarea" {...register('comment')} />
      {errors.comment && <span>{errors.comment.message}</span>}

      <button type="submit">Send</button>
    </form>
  );
};

export default BookForm;
