import { HandleFiltering } from './Filters';
import { HandleSearching } from './Search';
import { HandleAddingTask } from './TaskContext';
import { HandleViewing } from './View';

export type NavbarProps = {
  viewportWidth: number;
  handleView: HandleViewing;
  handleFilters: HandleFiltering;
  handleAddTask: HandleAddingTask;
  handleSearch: HandleSearching;
  updateAuth: (status: boolean) => void;
};
