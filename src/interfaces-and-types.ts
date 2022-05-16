export interface IAction {
  type: string;
  payload: {};
};

export interface IContent extends Array<IPanel | ILabel | IButton> {
  [index: number]: IPanel | ILabel | IButton;
};

export interface IPanelProps {
  width: number;
  height: number;
  visible: boolean;
  content?: IContent;
};

export interface IPanel {
  type: 'panel';
  props: IPanelProps;
};

export interface ILabelProps {
  caption: string;
  visible: boolean;
};

export interface ILabel {
  type: 'label';
  props: ILabelProps;
};

export interface IButtonProps {
  width: number;
  height: number;
  caption: string;
  visible: boolean;
};

export interface IButton {
  type: 'button';
  props: IButtonProps;
};
