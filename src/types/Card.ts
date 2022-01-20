import { Task } from './Task';
import { HandleTask } from './TaskContext';

export interface HandleUpdatingCard extends HandleTask {
  initValues: (task: Task) => void;
  handleSubmit: (task: Task, close: () => void) => void;
  handleCancel: () => void;
  handleDelete: (id: number, close: () => void) => void;
  handleCheckbox: (task: Task) => () => void;
  handleComplete: (task: Task, close: () => void) => void;
}

export type CardProps = {
  task: Task;
  query: string;
  handleUpdate: HandleUpdatingCard;
  tagsArray: string[];
  isCompact: boolean;
};
