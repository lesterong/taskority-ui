import { useState } from 'react';
import TaskModal from './TaskModal';
import './Card.css';
import { DateTime } from 'luxon';

type taskProps = {
  id: number;
  title: string;
  description: string;
  duedate: string;
  tag: string;
  completed: boolean;
};

const Highlight = ({query, children}: {query: string, children: string}) => {
  const query_length: number = query.length;
  const children_length: number = children.length;
  const slice_first_ind: number = children.toLowerCase().search(query.toLowerCase());
  const slice_last_ind: number = query_length + slice_first_ind;
  return (
    <>
      {children.slice(0, slice_first_ind)}
      {query && <mark>{children.substring(slice_first_ind, slice_last_ind)}</mark>}
      {children.slice(slice_last_ind, children_length)}
    </>
  );
};

const Card = ({task, onChange, query}: {task: taskProps, onChange: (event: Event) => void, query: string}) => {
  const {title, duedate, tag, completed} = task;

  const statusClass: string = completed ? 'task-complete' : '';
  const [showTask, setShowTask] = useState(false);
  const [status, setStatus] = useState(completed);
  
  const readableDuedate = DateTime.fromISO(duedate).toLocaleString(DateTime.DATETIME_MED);

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
          <h2 className={statusClass}> 
            <Highlight query={query}>
            {title}
            </Highlight>
          </h2>
          <h3> {readableDuedate} </h3>
          <h5> {tag} </h5>
        </div>
      </div>
      <TaskModal 
          closeModal={() => setShowTask(false)}
          isOpenModal={showTask}
          text="View Task"
          displayTask={task}
      />
    </>
  );
};

export default Card;