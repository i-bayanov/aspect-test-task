import { FormEvent, useState } from 'react';
import { useAppDispatch } from '../store/hooks';

import './Form.css';

type FormData = {
  path: string;
  newValue: string;
};

type InputValidity = {
  path: 'invalid' | '';
  newValue: 'invalid' | '';
};

export default function Form() {
  const [formData, setFormData] = useState<FormData>({ path: '', newValue: '' });
  const [inputValidity, setInputValidity] = useState<InputValidity>({ path: '', newValue: '' });
  const dispatch = useAppDispatch();

  const submitForm = (event: FormEvent) => {
    event.preventDefault();

    const results = formData.path
      .split('.')
      .map((el) => el.split('['))
      .flat()
      .map((el) => el.split(']'))
      .flat()
      .filter((el) => el)
      .slice(1);

    dispatch({
      type: 'content/edit',
      payload: {
        destination: results,
        newValue: formData.newValue,
      },
    });

    setFormData({ path: '', newValue: '' });
  };

  return (
    <form onSubmit={submitForm}>
      <label>
        Путь
        <input
          type='text'
          id='path'
          className={inputValidity.path}
          value={formData.path}
          onChange={(e) => {
            const input = e.target;
            setFormData({ ...formData, path: input.value });
            setInputValidity({ ...inputValidity, path: '' });
          }}
        />
      </label>
      <label>
        Новое значение
        <input
          type='text'
          id='newvalue'
          className={inputValidity.newValue}
          value={formData.newValue}
          onChange={(e) => {
            const input = e.target;
            setFormData({ ...formData, newValue: input.value });
            setInputValidity({ ...inputValidity, newValue: '' });
          }}
        />
      </label>
      <button type='submit' className='submit'>Применить</button>
    </form >
  );
}
