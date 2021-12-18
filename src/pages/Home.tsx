import { useEffect, useState } from 'react';
import taskService from '../services/tasks'
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import Search from '../components/Search';
import './Home.css'
import Notification from '../components/Notification';

const Home = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSearch, setShowSearch] = useState(true);

  const [query, setQuery] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDuedate, setTaskDuedate] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

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
    'open': () => setShowTaskModal(true),
    'isOpen': showTaskModal,
    'taskTitle': taskTitle,
    'handleTaskTitle': (event: any) => setTaskTitle(event.target.value),
    'taskDuedate': taskDuedate,
    'handleTaskDuedate': (event: any) => setTaskDuedate(event.target.value),
    'taskDescription': taskDescription,
    'handleTaskDescription': (event: any) => setTaskDescription(event.target.value),
    'handleSubmit': (event: any) => {
      event.preventDefault();
      setTaskTitle('');
      setTaskDuedate('');
      setTaskDescription('');
      setShowTaskModal(false);
      const newTask = {
        "title": taskTitle,
        "description": taskDescription,
        "duedate": taskDuedate,
        "tag": "Tag 1",
        "completed": false
      }

      taskService
        .create(newTask)
        .then(returnedTask => setTasks(tasks.concat(returnedTask)))
    },
    'handleCancel': () => {
      setTaskTitle('');
      setTaskDuedate('');
      setTaskDescription('');
      setShowTaskModal(false);
    }
  }

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
            <Card key={task.id} task={task} onChange={handleChecked} query={query}/>
        )}
      </div>
    </div>
  );
}

export default Home;