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
      return store;
    default:
      return store;
  }
}