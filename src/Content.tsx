import { IButton, ILabel, IPanel } from "./interfaces-and-types";

import Button from "./components/Button";
import Label from "./components/Label";
import Panel from "./components/Panel";

export default function Content(item: IPanel | ILabel | IButton) {
  const { type, props } = item;
  let content: Array<IPanel | ILabel | IButton> = [];

  if ('content' in item && item.content) content = item.content;

  switch (type) {
    case 'panel':
      return <Panel {...props} content={content} />;
    case 'label':
      return <Label {...props} />;
    case 'button':
      return <Button {...props} />;
    default:
      return null;
  }
}