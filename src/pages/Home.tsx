import { useEffect, useState } from 'react';
import Card from '../components/Card';
import Sort from '../components/Sort';
import Navbar from '../components/Navbar';
import Notification from '../components/Notification';
import './Home.css'
import taskService from '../services/tasks';
import { DateTime } from 'luxon';

type taskProps = {
  id: number;
  title: string;
  description: string;
  duedate: string;
  tag: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
};

const Home = ({updateAuth}: {updateAuth: (status: boolean) => void}) => {
  const [tasks, setTasks] = useState<Array<any>>([]);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [viewportWidth, setViewportWidth] = useState<number>(window.innerWidth);
  const [compactView, setCompactView] = useState<boolean>(true);
  const [query, setQuery] = useState<string>('');
  const [filters, setFilters] = useState<Array<any>>(['All Tasks']);

  const [sortBy, setSortBy] = useState<Array<string>>(['Date Created', 'Descending']);

  const [showAddTask, setShowAddTask] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskDuedate, setTaskDuedate] = useState<string>('');
  const [taskTag, setTaskTag] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [taskComplete, setTaskComplete] = useState<boolean>(false);

  const [notifType, setNotifType] = useState<"success" | "failure" | null>(null);
  const [notifMessage, setNotifMessage] = useState<string>("");
  const notify = (message: string, type: "success" | "failure" | null) => {
    setNotifMessage(message);
    setNotifType(type);
    setTimeout(() => {
      setNotifMessage("");
      setNotifType(null);
    }, 3500)
  };

  const getTasks = () => {
    taskService
      .getAll()
      .then(initial => setTasks(initial))
  };
  useEffect(getTasks, []);

  const updateWidth = () => {
    setViewportWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWidth)
  }, []);

  const handleView = {
    'isCompact': compactView,
    'toggle': () => {setCompactView(!compactView)},
  };

  const handleSearch = {
    'query': query,
    'open': () => setShowSearch(true),
    'isOpen': showSearch,
    'close': () => setShowSearch(false),
    'onChange': (event: any) => setQuery(event.target.value),
    'handleClose': () => {
      setQuery('');
      setShowSearch(false);
    },
  };
  
  const handleAddTask = {
    'open': () => setShowAddTask(true),
    'isOpen': showAddTask,
    'taskTitle': taskTitle,
    'handleTaskTitle': (event: any) => setTaskTitle(event.target.value),
    'taskDuedate': taskDuedate,
    'handleTaskDuedate': (event: any) => setTaskDuedate(event.target.value),
    'taskTag': taskTag,
    'handleTaskTag': (value: string) => setTaskTag(value),
    'taskDescription': taskDescription,
    'handleTaskDescription': (event: any) => setTaskDescription(event.target.value),
    'handleSubmit': (event: any) => {
      event.preventDefault();
      const newTask = {
        "title": taskTitle,
        "description": taskDescription,
        "duedate": taskDuedate,
        "tag": taskTag,
        "completed": taskComplete,
      };
      taskService
        .create(newTask)
        .then(returnedTask => {
          setTasks(tasks.concat(returnedTask))
          setTaskTitle('');
          setTaskDuedate('');
          setTaskTag('');
          setTaskDescription('');
          setTaskComplete(false);
          setShowAddTask(false);
          notify("Task added successfully", "success");
        })
        .catch(() => notify("Unsuccessful, please try again", "failure"));
    },
    'handleCancel': () => {
      setTaskTitle('');
      setTaskDuedate('');
      setTaskTag('');
      setTaskDescription('');
      setTaskComplete(false);
      setShowAddTask(false);
    }
  }

  const handleUpdate = {
    'taskTitle': taskTitle,
    'handleTaskTitle': (event: any) => setTaskTitle(event.target.value),
    'taskDuedate': taskDuedate,
    'handleTaskDuedate': (event: any) => setTaskDuedate(event.target.value),
    'taskTag': taskTag,
    'handleTaskTag': (value: string) => setTaskTag(value),
    'taskDescription': taskDescription,
    'handleTaskDescription': (event: any) => setTaskDescription(event.target.value),
    'initValues': (task: taskProps) => {
      setTaskTitle(task.title);
      setTaskDuedate(task.duedate);
      setTaskDescription(task.description);
      setTaskTag(task.tag);
      setTaskComplete(task.completed);
    },
    'handleSubmit': (task: taskProps) => (event: any) => {
      const updatedTask = {
        "title": taskTitle,
        "description": taskDescription,
        "duedate": taskDuedate,
        "tag": taskTag,
        "completed": taskComplete,
      }
      taskService
        .update(task.id, updatedTask)
        .then(returnedTask => {
          setTasks(tasks.map(t => t === task ? returnedTask : t))
          setTaskTitle('');
          setTaskDuedate('');
          setTaskTag('');
          setTaskDescription('');
          setTaskComplete(false);
          notify('Task updated successfully', 'success');
        })
        .catch(() => notify("Unsuccessful, please try again", "failure"));
      },
    'handleCancel': () => {
      setTaskTitle('');
      setTaskDuedate('');
      setTaskTag('');
      setTaskDescription('');
      setTaskComplete(false);
    },
    'handleDelete': (id: number) => {
      taskService
      .remove(id)
      .then(() => {
        setTasks(tasks.filter(t => t.id !== id))
        setTaskTitle('');
        setTaskDuedate('');
        setTaskDescription('');
        setTaskTag('');
        setTaskComplete(false);
        notify('Task deleted successfully', 'success');
      })
      .catch(() => notify("Delete unsuccessful, please try again", "failure"));
    },
    'handleCheckbox': (task: any) => (event: any) => {
      const updatedTask = {
        ...task,
        "completed": !task.completed,
      };
      taskService
        .update(task.id, updatedTask)
        .then(returnedTask => {
          setTasks(tasks.map(t => t === task ? returnedTask : t))
          notify(task.completed ? 'Task undone.' : 'Task completed!', 'success');
        })
        .catch(() => notify("Unsuccessful, please try again", "failure"));
    }
  };

  const handleSort = {
    sortBy: sortBy,
    onSelectSort: (value: string) => () => setSortBy([value, sortBy[1]]),
    onChangeOrder: (event: any) => setSortBy([sortBy[0], event.target.value]),
  };

  const tagsArray: string[] = Array.from(new Set(tasks.map(task => task.tag)));

  const handleFilters = {
    'tagsArray': tagsArray,
    'open': () => setShowFilterModal(true),
    'isOpen': showFilterModal,
    'close': () => setShowFilterModal(false),
    'filters': filters,
    'handleTagsCheckbox': (event: any) => {
      event.target.checked 
        ? setFilters(filters.concat(event.target.value))
        : setFilters(filters.filter(elem => elem !== event.target.value))
    },
    'handleTaskStatus': (event: any) => {
      setFilters(filters.map(elem => 
        elem === 'All Tasks' || elem === 'Active Tasks' || elem === 'Completed Tasks'
        ? event.target.value
        : elem
      ))
    },
    'handleClear': () => setFilters(['All Tasks']),
  };

  const filteredTasks = (tasks: taskProps[], filters: string[]) => {
    const [taskStatus, ...tagsFilter] = filters;
    const filterStatus = taskStatus === 'All Tasks'
      ? tasks
      : taskStatus === 'Active Tasks'
      ? tasks.filter((task: taskProps) => 
        !task.completed)
      : tasks.filter((task: taskProps) => 
        task.completed);

    let filteredResults = tagsFilter.length === 0
      ? filterStatus
      : []

    for (let i = 0; i < tagsFilter.length; i++) {
      const res = filterStatus.filter((task: taskProps) => task.tag === tagsFilter[i]);
      filteredResults = filteredResults.concat(res);
    }
    return filteredResults;
  }

  const tasksToFilter = filteredTasks(tasks, filters);

  const sortByDueDate = (order: string) => (taskA: taskProps, taskB: taskProps): number => {
    return order === 'Descending'
      ? DateTime.fromISO(taskA.duedate) > DateTime.fromISO(taskB.duedate) ? -1 : 1
      : DateTime.fromISO(taskA.duedate) < DateTime.fromISO(taskB.duedate) ? -1 : 1
  };

  const sortByDateCreated = (order: string) => (taskA: taskProps, taskB: taskProps): number => {
    return order === 'Descending'
      ? DateTime.fromISO(taskA.created_at) > DateTime.fromISO(taskB.created_at) ? -1 : 1
      : DateTime.fromISO(taskA.created_at) < DateTime.fromISO(taskB.created_at) ? -1 : 1
  };

  const sortByAlphabet = (order: string) => (taskA: taskProps, taskB: taskProps): number => {
    return order === 'Descending'
      ? taskA.title.toLowerCase() < taskB.title.toLowerCase() ? -1 : 1
      : taskA.title.toLowerCase() > taskB.title.toLowerCase() ? -1 : 1
  };

  const tasksToSearch = query === ''
    ? tasksToFilter
    : tasksToFilter.filter((task: taskProps) => 
      task.title.toLowerCase().includes(query.toLowerCase()));

  const tasksToShow = sortBy[0] === 'Date Created'
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
      <div className='home-container'>
        <div className='home-header'>
          {query === ""
            ? <p> {filters[0]} </p>
            : <p> <b>'{query}'</b> in {filters[0]} </p>
          }
          <Sort handleSort={handleSort} />
        </div>

        {query && tasksToShow.length === 0
          ? <p> No results for '<b>{query}</b>'.&nbsp;
              <button onClick={() => setQuery('')}>
                Search Again? 
              </button>
            </p>
          : tasksToShow.length === 0
            ? tagsArray.length === 0 
              ? <p> No tasks created yet. </p> 
              : <p> No results found. </p>
            : <>
            {handleView.isCompact && 
              <div className='border-b border-gray-300'> </div>
            }
            {tasksToShow.map((task: taskProps) => 
              <Card 
                key={task.id} 
                task={task} 
                query={query}
                handleUpdate={handleUpdate}
                tagsArray={tagsArray}
                isCompact={handleView.isCompact}
              />
            )}
            </>
          }
      </div>
    </div>
  );
}

export default Home;