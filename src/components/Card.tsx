import React, { useState } from 'react';
import { TaskProps } from '../types';
import EditTaskModal from './EditTaskModal';
import './Card.css';
import { DateTime } from 'luxon';

type HighlightProps = {
  query: string;
  text: string;
};

type handleUpdateProps = {
  taskTitle: string;
  handleTaskTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  taskDuedate: string;
  handleTaskDuedate: (event: React.ChangeEvent<HTMLInputElement>) => void;
  taskTag: string;
  handleTaskTag: (value: string) => void;
  taskDescription: string;
  handleTaskDescription: (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  initValues: (task: TaskProps) => void;
  handleSubmit: (task: TaskProps, close: () => void) => () => void;
  handleCancel: () => void;
  handleDelete: (id: number, close: () => void) => void;
  handleCheckbox: (task: TaskProps) => () => void;
  isLoading: boolean;
};

type CardProps = {
  task: TaskProps;
  query: string;
  handleUpdate: handleUpdateProps;
  tagsArray: string[];
  isCompact: boolean;
};

const Highlight = ({ query, text }: HighlightProps) => {
  const queryLength: number = query.length;
  const textLength: number = text.length;
  const firstIdx: number = text.toLowerCase().indexOf(query.toLowerCase());
  const lastIdx: number = queryLength + firstIdx;
  return (
    <>
      {text.slice(0, firstIdx)}
      {query && <mark>{text.substring(firstIdx, lastIdx)}</mark>}
      {text.slice(lastIdx, textLength)}
    </>
  );
};

const Card = ({
  task,
  query,
  handleUpdate,
  tagsArray,
  isCompact,
}: CardProps) => {
  const { title, duedate, tag, completed } = task;

  const [status, setStatus] = useState(completed);
  const [showViewTask, setShowViewTask] = useState(false);

  const now: DateTime = DateTime.now();
  const due: DateTime = DateTime.fromISO(duedate);
  const overdue = !status ? (now > due ? 'overdue' : '') : '';
  const diffObj = now.diff(due);
  const diffDays = Math.abs(Math.trunc(diffObj.as('days')));
  const diffHours = Math.abs(Math.trunc(diffObj.as('hours')));
  const diffMinutes = Math.abs(Math.trunc(diffObj.as('minutes')));

  const handleCancel = () => {
    handleUpdate.handleCancel();
    setShowViewTask(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleUpdate.handleSubmit(task, () => setShowViewTask(false))();
  };

  const handleDelete = () => {
    handleUpdate.handleDelete(task.id, () => setShowViewTask(false));
  };

  const handleCheckbox = () => {
    handleUpdate.handleCheckbox(task)();
    setStatus(!status);
  };

  const handleUpdateTask = {
    ...handleUpdate,
    taskComplete: status,
    handleSubmit: handleSubmit,
    handleCancel: handleCancel,
    handleDelete: handleDelete,
    handleCheckbox: handleCheckbox,
    open: () => setShowViewTask(true),
    close: () => setShowViewTask(false),
    isOpen: showViewTask,
  };

  return (
    <div>
      <div className={isCompact ? 'card-compact' : 'card'}>
        <div className='card-checkbox'>
          <input
            type='checkbox'
            aria-label={`Completed ${title}`}
            checked={status}
            onChange={handleUpdateTask.handleCheckbox}
          />
        </div>
        <div
          className='w-full cursor-pointer'
          onClick={() => {
            handleUpdateTask.initValues(task);
            setShowViewTask(true);
          }}
        >
          <h2
            className={task.completed ? 'title-complete' : ''}
            style={{ overflowWrap: 'anywhere' }}
          >
            <Highlight query={query} text={title} />
          </h2>
          <div className={isCompact ? 'flex items-center space-x-2' : ''}>
            {task.duedate && (
              <h3 className={overdue}>
                {due.hasSame(now, 'year')
                  ? due.toFormat('dd LLL, HH:mm a')
                  : due.toFormat('dd LLL yyyy, hh:mm a')}
                {!isCompact &&
                  !status &&
                  (now < due
                    ? diffDays <= 1
                      ? diffHours <= 1
                        ? ' (In ' + diffMinutes + ' minutes)'
                        : ' (In ' + diffHours + ' hours)'
                      : ' (In ' + diffDays + ' days)'
                    : diffDays <= 1
                    ? diffHours <= 1
                      ? ' (' + diffMinutes + ' minutes ago)'
                      : ' (' + diffHours + ' hours ago)'
                    : ' (' + diffDays + ' days ago)')}
              </h3>
            )}
            {task.tag && (
              <div className='px-2 py-1 bg-indigo-100 rounded-full w-max'>
                <h4> {tag} </h4>
              </div>
            )}
          </div>
        </div>
      </div>

      <EditTaskModal
        text='View Task'
        handleUpdateTask={handleUpdateTask}
        tagsArray={tagsArray}
      />
    </div>
  );
};

export default Card;
