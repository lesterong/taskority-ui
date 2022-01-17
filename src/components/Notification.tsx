import Alert from '@reach/alert';
import './Notification.css';

type NotifProps = {
  message: string;
  type: 'success' | 'failure' | null;
};

const Notification = ({ message, type }: NotifProps) => {
  return (
    <>
      {type && (
        <Alert className={'notification ' + type}>
          <p>{message}</p>
        </Alert>
      )}
    </>
  );
};

export default Notification;
