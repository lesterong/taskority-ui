import { HandleViewing } from './View';

export type SettingsProps = {
  onClick: () => void;
  numOfFilters: string;
  viewportWidth: number;
  handleView: HandleViewing;
  updateAuth: (status: boolean) => void;
};
