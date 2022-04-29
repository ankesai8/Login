import { useState } from "react";
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import classes from '../Rlf.module.css';
import Layout from "../Layout";
const Register = () => {
  const history = useNavigate();
  const [Registerdata, setdata] = useState({});
  const [match ,setmatch] = useState(false);
  const [status ,setstatus] = useState(null);
  const changeHandler = ({ target: { name, value } }) => {
    setdata((prev) => ({ ...prev, [name]: value }));
    setstatus(null);
  };

  const submithandler = async (event) => {
    event.preventDefault();
    const  {firstname, lastname, password , password1 , email} = Registerdata
    if(password === password1)
    {
      try{
        const { data } = await axios.post(`https://auth7799.herokuapp.com/register`,{firstname ,lastname , password, email});
        setmatch(false);
        alert("Successfully registered!!")
        history.push('/login')
        console.log(data);
      }
      catch(error){
        setstatus(error.response.data.error)
      }
    }
    else{
      setmatch(true);
    }
  };
  return (
    <Layout className={classes.form}>
      <p className={classes.head}> Register </p> 
    <p className={classes.heading}> Create an Account!</p> 
    <form onSubmit={submithandler}>
      {status && <p className={classes.errormessage}>{status}</p>}
      <div className="form-group row">
        <div className="col">
          <p className={classes.label}>First Name</p>
          <input className='form-control mb-3' type="text" onChange={changeHandler} name="firstname" placeholder='Enter Firstname'/>
        </div>
        <div className="col">
          <p className={classes.label}> last Name</p>
          <input className='inp form-control mb-3' type="text" onChange={changeHandler} name="lastname" placeholder='Enter Lastname' />
        </div>
      </div>
      <p className={classes.label}> Email address</p>
      <input className='form-control mb-3' type="text" onChange={changeHandler} name="email" autoComplete="username" placeholder='Enter Email' />
      <p className={classes.label}>Password</p>
      <input className='form-control mb-3' type="password" onChange={changeHandler} name="password" autoComplete="new-password" placeholder='Enter Password' />
      <p className={classes.label}>Confirm Password</p>
      <input className='form-control'type="password" onChange={changeHandler} name="password1" autoComplete="new-password" placeholder='Confirm password'/>
      {match && <p className={classes.errormessage}>passwords  unmatched</p>}
      <button className='btn btn-primary form-control mt-3 mb-4'>Create Account</button>
    </form>
    <p className={classes.Link} >Already have an account? <Link to='/login'>Please Sign in</Link> </p>
    </Layout>
  );
};

export default Register;
