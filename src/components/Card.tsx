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

const Card = ({task, query, handleUpdate}: 
  {task: taskProps, query: string, handleUpdate: any}) => {
  const {title, duedate, tag, completed} = task;

  const statusClass: string = completed ? 'task-complete' : '';
  const [status, setStatus] = useState(completed);
  const [showViewTask, setShowViewTask] = useState(false);

  const readableDuedate = DateTime.fromISO(duedate).toLocaleString(DateTime.DATETIME_MED);
  const now: any = DateTime.now();
  const due: any = DateTime.fromISO(duedate);
  const overdue = !status 
    ? now > due 
      ? 'overdue' : ''
    : ''
  const diffObj = now.diff(due)
  const diffDays = Math.abs(Math.trunc(diffObj.as('days')));
  const diffHours = Math.abs(Math.trunc(diffObj.as('hours')));
  const diffMinutes = Math.abs(Math.trunc(diffObj.as('minutes')));


  const handleCancel = () => { 
    handleUpdate.handleCancel();
    setShowViewTask(false);
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    handleUpdate.handleSubmit(task)(event);
    setShowViewTask(false);
  }

  const handleDelete = () => {
    handleUpdate.handleDelete(task.id);
    setShowViewTask(false);
  }

  const handleCheckbox = (event: any) => {
    handleUpdate.handleCheckbox(task)(event);
    setStatus(!status);
  }

  const handleUpdateTask = {
    ...handleUpdate,
    'handleCheckbox': handleCheckbox,
    'handleDelete': handleDelete,
    'handleSubmit': handleSubmit,
    'handleCancel': handleCancel,
    'open': () => setShowViewTask(true),
    'close': () => setShowViewTask(false),
    'isOpen': showViewTask,
  };

  return (
    <>
      <div className='card'>
        <div className='card-checkbox'>
          <input 
            type="checkbox"
            checked={status}
            onChange={handleUpdateTask.handleCheckbox}
          />
        </div>
        <div className='card-body' onClick={() => {handleUpdateTask.initValues(task); setShowViewTask(true)}}>
          <h2 className={statusClass}> 
            <Highlight query={query}>
            {title}
            </Highlight>
          </h2>
          <h3 className={overdue}> 
            {readableDuedate} 
            { !status && (now < due
              ? diffDays <= 1
                ? diffHours <= 1
                  ? ' (Due in ' + diffMinutes + ' minutes)'
                  : ' (Due in ' + diffHours + ' hours)'
                : ' (Due in ' + diffDays + ' days)'
              : diffDays <= 1
                ? diffHours <= 1
                  ? ' (Overdue by ' + diffMinutes + ' minutes)'
                  : ' (Overdue by ' + diffHours + ' hours)'
                : ' (Overdue by ' + diffDays + ' days)'
            )}
          </h3>
          <h5> {tag} </h5>
        </div>
      </div>

      <TaskModal 
        text="View Task"
        task={task}
        handleUpdateTask={handleUpdateTask}
      />
    </>
  );
};

export default Card;