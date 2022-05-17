import { FormEvent, useState } from 'react';

export default function Form() {
  const [formData, setFormData] = useState();

  return (
    <form onSubmit={submitForm}>
      <label htmlFor='path'>
        Путь
        <input type={'text'} id='path' />
      </label>
      <label htmlFor='value'>
        Новое значение
        <input type={'text'} id='value' />
      </label>
      <button type='submit' className='submit'>Применить</button>
    </form >
  );
}

function submitForm(event: FormEvent) {
  event.preventDefault();
  console.log(event);
}