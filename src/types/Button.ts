export type ButtonProps = {
  onClick?: () => void;
  variant: string;
  alt: string;
  icon?: string;
  text?: string;
  type?: 'button' | 'submit' | 'reset';
  loader?: true | false;
};
