import { Task } from '../types/Task';

const filterTasks = (tasks: Task[], filters: string[]) => {
  const [taskStatus, ...tagsFilter] = filters;
  const filterStatus =
    taskStatus === 'All Tasks'
      ? tasks
      : taskStatus === 'Active Tasks'
      ? tasks.filter((task: Task) => !task.completed)
      : tasks.filter((task: Task) => task.completed);

  let filteredResults = tagsFilter.length === 0 ? filterStatus : [];

  for (let i = 0; i < tagsFilter.length; i++) {
    const res = filterStatus.filter((task: Task) => task.tag === tagsFilter[i]);
    filteredResults = filteredResults.concat(res);
  }
  return filteredResults;
};

export { filterTasks };
