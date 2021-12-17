import logo from '../assets/logo.svg';
import Button from '../components/Button'
import filter from '../assets/filter.svg';
import search from '../assets/search.svg';
import addTask from '../assets/addTask.svg';
import logout from '../assets/logout.svg';
import settings from '../assets/settings.svg';
import Modal from '../components/Modal';
import './Navbar.css';

type NavbarProps = {
  handleAddTask: any;
  handleCloseModal: any;
  isOpenModal: boolean;
};

const Navbar = ({handleAddTask, handleCloseModal, isOpenModal}: NavbarProps) => {
  return (
    <div className='nav-container'>
      <nav>
      <div className="nav-logo">
        <img src={logo} />
        Logo
      </div>

      <div>
         <div className="nav-links">
            <Button 
              onClick={() => console.log("testing")}
              tier="btn-secondary"
              icon={search}
              text=""
            />

            <Button 
              onClick={() => console.log("testing")}
              tier="btn-secondary mobile-btn"
              icon={settings}
              text=""
            />

            <Button 
              onClick={() => console.log("testing")}
              tier="btn-secondary desktop-btn"
              icon={filter}
              text=""
            />

            <Button 
              onClick={() => console.log("testing")}
              tier="btn-secondary desktop-btn"
              icon={logout}
              text=""
            />

            <Button 
              onClick={handleAddTask}
              tier="btn-primary desktop-btn"
              icon={addTask}
              text="Add Task"
            />

            <Button 
              onClick={handleAddTask}
              tier="btn-primary mobile-btn"
              icon={addTask}
              text=""
            />

            <Modal 
              closeModal={handleCloseModal}
              isOpenModal={isOpenModal}
              title="Add Task"
            />
        </div>
      </div>
      </nav>
    </div>
  );
};

export default Navbar;