import { IPanelProps } from "../interfaces-and-types";

import Content from "../Content";

export default function Panel(props: IPanelProps) {
  const { width, height, visible, content } = props;

  return (
    <div
      style={{ width, height, border: '1px solid black' }}
      hidden={!visible}
    >
      {content && content.map((item, idx) => <Content key={idx} {...item} />)}
    </div>
  );
}