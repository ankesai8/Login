import './App.css';
import React from 'react';
import Login from './components/Auth/Login/login';
import Register from './components/Auth/Register/Register';
import Forgotpassword from './components/Auth/forgot password/forgetpassword';
import { Routes  ,Route} from 'react-router-dom';
import Home from './components/data/home';
import Privateroute from './components/Privateroute';
import Publicroute from './components/Publicroute';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    
<Routes>


      <Route path='/' exact
        element = {localStorage.getItem('loggedin') ? <Navigate  to='/home'/> : <Navigate  to='/login'/>}>
      </Route>
      <Route path='/login' element={<Publicroute> <Login/> </Publicroute>}>
        
      </Route>
      <Route path='/Register'
      element={ <Publicroute><Register/></Publicroute>}>
     
      </Route>
      <Route  path='/forgotpassword'
      element={ <Forgotpassword/>}
      >
        
      </Route>
      <Route path='/home'
      element={<Privateroute><Home/></Privateroute>}>
        
      </Route>
      <Route path='*'
        element = {localStorage.getItem('loggedin') ?  <Navigate  to='/home'/> :<Navigate  to='/login' replace={true}/>}>
      </Route>
      </Routes>
  );
}

export default App;
