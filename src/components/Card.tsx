const Card = ({task}: {task: any}) => {
  return (
    <div>
      <h2> {task.title} </h2>
      <p> {task.id} </p>
      <h3> {task.duedate} </h3>
    </div>
    
  );
};

export default Card;