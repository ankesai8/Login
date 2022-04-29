import { useEffect, useState } from "react";
import axios from 'axios';
import classes from '../Rlf.module.css';
import { useNavigate ,useParams } from "react-router";
import Layout from "../Layout";
const Verification = () =>{
    const [verificationdata, setdata] = useState({});
    const [status , setstatus] =useState(null);
    const [err , seterr] =useState(null);
    const [loding ,  setloding] = useState(true);
    const [valid ,setvalid] =useState(true);

    const params = useParams();
    const his = useNavigate();

    useEffect(()=>{

        const date = window.Date.now()
        setloding(true)
        const fetch = async() => {
        try{
            await axios.post(`https://auth7799.herokuapp.com/linkvalid`, {id:params.id , time: date});
            setvalid(true)
            setloding(false)
        }
        catch(error){
            setvalid(false)
            setloding(false)
        }
    }
    fetch()
    },[params.id])

    const redirect = () =>{
        his.push('/forgotpassword');
    }
    const OtpchangeHandler= ({ target: { name, value } }) =>{
        setdata( prev =>({...prev ,  [name]:value}))
        setstatus(null);
    }
    const changeHandler= ({ target: { name, value } }) =>{
        setdata( prev =>({...prev ,  [name]:value}))
        seterr(null);
    }
    const verificationhandler = async (event) => {
        event.preventDefault();
        try{
            await axios.post(`https://auth7799.herokuapp.com/verification`, {code:verificationdata.code , id:params.id});
            setstatus({message:"Otp verified" ,class:"verifiedmessage"})
        }
        catch(error){
            setstatus({message:"Enter Vailid Otp", class:"errormessage"})
        }
    }
    const submithandler = async (event) => {
        event.preventDefault();
        if(verificationdata.password === verificationdata.password1){
        try{
            const {data} = await axios.post(`https://auth7799.herokuapp.com/Newpassword`, {password:verificationdata.password, id:params.id});
            alert("Password changed successfully")
            his.push('/login');
            console.log(data)
        }
        catch (error){
            seterr("something went wrong")
        }
        }
        else{
            seterr("Passwords not matched")   
        }
    }
    return(
        <Layout className={classes.form}>
        {loding && <p className={classes.label}>...loading</p>}
        {!loding && ( !valid ? (<><p className={classes.label}>link expired</p> <button className='btn btn-primary form-control mb-4' onClick={redirect}>Resend Link</button> </>) :(<>
        <p className={classes.heading}> Change Password </p>
        <form onSubmit={submithandler}>
            <p className={classes.label}> OTP - One Time Password </p>
            <input type='text' className='form-control mb-3' onChange={OtpchangeHandler} name='code' placeholder='Otp'onBlur={verificationhandler}/>
            {status && <p className={classes[status.class]}>{status.message}</p>}
            <p className={classes.label}> New Password</p>
            <input type='password' className='form-control mb-3' onChange={changeHandler} name='password' placeholder='New password' autoComplete="new-password"/>
            <p className={classes.label}> Conform New Password</p>
            <input type='password' className='form-control mb-3' onChange={changeHandler} name='password1' placeholder='New Conform password'  autoComplete="new-password"/>
            {err && <p className={classes.errormessage}>{err}</p>}
            <button className='btn btn-primary form-control mb-4' >Change Password</button>
        </form></>))}
        </Layout>
    );
}

export default Verification;
