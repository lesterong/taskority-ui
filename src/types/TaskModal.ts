import { HandleAddingTask, HandleUpdatingTask } from './TaskContext';

export type AddingTaskModal = {
  handleAddTask: HandleAddingTask;
  tagsArray: string[];
};

export type EditingTaskModal = {
  handleUpdateTask: HandleUpdatingTask;
  tagsArray: string[];
};
