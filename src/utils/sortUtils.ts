import { Task } from '../types/Task';
import { DateTime } from 'luxon';

const sortByAlphabet =
  (order: string) =>
  (taskA: Task, taskB: Task): number => {
    return order === 'Descending'
      ? taskA.title.toLowerCase() < taskB.title.toLowerCase()
        ? -1
        : 1
      : taskA.title.toLowerCase() > taskB.title.toLowerCase()
      ? -1
      : 1;
  };

const sortByDueDate =
  (order: string) =>
  (taskA: Task, taskB: Task): number => {
    return order === 'Descending'
      ? DateTime.fromISO(taskA.duedate) > DateTime.fromISO(taskB.duedate)
        ? -1
        : 1
      : DateTime.fromISO(taskA.duedate) < DateTime.fromISO(taskB.duedate)
      ? -1
      : 1;
  };

const sortByDateCreated =
  (order: string) =>
  (taskA: Task, taskB: Task): number => {
    return order === 'Descending'
      ? DateTime.fromISO(taskA.created_at) > DateTime.fromISO(taskB.created_at)
        ? -1
        : 1
      : DateTime.fromISO(taskA.created_at) < DateTime.fromISO(taskB.created_at)
      ? -1
      : 1;
  };

export { sortByAlphabet, sortByDueDate, sortByDateCreated };
