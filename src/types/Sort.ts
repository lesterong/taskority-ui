export type HandleSorting = {
  sortBy: string[];
  onSelectSort: (value: string) => () => void;
  onChangeOrder: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
