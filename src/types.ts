import React from 'react';

type TaskProps = {
  id: number;
  title: string;
  description: string;
  duedate: string;
  tag: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
};

type HandleAddTaskProps = {
  open: () => void;
  isOpen: boolean;
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
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleCancel: () => void;
  isLoading: boolean;
};

type HandleSearchProps = {
  query: string;
  open: () => void;
  isOpen: boolean;
  close: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClose: () => void;
};

type HandleFiltersProps = {
  tagsArray: string[];
  open: () => void;
  isOpen: boolean;
  close: () => void;
  filters: string[];
  handleTagsCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTaskStatus: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClear: () => void;
};

export type {
  TaskProps,
  HandleAddTaskProps,
  HandleSearchProps,
  HandleFiltersProps,
};
