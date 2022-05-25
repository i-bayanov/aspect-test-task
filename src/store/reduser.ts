import { IAction, IPanel, ILabel, IButton } from "../interfaces-and-types";

import MockContent from "./mockContent";

export default function contentReducer(
  store: Array<IPanel | ILabel | IButton> = MockContent,
  action: IAction,
) {
  switch (action.type) {
    case 'content/add':
      return store;
    case 'content/edit':
      return mapContent(store, action.payload.destination, action.payload.newValue) as Array<IPanel | ILabel | IButton>;
    default:
      return store;
  }
}

function mapContent(content: object, path: string[], newValue: number | string | boolean) {
  const newContent = Array.isArray(content) ? [...content] : {...content};
 
  if (typeof newContent[path[0]] === 'object') {
    newContent[path[0]] = mapContent(newContent[path[0]], path.slice(1), newValue)
  } else {
    newContent[path[0]] = newValue;
  }
  
  return newContent;
}
