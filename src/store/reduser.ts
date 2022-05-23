import cloneDeep from 'lodash/cloneDeep';

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
      const newStore = cloneDeep(store);
      action.payload.destination.reduce((acc, curr, idx, arr) => {
        // @ts-ignore curr has "any" type
        if (idx === arr.length - 1) acc[curr] = action.payload.newValue;
        // @ts-ignore curr has "any" type
        acc = acc[curr];

        return acc;
      }, newStore);

      return newStore;
    default:
      return store;
  }
}
