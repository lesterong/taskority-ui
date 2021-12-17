import './Card.css'

type taskProps = {
  id: number;
  title: string;
  description: string;
  duedate: any;
  tag: string;
  completed: boolean;
};

const Card = ({task, onChange}: {task: taskProps, onChange: any}) => {
  return (
    <div className='card'>
      <div className='card-checkbox'>
        <input 
          type="checkbox"
          onChange={onChange}
        />
      </div>
      <div className='card-body'>
        <h2> {task.title} </h2>
        <h3> {task.duedate} </h3>
        <h5> {task.tag} </h5>
      </div>
    </div>
    
  );
};

export default Card;