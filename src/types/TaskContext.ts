import { Task } from './Task';

export type HandleTask = {
  taskTitle: string;
  handleTaskTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  taskDuedate: string;
  handleTaskDuedate: (event: React.ChangeEvent<HTMLInputElement>) => void;
  taskTag: string;
  handleTaskTag: (value: string) => void;
  taskDescription: string;
  handleTaskDescription: (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  isLoading: boolean;
  clearFields: () => void;
};

export interface HandleAddingTask extends HandleTask {
  open: () => void;
  isOpen: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleCancel: () => void;
}

export interface HandleUpdatingTask extends HandleTask {
  initValues: (task: Task) => void;
  taskComplete: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleCancel: () => void;
  handleDelete: () => void;
  handleCheckbox: () => void;
  handleComplete: () => void;
  open: () => void;
  close: () => void;
  isOpen: boolean;
}
