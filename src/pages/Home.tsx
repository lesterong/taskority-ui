import { useEffect, useState } from 'react';
import taskService from '../services/tasks'
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import Search from '../components/Search';
import './Home.css'
import Notification from '../components/Notification';

type taskProps = {
  id: number;
  title: string;
  description: string;
  duedate: string;
  tag: string;
  completed: boolean;
};

const Home = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<any[]>(['All Tasks']);

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDuedate, setTaskDuedate] = useState('');
  const [taskTag, setTaskTag] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskComplete, setTaskComplete] = useState(false);

  const [notifType, setNotifType] = useState<"success" | "failure" | null>(null)
  const [notifMessage, setNotifMessage] = useState("")
  const notify = (message: string, type: "success" | "failure") => {
    setNotifMessage(message);
    setNotifType(type);
    setTimeout(() => {
      setNotifMessage("");
      setNotifType(null);
    }, 3500)
  }

  const hook = () => {
    taskService
      .getAll()
      .then(initial => setTasks(initial))
  };

  useEffect(hook, []);

  const toggleSearch = {
    'toggle': () => {
      setQuery('');
      setShowSearch(!showSearch);
    },
  }

  const handleSearch = {
    'onChange': (event: any) => setQuery(event.target.value),
    'query': query,
  }

  const handleAddTask = {
    'open': () => setShowAddTask(true),
    'isOpen': showAddTask,
    'taskTitle': taskTitle,
    'handleTaskTitle': (event: any) => setTaskTitle(event.target.value),
    'taskDuedate': taskDuedate,
    'handleTaskDuedate': (event: any) => setTaskDuedate(event.target.value),
    'taskTag': taskTag,
    'handleTaskTag': (value: any) => setTaskTag(value),
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
      }
      taskService
        .create(newTask)
        .then(returnedTask => {
          setTasks(tasks.concat(returnedTask))
          setTaskTitle('');
          setTaskDuedate('');
          setTaskDescription('');
          setTaskTag('');
          setTaskComplete(false);
          setShowAddTask(false);
          notify("Task added successfully", "success");
        })
        .catch(error => notify("Unsuccessful, please try again", "failure"));
    },
    'handleCancel': () => {
      setTaskTitle('');
      setTaskDuedate('');
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
    'handleTaskTag': (value: any) => setTaskTag(value),
    'taskDescription': taskDescription,
    'handleTaskDescription': (event: any) => setTaskDescription(event.target.value),
    'initValues': (task: any) => {
      setTaskTitle(task.title);
      setTaskDuedate(task.duedate);
      setTaskDescription(task.description);
      setTaskTag(task.tag)
      setTaskComplete(task.completed)
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
          setTaskDescription('');
          setTaskTag('');
          setTaskComplete(false);
          notify('Task updated successfully', 'success');
        })
        .catch(error => notify("Unsuccessful, please try again", "failure"));
      },
    'handleCancel': () => {
      setTaskTitle('');
      setTaskDuedate('');
      setTaskDescription('');
      setTaskTag('');
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
      .catch(error => notify("Delete unsuccessful, please try again", "failure"));
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
        .catch(error => notify("Unsuccessful, please try again", "failure"));
    }
  };

  const tagsArray = Array.from(new Set(tasks.map(task => task.tag)));

  const handleFilters = {
    'tagsArray': tagsArray,
    'open': () => setShowFilterModal(true),
    'closeModal': () => setShowFilterModal(false),
    'isOpen': showFilterModal,
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

  const filteredTasks = (tasks: any, filters: any) => {
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
      filteredResults = filteredResults.concat(res)
    }
    
    return filteredResults;
  }

  const tasksToFilter = filteredTasks(tasks, filters);

  const tasksToShow = query === ''
    ? tasksToFilter
    : tasksToFilter.filter((task: taskProps) => 
      task.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <Navbar
        handleFilters={handleFilters}
        toggleSearch={toggleSearch}
        handleAddTask={handleAddTask}
      />
      <Notification message={notifMessage} type={notifType} />
      <div className='main-container'>
        <div className='main-title'>
          {query === ""
            ? <p> {filters[0]} </p>
            : <p> <b>'{query}'</b> in {filters[0]} </p>
          }
          {showSearch && <Search handleSearch={handleSearch}/>}
        </div>

        {query && tasksToShow.length === 0
          ? <p> No results for '<b>{query}</b>'.&nbsp;
              <button onClick={() => setQuery('')}>
                Search Again? 
              </button>
            </p>
          : tasksToShow.length === 0
            ? <p> No results found. </p> //loading here 
            : tasksToShow.map((task: taskProps) => 
              <Card 
                key={task.id} 
                task={task} 
                query={query}
                handleUpdate={handleUpdate}
                tagsArray={tagsArray}
              />
            )
        }
      </div>
    </div>
    
  );
}

export default Home;