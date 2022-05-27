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

function mapContent(
    content: object,
    path: string[],
    newValue: number | string | boolean | IPanel | ILabel | IButton,
  ) {
  const newContent = Array.isArray(content) ? [...content] : {...content};

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
