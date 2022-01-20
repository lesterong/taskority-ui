import { HandleViewing } from './View';

export type SettingsProps = {
  onClick: () => void;
  text: string;
  numOfFilters: string;
  viewportWidth: number;
  handleView: HandleViewing;
  updateAuth: (status: boolean) => void;
};
