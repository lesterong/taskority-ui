export type HandleFiltering = {
  tagsArray: string[];
  open: () => void;
  isOpen: boolean;
  close: () => void;
  filters: string[];
  handleTagsCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTaskStatus: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClear: () => void;
};
