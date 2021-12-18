import { useEffect, useState } from 'react';
import taskService from '../services/tasks'
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import Search from '../components/Search';
import './Home.css'
import Notification from '../components/Notification';

const Home = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSearch, setShowSearch] = useState(true);

  const [query, setQuery] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDuedate, setTaskDuedate] = useState('');
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

  const handleChecked = (event: any) => {
    console.log(event.target.checked);
    // send put request to change to completed
  };

  const toggleFilters = {
    'open': () => setShowFilterModal(true),
    'close': () => setShowFilterModal(false),
    'isOpen': showFilterModal,
  }

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
    'taskDescription': taskDescription,
    'handleTaskDescription': (event: any) => setTaskDescription(event.target.value),
    'handleSubmit': (event: any) => {
      event.preventDefault();
      const newTask = {
        "title": taskTitle,
        "description": taskDescription,
        "duedate": taskDuedate,
        "tag": "Tag 1",
        "completed": taskComplete,
      }
      taskService
        .create(newTask)
        .then(returnedTask => {
          setTasks(tasks.concat(returnedTask))
          setTaskTitle('');
          setTaskDuedate('');
          setTaskDescription('');
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
    'taskDescription': taskDescription,
    'handleTaskDescription': (event: any) => setTaskDescription(event.target.value),
    'initValues': (task: any) => {
      setTaskTitle(task.title);
      setTaskDuedate(task.duedate);
      setTaskDescription(task.description);
      setTaskComplete(task.completed)
    },
    'handleSubmit': (task: any) => (event: any) => {
      const updatedTask = {
        "title": taskTitle,
        "description": taskDescription,
        "duedate": taskDuedate,
        "tag": "Tag 1",
        "completed": taskComplete,
      }
      taskService
        .update(task.id, updatedTask)
        .then(returnedTask => {
          setTasks(tasks.map(t => t === task ? returnedTask : t))
          setTaskTitle('');
          setTaskDuedate('');
          setTaskDescription('');
          setTaskComplete(false);
          notify('Task updated successfully', 'success');
        })
        .catch(error => notify("Unsuccessful, please try again", "failure"));
      },
    'handleCancel': () => {
      setTaskTitle('');
      setTaskDuedate('');
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
        setTaskComplete(false);
        notify('Task deleted successfully', 'success');
      })
      .catch(error => notify("Delete unsuccessful, please try again", "failure"));
    }
  };

  const tasksToShow = query === ''
    ? tasks
    : tasks.filter(task => task.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <Navbar
        toggleFilters={toggleFilters}
        toggleSearch={toggleSearch}
        handleAddTask={handleAddTask}
      />
      <Notification message={notifMessage} type={notifType} />
      <div className='main-container'>
        <div className='main-title'>
          {query === ""
            ? <p> All Tasks </p>
            : <p> <b>'{query}'</b> in All Tasks </p>
          }
          {showSearch && <Search handleSearch={handleSearch}/>}
        </div>
        {query && tasksToShow.length === 0
          ? <p> No results for '<b>{query}</b>'.&nbsp;
            <button onClick={() => setQuery('')}>
              Search Again? 
            </button>
            </p>
          : tasksToShow.map(task => 
            <Card 
              key={task.id} 
              task={task} 
              query={query}
              handleUpdate={handleUpdate}
            />
        )}
      </div>
    </div>
    
  );
}

export default Home;