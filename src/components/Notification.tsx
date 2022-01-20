import Alert from '@reach/alert';
import { NotificationProps } from '../types/Notification';

const Notification = ({ message, type }: NotificationProps) => {
  const color = type === 'success' ? 'border-green-400' : 'border-red-400';
  return (
    <>
      {type && (
        <Alert
          className={`
            bg-white shadow-md border-l-4 rounded w-max px-6
            py-3 fixed mx-auto bottom-4 left-0 right-0 z-10 ${color}
          `}
        >
          <p className='text-center'>{message}</p>
        </Alert>
      )}
    </>
  );
};

export default Notification;
