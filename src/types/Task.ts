export type TaskBase = {
  title: string;
  description: string;
  duedate: string;
  tag: string;
  completed: boolean;
};

export interface Task extends TaskBase {
  id: number;
  created_at: string;
  updated_at: string;
}
