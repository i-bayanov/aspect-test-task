import { IButtonProps } from "../interfaces-and-types";

export default function Button(props: IButtonProps) {
  const { width, height, caption, visible } = props;

  return (
    <button style={{ height, width }} hidden={!visible}>
      {caption}
    </button>
  );
}
