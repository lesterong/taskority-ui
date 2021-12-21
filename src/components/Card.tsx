import { useState } from 'react';
import TaskModal from './TaskModal';
import './Card.css';
import { DateTime } from 'luxon';

type HighlightProps = {
  query: string;
  text: string;
};

type taskProps = {
  id: number;
  title: string;
  description: string;
  duedate: string;
  tag: string;
  completed: boolean;
};

type handeUpdateProps = {
  taskTitle: string;
  handleTaskTitle: any;
  taskDuedate: string;
  handleTaskDuedate: any;
  taskTag: string;
  handleTaskTag: (value: string) => void;
  taskDescription: string;
  handleTaskDescription: any;
  initValues: (task: taskProps) => void;
  handleSubmit: any;
  handleCancel: any;
  handleDelete: any;
  handleCheckbox: any;
};

type CardProps = {
  task: taskProps;
  query: string;
  handleUpdate: handeUpdateProps;
  tagsArray: string[];
  isCompact: boolean;
};

const Highlight = ({query, text}: HighlightProps) => {
  const queryLength: number = query.length;
  const textLength: number = text.length;
  const firstIdx: number = text.toLowerCase().search(query.toLowerCase());
  const lastIdx: number = queryLength + firstIdx;
  return (
    <>
      {text.slice(0, firstIdx)}
      {query && <mark>{text.substring(firstIdx, lastIdx)}</mark>}
      {text.slice(lastIdx, textLength)}
    </>
  );
};

const Card = ({task, query, handleUpdate, tagsArray, isCompact}: CardProps) => {
  const {title, duedate, tag, completed} = task;

  const cardContainer = isCompact ? "card-compact" : "card";
  const cardDetails = isCompact ? "flex items-center space-x-2" : "";
  const cardStatus: string = completed ? 'task-complete' : "";
  const [status, setStatus] = useState(completed);
  const [showViewTask, setShowViewTask] = useState(false);

  const now: DateTime = DateTime.now();
  const due: DateTime = DateTime.fromISO(duedate);
  const overdue = !status
    ? now > due ? 'overdue' : ''
    : '';
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
    'taskComplete': status,
    'handleSubmit': handleSubmit,
    'handleCancel': handleCancel,
    'handleDelete': handleDelete,
    'handleCheckbox': handleCheckbox,
    'open': () => setShowViewTask(true),
    'close': () => setShowViewTask(false),
    'isOpen': showViewTask,
  };

  return (
    <div>
      <div className={cardContainer}>
        <div className='card-checkbox'>
          <input 
            type="checkbox"
            checked={status}
            onChange={handleUpdateTask.handleCheckbox}
          />
        </div>
        <div className="w-full cursor-pointer" onClick={() => {handleUpdateTask.initValues(task); setShowViewTask(true)}}>
          <h2 className={cardStatus}> 
            <Highlight query={query} text={title} />
          </h2>
          <div className={cardDetails}>
            <h3 className={overdue}> 
              {due.hasSame(now, 'year') ? due.toFormat('dd LLL, HH:mm') : due.toFormat('dd LLL yyyy, hh:mm a')}
              { !isCompact && !status && (now < due
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
            <h4> {tag} </h4>
          </div>
        </div>
      </div>

      <TaskModal 
        text="View Task"
        handleUpdateTask={handleUpdateTask}
        tagsArray={tagsArray}
      />
    </div>
  );
};

export default Card;