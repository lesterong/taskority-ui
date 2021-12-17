import { useEffect, useState } from 'react';
import taskService from '../services/tasks'
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import Notification from '../components/Notification';

const Home = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

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

  const handleTasks = {
    'open': () => setShowTaskModal(true),
    'close': () => setShowTaskModal(false),
    'isOpen': showTaskModal,
  };

  const handleFilters = {
    'open': () => setShowFilterModal(true),
    'close': () => setShowFilterModal(false),
    'isOpen': showFilterModal,
  }

  return (
    <div>
      <Navbar
        handleTasks={handleTasks}
        handleFilters={handleFilters}
      />
      <div className='container max-w-4xl mx-auto px-4'>
        {tasks.map(task => 
          <Card key={task.id} task={task} onChange={handleChecked} />
        )}
      </div>
    </div>
  );
}

export default Home;