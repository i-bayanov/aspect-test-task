import { FormEvent, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';

import { IButton, ILabel, IPanel } from '../interfaces-and-types';

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
  const content = useAppSelector((state) => state);

  const submitForm = (event: FormEvent) => {
    event.preventDefault();

    const path = formData.path.split(/\.|\[|\]/g).filter((el) => el).slice(1);
    const typeOfValueOnPath = validatePath(content, path);

    if (!typeOfValueOnPath) {
      setInputValidity({ ...inputValidity, path: 'invalid' });

      return;
    }

    let newValue: number | string | boolean | IPanel | ILabel | IButton = formData.newValue;
    newValue = tryToParseStr(newValue) || newValue;

    if (typeOfValueOnPath !== 'string') {
      newValue = Number(newValue) || newValue;
      newValue = newValue === 'true' ? true : newValue;
      newValue = newValue === 'false' ? false : newValue;
    }

    if (typeof newValue !== typeOfValueOnPath) {
      setInputValidity({ ...inputValidity, newValue: 'invalid' });

      return;
    }

    dispatch({
      type: 'content/edit',
      payload: {
        destination: path,
        newValue,
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
    </form>
  );
}

function validatePath(state: object, pathArr: string[]): string | Boolean {
  if (!pathArr.length) return Array.isArray(state) ? 'object' : false;
  if (!(pathArr[0] in state)) return false;
  // @ts-ignore element implicitly has an 'any' type
  if (pathArr.length === 1) return Array.isArray(state[pathArr[0]]) ? 'object' : typeof state[pathArr[0]];

  // @ts-ignore element implicitly has an 'any' type
  return validatePath(state[pathArr[0]], pathArr.slice(1));
}

function tryToParseStr(str: string) {
  const REcontent = /\{type: '(?<type>label|button|panel)', props: (?<propsGroup>\{.+?\})(?:, content: \[(?<contentGroup>\{.+\})*?\])?\}/gi;
  const REprops = /(?:width: (?<width>\d*))|(?:height: (?<height>\d*))|(?:caption: '(?<caption>[\w ]*)')|(?:visible: (?<visible>\w*))/gi;

  // @ts-ignore object is of type unknown
  const { type, propsGroup, contentGroup } = Array.from(str.matchAll(REcontent))[0]?.groups || { type: null, propsGroup: null, contentGroup: null };

  if (!type || !propsGroup) return false;

  // @ts-ignore object is of type unknown
  const props = Object.assign({}, ...Array.from(propsGroup.matchAll(REprops)).map((item) => cleanObject(item.groups)));

  if (props.height) props.height = Number(props.height);
  if (props.width) props.width = Number(props.width);
  if (props.visible === 'true') props.visible = true;
  if (props.visible === 'false') props.visible = false;

  const newValue: any = { type, props };

  // @ts-ignore object is of type unknown
  if (contentGroup) newValue.content = Array.from(contentGroup.matchAll(REcontent)).map((item) => tryToParseStr(item[0]));

  return newValue;
}

function cleanObject(obj: object) {
  const clone = { ...obj };
  // @ts-ignore element implicitly has an 'any' type
  Object.keys(clone).forEach(key => { !clone[key] && delete clone[key]; });

  return clone;
}
