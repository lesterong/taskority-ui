import React, { useEffect, useState } from 'react';
import { Task } from '../types/Task';
import { UpdatingAuth } from '../types/Auth';
import {
  sortByAlphabet,
  sortByDueDate,
  sortByDateCreated,
} from '../utils/sortUtils';
import { filterTasks } from '../utils/filterUtils';
import Card from '../components/Card';
import Sort from '../components/Sort';
import Navbar from '../components/Navbar';
import Notification from '../components/Notification';
import { Spinner } from '../assets/Spinner';
import taskService from '../services/tasks';

const Home = ({ updateAuth }: UpdatingAuth) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [viewportWidth, setViewportWidth] = useState<number>(window.innerWidth);
  const [compactView, setCompactView] = useState<boolean>(true);
  const [query, setQuery] = useState<string>('');
  const [filters, setFilters] = useState<string[]>(['Active Tasks']);

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingTasks, setLoadingTasks] = useState<boolean>(true);

  const [sortBy, setSortBy] = useState<string[]>([
    'Date Created',
    'Descending',
  ]);

  const [showAddTask, setShowAddTask] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskDuedate, setTaskDuedate] = useState<string>('');
  const [taskTag, setTaskTag] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [taskComplete, setTaskComplete] = useState<boolean>(false);

  const [notifType, setNotifType] = useState<'success' | 'failure' | null>(
    null,
  );
  const [notifMessage, setNotifMessage] = useState<string>('');
  const notify = (message: string, type: 'success' | 'failure' | null) => {
    setNotifMessage(message);
    setNotifType(type);
    setTimeout(() => {
      setNotifType(null);
      setNotifMessage('');
    }, 4000);
  };

  const getTasks = () => {
    taskService.getAll().then((initial) => {
      setLoadingTasks(false);
      setTasks(initial);
    });
  };
  useEffect(getTasks, []);

  const updateWidth = () => {
    setViewportWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', updateWidth);
  }, []);

  const handleView = {
    isCompact: compactView,
    toggle: () => {
      setCompactView(!compactView);
    },
  };

  const handleSearch = {
    query: query,
    open: () => setShowSearch(true),
    isOpen: showSearch,
    close: () => setShowSearch(false),
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    },
    handleClose: () => {
      setQuery('');
      setShowSearch(false);
    },
  };

  const handleTask = {
    taskTitle: taskTitle,
    handleTaskTitle: (event: React.ChangeEvent<HTMLInputElement>) => {
      setTaskTitle(event.target.value);
    },
    taskDuedate: taskDuedate,
    handleTaskDuedate: (event: React.ChangeEvent<HTMLInputElement>) => {
      setTaskDuedate(event.target.value);
    },
    taskTag: taskTag,
    handleTaskTag: (value: string) => setTaskTag(value),
    taskDescription: taskDescription,
    handleTaskDescription: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTaskDescription(event.target.value);
    },
    isLoading: loading,
    clearFields: () => {
      setTaskTitle('');
      setTaskDuedate('');
      setTaskTag('');
      setTaskDescription('');
      setTaskComplete(false);
    },
  };

  const handleAddTask = {
    ...handleTask,
    open: () => setShowAddTask(true),
    isOpen: showAddTask,
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);
      const newTask = {
        title: taskTitle,
        description: taskDescription,
        duedate: taskDuedate,
        tag: taskTag,
        completed: taskComplete,
      };
      taskService
        .create(newTask)
        .then((returnedTask) => {
          setLoading(false);
          setTasks(tasks.concat(returnedTask));
          handleTask.clearFields();
          setShowAddTask(false);
          notify('Task added successfully', 'success');
        })
        .catch(() => {
          setLoading(false);
          notify('Unsuccessful, please try again', 'failure');
        });
    },
    handleCancel: () => {
      handleTask.clearFields();
      setShowAddTask(false);
    },
  };

  const handleUpdate = {
    ...handleTask,
    initValues: (task: Task) => {
      setTaskTitle(task.title);
      setTaskDuedate(task.duedate);
      setTaskDescription(task.description);
      setTaskTag(task.tag);
      setTaskComplete(task.completed);
    },
    handleSubmit: (task: Task, close: () => void) => {
      const updatedTask = {
        title: taskTitle,
        description: taskDescription,
        duedate: taskDuedate,
        tag: taskTag,
        completed: taskComplete,
      };
      setLoading(true);
      taskService
        .update(task.id, updatedTask)
        .then((returnedTask) => {
          setLoading(false);
          close();
          setTasks(tasks.map((t) => (t === task ? returnedTask : t)));
          handleTask.clearFields();
          notify('Task updated successfully', 'success');
        })
        .catch(() => {
          setLoading(false);
          notify('Unsuccessful, please try again', 'failure');
        });
    },
    handleCancel: () => {
      handleTask.clearFields();
    },
    handleDelete: (id: number, close: () => void) => {
      setLoading(true);
      taskService
        .remove(id)
        .then(() => {
          setLoading(false);
          close();
          setTimeout(() => setTasks(tasks.filter((t) => t.id !== id)), 400);
          handleTask.clearFields();
          notify('Task deleted', 'success');
        })
        .catch(() => {
          setLoading(false);
          notify('Unsuccessful, please try again', 'failure');
        });
    },
    handleCheckbox: (task: Task) => () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, created_at, updated_at, ...taskParams } = task;
      const updatedTask = {
        ...taskParams,
        completed: !task.completed,
      };
      taskService
        .update(task.id, updatedTask)
        .then((returnedTask) => {
          setTasks(tasks.map((t) => (t === task ? returnedTask : t)));
          notify(task.completed ? 'Task undone' : 'Task completed!', 'success');
        })
        .catch(() => notify('Unsuccessful, please try again', 'failure'));
    },
    handleComplete: (task: Task, close: () => void) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, created_at, updated_at, ...taskParams } = task;
      const updatedTask = {
        ...taskParams,
        completed: !task.completed,
      };
      setLoading(true);
      taskService
        .update(task.id, updatedTask)
        .then((returnedTask) => {
          setLoading(false);
          close();
          setTimeout(
            () => setTasks(tasks.map((t) => (t === task ? returnedTask : t))),
            400,
          );
          notify(task.completed ? 'Task undone' : 'Task completed!', 'success');
        })
        .catch(() => {
          setLoading(false);
          notify('Unsuccessful, please try again', 'failure');
        });
    },
  };

  const handleSort = {
    sortBy: sortBy,
    onSelectSort: (value: string) => () => setSortBy([value, sortBy[1]]),
    onChangeOrder: (event: React.ChangeEvent<HTMLInputElement>) => {
      setSortBy([sortBy[0], event.target.value]);
    },
  };

  const tagsArray: string[] = Array.from(
    new Set(tasks.map((task) => task.tag)),
  );

  const handleFilters = {
    tagsArray: tagsArray,
    open: () => setShowFilterModal(true),
    isOpen: showFilterModal,
    close: () => setShowFilterModal(false),
    filters: filters,
    handleTagsCheckbox: (event: React.ChangeEvent<HTMLInputElement>) => {
      event.target.checked
        ? setFilters(filters.concat(event.target.value))
        : setFilters(filters.filter((elem) => elem !== event.target.value));
    },
    handleTaskStatus: (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilters(
        filters.map((elem) =>
          elem === 'All Tasks' ||
          elem === 'Active Tasks' ||
          elem === 'Completed Tasks'
            ? event.target.value
            : elem,
        ),
      );
    },
    handleClear: () => setFilters(['Active Tasks']),
  };

  const tasksToFilter = filterTasks(tasks, filters);
  const tasksToSearch = !query
    ? tasksToFilter
    : tasksToFilter.filter((task: Task) =>
        task.title.toLowerCase().includes(query.toLowerCase()),
      );
  const tasksToShow =
    sortBy[0] === 'Date Created'
      ? tasksToSearch.sort(sortByDateCreated(sortBy[1]))
      : sortBy[0] === 'Due Date'
      ? tasksToSearch.sort(sortByDueDate(sortBy[1]))
      : tasksToSearch.sort(sortByAlphabet(sortBy[1]));

  return (
    <div>
      <Navbar
        viewportWidth={viewportWidth}
        handleView={handleView}
        handleAddTask={handleAddTask}
        handleFilters={handleFilters}
        handleSearch={handleSearch}
        updateAuth={updateAuth}
      />
      <Notification message={notifMessage} type={notifType} />
      {loadingTasks && (
        <div className='mt-4'>
          <Spinner style='mx-auto h-12' />
          <p className='text-center'> Loading Tasks </p>
        </div>
      )}
      <div className='container max-w-4xl mx-auto px-4 last:mb-4'>
        {!loadingTasks && (
          <>
            <div className='flex justify-between my-3'>
              {!query ? (
                <p> {filters[0]} </p>
              ) : (
                <p>
                  <b className='break-all'>&apos;{query}&apos;</b>
                  {` in ${filters[0]}`}
                </p>
              )}
              <Sort handleSort={handleSort} />
            </div>
            {query && tasksToShow.length === 0 ? (
              <p>
                No results for &apos;<b>{query}</b>&apos;.&nbsp;
              </p>
            ) : tasksToShow.length === 0 ? (
              tagsArray.length === 0 ? (
                <p> No tasks created yet. </p>
              ) : (
                <p> No results found. </p>
              )
            ) : (
              <>
                {handleView.isCompact && (
                  <div className='border-b border-gray-300' />
                )}
                {tasksToShow.map((task: Task) => (
                  <Card
                    key={task.id}
                    task={task}
                    query={query}
                    handleUpdate={handleUpdate}
                    tagsArray={tagsArray}
                    isCompact={handleView.isCompact}
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
