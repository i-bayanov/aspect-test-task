import { IAction, IPanel, ILabel, IButton } from "../interfaces-and-types";

import MockContent from "./mockContent";

export default function contentReducer(
  store: Array<IPanel | ILabel | IButton> = MockContent,
  action: IAction,
) {
  switch (action.type) {
    case 'content/edit':
      return mapContent(store, action.payload.destination, action.payload.newValue) as Array<IPanel | ILabel | IButton>;
    default:
      return store;
  }
}

/*
  Изначально для изменения content здесь была другая функция:
  https://github.com/i-bayanov/aspect-test-task/commit/834423c921ad593de5b38d7c158c6f6a307d59c8
  Эта функция является почти полной реализацией другой, которую я писал во время обучения во внутренней группе EPAM:
  https://github.com/i-bayanov/internal-courses/blob/master/05-js-deep-clone/makeDeepObjectClone.js
  Эта функция проходит тестирование в Jest, но Redux выдаёт warning в консоль, о том, что в store попадает несериализуемый объект:
  https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state
  Всё работало, ошибок не было, store менялся.
  Но из-за этого предупреждения я и заменил её на функцию cloneDeep от lodash, забыв о последнем абзаце в задании.
  Но раз нужен spread оператор, то вот другая функция.
*/
function mapContent(
  content: object,
  path: string[],
  newValue: number | string | boolean | IPanel | ILabel | IButton,
) {
  const newContent = Array.isArray(content) ? [...content] : { ...content };

  if (Array.isArray(newContent) && !path.length) {
    newContent.push(newValue);

    return newContent;
  }

  // @ts-ignore element implicitly has an 'any' type
  if (typeof newContent[path[0]] === 'object') {
    // @ts-ignore element implicitly has an 'any' type
    newContent[path[0]] = mapContent(newContent[path[0]], path.slice(1), newValue);

    return newContent;
  }

  // @ts-ignore element implicitly has an 'any' type
  newContent[path[0]] = newValue;

  return newContent;
}
