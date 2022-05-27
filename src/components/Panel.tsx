import { IButton, ILabel, IPanel, IPanelProps } from "../interfaces-and-types";

import Content from "./Content";

export default function Panel(props: IPanelProps & { content: Array<IPanel | ILabel | IButton> }) {
  const { width, height, visible, content } = props;

  return (
    <div
      style={{ height, width, border: '1px solid black' }}
      hidden={!visible}
    >
      {content && content.map((item, idx) => <Content key={idx} {...item} />)}
    </div>
  );
}
