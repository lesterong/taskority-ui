export type HandleSearching = {
  query: string;
  open: () => void;
  isOpen: boolean;
  close: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClose: () => void;
};
