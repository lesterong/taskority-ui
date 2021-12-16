type NotifProps = {
  message: string;
  type: string; 
};

const Notification = ({notification}: {notification: NotifProps}) => {
  return (
    <p> Notification message: {notification.message} </p>
  );
};

export default Notification;