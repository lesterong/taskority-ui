import Alert from '@reach/alert';
import { motion, AnimatePresence } from 'framer-motion';
import { NotificationProps } from '../types/Notification';

const Notification = ({ message, type }: NotificationProps) => {
  const color = type === 'success' ? 'border-green-400' : 'border-red-400';
  const MotionAlert = motion(Alert);
  return (
    <AnimatePresence>
      {type && (
        <MotionAlert
          key='alert'
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: 'spring', bounce: 0.1, duration: 0.2, repeat: 0 }}
          className={`
            bg-white shadow-lg border-l-4 rounded w-max px-6
            py-3 fixed mx-auto bottom-4 left-0 right-0 z-10 ${color}
          `}
        >
          <p className='text-center'>{message}</p>
        </MotionAlert>
      )}
    </AnimatePresence>
  );
};

export default Notification;
