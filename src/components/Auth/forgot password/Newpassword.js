import { useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router";

const Newpassword = () =>{
    const his = useHistory();
    const [newpassdata, setdata] = useState({});
    const changeHandler= ({ target: { name, value } }) =>{
        setdata( prev =>({...prev ,  [name]:value}))
    }
    const submithandler = async (event) => {
        event.preventDefault();
        const {data} = await axios.post(`https://auth7799.herokuapp.com/Newpassword`, {...newpassdata, id:localStorage.getItem('id')});
        his.push('/login');
        console.log(data )
    }
    return(
        <form onSubmit={submithandler}>
            <input type='password' onChange={changeHandler} name='password'  autoComplete="new-password"/>
            <button>change password</button>
        </form>
    );
}

export default Newpassword;