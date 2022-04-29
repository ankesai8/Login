import { useState } from "react";
import axios from 'axios';
import { useNavigate, Link} from 'react-router-dom'
import { Route, useMatch  } from 'react-router';
import Verification from "./Verification";
import Layout from "../Layout";
import classes from '../Rlf.module.css';
const Forgotpassword = () =>{
    let date = Date.now()
    const his = useNavigate();
    const match = useMatch();
    const [forgotpassdata, setdata] = useState({});
    const [isinvalid , setisinvalid] = useState(false);
    const changeHandler= ({ target: { name, value } }) =>{
        setdata( prev =>({...prev ,  [name]:value}))
        setisinvalid(false);
    }
    const submithandler = async (event) => {
        event.preventDefault();
        try{
        const {data} = await axios.post(`https://auth7799.herokuapp.com/forgotPassword`, {...forgotpassdata , time:date});
        alert('email with verification link and otp has been sent to your email address')
        his.push('/login');
        console.log(data);
        }
        catch{
            setisinvalid(true);
        }
    }
    return(
        <>
        <Route path ={`${match.path}` } exact>
            <Layout className={classes.form}>
            <p className={classes.heading}> Forgot Password</p>
            <p className={classes.fpmessage}>Enter your email address below and we'll send you a link to reset your password.</p>
            {isinvalid && <p className={classes.error}>Email not registered</p>}
            <form onSubmit={submithandler}>
                <p className={classes.label}> Email address</p>
                <input type='text' className='inp form-control mb-2' placeholder="Email" onChange={changeHandler} name='email'/>
                <button className='btn btn-primary form-control mb-4'>Reset Password</button>
            </form>
            <p className={`mt-3 ${classes.Link}`}><Link to='/login'>Click here</Link> to log in to your account!</p>
            <p className={classes.Link}>Don't have an account? <Link to= '/Register'>Sign Up</Link></p>
            </Layout>
        </Route>
        <Route path={`${match.path}/:id/verification`} exact>
            <Verification/>   
        </Route>
        </>
    );
}

export default Forgotpassword;
