import { IPanel, ILabel, IButton } from "../interfaces-and-types";

const MockContent: Array<IPanel | ILabel | IButton> = [
  {
    type: 'panel',
    props: {
      width: 500,
      height: 200,
      visible: true,
      content: [
        {
          type: 'label',
          props: {
            caption: 'test inside panel',
            visible: true,
          },
        },
        {
          type: 'button',
          props: {
            width: 100,
            height: 50,
            visible: true,
            caption: 'button inside panel',
          },
        },
        {
          type: 'panel',
          props: {
            width: 200,
            height: 100,
            visible: false,
            content: [
              {
                type: 'label',
                props: {
                  caption: 'one more text',
                  visible: true,
                },
              },
            ],
          },
        },
      ],
    },
  },
  {
    type: 'label',
    props: {
      caption: 'test',
      visible: false,
    },
  },
  {
    type: 'button',
    props: {
      width: 100,
      height: 50,
      visible: true,
      caption: 'button',
    },
  },
];

export default MockContent;