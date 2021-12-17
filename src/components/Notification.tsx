type NotifProps = {
  message: string;
  type: string; 
};

const Notification = ({message, type}: NotifProps) => {
  return (
    <div>
    <p> Notification message: {message} </p>
    <p> Notification type: {type}</p>
    </div>
  );
};

export default Notification;