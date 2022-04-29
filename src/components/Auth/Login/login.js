import { useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from '../Rlf.module.css';
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout";

const Login = () =>{
    const [logindata, setdata] = useState(null);
    const [login , setlogin] = useState(null);
    const his = useNavigate();
    const changeHandler= ({ target: { name, value } }) =>{
        setdata( prev =>({...prev ,  [name]:value}))
        setlogin(null)
    }
    const submithandler = async (event) => {
        event.preventDefault();
        if(logindata === null)
        {
            setlogin("Enter email and password")
        }
        else
        try{
        const {data} = await axios.post(`https://auth7799.herokuapp.com/login`, logindata);
        await localStorage.setItem("loggedin" ,data.token)
        his.push('/home')
        //console.log(localStorage.getItem('loggedin'))
        }
        catch(err){
            setlogin("! Invalid Credentials failed to login");
        }
    }
    return(
        <Layout className={classes.form}>
            <form onSubmit={submithandler}>
                <p className={classes.heading}> Sign in to your account</p>
                {login && <p className={classes.error}>{login}</p>}
                <p className={classes.label}> Email address</p>
                <input type='email' className='inp form-control mb-3' placeholder="Enter Email" onChange={changeHandler} name='email' autoComplete="username" />
                <p className={classes.label}> Password </p>
                <input type='Password' className='inp form-control mb-3' placeholder="Enter Password" onChange={changeHandler} name='password' autoComplete="current-password"/>
                <button className='btn btn-primary form-control mb-4'> Sign In</button>
                <Link to='/forgotpassword'><p className={`mt-3 ${classes.Linka}`}>Forgot your password?</p></Link>
                <p className={classes.Link} >Don't have an account? <Link to= '/Register'>Sign Up</Link></p>
            </form>
        </Layout>
    );
}

export default Login;
