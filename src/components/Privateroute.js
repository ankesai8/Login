import { Navigate } from "react-router";

const Privateroute = (props) =>{
    const token = localStorage.getItem('loggedin');
    if(token){
        return props.children
    }
    else{
        return (
        <><Navigate to='/login'/></>)
    }
}
export default Privateroute;