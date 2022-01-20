import React, { useState } from 'react';
import { CardProps } from '../types/Card';
import EditTaskModal from './EditTaskModal';
import Highlight from './Highlight';
import './Card.css';
import { DateTime } from 'luxon';

const Card = ({
  task,
  query,
  handleUpdate,
  tagsArray,
  isCompact,
}: CardProps) => {
  const [showViewTask, setShowViewTask] = useState(false);
  const { title, duedate, tag, completed } = task;

  const now: DateTime = DateTime.now();
  const due: DateTime = DateTime.fromISO(duedate);
  const overdue = !completed && now > due ? 'text-red-600' : '';
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
    handleUpdate.handleSubmit(task, () => setShowViewTask(false));
  };

  const handleDelete = () => {
    handleUpdate.handleDelete(task.id, () => setShowViewTask(false));
  };

  const handleComplete = () => {
    handleUpdate.handleComplete(task, () => setShowViewTask(false));
  };

  const handleUpdateTask = {
    ...handleUpdate,
    taskComplete: completed,
    handleSubmit: handleSubmit,
    handleCancel: handleCancel,
    handleDelete: handleDelete,
    handleComplete: handleComplete,
    open: () => setShowViewTask(true),
    close: () => setShowViewTask(false),
    isOpen: showViewTask,
  };

  return (
    <div>
      <div className={`card-base ${isCompact ? 'card-compact' : 'card-wide'}`}>
        <div>
          <input
            type='checkbox'
            aria-label={`Completed ${title}`}
            checked={completed}
            onChange={handleUpdateTask.handleCheckbox(task)}
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
            className={completed ? 'title-complete' : ''}
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
                  !completed &&
                  (now < due
                    ? diffDays <= 1
                      ? diffHours <= 1
                        ? ` (In ${diffMinutes} minutes)`
                        : ` (In ${diffHours} hours)`
                      : ` (In ${diffDays} days)`
                    : diffDays <= 1
                    ? diffHours <= 1
                      ? ` (${diffMinutes} minutes ago)`
                      : ` (${diffHours} hours ago)`
                    : ` (${diffDays} days ago)`)}
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
        handleUpdateTask={handleUpdateTask}
        tagsArray={tagsArray}
      />
    </div>
  );
};

export default Card;
