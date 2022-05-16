import { ILabelProps } from "../interfaces-and-types";

export default function Label(props: ILabelProps) {
  const { caption, visible } = props;

  return (
    <span hidden={!visible}>
      {caption}
    </span>
  );
}