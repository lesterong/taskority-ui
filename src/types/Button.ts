export type ButtonProps = {
  onClick?: () => void;
  variant: string;
  alt: string;
  icon?: JSX.Element;
  text?: string;
  type?: 'button' | 'submit' | 'reset';
  loader?: true | false;
};
