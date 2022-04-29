import { useNavigate } from 'react-router';
import classes from './Nav.module.css';
const Nav = (props) => {
    const his = useNavigate();
    const logouthandler = (event) =>{
        // event.preventDefault();
        props.onsave();
        localStorage.removeItem('loggedin');
        his.replace('/login');
    }
  return (
    <div className={classes.main}>
      <div className={classes.brand}>
        <p>Notes</p>
      </div>
      <div className={classes.link}>
        <button className={classes.button}onClick={logouthandler}>Logout</button>
      </div>
    </div>
  );
};

export default Nav;