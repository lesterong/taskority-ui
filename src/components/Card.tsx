import { useState } from 'react';
import TaskModal from './TaskModal';
import './Card.css';

type taskProps = {
  id: number;
  title: string;
  description: string;
  duedate: string;
  duetime: string;
  tag: string;
  completed: boolean;
};

const Card = ({task, onChange}: {task: taskProps, onChange: any}) => {
  const statusClass: string = task.completed ? 'task-complete' : ''
  const [showTask, setShowTask] = useState(false);
  const [status, setStatus] = useState(task.completed);

  return (
    <>
      <div className='card'>
        <div className='card-checkbox'>
          <input 
            type="checkbox"
            checked={status}
            onChange={(event) => setStatus(!status)}
          />
        </div>
        <div className='card-body' onClick={() => setShowTask(true)}>
          <h2 className={statusClass}> {task.title} </h2>
          <h3> {task.duedate} {task.duetime} </h3>
          <h5> {task.tag} </h5>
        </div>
      </div>
      <TaskModal 
          closeModal={() => setShowTask(false)}
          isOpenModal={showTask}
          title="View Task"
          displayTask={task}
      />
    </>
  );
};

export default Card;